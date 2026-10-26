import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Container } from "@/components/container";
import { HeroSection } from "@/components/heroes/hero-backdrop";
import { getSearchIndex, searchDocs } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search",
  description: "Search case files, write-ups, roles and resources across FORENSYRA.",
  robots: { index: false, follow: true },
};

const KIND_STYLE: Record<string, string> = {
  "Case file": "border-accent/50 bg-accent/10 text-accent-2",
  "Write-up": "border-[#d4af5f]/40 bg-[#d4af5f]/10 text-[#ecd49b]",
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
    <>
      <HeroSection variant="search">
        <Container className="relative z-10 flex min-h-[260px] items-center pb-8 pt-14 sm:min-h-[280px] sm:pt-16">
          <div className="w-full">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-accent" />
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                Search the archive
              </p>
            </div>
            <h1 className="font-display mt-3 max-w-3xl text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Find a <span className="text-accent-2">trace</span>
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
              Search every case file, write-up, role and resource in one place.
            </p>

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
                  className="w-full rounded-full border border-border bg-background/75 py-3.5 pl-11 pr-4 text-sm text-foreground shadow-[0_18px_50px_-30px_rgba(0,0,0,0.8)] placeholder:text-muted/60 transition focus:border-accent/60 focus:outline-none"
                />
              </div>
            </form>
          </div>
        </Container>
      </HeroSection>

      <Container className="py-12 sm:py-16">
        <p className="text-sm text-muted" aria-live="polite">
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
                      className="group block rounded-2xl border border-[#d4af5f]/25 bg-[#151922]/40 p-5 transition-colors hover:border-accent/40"
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      href={doc.href}
                      className="group block rounded-2xl border border-[#d4af5f]/25 bg-[#151922]/40 p-5 transition-colors hover:border-accent/40"
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
    </>
  );
}
