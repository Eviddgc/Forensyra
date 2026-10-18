import { after } from "next/server";
import { validateMentor, buildMentorEmailParams } from "@/lib/mentor";
import type { ApplyValues as MentorValues } from "@/lib/apply";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MIN_FILL_MS = 2000;
const MAX_BODY_BYTES = 100_000;

const SERVICE_ID = process.env.EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.EMAILJS_MENTOR_TEMPLATE_ID ?? process.env.EMAILJS_TEMPLATE_ID ?? "";
const AUTOREPLY_TEMPLATE_ID = process.env.EMAILJS_MENTOR_AUTOREPLY_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY ?? "";
const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY ?? "";

const hits = new Map<string, number[]>();

function isConfigured(): boolean {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function tooManyRequests(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some((at) => now - at < RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function readPayload(request: Request): Promise<MentorValues> {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const out: MentorValues = {};
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === "string") out[key] = value;
      else if (Array.isArray(value)) out[key] = value.map(String);
    }
    return out;
  }

  const form = await request.formData();
  const out: MentorValues = {};
  for (const [key, value] of form.entries()) {
    if (typeof value !== "string") continue;
    const existing = out[key];
    if (existing === undefined) out[key] = value;
    else if (Array.isArray(existing)) existing.push(value);
    else out[key] = [existing, value];
  }
  return out;
}

async function sendEmail(templateId: string, params: Record<string, string>): Promise<void> {
  const response = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: SERVICE_ID,
      template_id: templateId,
      user_id: PUBLIC_KEY,
      ...(PRIVATE_KEY ? { accessToken: PRIVATE_KEY } : {}),
      template_params: params,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`EmailJS ${response.status}: ${detail.slice(0, 300)}`);
  }
}

function templateParams(values: MentorValues): Record<string, string> {
  const raw = buildMentorEmailParams(values);
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    out[key] = key === "reply_to" ? value : escapeHtml(value);
  }
  return out;
}

export async function POST(request: Request): Promise<Response> {
  const isJson = (request.headers.get("content-type") ?? "").includes("application/json");

  const ok = () =>
    isJson
      ? Response.json({ ok: true }, { status: 200 })
      : Response.redirect(new URL("/apply/thanks", request.url), 303);

  const fail = (status: number, error: string, errors?: Record<string, string>) =>
    isJson
      ? Response.json({ error, errors }, { status })
      : Response.redirect(
          new URL(`/apply/mentor?status=${status === 400 ? "invalid" : "error"}`, request.url),
          303,
        );

  const length = Number(request.headers.get("content-length") ?? "0");
  if (length > MAX_BODY_BYTES) return fail(413, "That application was too large to send.");

  const ip = clientIp(request);
  if (tooManyRequests(ip)) {
    return fail(429, "Too many applications from this connection. Please try again a little later.");
  }

  let payload: MentorValues;
  try {
    payload = await readPayload(request);
  } catch {
    return fail(400, "We couldn't read that application. Please try again.");
  }

  const honeypot = typeof payload.website === "string" ? payload.website.trim() : "";
  if (honeypot) return ok();

  const startedAt = Number(payload._ts);
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) {
    return ok();
  }

  const { errors, values } = validateMentor(payload);
  if (Object.keys(errors).length > 0) {
    return fail(400, "Please check the highlighted fields and try again.", errors);
  }

  if (!isConfigured()) {
    console.error("[mentor] EmailJS is not configured.");
    return fail(503, "The mentor form isn't connected yet. Please email us directly instead.");
  }

  const params = templateParams(values);

  try {
    await sendEmail(TEMPLATE_ID, params);
  } catch (error) {
    console.error("[mentor] notification send failed:", error);
    return fail(502, "We couldn't send your application just now. Please try again, or email us directly.");
  }

  if (AUTOREPLY_TEMPLATE_ID) {
    after(async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        await sendEmail(AUTOREPLY_TEMPLATE_ID, params);
      } catch (error) {
        console.error("[mentor] auto-reply send failed:", error);
      }
    });
  }

  return ok();
}
