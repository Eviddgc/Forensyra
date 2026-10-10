import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Markdown } from "@/components/markdown";
import { CtaBand } from "@/components/cta-band";
import { Badge } from "@/components/badge";
import { getEntry } from "@/lib/content";
import { getSite } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "FORENSYRA is a student-led digital forensics collective: learn together, practise on legal mock cases, and build one strong public investigation.",
};

export default async function AboutPage() {
  const page = await getEntry("pages", "about");
  if (!page) notFound();
  const site = getSite();

  return (
    <>
      <PageHeader
        eyebrow="Who we are"
        title={page.title}
        description={page.description}
      />

      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_0.9fr]">
          <Markdown html={page.content} />

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                At a glance
              </p>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-muted">Name</dt>
                  <dd className="font-medium text-foreground">{site.name}</dd>
                </div>
                <div>
                  <dt className="text-muted">Descriptor</dt>
                  <dd className="font-medium text-foreground">
                    {site.descriptor}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Tagline</dt>
                  <dd className="font-medium text-foreground">
                    {site.tagline}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Motto</dt>
                  <dd className="font-medium text-accent">{site.motto}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                Focus
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Digital forensics", "Incident response", "Evidence handling", "Reporting"].map(
                  (item) => (
                    <Badge key={item} variant="outline">
                      {item}
                    </Badge>
                  ),
                )}
              </div>
            </div>
          </aside>
        </div>
      </Container>

      <CtaBand
        title="Build your DFIR portfolio with us"
        description="Pick a role, practise on legal mock cases, and publish real work as part of a team."
        applyUrl={site.applyUrl}
      />
    </>
  );
}
