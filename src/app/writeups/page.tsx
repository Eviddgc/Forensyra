import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { EntryCard } from "@/components/entry-card";
import { EmptyState } from "@/components/empty-state";
import { CtaBand } from "@/components/cta-band";
import { getEntries } from "@/lib/content";
import { getSite } from "@/lib/site";

export const metadata: Metadata = {
  title: "Write-ups",
  description:
    "Investigation logs, tutorials, and research from FORENSYRA members.",
};

export default async function WriteupsPage() {
  const writeups = await getEntries("writeups");
  const site = getSite();

  return (
    <>
      <PageHeader
        eyebrow="Lab notes"
        title="Write-ups"
        description="Investigation logs, tutorials, and research — documented as we learn and as cases progress."
      />

      <Container className="py-14">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {writeups.length > 0 ? (
            writeups.map((entry) => (
              <EntryCard
                key={entry.slug}
                entry={entry}
                basePath="/writeups"
                kind="Write-up"
              />
            ))
          ) : (
            <EmptyState
              title="No write-ups yet"
              description="Members will publish notes and tutorials here as the first case begins."
              className="md:col-span-2 lg:col-span-3"
            />
          )}
        </div>
      </Container>

      <CtaBand
        title="Publish your first write-up"
        description="Join the collective, work a case, and share what you learn."
        applyUrl={site.applyUrl}
      />
    </>
  );
}
