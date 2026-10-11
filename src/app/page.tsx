import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { CtaBand } from "@/components/cta-band";
import { Logo } from "@/components/logo";
import { HeroScene } from "@/components/hero-scene";
import { Crown } from "@/components/crown";
import { Ornament } from "@/components/ornament";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import { Counter } from "@/components/counter";
import { ScrambleText } from "@/components/scramble-text";
import { Marquee } from "@/components/marquee";
import { Badge } from "@/components/badge";
import { getSite } from "@/lib/site";
import { getEntries } from "@/lib/content";
import { btnPrimary, btnSecondary, chipClass } from "@/lib/ui";
import { cn, phaseLabel } from "@/lib/utils";

const MARQUEE_ITEMS = [
  "Endpoint Forensics",
  "Network Forensics",
  "Memory & Malware",
  "Cloud Forensics",
  "Mobile Forensics",
  "AI Forensics",
  "Legal & Evidence",
  "Chain of Custody",
  "Timeline Reconstruction",
  "Threat Intel & OSINT",
  "Multimedia Forensics",
  "Incident Response",
  "Reporting & Peer Review",
];

const ORBIT_CHIPS = [
  { label: "Endpoint", className: "left-1/2 top-0 -translate-x-1/2 animate-float" },
  {
    label: "Memory",
    className: "right-0 top-1/2 -translate-y-1/2 animate-float-slow",
  },
  {
    label: "Network",
    className: "bottom-0 left-1/2 -translate-x-1/2 animate-float-slow",
  },
  { label: "Cloud", className: "left-0 top-1/2 -translate-y-1/2 animate-float" },
];

const EYEBROW = "font-mono text-xs uppercase tracking-[0.25em] text-accent";

