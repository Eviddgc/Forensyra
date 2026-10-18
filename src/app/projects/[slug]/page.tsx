import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Hash, Layers } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Markdown } from "@/components/markdown";
import { JsonLd } from "@/components/json-ld";
import { ArticleToc } from "@/components/article-toc";
import { ArticleNav } from "@/components/article-nav";
import { CiteBlock } from "@/components/cite-block";
import { CaseWorkbench } from "@/components/case-workbench";
import { breadcrumbSchema } from "@/lib/structured-data";
import { btnSecondary } from "@/lib/ui";
import { getEntries, getEntry, getSlugs } from "@/lib/content";
import { extractToc, readingTime } from "@/lib/toc";
import { formatDate } from "@/lib/utils";
import { getSite } from "@/lib/site";

export function generateStaticParams() {
  return getSlugs("projects").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntry("projects", slug);
  if (!entry) return { title: "Case file" };
  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      title: entry.title,
      description: entry.description,
      url: `/projects/${slug}`,
      ...(entry.date ? { publishedTime: entry.date } : {}),
      ...(entry.updated ? { modifiedTime: entry.updated } : {}),
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntry("projects", slug);
  if (!entry) notFound();

  const site = getSite();
  const all = await getEntries("projects");
  const index = all.findIndex((item) => item.slug === slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null;
  const toc = extractToc(entry.content);
  const minutes = readingTime(entry.raw);
  const url = `${site.url}/projects/${slug}`;
  const citation = `${site.name} (${entry.date ? new Date(entry.date).getFullYear() : new Date().getFullYear()}). "${entry.title}". Case file, ${entry.status ?? "planned"}.`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Case board", path: "/projects" },
          { name: entry.title, path: `/projects/${slug}` },
        ])}
      />
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-background">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_20%,#122b46_0%,#0d2238_50%,#071827_100%)]" />
          <div className="fx-orb pointer-events-none right-[15%] top-[5%] h-[20rem] w-[20rem] bg-[#6aa0dc]/10" />
          <div className="fx-orb pointer-events-none left-[-5%] bottom-[-10%] h-[16rem] w-[16rem] bg-accent/8" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="fx-scanlines absolute inset-0 opacity-[0.14]" />
        </div>

        <Container className="relative z-10 flex min-h-[360px] items-center py-20 sm:min-h-[420px] sm:py-24">
          <Reveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              All case files
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-accent/50 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-2">
                {entry.caseType ?? "Case file"}
              </span>
              {entry.status ? (
                <span className="inline-flex items-center rounded-full border border-[#6aa0dc]/40 bg-[#6aa0dc]/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[#9cc3ee]">
                  {entry.status}
                </span>
              ) : null}
              {entry.pinned ? (
                <span className="inline-flex items-center rounded-full border border-warning/40 bg-warning/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-warning">
                  Pinned
                </span>
              ) : null}
            </div>
            <h1 className="font-display mt-5 text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {entry.title}
            </h1>
            {entry.description ? (
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
                {entry.description}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
              {entry.date ? (
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  Opened {formatDate(entry.date)}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                {minutes} min read
              </span>
            </div>
          </Reveal>
        </Container>

        <svg
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 block h-[46px] w-full sm:h-[70px]"
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
        >
          <path
            d="M0 30 C 260 96 470 4 720 40 C 970 76 1180 108 1440 44 L 1440 110 L 0 110 Z"
            fill="var(--color-surface)"
          />
        </svg>
      </section>

      {/* Interactive workbench */}
      <Container className="pt-14">
        <Reveal>
          <CaseWorkbench
            evidence={entry.evidence}
            plan={entry.plan}
            deliverables={entry.deliverables}
            sourceUrl={entry.links[0]?.url}
          />
        </Reveal>
      </Container>

      <Container className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="min-w-0">
          {toc.length > 1 ? (
            <details className="mb-8 rounded-2xl border border-border bg-surface/40 px-5 py-4 lg:hidden">
              <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                On this page
              </summary>
              <div className="mt-3">
                <ArticleToc items={toc} />
              </div>
            </details>
          ) : null}

          <Reveal>
            <Markdown html={entry.content} />
          </Reveal>

          <CiteBlock citation={citation} url={url} />
          <ArticleNav prev={prev} next={next} basePath="/projects" />
        </div>

        <aside className="space-y-4">
          <ArticleToc items={toc} />

          <Reveal delay={80}>
            <div className="rounded-2xl border border-[#6aa0dc]/25 bg-[#122b46]/50 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                Case details
              </p>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Layers className="mt-0.5 h-4 w-4 text-muted" />
                  <div>
                    <dt className="text-muted">Status</dt>
                    <dd className="text-foreground">{entry.status ?? "Planned"}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-4 w-4 text-muted" />
                  <div>
                    <dt className="text-muted">Opened</dt>
                    <dd className="text-foreground">{formatDate(entry.date)}</dd>
                  </div>
                </div>
                {entry.updated ? (
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 text-muted" />
                    <div>
                      <dt className="text-muted">Updated</dt>
                      <dd className="text-foreground">{formatDate(entry.updated)}</dd>
                    </div>
                  </div>
                ) : null}
              </dl>
            </div>
          </Reveal>

          {entry.evidence.length > 0 ? (
            <Reveal delay={140}>
              <div className="rounded-2xl border border-[#6aa0dc]/25 bg-[#122b46]/50 p-6">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                  Evidence
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {entry.evidence.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Hash className="h-3.5 w-3.5 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}

          {entry.tags.length > 0 ? (
            <Reveal delay={200}>
              <div className="rounded-2xl border border-[#6aa0dc]/25 bg-[#122b46]/50 p-6">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                  Tags
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-[#6aa0dc]/30 bg-[#0d2238]/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={260}>
            <Link href="/join" className={btnSecondary}>
              Join the team
            </Link>
          </Reveal>
        </aside>
      </Container>
    </>
  );
}
