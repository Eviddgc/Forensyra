import type { Metadata } from "next";
import { getSite } from "@/lib/site";

/**
 * Per-page `alternates` for the metadata API.
 *
 * Next *replaces* the `alternates` object when a page defines it — it does not
 * deep-merge with the root layout's — so the feed discovery link has to be
 * re-declared next to the canonical URL. Declaring a canonical on its own
 * would otherwise silently drop the RSS <link> from that page.
 */
export function pageAlternates(path: string): Metadata["alternates"] {
  const site = getSite();
  return {
    canonical: path,
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: `${site.name} — RSS` },
      ],
    },
  };
}

/** Build complete per-page social metadata. Nested metadata is not deep-merged. */
export function pageMetadata(
  path: string,
  title: string,
  description: string,
  robots?: Metadata["robots"],
): Metadata {
  const site = getSite();
  const socialTitle = `${site.name} | ${title}`;
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} - ${site.descriptor}` };
  return {
    title: { absolute: socialTitle },
    description,
    alternates: pageAlternates(path),
    openGraph: { type: "website", siteName: site.name, title: socialTitle, description, url: path, images: [image] },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [image] },
    ...(robots ? { robots } : {}),
  };
}
