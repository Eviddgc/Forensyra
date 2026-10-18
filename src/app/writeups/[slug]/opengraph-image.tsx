import { getEntry } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "FORENSYRA write-up";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntry("writeups", slug);

  return renderOgCard({
    kind: "Write-up",
    title: entry?.title ?? "Write-up",
    subtitle: entry?.description,
    footer: ["Forensyra", entry?.author, entry?.date ? `Published ${entry.date}` : ""],
  });
}
