import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { EvidenceProcess } from "@/components/home/evidence-process";
import { Benefits } from "@/components/home/benefits";

import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { pageAlternates } from "@/lib/seo";
import { getSite } from "@/lib/site";
import { getEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "FORENSYRA | Digital Forensics & Incident Response" },
  description:
    "FORENSYRA is a student-led DFIR collective. Learn digital forensics, practise evidence handling on legal mock cases, and publish real investigations together.",
  alternates: pageAlternates("/"),
};

export default async function HomePage() {
  const site = getSite();
  const projects = await getEntries("projects");

  const featured = projects.slice(0, 4).map((entry) => ({
    slug: entry.slug,
    href: `/projects/${entry.slug}`,
    title: entry.title,
    description: entry.description,
    status: entry.status,
    caseType: entry.caseType,
  }));

  return (
    <>
      {/* Sections 1–2 (announcement + navigation) and 9 (footer) are part of
          the root layout so every page shares them. */}
      <Hero name={site.name} applyUrl={site.applyUrl} />
      

      <Container variant="wide" className="space-y-16 py-14 sm:py-20">
        <Reveal>
          <FeaturedProjects projects={featured} />
        </Reveal>
        <Reveal delay={60}>
          <EvidenceProcess />
        </Reveal>
        <Reveal delay={120}>
          <Benefits />
        </Reveal>
      </Container>
    </>
  );
}
