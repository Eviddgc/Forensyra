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

/** Read the editable site settings (managed from /admin in the CMS). */
export function getSite(): SiteSettings {
  if (cachedSite) return cachedSite;
  const raw = fs.readFileSync(SETTINGS_PATH, "utf8");
  cachedSite = JSON.parse(raw) as SiteSettings;
  return cachedSite;
}
