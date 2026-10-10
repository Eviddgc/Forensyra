import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Container } from "@/components/container";
import { Badge } from "@/components/badge";
import { Markdown } from "@/components/markdown";
import { getEntry, getSlugs } from "@/lib/content";
import { formatDate } from "@/lib/utils";

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
  return { title: entry.title, description: entry.description };
}

export default async function WriteupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntry("writeups", slug);
  if (!entry) notFound();

  return (
    <article>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-[0.2]" />
        <div className="absolute inset-0 bg-radial-glow" />
        <Container className="relative py-14">
          <Link
            href="/writeups"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            All write-ups
          </Link>
          <h1 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {entry.title}
          </h1>
          {entry.description ? (
            <p className="mt-4 max-w-2xl text-lg text-muted">
              {entry.description}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
            {entry.author ? (
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4" />
                {entry.author}
              </span>
            ) : null}
            {entry.date ? (
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(entry.date)}
              </span>
            ) : null}
          </div>
          {entry.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      <Container className="py-14">
        <div className="max-w-3xl">
          <Markdown html={entry.content} />
        </div>
      </Container>
    </article>
  );
}
