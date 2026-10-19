import { getSite } from "@/lib/site";
import type { Entry } from "@/lib/content";

type Ld = Record<string, unknown>;

/**
 * Schema.org structured data. Kept in one place so the layout, article pages
 * and the roles list all describe FORENSYRA the same way to search engines.
 */

const SOCIAL_KEYS = ["github", "linkedin", "instagram", "youtube"] as const;

/**
 * `sameAs` wants identity URLs (profiles) rather than individual posts, so a
 * LinkedIn *post* permalink is left out until it points at a profile
 * (/in/…, /company/…). It still appears as a footer link.
 */
const LINKEDIN_POST = /linkedin\.com\/(posts|feed\/update)\//;

export function organizationSchema(): Ld {
  const site = getSite();
  const sameAs = SOCIAL_KEYS.map((key) => site.social[key])
    .filter(Boolean)
    .filter((url) => !LINKEDIN_POST.test(url));
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.descriptor,
    url: site.url,
    logo: `${site.url}/brand-mark.png`,
    email: site.email,
    description: site.description,
    slogan: site.tagline,
    knowsAbout: [
      "Digital forensics",
      "Incident response",
      "Evidence handling",
      "Chain of custody",
      "Malware analysis",
      "Network forensics",
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema(): Ld {
  const site = getSite();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: site.name },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  trail: Array<{ name: string; path: string }>,
): Ld {
  const site = getSite();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function articleSchema(entry: Entry, path: string): Ld {
  const site = getSite();
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: entry.title,
    description: entry.description ?? "",
    url: `${site.url}${path}`,
    ...(entry.date ? { datePublished: entry.date } : {}),
    ...(entry.updated ? { dateModified: entry.updated } : {}),
    ...(entry.author ? { author: { "@type": "Person", name: entry.author } } : {}),
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/brand-mark.png` },
    },
    keywords: entry.tags.join(", "),
    inLanguage: "en",
  };
}
