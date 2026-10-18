export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Strip tags and decode the handful of entities remark-html emits. */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Pull h2/h3 headings out of the rendered article HTML. Headings already carry
 * ids (added in lib/content.ts), so the table of contents can link to them.
 */
export function extractToc(html: string): TocItem[] {
  const items: TocItem[] = [];
  const pattern = /<h([23])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) !== null) {
    const text = stripHtml(match[3]);
    if (!text) continue;
    items.push({ id: match[2], text, level: Number(match[1]) as 2 | 3 });
  }
  return items;
}

/** Rough reading time in minutes (220 words per minute). */
export function readingTime(text: string, wordsPerMinute = 220): number {
  const words = stripHtml(text).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}
