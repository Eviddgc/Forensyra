import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { CtaBand } from "@/components/cta-band";
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
      {/* ── Grand royal hero ─────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden border-b border-border">
        <HeroScene className="absolute inset-0 h-full w-full opacity-50" />
        <div className="absolute inset-0 bg-grid opacity-[0.22]" />
        <div className="absolute inset-0 bg-radial-glow" />

        {/* Golden sunburst */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 animate-spin-slower opacity-[0.35]"
          style={{
            background:
              "repeating-conic-gradient(from 0deg, rgba(201,154,71,0.10) 0deg 4deg, transparent 4deg 16deg)",
          }}
        />

        <div className="fx-scanlines pointer-events-none absolute inset-0 opacity-[0.22]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_40%,var(--color-background)_95%)]" />

        {/* Contrast pool behind the wordmark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[58vmin] w-[82vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(13,27,42,0.78), transparent)",
          }}
        />

        {/* Royal double frame */}
        <div className="pointer-events-none absolute inset-4 rounded-[28px] border border-accent/25 sm:inset-6" />
        <div className="pointer-events-none absolute inset-6 rounded-[24px] border border-accent/15 sm:inset-9" />

        {/* Corner diamonds */}
        <span className="pointer-events-none absolute left-6 top-6 h-2 w-2 rotate-45 bg-accent/60 sm:left-9 sm:top-9" />
        <span className="pointer-events-none absolute right-6 top-6 h-2 w-2 rotate-45 bg-accent/60 sm:right-9 sm:top-9" />
        <span className="pointer-events-none absolute bottom-6 left-6 h-2 w-2 rotate-45 bg-accent/60 sm:bottom-9 sm:left-9" />
        <span className="pointer-events-none absolute bottom-6 right-6 h-2 w-2 rotate-45 bg-accent/60 sm:bottom-9 sm:right-9" />

        <Container className="relative z-10 max-w-5xl px-4 py-24 text-center sm:py-28">
          <Reveal>
            <Crown className="mx-auto h-14 w-16 animate-float drop-shadow-[0_0_20px] drop-shadow-accent/70" />
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.45em] text-accent sm:text-xs">
              {site.descriptor}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <h1 className="mt-4 font-display text-6xl font-bold leading-[1.02] text-gradient-anim sm:text-8xl lg:text-9xl">
              <ScrambleText text={site.name} />
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <Ornament className="mx-auto mt-7 max-w-md" />
          </Reveal>

          <Reveal delay={240}>
            <p className="font-display mt-7 text-2xl font-medium italic text-foreground sm:text-3xl">
              {site.tagline}
            </p>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.35em] text-accent sm:text-sm">
              {site.motto}
            </p>
          </Reveal>

          <Reveal delay={320}>
            <p className="mx-auto mt-6 max-w-2xl text-muted">
              {site.description}
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
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
          </Reveal>

          <Reveal delay={400}>
            <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
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
