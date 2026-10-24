/**
 * Client-safe search primitives. No Node APIs here so the ⌘K palette can
 * import this module without pulling `node:fs` into the browser bundle.
 */

export type SearchKind =
  | "Case file"
  | "Write-up"
  | "Role"
  | "Resource"
  | "Page";

export interface SearchDoc {
  title: string;
  description: string;
  href: string;
  kind: SearchKind;
  tags: string[];
  /** Extra text that can match a query without being displayed. */
  keywords?: string[];
}

/** Pure, testable matcher used by both the palette and the /search page. */
export function searchDocs(
  docs: SearchDoc[],
  query: string,
  limit = 20,
): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return docs.slice(0, limit);

  const scored = docs
    .map((doc) => {
      const title = doc.title.toLowerCase();
      const description = doc.description.toLowerCase();
      const tags = doc.tags.join(" ").toLowerCase();
      const keywords = (doc.keywords ?? []).join(" ").toLowerCase();
      let score = 0;
      if (title === q) score += 100;
      if (title.startsWith(q)) score += 50;
      if (title.includes(q)) score += 25;
      if (tags.includes(q)) score += 10;
      if (keywords.includes(q)) score += 6;
      if (description.includes(q)) score += 5;
      return { doc, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title));

  return scored.slice(0, limit).map((item) => item.doc);
}
