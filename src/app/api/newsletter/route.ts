/**
 * POST /api/newsletter — footer newsletter sign-up.
 *
 * Relays to EmailJS from the server so keys never reach the client. Set
 * EMAILJS_SERVICE_ID, EMAILJS_NEWSLETTER_TEMPLATE_ID and EMAILJS_PUBLIC_KEY to
 * go live (see .env.example). When they are missing we answer honestly instead
 * of pretending the address was stored.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Overridable so local QA can point at a mock EmailJS without touching code.
const EMAILJS_ENDPOINT =
  process.env.EMAILJS_ENDPOINT ?? "https://api.emailjs.com/api/v1.0/email/send";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_BODY_BYTES = 5_000;

const SERVICE_ID = process.env.EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.EMAILJS_NEWSLETTER_TEMPLATE_ID ?? "";
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
  return false;
}

async function sendEmail(params: Record<string, string>): Promise<void> {
  const response = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
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

export async function POST(request: Request): Promise<Response> {
  const length = Number(request.headers.get("content-length") ?? "0");
  if (length > MAX_BODY_BYTES) {
    return Response.json({ error: "That request was too large." }, { status: 413 });
  }

  if (tooManyRequests(clientIp(request))) {
    return Response.json(
      { error: "Too many sign-ups from this connection. Please try again later." },
      { status: 429 },
    );
  }

  let email = "";
  try {
    const body = (await request.json()) as Record<string, unknown>;
    email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
  } catch {
    return Response.json({ error: "We couldn't read that request." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!isConfigured()) {
    console.error(
      "[newsletter] EmailJS is not configured — set EMAILJS_SERVICE_ID, EMAILJS_NEWSLETTER_TEMPLATE_ID and EMAILJS_PUBLIC_KEY.",
    );
    return Response.json(
      { error: "Newsletter delivery isn't connected yet, so nothing was sent." },
      { status: 503 },
    );
  }

  try {
    await sendEmail({ email, reply_to: email, source: "Footer newsletter" });
  } catch (error) {
    console.error("[newsletter] send failed:", error);
    return Response.json(
      { error: "We couldn't add you just now. Please try again, or email us directly." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true }, { status: 200 });
}
