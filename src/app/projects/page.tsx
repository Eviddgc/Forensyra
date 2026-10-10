import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { EntryCard } from "@/components/entry-card";
import { EmptyState } from "@/components/empty-state";
import { CtaBand } from "@/components/cta-band";
import { getEntries } from "@/lib/content";
import { getSite } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case files from FORENSYRA — complete mock investigations built from public sample evidence.",
};

export default async function ProjectsPage() {
  const projects = await getEntries("projects");
  const site = getSite();

  return (
    <>
      <PageHeader
        eyebrow="Case files"
        title="Projects in the field"
        description="Our flagship work: complete, publicly documented investigations built by the whole team from legal sample evidence."
      />

      <Container className="py-14">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.length > 0 ? (
            projects.map((entry) => (
              <EntryCard
                key={entry.slug}
                entry={entry}
                basePath="/projects"
                kind={entry.caseType ?? "Case file"}
              />
            ))
          ) : (
            <EmptyState
              title="No case files published yet"
              description="Our first investigation is being assembled. Check the roadmap to see what is coming."
              className="md:col-span-2 lg:col-span-3"
            />
          )}
        </div>

        <p className="mt-10 text-sm text-muted">
          Want to contribute to a case?{" "}
          <Link href="/roles" className="text-accent hover:underline">
            See the open roles
          </Link>{" "}
          or{" "}
          <Link href="/join" className="text-accent hover:underline">
            apply to join
          </Link>
          .
        </p>
      </Container>

      <CtaBand
        title="Work a real investigation"
        description="Join the team that will build Case File 001 from start to published report."
        applyUrl={site.applyUrl}
      />
    </>
  );
}
