import { Target } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/**
 * Roles hero — a 3D honeycomb grid with floating role badges, each hex
 * glowing gold on hover. A central "core" hex pulses with the accent color.
 */
export function RolesHero({
  description,
}: {
  description: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_20%,#122b46_0%,#0d2238_50%,#071827_100%)]" />

        {/* 3D honeycomb grid with floating badges. */}
        <svg
          className="absolute right-[3%] top-1/2 hidden h-[26rem] w-[26rem] -translate-y-1/2 opacity-[0.2] md:block"
          viewBox="0 0 200 200"
          fill="none"
          style={{ transform: "perspective(700px) rotateY(-12deg) rotateX(8deg)" }}
        >
          {/* Honeycomb cells — 3 rows of staggered hexes. */}
          {[
            { cx: 40, cy: 30, r: 14, active: false },
            { cx: 75, cy: 30, r: 14, active: false },
            { cx: 110, cy: 30, r: 14, active: false },
            { cx: 145, cy: 30, r: 14, active: false },
            { cx: 180, cy: 30, r: 14, active: false },
            { cx: 57, cy: 62, r: 14, active: false },
            { cx: 92, cy: 62, r: 14, active: true },
            { cx: 127, cy: 62, r: 14, active: false },
            { cx: 162, cy: 62, r: 14, active: false },
            { cx: 40, cy: 94, r: 14, active: false },
            { cx: 75, cy: 94, r: 14, active: false },
            { cx: 110, cy: 94, r: 14, active: false },
            { cx: 145, cy: 94, r: 14, active: false },
            { cx: 180, cy: 94, r: 14, active: false },
            { cx: 57, cy: 126, r: 14, active: false },
            { cx: 92, cy: 126, r: 14, active: false },
            { cx: 127, cy: 126, r: 14, active: false },
            { cx: 162, cy: 126, r: 14, active: false },
            { cx: 40, cy: 158, r: 14, active: false },
            { cx: 75, cy: 158, r: 14, active: false },
            { cx: 110, cy: 158, r: 14, active: false },
            { cx: 145, cy: 158, r: 14, active: false },
            { cx: 180, cy: 158, r: 14, active: false },
          ].map(({ cx, cy, r, active }, i) => (
            <g key={i}>
              <polygon
                points={`${cx},${cy - r} ${cx + r * 0.866},${cy - r / 2} ${cx + r * 0.866},${cy + r / 2} ${cx},${cy + r} ${cx - r * 0.866},${cy + r / 2} ${cx - r * 0.866},${cy - r / 2}`}
                fill={active ? "rgba(230,182,79,0.08)" : "#0d2238"}
                stroke={active ? "#e6b64f" : "#6aa0dc"}
                strokeWidth={active ? 1.5 : 0.6}
                opacity={active ? 0.9 : 0.5}
              />
              {active && (
                <>
                  <circle cx={cx} cy={cy} r={r + 6} fill="none" stroke="#e6b64f" strokeWidth="0.5" opacity="0.3" />
                  <circle cx={cx} cy={cy} r={r + 12} fill="none" stroke="#e6b64f" strokeWidth="0.3" opacity="0.15" />
                </>
              )}
            </g>
          ))}

          {/* Floating particles. */}
          <circle cx="20" cy="20" r="1" fill="#e6b64f" opacity="0.4" />
          <circle cx="185" cy="30" r="1.5" fill="#6aa0dc" opacity="0.5" />
          <circle cx="15" cy="100" r="1" fill="#e6b64f" opacity="0.3" />
          <circle cx="190" cy="110" r="1.5" fill="#6aa0dc" opacity="0.4" />
          <circle cx="30" cy="170" r="1" fill="#e6b64f" opacity="0.3" />
          <circle cx="175" cy="180" r="1.5" fill="#6aa0dc" opacity="0.5" />
        </svg>

        {/* Rotating ring. */}
        <div
          className="absolute right-[8%] top-1/2 hidden h-[22rem] w-[22rem] -translate-y-1/2 rounded-full border border-accent/8 md:block"
          style={{ animation: "fx-spin-slow 25s linear infinite" }}
        />
        <div
          className="absolute right-[10%] top-1/2 hidden h-[18rem] w-[18rem] -translate-y-1/2 rounded-full border border-dashed border-accent/5 md:block"
          style={{ animation: "fx-spin-slow 35s linear infinite reverse" }}
        />

        <div className="fx-orb pointer-events-none right-[15%] top-[5%] h-[20rem] w-[20rem] bg-[#6aa0dc]/10" />
        <div className="fx-orb pointer-events-none left-[-5%] bottom-[-10%] h-[16rem] w-[16rem] bg-accent/8" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="fx-scanlines absolute inset-0 opacity-[0.14]" />
      </div>

      <Container className="relative z-10 flex min-h-[360px] items-center py-20 sm:min-h-[420px] sm:py-24 lg:min-h-[460px]">
        <Reveal>
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-accent" />
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              Thirteen Roles
            </p>
          </div>
          <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Find your <span className="text-accent-2">Specialisation</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
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
