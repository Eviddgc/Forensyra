import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/badge";
import { cardClass, chipClass } from "@/lib/ui";
import type { Entry } from "@/lib/content";
import { cn, formatDate } from "@/lib/utils";

export function EntryCard({
  entry,
  basePath,
  kind,
}: {
  entry: Entry;
  basePath: string;
  kind: string;
}) {
  return (
    <Link
      href={`${basePath}/${entry.slug}`}
      className={cn(cardClass, "fx-frame group relative flex h-full flex-col p-5")}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <Badge variant="accent">{kind}</Badge>
        <div className="flex items-center gap-2">
          {entry.status ? (
            <Badge variant="muted">{entry.status}</Badge>
          ) : null}
          {entry.pinned ? <Badge variant="warning">Pinned</Badge> : null}
        </div>
      </div>

      <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-foreground transition group-hover:text-accent-2">
        {entry.title}
      </h3>

      {entry.description ? (
        <p className="mt-2 line-clamp-3 text-sm text-muted">
          {entry.description}
        </p>
      ) : null}

      {entry.tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {entry.tags.slice(0, 4).map((tag) => (
            <span key={tag} className={chipClass}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs text-muted">
        <span className="font-mono">{formatDate(entry.date)}</span>
        <span className="inline-flex items-center gap-1 font-medium text-accent opacity-0 transition group-hover:opacity-100">
          Open
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
