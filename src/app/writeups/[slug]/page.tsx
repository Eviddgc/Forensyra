import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { HeroSection } from "@/components/heroes/hero-backdrop";
import { Markdown } from "@/components/markdown";
import { JsonLd } from "@/components/json-ld";
import { ArticleToc } from "@/components/article-toc";
import { ArticleNav } from "@/components/article-nav";
import { CiteBlock } from "@/components/cite-block";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";
import { getEntries, getEntry, getSlugs } from "@/lib/content";
import { extractToc, readingTime } from "@/lib/toc";
import { formatDate } from "@/lib/utils";
import { pageAlternates } from "@/lib/seo";
import { getSite } from "@/lib/site";

export function generateStaticParams() {
  return getSlugs("writeups").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntry("writeups", slug);
  if (!entry) return { title: "Write-up" };
  return {
    title: entry.title,
    description: entry.description,
    alternates: pageAlternates(`/writeups/${slug}`),
    openGraph: {
      type: "article",
      title: entry.title,
      description: entry.description,
      url: `/writeups/${slug}`,
      ...(entry.date ? { publishedTime: entry.date } : {}),
      ...(entry.updated ? { modifiedTime: entry.updated } : {}),
      ...(entry.tags.length ? { tags: entry.tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
    },
  };
}

export default async function WriteupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntry("writeups", slug);
  if (!entry) notFound();

  const site = getSite();
  const all = await getEntries("writeups");
  const index = all.findIndex((item) => item.slug === slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null;
  const toc = extractToc(entry.content);
  const minutes = readingTime(entry.raw);
  const url = `${site.url}/writeups/${slug}`;
  const citation = `${entry.author ?? site.name} (${entry.date ? new Date(entry.date).getFullYear() : new Date().getFullYear()}). "${entry.title}". ${site.name}.`;

  return (
    <article>
      <JsonLd
        data={[
          articleSchema(entry, `/writeups/${slug}`),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Write-ups", path: "/writeups" },
            { name: entry.title, path: `/writeups/${slug}` },
          ]),
        ]}
      />
      {/* Hero */}
      <HeroSection variant="research">
        <Container variant="wide" className="relative z-10 flex min-h-[360px] items-center py-16 sm:min-h-[400px] sm:py-20 lg:min-h-[440px] lg:py-20">
          <Reveal className="max-w-3xl">
            <Link
              href="/writeups"
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              All write-ups
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-accent/50 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-2">
                Write-up
              </span>
              {entry.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-[#6aa0dc]/30 bg-[#0d2238]/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted"
                >
                  {tag}
                </span>
              ))}
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
              {entry.author ? (
                <span className="inline-flex items-center gap-2">
                  <User className="h-4 w-4 text-accent" />
                  {entry.author}
                </span>
              ) : null}
              {entry.date ? (
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  {formatDate(entry.date)}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                {minutes} min read
              </span>
            </div>
          </Reveal>
        </Container>
      </HeroSection>

      <Container variant="reading" className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
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
              <div className="max-w-3xl">
                <Markdown html={entry.content} />
              </div>
            </Reveal>

            {entry.links.length > 0 ? (
              <Reveal delay={80}>
                <div className="mt-10 flex flex-wrap gap-3">
                  {entry.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#6aa0dc]/40 bg-[#122b46]/50 px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent-2"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </Reveal>
            ) : null}

            <div className="max-w-3xl">
              <CiteBlock citation={citation} url={url} />
              <ArticleNav prev={prev} next={next} basePath="/writeups" />
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <ArticleToc items={toc} />
              <div className="mt-8 rounded-2xl border border-border bg-surface/40 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Reading time
                </p>
                <p className="mt-1.5 font-display text-2xl font-semibold text-foreground">
                  {minutes}
                  <span className="ml-1.5 text-sm font-normal text-muted">
                    min
                  </span>
                </p>
                {entry.updated ? (
                  <p className="mt-3 border-t border-border/70 pt-3 text-xs text-muted">
                    Updated {formatDate(entry.updated)}
                  </p>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
