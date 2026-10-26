import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";
import { Container } from "@/components/container";
import { RolesHero } from "@/components/roles-hero";
import { Reveal } from "@/components/reveal";
import { RoleCard } from "@/components/role-card";
import { btnPrimary } from "@/lib/ui";
import { getEntries } from "@/lib/content";
import { pageAlternates } from "@/lib/seo";
import { getSite } from "@/lib/site";

export const metadata: Metadata = {
  title: "Roles",
  description:
    "Fifteen specialist roles across digital forensics — find the one that fits you.",
  alternates: pageAlternates("/roles"),
};

export default async function RolesPage() {
  const [roles, team] = await Promise.all([
    getEntries("roles"),
    getEntries("team"),
  ]);
  const site = getSite();

  const holdersFor = (roleSlug: string) =>
    team.filter((member) => member.roleId === roleSlug);

  return (
    <>
      <RolesHero description="All fifteen specialisations, in one place — two more revealing soon. Every member owns a defined role — pick the one that fits you." />

      <Container variant="wide" className="py-14 sm:py-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
            All 15 Roles
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            The full roster
          </h2>
          <p className="mt-2 max-w-xl text-[15px] text-muted">
            Numbered 01 to 15. Roles are filled in phases — phase 1 builds the
            core team, phase 2 grows the collective. Two new roles are coming
            soon. Expand any role to see what the work involves, the key
            responsibilities, and the skills and tools we look for.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-accent/30 bg-accent/[0.07] p-5 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent-2">
                <Compass className="h-4 w-4" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-foreground">
                  Not sure which role is yours?
                </p>
                <p className="mt-0.5 text-sm text-muted">
                  Six questions. We map your answers against all thirteen
                  specialisations.
                </p>
              </div>
            </div>
            <Link href="/roles/matcher" className={btnPrimary}>
              Find your role
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {roles.map((role, index) => (
            <div
              key={role.slug}
              id={`role-${role.slug}`}
              className="scroll-mt-24"
            >
              <Reveal delay={index * 40}>
                <RoleCard role={role} index={index} holders={holdersFor(role.slug)} />
              </Reveal>
            </div>
          ))}
        </div>
      </Container>

      <Container variant="wide" className="pb-20 sm:pb-28">
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
                fill="url(#roles-cta-a)"
              />
              <path
                d="M0 260 C 260 190 480 290 760 230 C 1040 170 1220 270 1440 210 L 1440 320 L 0 320 Z"
                fill="url(#roles-cta-b)"
              />
              <path
                d="M0 220 C 240 140 420 260 720 180 C 1020 100 1200 240 1440 160"
                stroke="rgba(230,182,79,0.3)"
                strokeWidth="1"
              />
              <defs>
                <linearGradient id="roles-cta-a" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1b365d" />
                  <stop offset="100%" stopColor="#0a1a2c" />
                </linearGradient>
                <linearGradient id="roles-cta-b" x1="0" y1="0" x2="0" y2="1">
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
                  Claim a Role
                </p>
                <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Claim a role
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
                  Applications are open for the founding team. Choose the
                  specialisation that fits you best.
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
                  Specialise
                  <br />
                  Contribute
                  <br />
                  Grow
                </p>
              </div>
            </div>
          </section>
        </Reveal>
      </Container>
    </>
  );
}
