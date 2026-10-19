import type { Metadata } from "next";
import { getLearnGroups, groupToNode } from "@/lib/learn";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { ResourcesHero } from "@/components/resources-hero";
import { Reveal } from "@/components/reveal";
import { pageAlternates } from "@/lib/seo";
import { getSite } from "@/lib/site";
import { LearnExplorer } from "@/components/learn-explorer";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Starter tools, public sample evidence, and references for digital forensics.",
  alternates: pageAlternates("/resources"),
};

export default function ResourcesPage() {
  const site = getSite();
  const nodes = getLearnGroups().map((group, index) =>
    groupToNode(group, { defaultOpen: index === 0 }),
  );

  return (
    <>
      <ResourcesHero description="Starter tools, public sample evidence, and references for digital forensics — curated for our members." />

      <Container className="py-14 sm:py-20">
        <LearnExplorer nodes={nodes} />
      </Container>
{/* CTA banner */}
      <Container className="pb-20 sm:pb-28">
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl border border-[#6aa0dc]/30">
            <div className="absolute inset-0 bg-[#0a1a2c]" />
            <svg
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[70%] w-full"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                d="M0 220 C 240 140 420 260 720 180 C 1020 100 1200 240 1440 160 L 1440 320 L 0 320 Z"
                fill="url(#res-cta-a)"
              />
              <path
                d="M0 260 C 260 190 480 290 760 230 C 1040 170 1220 270 1440 210 L 1440 320 L 0 320 Z"
                fill="url(#res-cta-b)"
              />
              <path
                d="M0 220 C 240 140 420 260 720 180 C 1020 100 1200 240 1440 160"
                stroke="rgba(230,182,79,0.3)"
                strokeWidth="1"
              />
              <defs>
                <linearGradient id="res-cta-a" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1b365d" />
                  <stop offset="100%" stopColor="#0a1a2c" />
                </linearGradient>
                <linearGradient id="res-cta-b" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16304f" />
                  <stop offset="100%" stopColor="#071827" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute left-1/2 top-[30%] h-40 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />
            <div className="fx-scanlines absolute inset-0 opacity-[0.12]" />

            <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:p-16">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  Join the Collective
                </p>
                <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Learn with us
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
                  Join a team that values evidence integrity, ethical practice, and
                  collaborative learning.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={site.applyUrl}
                    className="fx-shine inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-ink transition hover:bg-accent-2 hover:shadow-[0_18px_40px_-14px] hover:shadow-accent/70"
                  >
                    Apply now
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#6aa0dc]/40 bg-background/40 px-6 py-3 text-[15px] font-medium text-foreground backdrop-blur-sm transition hover:border-accent hover:text-accent-2"
                  >
                    Talk to us
                  </a>
                </div>
              </div>

              <div className="hidden lg:block">
                <p className="fx-accent-type text-right text-3xl font-medium italic leading-snug xl:text-4xl">
                  Learn
                  <br />
                  Practise
                  <br />
                  Publish
                </p>
              </div>
            </div>
          </section>
        </Reveal>
      </Container>
    </>
  );
}








