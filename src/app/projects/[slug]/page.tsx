import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Hash, Layers } from "lucide-react";
import { Container } from "@/components/container";
import { Badge } from "@/components/badge";
import { Markdown } from "@/components/markdown";
import { btnSecondary } from "@/lib/ui";
import { getEntry, getSlugs } from "@/lib/content";
import { formatDate } from "@/lib/utils";

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
  return { title: entry.title, description: entry.description };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntry("projects", slug);
  if (!entry) notFound();

  return (
    <article>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-[0.2]" />
        <div className="absolute inset-0 bg-radial-glow" />
        <Container className="relative py-14">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            All case files
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge variant="accent">{entry.caseType ?? "Case file"}</Badge>
            {entry.status ? <Badge variant="muted">{entry.status}</Badge> : null}
            {entry.pinned ? <Badge variant="warning">Pinned</Badge> : null}
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {entry.title}
          </h1>
          {entry.description ? (
            <p className="mt-4 max-w-2xl text-lg text-muted">
              {entry.description}
            </p>
          ) : null}
        </Container>
      </section>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1.6fr_0.9fr]">
        <Markdown html={entry.content} />

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface p-6">
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
                    <dd className="text-foreground">
                      {formatDate(entry.updated)}
                    </dd>
                  </div>
                </div>
              ) : null}
            </dl>
          </div>

          {entry.evidence.length > 0 ? (
            <div className="rounded-2xl border border-border bg-surface p-6">
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
          ) : null}

          {entry.tags.length > 0 ? (
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                Tags
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}

          <Link href="/join" className={btnSecondary}>
            Join the team
          </Link>
        </aside>
      </Container>
    </article>
  );
}
