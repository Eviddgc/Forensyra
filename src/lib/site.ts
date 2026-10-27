import fs from "node:fs";
import path from "node:path";

export interface SiteSettings {
  name: string;
  descriptor: string;
  tagline: string;
  motto: string;
  description: string;
  url: string;
  email: string;
  /** Where "Apply" buttons send people — the on-site form at /apply. */
  applyUrl: string;
  announcement: {
    enabled: boolean;
    text: string;
    link: string;
    linkLabel: string;
  };
  social: {
    github: string;
    linkedin: string;
    instagram: string;
    youtube: string;
    email: string;
  };
}

const SETTINGS_PATH = path.join(process.cwd(), "content", "settings", "site.json");

let cachedSite: SiteSettings | null = null;

/**
 * Resolve the public site URL. A configured value is the fallback, but an
 * explicit public-site override wins for production configuration. Automatic
 * deployment hostnames are intentionally excluded so preview deployments do
 * not change the canonical identity, sitemap or social URLs.
 */
function resolveSiteUrl(configured: string): string {
  // Canonicals always describe the public site, never a deployment/preview host.
  const candidates = [process.env.NEXT_PUBLIC_SITE_URL];
  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      return new URL(candidate).origin;
    } catch {
      // Skip malformed values and keep looking.
    }
  }
  return configured.replace(/\/$/, "");
}

/** Read the editable site settings (managed from /admin in the CMS). */
export function getSite(): SiteSettings {
  if (cachedSite) return cachedSite;
  const raw = fs.readFileSync(SETTINGS_PATH, "utf8");
  const parsed = JSON.parse(raw) as SiteSettings;
  parsed.url = resolveSiteUrl(parsed.url);
  cachedSite = parsed;
  return cachedSite;
}
