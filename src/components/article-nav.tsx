import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Entry } from "@/lib/content";

/** Previous / next navigation between entries in the same collection. */
export function ArticleNav({
  prev,
  next,
  basePath,
}: {
  prev: Entry | null;
  next: Entry | null;
  basePath: string;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="More in this collection"
      className="mt-12 grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`${basePath}/${prev.slug}`}
          className="group flex flex-col rounded-2xl border border-border bg-surface/40 p-5 transition hover:border-accent/50"
        >
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            Previous
          </span>
          <span className="mt-2 font-display text-base font-semibold leading-snug text-foreground transition group-hover:text-accent-2">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={`${basePath}/${next.slug}`}
          className="group flex flex-col rounded-2xl border border-border bg-surface/40 p-5 text-right transition hover:border-accent/50 sm:items-end"
        >
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Next
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="mt-2 font-display text-base font-semibold leading-snug text-foreground transition group-hover:text-accent-2">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
