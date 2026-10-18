import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import {
  WriteupsExplorer,
  type WriteupCardData,
} from "@/components/writeups-explorer";
import { readingTime } from "@/lib/toc";
import type { Entry } from "@/lib/content";

function toCardData(entry: Entry): WriteupCardData {
  return {
    slug: entry.slug,
    title: entry.title,
    description: entry.description ?? "",
    date: entry.date,
    author: entry.author,
    tags: entry.tags,
    minutes: readingTime(entry.raw),
  };
}

export function WriteupsList({ writeups }: { writeups: Entry[] }) {
  if (writeups.length === 0) {
    return (
      <Container className="py-14">
        <div className="rounded-2xl border border-border bg-surface/40 p-12 text-center">
          <p className="text-muted">No write-ups published yet.</p>
          <p className="mt-2 text-sm text-muted/70">
            Members will publish notes and tutorials here as the first case begins.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-14 sm:py-20">
      {/* Section heading */}
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
          Latest Publications
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          From the lab
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
          Investigation logs, tutorials, and research documented as we learn and as
          cases progress. Search the archive, or filter it down by topic.
        </p>
      </Reveal>

      <WriteupsExplorer items={writeups.map(toCardData)} />
    </Container>
  );
}
