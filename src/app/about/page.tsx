import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutHero } from "@/components/about/about-hero";
import { Collective } from "@/components/about/collective";
import { Purpose } from "@/components/about/purpose";
import { Approach } from "@/components/about/approach";
import { Leadership } from "@/components/about/leadership";
import { JoinCta } from "@/components/home/join-cta";
import { getEntry } from "@/lib/content";
import { pageAlternates } from "@/lib/seo";
import { getSite } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "FORENSYRA is a student-led digital forensics collective: learn together, practise on legal mock cases, and build one strong public investigation.",
  alternates: pageAlternates("/about"),
};

/** Used only if the leadership entry is missing from the CMS. */
const FOUNDER_FALLBACK = {
  name: "Gopi Chand",
  role: "Lead Forensic Investigator",
  description:
    "Founder and lead of Forensyra. Sets each case's direction, validates findings, and approves the published reports.",
};

export default async function AboutPage() {
  const page = await getEntry("pages", "about");
  if (!page) notFound();

  const site = getSite();
  const founderEntry = await getEntry("team", "gopi-chand");

  const founder = {
    name: founderEntry?.title ?? FOUNDER_FALLBACK.name,
    role: founderEntry?.role ?? FOUNDER_FALLBACK.role,
    description: founderEntry?.description ?? FOUNDER_FALLBACK.description,
  };

  return (
    <>
      {/* Sections 1–2 (announcement + navigation) and 9 (footer) are part of
          the root layout so every page shares them. */}
      <AboutHero name={site.name} subtitle={page.description ?? site.tagline} />
      <Collective
        name={site.name}
        descriptor={site.descriptor}
        motto={site.motto}
      />
      <Purpose />
      <Approach />
      <Leadership
        founder={founder}
        name={site.name}
        descriptor={site.descriptor}
        tagline={site.tagline}
        motto={site.motto}
      />
      <JoinCta
        applyUrl={site.applyUrl}
        eyebrow="Join the Collective"
        title="Build your DFIR portfolio with us"
        description="Pick a role, practise on legal mock cases, and publish real work as part of a team."
        applyLabel="Apply now"
      />
    </>
  );
}
