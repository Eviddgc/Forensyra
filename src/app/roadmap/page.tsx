import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { RoadmapItem } from "@/components/roadmap-item";
import { CtaBand } from "@/components/cta-band";
import { getEntries } from "@/lib/content";
import { getSite } from "@/lib/site";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "Present and upcoming plans for FORENSYRA — the phases, the first case, and what comes next.",
};

export default async function RoadmapPage() {
  const items = await getEntries("roadmap");
  const site = getSite();

  return (
    <>
      <PageHeader
        eyebrow="Plans"
        title="Roadmap"
        description="Where we are now and where we are going — the phases, milestones, and what we plan to publish next."
      />

      <Container className="py-14">
        {items.length > 0 ? (
          <ol className="relative space-y-6 before:absolute before:bottom-3 before:left-[6px] before:top-3 before:w-px before:bg-border">
            {items.map((item, index) => (
              <RoadmapItem key={item.slug} item={item} index={index} />
            ))}
          </ol>
        ) : (
          <p className="text-muted">The roadmap is being drafted.</p>
        )}
      </Container>

      <CtaBand
        title="Be part of the plan"
        description="The founding team builds everything on this roadmap. Applications are open."
        applyUrl={site.applyUrl}
      />
    </>
  );
}
