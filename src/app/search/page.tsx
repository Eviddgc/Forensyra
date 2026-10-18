import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Container } from "@/components/container";
import { getSearchIndex, searchDocs } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search",
  description: "Search case files, write-ups, roles and resources across FORENSYRA.",
  robots: { index: false, follow: true },
};

const KIND_STYLE: Record<string, string> = {
  "Case file": "border-accent/50 bg-accent/10 text-accent-2",
  "Write-up": "border-[#6aa0dc]/40 bg-[#6aa0dc]/10 text-[#9cc3ee]",
  Role: "border-success/40 bg-success/10 text-success",
  Resource: "border-warning/40 bg-warning/10 text-warning",
  Page: "border-border bg-surface-2/60 text-muted",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const index = await getSearchIndex();
  const results = query ? searchDocs(index.docs, query, 50) : [];

  return (
    <Container className="py-16 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        Search the archive
      </p>
      <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Find a trace
      </h1>

      <form action="/search" method="get" role="search" className="mt-8 max-w-2xl">
        <label htmlFor="q" className="sr-only">
          Search FORENSYRA
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search case files, write-ups, roles, tools…"
            autoComplete="off"
            className="w-full rounded-full border border-border bg-surface/60 py-3.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted/60 transition focus:border-accent/60 focus:outline-none"
          />
        </div>
      </form>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {query
          ? `${results.length} result${results.length === 1 ? "" : "s"} for “${query}”`
          : `${index.docs.length} items in the index. Type a query above.`}
      </p>

      {query && results.length > 0 ? (
        <ul className="mt-8 max-w-3xl space-y-3">
          {results.map((doc) => {
            const external = doc.href.startsWith("http");
            const inner = (
              <>
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${
                    KIND_STYLE[doc.kind] ?? KIND_STYLE.Page
                  }`}
                >
                  {doc.kind}
                </span>
                <span className="mt-2 block font-display text-lg font-semibold text-foreground transition group-hover:text-accent-2">
                  {doc.title}
                </span>
                {doc.description ? (
                  <span className="mt-1 block text-sm text-muted">
                    {doc.description}
                  </span>
                ) : null}
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-2">
                  Open
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </>
            );

            return (
              <li key={`${doc.kind}-${doc.href}-${doc.title}`}>
                {external ? (
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-2xl border border-[#6aa0dc]/25 bg-[#122b46]/40 p-5 transition-colors hover:border-accent/40"
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    href={doc.href}
                    className="group block rounded-2xl border border-[#6aa0dc]/25 bg-[#122b46]/40 p-5 transition-colors hover:border-accent/40"
                  >
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      ) : null}

      {query && results.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-border bg-surface/40 p-8 text-center text-muted">
          No matches. Try a broader term like <em>memory</em>, <em>USB</em> or{" "}
          <em>network</em>.
        </p>
      ) : null}
    </Container>
  );
}
