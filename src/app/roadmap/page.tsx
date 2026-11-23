import type { Metadata } from "next";
import { RoadmapHero } from "@/components/roadmap-hero";
import { RoadmapTimeline, RoadmapCta } from "@/components/roadmap-timeline";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/roadmap", "Roadmap", "Present and upcoming plans for FORENSYRA — the phases, milestones, and what we plan to publish next.");

export default async function RoadmapPage() {

  return (
    <>
      {/* Sections 1–2 (announcement + navigation) and 9 (footer) are part of
          the root layout so every page shares them. */}
      <RoadmapHero
        title="Roadmap"
        description="Where we are now and where we are going — the phases, milestones, and what we plan to publish next."
      />

      <RoadmapTimeline />

      <RoadmapCta applyUrl="/team" />
    </>
  );
}
