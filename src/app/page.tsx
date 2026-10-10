import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  Cloud,
  Cpu,
  FileText,
  Fingerprint,
  Network,
  Scale,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { EntryCard } from "@/components/entry-card";
import { EmptyState } from "@/components/empty-state";
import { CtaBand } from "@/components/cta-band";
import { Badge } from "@/components/badge";
import { Logo } from "@/components/logo";
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

const SPECIALTIES = [
  { icon: Fingerprint, label: "Endpoint" },
  { icon: Network, label: "Network" },
  { icon: Cpu, label: "Memory & Malware" },
  { icon: Cloud, label: "Cloud" },
  { icon: Smartphone, label: "Mobile" },
  { icon: Bot, label: "AI Forensics" },
  { icon: Scale, label: "Legal & Evidence" },
  { icon: ShieldCheck, label: "Chain of Custody" },
];

const HUB = [
  { href: "/projects", label: "Case Files", note: "Investigation projects" },
  { href: "/writeups", label: "Write-ups", note: "Logs, tutorials, research" },
  { href: "/team", label: "Team", note: "Members and roles" },
  { href: "/roadmap", label: "Roadmap", note: "Present and upcoming plans" },
  { href: "/roles", label: "Roles", note: "The 13 specialisations" },
  { href: "/ethics", label: "Ethics", note: "How we work, legally" },
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

  const stats = [
    { value: String(roles.length || 13), label: "Specialist roles" },
    { value: "2", label: "Rollout phases" },
    { value: String(projects.length || 1), label: "Flagship case" },
    { value: "~2h", label: "Per week" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-[0.35]" />
        <div className="absolute inset-0 bg-radial-glow" />
        <Container className="relative grid gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
          <div>
            <Badge variant="accent" className="mb-5">
              {site.descriptor}
            </Badge>
            <h1 className="font-mono text-4xl font-semibold tracking-[0.12em] text-gradient sm:text-6xl">
              {site.name}
            </h1>
            <p className="mt-5 max-w-xl text-xl text-foreground">
              {site.tagline}
            </p>
            <p className="mt-3 font-mono text-sm tracking-wide text-accent">
              {site.motto}
            </p>
            <p className="mt-6 max-w-xl text-muted">{site.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.applyUrl}
                target="_blank"
                rel="noreferrer"
                className={btnPrimary}
              >
                Apply to join
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/projects" className={btnSecondary}>
                Explore the case board
              </Link>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-mono text-2xl font-semibold text-foreground">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs text-muted">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-6 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/70 p-8 backdrop-blur">
              <Logo size={200} className="mx-auto h-auto w-full max-w-[220px] ring-0" priority />
              <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.3em] text-muted">
                Preserve · Analyse · Prove
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="What we are"
            title="A student-led digital forensics collective"
            description="We bring together people who want to understand how digital evidence really works — then prove it, together."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div key={value.title} className={cn(cardClass, "p-5")}>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <value.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{value.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Specialities strip */}
      <section className="border-y border-border bg-surface/30 py-10">
        <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {SPECIALTIES.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 text-sm text-muted"
            >
              <item.icon className="h-4 w-4 text-accent" />
              {item.label}
            </span>
          ))}
        </Container>
      </section>

      {/* Hub */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="One place for everything"
            title="The Forensyra hub"
            description="Our projects, write-ups, plans, and members all live here — updated as the collective grows."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HUB.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(cardClass, "group flex items-center justify-between p-5")}
              >
                <span>
                  <span className="block text-base font-semibold text-foreground group-hover:text-accent">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-xs text-muted">
                    {item.note}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted transition group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured case files */}
      <section className="py-16 sm:py-20">
        <Container>
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
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((entry) => (
                <EntryCard
                  key={entry.slug}
                  entry={entry}
                  basePath="/projects"
                  kind={entry.caseType ?? "Case file"}
                />
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

      {/* Roles preview */}
      <section className="border-y border-border bg-surface/30 py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Thirteen roles"
              title="Find your specialisation"
              description="Every member owns a defined role, filled in phases so the team is never overloaded."
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {roles.slice(0, 13).map((role) => (
                <span
                  key={role.slug}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted"
                >
                  {role.title}
                  <span className="font-mono text-[10px] text-accent">
                    {role.phase ? phaseLabel(role.phase) : ""}
                  </span>
                </span>
              ))}
            </div>
            <Link href="/roles" className={cn(btnPrimary, "mt-6")}>
              View all roles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6">
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
        </Container>
      </section>

      {/* Latest write-ups */}
      <section className="py-16 sm:py-20">
        <Container>
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
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latestWriteups.length > 0 ? (
              latestWriteups.map((entry) => (
                <EntryCard
                  key={entry.slug}
                  entry={entry}
                  basePath="/writeups"
                  kind="Write-up"
                />
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

      <CtaBand
        title="Help build the definitive student DFIR team"
        description="Applications are open. Bring your curiosity, pick a role, and work a real investigation with us."
        applyUrl={site.applyUrl}
      />
    </>
  );
}