export default async function HomePage() {
  const site = getSite();
  const [projects, writeups, roles, roadmap] = await Promise.all([
    getEntries("projects"),
    getEntries("writeups"),
    getEntries("roles"),
    getEntries("roadmap"),
  ]);

  const featuredProjects = projects.slice(0, 2);
  const latestWriteups = writeups.slice(0, 3);
  const latestRoadmap = roadmap.slice(0, 3);
  const leadWriteup = latestWriteups[0];

  const stats: Array<{
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
  }> = [
    { value: roles.length || 13, label: "Specialist roles" },
    { value: 2, label: "Rollout phases" },
    { value: projects.length || 1, label: "Flagship case" },
    { value: 2, prefix: "~", suffix: "h", label: "Per week" },
  ];

  return (
    <>
      {/* ── Immersive hero ───────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-border">
        <HeroScene className="absolute inset-0 h-full w-full opacity-90" />
        <div className="absolute inset-0 bg-grid opacity-[0.22]" />
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="fx-scanlines pointer-events-none absolute inset-0 opacity-[0.22]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_130%_at_50%_-15%,transparent_45%,var(--color-background)_96%)]" />

        <Container className="relative grid w-full gap-14 py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-28">
          <div className="animate-rise">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                Recruiting · Phase 1
              </span>
            </div>

            <h1 className="mt-6 font-display text-6xl font-bold leading-[1.02] text-gradient-anim sm:text-8xl">
              <ScrambleText text={site.name} />
            </h1>

            <p className="font-display mt-6 max-w-xl text-2xl font-medium italic text-foreground sm:text-3xl">
              {site.tagline}
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-accent sm:text-sm">
              {site.motto}
            </p>
            <p className="mt-6 max-w-xl text-muted">{site.description}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={site.applyUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(btnPrimary, "fx-shine px-5 py-2.5 text-[15px]")}
              >
                Apply to join
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/projects"
                className={cn(btnSecondary, "px-5 py-2.5 text-[15px]")}
              >
                Explore the case board
              </Link>
            </div>

            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-mono text-3xl font-semibold text-foreground">
                    <Counter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </dt>
                  <dd className="mt-1.5 text-xs text-muted">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 3D emblem */}
          <Reveal delay={160} className="relative mx-auto w-full max-w-md">
            <TiltCard
              spotlight={false}
              intensity={12}
              className="fx-holo fx-frame relative rounded-[28px] border border-accent/60 bg-surface/50 p-8 shadow-[0_50px_140px_-50px] shadow-accent/40 backdrop-blur-xl"
            >
              <div className="relative mx-auto flex h-64 w-64 items-center justify-center">
                <span className="absolute h-64 w-64 animate-spin-slower rounded-full border border-dashed border-accent/20" />
                <span className="absolute h-52 w-52 animate-spin-reverse rounded-full border border-accent-2/15" />
                <span className="absolute h-64 w-64 animate-pulse-ring rounded-full border border-accent/25" />

                <div className="absolute -inset-4 rounded-full bg-accent/10 blur-3xl" />

                <Crown className="absolute left-1/2 top-2 h-10 w-12 -translate-x-1/2 animate-float drop-shadow-[0_0_12px] drop-shadow-accent/60" />

                <Logo
                  size={132}
                  priority
                  className="relative animate-core ring-2 ring-accent/40 shadow-[0_0_80px_-14px] shadow-accent/80"
                />

                {ORBIT_CHIPS.map((chip) => (
                  <span
                    key={chip.label}
                    className={cn(
                      "absolute z-10 rounded-full border border-border bg-background/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent backdrop-blur",
                      chip.className,
                    )}
                  >
                    {chip.label}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
                Preserve · Analyse · Prove
              </p>
            </TiltCard>
          </Reveal>
        </Container>

        <div className="pointer-events-none absolute inset-x-0 bottom-4 hidden justify-center sm:flex">
          <span className="flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted/70">
            Scroll to explore
            <span className="h-6 w-px animate-pulse bg-accent/50" />
          </span>
        </div>
      </section>

      <div className="mx-auto max-w-xs">
        <Ornament />
      </div>

      {/* ── Modern bento grid ────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-4 lg:grid-cols-6">
            {/* Case files — large */}
            <Reveal className="lg:col-span-4 lg:row-span-2">
              <TiltCard
                intensity={5}
                className="fx-frame flex h-full flex-col bg-surface/70 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className={EYEBROW}>Case files</p>
                    <h3 className="font-display mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                      Projects in the field
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-muted">
                      Our flagship work: one complete, publicly documented
                      investigation built by the whole team.
                    </p>
                  </div>
                  <Link
                    href="/projects"
                    className={cn(btnSecondary, "px-3 py-1.5 text-xs")}
                  >
                    All projects
                  </Link>
                </div>

                {featuredProjects.length > 0 ? (
                  <div className="mt-5 grid flex-1 content-start gap-3 sm:grid-cols-2">
                    {featuredProjects.map((entry) => (
                      <Link
                        key={entry.slug}
                        href={`/projects/${entry.slug}`}
                        className="group flex flex-col rounded-xl border border-border bg-background/60 p-4 transition hover:border-accent/50 hover:bg-surface-2"
                      >
                        <span className="flex items-center justify-between gap-2">
                          <Badge variant="accent">
                            {entry.caseType ?? "Case file"}
                          </Badge>
                          {entry.pinned ? (
                            <Badge variant="warning">Pinned</Badge>
                          ) : null}
                        </span>
                        <span className="mt-3 text-base font-semibold text-foreground transition group-hover:text-accent-2">
                          {entry.title}
                        </span>
                        {entry.description ? (
                          <span className="mt-1.5 line-clamp-3 text-sm text-muted">
                            {entry.description}
                          </span>
                        ) : null}
                        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium text-accent opacity-0 transition group-hover:opacity-100">
                          Open
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="The first case file is being assembled"
                    description="Recruitment is opening the founding team. The mock case will be published here."
                    className="mt-5"
                  />
                )}
              </TiltCard>
            </Reveal>

            {/* Latest write-up */}
            <Reveal delay={90} className="lg:col-span-2">
              <TiltCard
                intensity={6}
                className="fx-frame flex h-full flex-col bg-surface/70 p-6"
              >
                <p className={EYEBROW}>Latest write-up</p>
                {leadWriteup ? (
                  <>
                    <h3 className="font-display mt-2 text-xl font-semibold text-foreground">
                      {leadWriteup.title}
                    </h3>
                    {leadWriteup.description ? (
                      <p className="mt-2 line-clamp-4 text-sm text-muted">
                        {leadWriteup.description}
                      </p>
                    ) : null}
                    <Link
                      href={`/writeups/${leadWriteup.slug}`}
                      className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-accent"
                    >
                      Read
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-muted">
                    Write-ups are on the way.
                  </p>
                )}
              </TiltCard>
            </Reveal>

            {/* Roadmap */}
            <Reveal delay={120} className="lg:col-span-2">
              <TiltCard
                intensity={6}
                className="flex h-full flex-col bg-surface/70 p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={EYEBROW}>Roadmap</p>
                    <h3 className="font-display mt-2 text-xl font-semibold text-foreground">
                      What&apos;s next
                    </h3>
                  </div>
                  <Link
                    href="/roadmap"
                    className="inline-flex items-center gap-1 text-xs font-medium text-accent"
                  >
                    Full
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <ul className="mt-4 space-y-3.5">
                  {latestRoadmap.length > 0 ? (
                    latestRoadmap.map((item) => (
                      <li key={item.slug} className="flex gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>
                          <span className="block text-sm font-medium text-foreground">
                            {item.title}
                          </span>
                          <span className="text-xs text-muted">
                            {item.status ?? "Planned"}
                          </span>
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-muted">
                      Roadmap milestones will appear here.
                    </li>
                  )}
                </ul>
              </TiltCard>
            </Reveal>

            {/* Roles — wide */}
            <Reveal className="lg:col-span-4">
              <TiltCard
                intensity={5}
                className="fx-frame flex h-full flex-col bg-surface/70 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className={EYEBROW}>Thirteen roles</p>
                    <h3 className="font-display mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                      Find your specialisation
                    </h3>
                  </div>
                  <Link
                    href="/roles"
                    className={cn(btnSecondary, "px-3 py-1.5 text-xs")}
                  >
                    All roles
                  </Link>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {roles.slice(0, 13).map((role) => (
                    <span
                      key={role.slug}
                      className={cn(chipClass, "px-3 py-1.5 text-xs")}
                    >
                      {role.title}
                      <span className="ml-1.5 font-mono text-[10px] text-accent">
                        {role.phase ? phaseLabel(role.phase) : ""}
                      </span>
                    </span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>

            {/* About */}
            <Reveal delay={90} className="lg:col-span-2">
              <TiltCard
                intensity={6}
                className="flex h-full flex-col bg-surface/70 p-6"
              >
                <p className={EYEBROW}>About</p>
                <h3 className="font-display mt-2 text-xl font-semibold text-foreground">
                  A student-led collective
                </h3>
                <p className="mt-2 text-sm text-muted">
                  We bring together people who want to understand how digital
                  evidence really works — then prove it, together.
                </p>
                <Link
                  href="/about"
                  className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-accent"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </TiltCard>
            </Reveal>

            {/* Ethics */}
            <Reveal delay={60} className="lg:col-span-2">
              <TiltCard
                intensity={6}
                className="flex h-full flex-col bg-surface/70 p-6"
              >
                <p className={EYEBROW}>Ethics</p>
                <h3 className="font-display mt-2 text-xl font-semibold text-foreground">
                  How we work
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Legal practice cases only, public sample evidence, and no
                  real victim data.
                </p>
                <Link
                  href="/ethics"
                  className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-accent"
                >
                  Our principles
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </TiltCard>
            </Reveal>

            {/* Team */}
            <Reveal delay={30} className="lg:col-span-2">
              <TiltCard
                intensity={6}
                className="flex h-full flex-col bg-surface/70 p-6"
              >
                <p className={EYEBROW}>Team</p>
                <h3 className="font-display mt-2 text-xl font-semibold text-foreground">
                  The founders
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Founded by Gopi Chand — Lead Forensic Investigator.
                </p>
                <Link
                  href="/team"
                  className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-accent"
                >
                  Meet the team
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </TiltCard>
            </Reveal>

            {/* Join CTA */}
            <Reveal delay={60} className="lg:col-span-2">
              <Link
                href={site.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="h-full"
              >
                <TiltCard
                  intensity={6}
                  className="fx-holo flex h-full flex-col items-center justify-center bg-accent/10 p-6 text-center"
                >
                  <Crown className="h-9 w-11 drop-shadow-[0_0_10px] drop-shadow-accent/60" />
                  <h3 className="font-display mt-3 text-xl font-semibold text-foreground">
                    Join the collective
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    Applications are open.
                  </p>
                  <span
                    className={cn(
                      btnPrimary,
                      "fx-shine mt-4 px-4 py-1.5 text-xs",
                    )}
                  >
                    Apply now
                  </span>
                </TiltCard>
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Disciplines marquee ─────────────────────────────── */}
      <section className="border-y border-border bg-surface/30 py-10">
        <Container className="mb-6">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            Disciplines we cover
          </p>
        </Container>
        <Marquee items={MARQUEE_ITEMS} />
      </section>

      <div className="mx-auto max-w-xs">
        <Ornament />
      </div>

      <CtaBand
        title="Help build the definitive student DFIR team"
        description="Applications are open. Bring your curiosity, pick a role, and work a real investigation with us."
        applyUrl={site.applyUrl}
      />
    </>
  );
}
