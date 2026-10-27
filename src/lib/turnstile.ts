/**
 * Cloudflare Turnstile — server-side token verification.
 *
 * The browser widget (src/components/turnstile.tsx) issues a one-time token
 * that each form posts along with its payload. Tokens expire after 300
 * seconds and are single-use, so every submission is verified against
 * Cloudflare's siteverify endpoint before we trust it.
 *
 * Environment (see .env.example):
 *   TURNSTILE_SECRET_KEY   — secret key from the Cloudflare dashboard.
 *   TURNSTILE_VERIFY_URL   — optional override so local QA can point at a
 *                            mock siteverify without touching code.
 *
 * When TURNSTILE_SECRET_KEY is not set the check is a no-op, so local
 * development and deployments without the keys behave exactly as before.
 * Once the key is set, a missing or rejected token fails closed.
 */

const SECRET = process.env.TURNSTILE_SECRET_KEY ?? "";
const VERIFY_URL =
  process.env.TURNSTILE_VERIFY_URL ??
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function turnstileEnabled(): boolean {
  return Boolean(SECRET);
}

export async function verifyTurnstile(
  token: string | undefined,
  ip: string,
): Promise<boolean> {
  if (!SECRET) return true;
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret: SECRET, response: token });
    if (ip && ip !== "unknown") body.set("remoteip", ip);

    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(5_000),
    });
    const data = (await response.json().catch(() => ({}))) as {
      success?: boolean;
      "error-codes"?: string[];
    };
    if (data.success !== true) {
      console.warn(
        "[turnstile] token rejected:",
        (data["error-codes"] ?? []).join(",") || `HTTP ${response.status}`,
      );
    }
    return data.success === true;
  } catch (error) {
    // Fail closed: a verification outage must not open the forms to bots.
    console.error("[turnstile] verification failed:", error);
    return false;
  }
}
