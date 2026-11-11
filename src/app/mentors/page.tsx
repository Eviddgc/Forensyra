import type { Metadata } from "next";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { HeroSection } from "@/components/heroes/hero-backdrop";
import { Badge } from "@/components/badge";
import { pageMetadata } from "@/lib/seo";
import { getEntries } from "@/lib/content";
import { MentorRoles } from "@/components/mentor-roles";

export const metadata: Metadata = pageMetadata(
  "/mentors",
  "Mentors",
  "Experienced DFIR practitioners we hope to learn from - the FORENSYRA mentor panel is forming.",
);

export default async function MentorsPage() {
  const roles = await getEntries("roles");
  const sortedRoles = [...roles]
    .filter((r) => !r.comingSoon)
    .sort((a, b) => a.order - b.order)
    .map((r) => ({ slug: r.slug, title: r.title, description: r.description }));
  return (
    <>
      {/* Hero - same round-table art and rhythm as the Team page */}
      <HeroSection variant="team">
        <Container variant="wide" className="relative z-10 flex min-h-[190px] items-center pb-4 pt-10 sm:min-h-[210px] sm:pt-12">
          <Reveal>
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-accent" />
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
                Guidance
              </p>
            </div>
            <h1 className="font-display mt-4 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Mentors &amp; <span className="text-accent-2">Advisors</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Experienced DFIR professionals we hope to learn from as we
              practise on realistic mock cases.
            </p>
          </Reveal>
        </Container>
      </HeroSection>

      <Container variant="wide" className="space-y-8 py-8 sm:py-10">
        {/* How mentoring works + roles, compact */}
        <section id="mentor-roles-top" aria-labelledby="mentoring-heading" className="scroll-mt-24">
          <Reveal>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p id="mentoring-heading" className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
                  How mentoring works
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  Each mentor guides the students of one role. FORENSYRA adds the cases and the team
                  members work on them. You review drafts, share tips and help when a student is stuck.
                  Choose a role to see exactly what that looks like.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent-2">
                  1 to 2 hours a month
                </span>
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent-2">
                  Telugu or English
                </span>
                <Badge variant="accent">Panel forming</Badge>
              </div>
            </div>
          </Reveal>
          <div className="mt-5">
            <MentorRoles roles={sortedRoles} />
          </div>
        </section>
      </Container>

      {/* CTA banner - same style as the Team page banner */}
      <Container variant="wide" className="pb-10 sm:pb-14">
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl border border-[#d4af5f]/30">
            <div className="absolute inset-0 bg-[#0c1119]" />
            <svg
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[70%] w-full"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                d="M0 220 C 240 140 420 260 720 180 C 1020 100 1200 240 1440 160 L 1440 320 L 0 320 Z"
                fill="url(#mentors-cta-a)"
              />
              <path
                d="M0 260 C 260 190 480 290 760 230 C 1040 170 1220 270 1440 210 L 1440 320 L 0 320 Z"
                fill="url(#mentors-cta-b)"
              />
              <path
                d="M0 220 C 240 140 420 260 720 180 C 1020 100 1200 240 1440 160"
                stroke="rgba(214,176,104,0.3)"
                strokeWidth="1"
              />
              <defs>
                <linearGradient id="mentors-cta-a" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22262f" />
                  <stop offset="100%" stopColor="#0c1119" />
                </linearGradient>
                <linearGradient id="mentors-cta-b" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1d1e23" />
                  <stop offset="100%" stopColor="#080D15" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute left-1/2 top-[30%] h-40 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />
            <div className="fx-scanlines absolute inset-0 opacity-[0.12]" />

            <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:p-10">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  Guide the Collective
                </p>
                <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Shape how the next team learns
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
                  A little of your experience goes a long way for a team that is
                  eager to learn this field properly.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="/apply/mentor"
                    className="fx-shine inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-ink transition hover:bg-accent-2 hover:shadow-[0_18px_40px_-14px] hover:shadow-accent/70"
                  >
                    Become a mentor
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d4af5f]/40 bg-background/40 px-6 py-3 text-[15px] font-medium text-foreground backdrop-blur-sm transition hover:border-accent hover:text-accent-2"
                  >
                    Talk to us
                  </a>
                </div>
              </div>

              <div className="hidden lg:block">
                <p className="fx-accent-type text-right text-3xl font-medium italic leading-snug xl:text-4xl">
                  Realistic Cases
                  <br />
                  Real Skills
                  <br />
                  Real Impact
                </p>
              </div>
            </div>
          </section>
        </Reveal>
      </Container>
    </>
  );
}
