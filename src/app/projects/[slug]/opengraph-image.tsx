import { getEntry } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "FORENSYRA case file";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntry("projects", slug);

  const evidence = entry?.evidence?.length
    ? `${entry.evidence.length} evidence item${entry.evidence.length === 1 ? "" : "s"}`
    : "";

  return renderOgCard({
    kind: "Case file",
    title: entry?.title ?? "Case file",
    subtitle: entry?.description,
    footer: ["Forensyra", evidence, entry?.date ? `Opened ${entry.date}` : ""],
  });
}
