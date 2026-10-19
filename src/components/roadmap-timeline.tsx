"use client";

import {
  ArrowUpRight,
  Calendar,
  FileText,
  Globe,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { MILESTONES, type Milestone, type MilestoneStatus } from "@/lib/roadmap";
import { cn } from "@/lib/utils";

const ICONS: Record<Milestone["visual"], LucideIcon> = {
  workstation: Target,
  evidence: FileText,
  terminal: TrendingUp,
  network: Globe,
};

function statusStyles(status: MilestoneStatus) {
  switch (status) {
    case "Active":
      return {
        badge: "border-accent/50 bg-accent/10 text-accent-2",
        dot: "bg-accent",
      };
    case "Planned":
      return {
        badge: "border-[#6aa0dc]/40 bg-[#6aa0dc]/10 text-[#9cc3ee]",
        dot: "bg-[#6aa0dc]",
      };
    default:
      return {
        badge: "border-border bg-surface-2/60 text-muted",
        dot: "bg-muted",
      };
  }
}

/**
 * A self-contained brand-artwork panel used in place of stock photography.
 * Each variant layers the FORENSYRA lattice, orbs and emblem differently so
 * the four cards feel distinct without leaving the navy/gold palette.
 */
function MilestoneVisual({ variant }: { variant: Milestone["visual"] }) {
  // Gradient ids must be unique per instance: this component renders once per
  // milestone, and duplicate ids make every card resolve to the first defs.
  const gradientId = `rm-peak-${variant}`;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden",
        variant === "network" &&
          "bg-[radial-gradient(120%_110%_at_80%_20%,#1b365d_0%,#0d2238_55%,#071827_100%)]",
        variant === "terminal" &&
          "bg-[radial-gradient(120%_110%_at_75%_30%,#16304f_0%,#0d2238_50%,#071827_100%)]",
        variant === "evidence" &&
          "bg-[radial-gradient(120%_110%_at_80%_25%,#14304e_0%,#0d2238_50%,#071827_100%)]",
        variant === "workstation" &&
          "bg-[radial-gradient(120%_110%_at_75%_25%,#152e4b_0%,#0d2238_50%,#071827_100%)]",
      )}
    >
      <div className="bg-damask absolute inset-0 opacity-80" />
      <div
        className={cn(
          "fx-orb absolute",
          variant === "network" && "-right-[10%] top-[-20%] h-[14rem] w-[14rem] bg-accent/10",
          variant === "terminal" && "-right-[15%] bottom-[-25%] h-[13rem] w-[13rem] bg-[#6aa0dc]/10",
          variant === "evidence" && "-right-[8%] top-[-15%] h-[12rem] w-[12rem] bg-accent-2/10",
          variant === "workstation" && "-right-[12%] bottom-[-20%] h-[13rem] w-[13rem] bg-accent/10",
        )}
      />
      {/* Topographic line-work evoking the mountain-sunset reference without
          introducing stock imagery or off-palette gradients. */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[55%] w-full opacity-[0.35]"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 90 C 60 60 120 100 180 72 C 240 44 300 88 400 58 L 400 120 L 0 120 Z"
          fill={`url(#${gradientId}-a)`}
        />
        <path
          d="M0 102 C 70 80 140 112 210 92 C 280 72 340 106 400 86 L 400 120 L 0 120 Z"
          fill={`url(#${gradientId}-b)`}
        />
        <path
          d="M0 90 C 60 60 120 100 180 72 C 240 44 300 88 400 58"
          stroke="rgba(230,182,79,0.35)"
          strokeWidth="1"
        />
        <defs>
          <linearGradient id={`${gradientId}-a`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1b365d" />
            <stop offset="100%" stopColor="#0d2238" />
          </linearGradient>
          <linearGradient id={`${gradientId}-b`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16304f" />
            <stop offset="100%" stopColor="#071827" />
          </linearGradient>
        </defs>
      </svg>
      {/* Sun-glow disc, echoing the reference's warm horizon. */}
      <div className="absolute right-[12%] top-[18%] h-16 w-16 rounded-full bg-accent/25 blur-2xl" />
      <div className="absolute right-[14%] top-[20%] h-8 w-8 rounded-full bg-accent/40 blur-md" />
      <div className="fx-scanlines absolute inset-0 opacity-[0.15]" />
    </div>
  );
}

function MilestoneCard({ milestone, index }: { milestone: Milestone; index: number }) {
  const Icon = ICONS[milestone.visual];
  const styles = statusStyles(milestone.status);

  return (
    <li className="relative pl-14 sm:pl-20">
      {/* Numbered timeline marker — gold-outlined circle on the connecting line. */}
      <span className="absolute left-0 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-accent/60 bg-background shadow-[0_0_24px_-6px] shadow-accent/50 sm:h-12 sm:w-12">
        <span className="font-mono text-xs font-semibold text-accent-2 sm:text-sm">
          {milestone.number}
        </span>
      </span>

      <Reveal delay={index * 80}>
        <article className="group relative overflow-hidden rounded-2xl border border-[#6aa0dc]/25 bg-[#16304f]/60 backdrop-blur-sm transition-colors duration-300 hover:border-accent/40">
          {/* Contextual brand artwork on the right — hidden on small screens. */}
          <div className="absolute inset-y-0 right-0 hidden w-[42%] md:block">
            <MilestoneVisual variant={milestone.visual} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#16304f]/60 via-transparent to-transparent" />
          </div>

          <div className="relative p-6 sm:p-8 md:max-w-[58%]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent-2">
                <Icon className="h-5 w-5" />
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em]",
                  styles.badge,
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", styles.dot)} />
                {milestone.status}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                <Calendar className="h-3.5 w-3.5" />
                {milestone.date}
              </span>
            </div>

            <h3 className="font-display mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {milestone.title}
            </h3>

            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
              {milestone.description}
            </p>

            {milestone.details ? (
              <p className="mt-4 max-w-xl border-l-2 border-border pl-4 text-sm leading-relaxed text-muted/90">
                {milestone.details}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-2">
              {milestone.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-[#6aa0dc]/30 bg-[#0d2238]/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Reveal>
    </li>
  );
}

export function RoadmapTimeline() {
  return (
    <Container className="py-16 sm:py-24">
      {/* The timeline cards are h3s; this keeps the outline from skipping a level. */}
      <h2 className="sr-only">Milestones</h2>
      <div className="relative">
        {/* Vertical connecting line. */}
        <span
          aria-hidden="true"
          className="absolute bottom-6 left-5 top-6 w-px bg-gradient-to-b from-accent/60 via-[#6aa0dc]/40 to-transparent sm:left-6"
        />
        <ol className="space-y-8 sm:space-y-10">
          {MILESTONES.map((milestone, index) => (
            <MilestoneCard key={milestone.id} milestone={milestone} index={index} />
          ))}
        </ol>
      </div>

      <Reveal delay={120}>
        <div className="mt-16 flex items-center gap-3 text-sm text-muted sm:mt-20">
          <Users className="h-4 w-4 text-accent" />
          <p>
            Dates are planned milestones, not guarantees — we publish updates as each
            phase ships.
          </p>
        </div>
      </Reveal>
    </Container>
  );
}

/** Final CTA banner — cinematic brand artwork with the mountain-sunset mood. */
export function RoadmapCta({
  applyUrl,
}: {
  applyUrl: string;
}) {
  return (
    <Container className="pb-20 sm:pb-28">
      <Reveal>
        <section className="relative overflow-hidden rounded-3xl border border-[#6aa0dc]/30">
          {/* Backdrop: layered peaks + warm horizon glow, drawn in brand colors. */}
          <div className="absolute inset-0 bg-[#0a1a2c]" />
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[70%] w-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              d="M0 220 C 240 140 420 260 720 180 C 1020 100 1200 240 1440 160 L 1440 320 L 0 320 Z"
              fill="url(#rm-cta-a)"
            />
            <path
              d="M0 260 C 260 190 480 290 760 230 C 1040 170 1220 270 1440 210 L 1440 320 L 0 320 Z"
              fill="url(#rm-cta-b)"
            />
            <path
              d="M0 220 C 240 140 420 260 720 180 C 1020 100 1200 240 1440 160"
              stroke="rgba(230,182,79,0.3)"
              strokeWidth="1"
            />
            <defs>
              <linearGradient id="rm-cta-a" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1b365d" />
                <stop offset="100%" stopColor="#0a1a2c" />
              </linearGradient>
              <linearGradient id="rm-cta-b" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16304f" />
                <stop offset="100%" stopColor="#071827" />
              </linearGradient>
            </defs>
          </svg>
          {/* Warm horizon glow, echoing the reference sunset. */}
          <div className="absolute left-1/2 top-[30%] h-40 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />
          <div className="fx-scanlines absolute inset-0 opacity-[0.12]" />

          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:p-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                Join the Collective
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Be part of the plan
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
                The founding team builds everything on this roadmap. Applications are
                open.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={applyUrl}
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
                Real Cases
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
  );
}
