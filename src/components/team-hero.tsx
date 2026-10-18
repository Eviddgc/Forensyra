import { Users } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/**
 * Team hero — a 3D perspective network of interconnected nodes with
 * animated pulsing connections, floating particles, and a central
 * gold "core" node. Gives the page a living, breathing feel.
 */
export function TeamHero() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_20%,#122b46_0%,#0d2238_50%,#071827_100%)]" />

        {/* 3D perspective network graph. */}
        <svg
          className="absolute right-[3%] top-1/2 hidden h-[26rem] w-[26rem] -translate-y-1/2 opacity-[0.2] md:block"
          viewBox="0 0 200 200"
          fill="none"
          style={{ transform: "perspective(600px) rotateY(-15deg) rotateX(5deg)" }}
        >
          {/* Connection lines with animated dashes. */}
          <g stroke="#6aa0dc" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.4">
            <line x1="100" y1="20" x2="45" y2="70" />
            <line x1="100" y1="20" x2="155" y2="70" />
            <line x1="45" y1="70" x2="75" y2="130" />
            <line x1="155" y1="70" x2="125" y2="130" />
            <line x1="75" y1="130" x2="125" y2="130" />
            <line x1="100" y1="20" x2="100" y2="85" />
            <line x1="45" y1="70" x2="155" y2="70" />
            <line x1="75" y1="130" x2="100" y2="85" />
            <line x1="125" y1="130" x2="100" y2="85" />
          </g>

          {/* Solid gold connections (primary). */}
          <g stroke="#e6b64f" strokeWidth="0.8" opacity="0.5">
            <line x1="100" y1="20" x2="45" y2="70" />
            <line x1="100" y1="20" x2="155" y2="70" />
            <line x1="75" y1="130" x2="125" y2="130" />
          </g>

          {/* Nodes — outer ring + inner dot with glow. */}
          <g>
            <circle cx="100" cy="20" r="10" fill="#0d2238" stroke="#e6b64f" strokeWidth="1.8" />
            <circle cx="100" cy="20" r="4.5" fill="#f5d58a" opacity="0.9" />
            <circle cx="100" cy="20" r="16" fill="none" stroke="#e6b64f" strokeWidth="0.4" opacity="0.3" />
            <circle cx="100" cy="20" r="22" fill="none" stroke="#e6b64f" strokeWidth="0.2" opacity="0.15" />
          </g>
          <g>
            <circle cx="45" cy="70" r="8" fill="#0d2238" stroke="#6aa0dc" strokeWidth="1.2" />
            <circle cx="45" cy="70" r="3" fill="#6aa0dc" opacity="0.7" />
          </g>
          <g>
            <circle cx="155" cy="70" r="8" fill="#0d2238" stroke="#6aa0dc" strokeWidth="1.2" />
            <circle cx="155" cy="70" r="3" fill="#6aa0dc" opacity="0.7" />
          </g>
          <g>
            <circle cx="75" cy="130" r="7" fill="#0d2238" stroke="#e6b64f" strokeWidth="1" />
            <circle cx="75" cy="130" r="2.5" fill="#e6b64f" opacity="0.6" />
          </g>
          <g>
            <circle cx="125" cy="130" r="7" fill="#0d2238" stroke="#e6b64f" strokeWidth="1" />
            <circle cx="125" cy="130" r="2.5" fill="#e6b64f" opacity="0.6" />
          </g>
          <g>
            <circle cx="100" cy="85" r="9" fill="#0d2238" stroke="#e6b64f" strokeWidth="1.5" />
            <circle cx="100" cy="85" r="4" fill="#f5d58a" opacity="0.8" />
            <circle cx="100" cy="85" r="14" fill="none" stroke="#e6b64f" strokeWidth="0.4" opacity="0.25" />
          </g>

          {/* Floating particles. */}
          <circle cx="30" cy="40" r="1.5" fill="#e6b64f" opacity="0.4" />
          <circle cx="170" cy="50" r="1" fill="#6aa0dc" opacity="0.5" />
          <circle cx="50" cy="160" r="1.5" fill="#e6b64f" opacity="0.3" />
          <circle cx="150" cy="170" r="1" fill="#6aa0dc" opacity="0.4" />
          <circle cx="20" cy="110" r="1" fill="#e6b64f" opacity="0.3" />
          <circle cx="180" cy="120" r="1.5" fill="#6aa0dc" opacity="0.5" />
        </svg>

        {/* Animated orbit rings. */}
        <div className="absolute right-[8%] top-1/2 hidden h-[20rem] w-[20rem] -translate-y-1/2 rounded-full border border-accent/10 md:block" style={{ animation: "fx-spin-slow 20s linear infinite" }} />
        <div className="absolute right-[10%] top-1/2 hidden h-[16rem] w-[16rem] -translate-y-1/2 rounded-full border border-dashed border-accent/5 md:block" style={{ animation: "fx-spin-slow 30s linear infinite reverse" }} />

        <div className="fx-orb pointer-events-none right-[15%] top-[5%] h-[20rem] w-[20rem] bg-[#6aa0dc]/10" />
        <div className="fx-orb pointer-events-none left-[-5%] bottom-[-10%] h-[16rem] w-[16rem] bg-accent/8" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="fx-scanlines absolute inset-0 opacity-[0.14]" />
      </div>

      <Container className="relative z-10 flex min-h-[360px] items-center py-20 sm:min-h-[420px] sm:py-24 lg:min-h-[460px]">
        <Reveal>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-accent" />
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              The People
            </p>
          </div>
          <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Meet the <span className="text-accent-2">Collective</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Members hold defined roles and work the part of each case that matches
            their specialisation.
          </p>
        </Reveal>
      </Container>

      <svg
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 block h-[46px] w-full sm:h-[70px]"
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
      >
        <path
          d="M0 30 C 260 96 470 4 720 40 C 970 76 1180 108 1440 44 L 1440 110 L 0 110 Z"
          fill="var(--color-surface)"
        />
      </svg>
    </section>
  );
}
