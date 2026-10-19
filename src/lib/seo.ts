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
