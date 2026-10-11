import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  FileText,
  Fingerprint,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { EntryCard } from "@/components/entry-card";
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
import { getSite } from "@/lib/site";
import { getEntries } from "@/lib/content";
import { btnPrimary, btnSecondary, cardClass } from "@/lib/ui";
import { cn, phaseLabel } from "@/lib/utils";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Learn in the open",
    body: "Everything we produce lives in a public GitHub organisation — notes, evidence handling, reports and tooling.",
  },
  {
    icon: FileText,
    title: "Practise on real workflows",
    body: "We run legal, authorised mock cases using public sample evidence so members build genuine investigation skills.",
  },
  {
    icon: Fingerprint,
    title: "Own a specialisation",
    body: "Thirteen defined roles, from memory and network to AI and cloud forensics, so you go deep instead of wide.",
  },
  {
    icon: Boxes,
    title: "Finish one strong case",
    body: "We favour one complete, published investigation over many half-finished projects.",
  },
];

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

const HUB = [
  { href: "/projects", label: "Case Files", note: "Investigation projects" },
  { href: "/writeups", label: "Write-ups", note: "Logs, tutorials, research" },
  { href: "/team", label: "Team", note: "Members and roles" },
  { href: "/roadmap", label: "Roadmap", note: "Present and upcoming plans" },
  { href: "/roles", label: "Roles", note: "The 13 specialisations" },
  { href: "/ethics", label: "Ethics", note: "How we work, legally" },
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
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <HeroScene className="absolute inset-0 h-full w-full opacity-90" />
        <div className="absolute inset-0 bg-grid opacity-[0.22]" />
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="fx-scanlines pointer-events-none absolute inset-0 opacity-[0.22]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_130%_at_50%_-15%,transparent_45%,var(--color-background)_96%)]" />

        <Container className="relative grid gap-14 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-28">
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

            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.04] text-gradient-anim sm:text-7xl">
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

      {/* ── Values ───────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we are"
              title="A student-led digital forensics collective"
              description="We bring together people who want to understand how digital evidence really works — then prove it, together."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, index) => (
              <Reveal key={value.title} delay={index * 90}>
                <TiltCard
                  intensity={7}
                  className={cn(cardClass, "h-full bg-surface/80 p-5")}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <value.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{value.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Specialities marquee ─────────────────────────────────────── */}
      <section className="border-y border-border bg-surface/30 py-10">
        <Container className="mb-6">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            Disciplines we cover
          </p>
        </Container>
        <Marquee items={MARQUEE_ITEMS} />
      </section>

      {/* ── Hub ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="One place for everything"
              title="The Forensyra hub"
              description="Our projects, write-ups, plans, and members all live here — updated as the collective grows."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HUB.map((item, index) => (
              <Reveal key={item.href} delay={index * 70}>
                <TiltCard intensity={6}>
                  <Link
                    href={item.href}
                    className={cn(
                      cardClass,
                      "group flex h-full items-center justify-between bg-surface/80 p-5",
                    )}
                  >
                    <span>
                      <span className="block text-base font-semibold text-foreground transition group-hover:text-accent">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-xs text-muted">
                        {item.note}
                      </span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Featured case files ──────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Case files"
              title="Projects in the field"
              description="Our flagship work: one complete, publicly documented investigation built by the whole team."
              action={
                <Link href="/projects" className={btnSecondary}>
                  All projects
                </Link>
              }
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((entry, index) => (
                <Reveal key={entry.slug} delay={index * 90} className="h-full">
                  <EntryCard
                    entry={entry}
                    basePath="/projects"
                    kind={entry.caseType ?? "Case file"}
                  />
                </Reveal>
              ))
            ) : (
              <EmptyState
                title="The first case file is being assembled"
                description="Recruitment is opening the founding team. The mock case will be published here."
                className="md:col-span-2 lg:col-span-3"
              />
            )}
          </div>
        </Container>
      </section>

      {/* ── Roles + roadmap ──────────────────────────────────────────── */}
      <section className="border-y border-border bg-surface/30 py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Thirteen roles"
              title="Find your specialisation"
              description="Every member owns a defined role, filled in phases so the team is never overloaded."
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {roles.slice(0, 13).map((role) => (
                <span
                  key={role.slug}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted transition hover:border-accent/40 hover:text-foreground"
                >
                  {role.title}
                  <span className="font-mono text-[10px] text-accent">
                    {role.phase ? phaseLabel(role.phase) : ""}
                  </span>
                </span>
              ))}
            </div>
            <Link href="/roles" className={cn(btnPrimary, "fx-shine mt-6")}>
              View all roles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={140}>
            <div className="fx-holo rounded-2xl border border-border bg-background p-6">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                Roadmap snapshot
              </p>
              <ul className="mt-5 space-y-4">
                {latestRoadmap.length > 0 ? (
                  latestRoadmap.map((item) => (
                    <li key={item.slug} className="flex gap-3">
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
              <Link
                href="/roadmap"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                See the full roadmap
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Latest write-ups ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Lab notes"
              title="Latest write-ups"
              description="Investigation logs, tutorials, and research from across the collective."
              action={
                <Link href="/writeups" className={btnSecondary}>
                  All write-ups
                </Link>
              }
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latestWriteups.length > 0 ? (
              latestWriteups.map((entry, index) => (
                <Reveal key={entry.slug} delay={index * 90} className="h-full">
                  <EntryCard
                    entry={entry}
                    basePath="/writeups"
                    kind="Write-up"
                  />
                </Reveal>
              ))
            ) : (
              <EmptyState
                title="Write-ups are on the way"
                description="As the team begins its first case, notes and tutorials will be published here."
                className="md:col-span-2 lg:col-span-3"
              />
            )}
          </div>
        </Container>
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
