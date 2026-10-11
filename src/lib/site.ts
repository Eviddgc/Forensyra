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
    email: string;
  };
}

const SETTINGS_PATH = path.join(process.cwd(), "content", "settings", "site.json");

let cachedSite: SiteSettings | null = null;

/**
 * Resolve the public site URL. A configured value is the fallback, but an
 * environment override wins so previews and production deployments
 * (Vercel) get correct canonical URLs, sitemaps and OG tags without editing
 * the committed settings file.
 */
function resolveSiteUrl(configured: string): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ];
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
