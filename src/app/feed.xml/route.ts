import { getSite } from "@/lib/site";
import { getEntries } from "@/lib/content";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS 2.0 feed of write-ups (and case files), at /feed.xml. */
export async function GET(): Promise<Response> {
  const site = getSite();
  const base = site.url.replace(/\/$/, "");

  const [writeups, projects] = await Promise.all([
    getEntries("writeups"),
    getEntries("projects"),
  ]);

  const items = [
    ...writeups.map((entry) => ({
      title: entry.title,
      link: `${base}/writeups/${entry.slug}`,
      description: entry.description ?? "",
      date: entry.updated ?? entry.date,
      category: "Write-up",
    })),
    ...projects.map((entry) => ({
      title: entry.title,
      link: `${base}/projects/${entry.slug}`,
      description: entry.description ?? "",
      date: entry.updated ?? entry.date,
      category: "Case file",
    })),
  ].sort((a, b) => {
    const da = a.date ? Date.parse(a.date) : 0;
    const db = b.date ? Date.parse(b.date) : 0;
    return db - da;
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} — ${escapeXml(site.descriptor)}</title>
    <link>${base}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <category>${escapeXml(item.category)}</category>
      <description>${escapeXml(item.description)}</description>
      ${item.date ? `<pubDate>${new Date(item.date).toUTCString()}</pubDate>` : ""}
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
