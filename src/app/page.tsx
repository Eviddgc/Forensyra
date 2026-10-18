import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { EvidenceProcess } from "@/components/home/evidence-process";
import { Benefits } from "@/components/home/benefits";
import { WaveDivider } from "@/components/wave-divider";
import { getSite } from "@/lib/site";
import { getEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "FORENSYRA | Digital Forensics & Incident Response" },
  description:
    "FORENSYRA is a student-led digital forensics and incident response collective. Learn DFIR, practise evidence handling on legal mock cases, and build one strong public investigation together.",
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
      <WaveDivider from="var(--color-background)" to="var(--color-light)" />
      <FeaturedProjects projects={featured} />
      <EvidenceProcess />
      <Benefits />
    </>
  );
}
