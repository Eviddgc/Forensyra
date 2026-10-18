import { Library } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/**
 * Resources hero — a 3D bookshelf with floating pages, glowing spines,
 * and an open book at the center with knowledge rays emanating outward.
 */
export function ResourcesHero({
  description,
}: {
  description: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_20%,#122b46_0%,#0d2238_50%,#071827_100%)]" />

        {/* 3D bookshelf with floating pages. */}
        <svg
          className="absolute right-[3%] top-1/2 hidden h-[26rem] w-[26rem] -translate-y-1/2 opacity-[0.2] md:block"
          viewBox="0 0 200 200"
          fill="none"
          style={{ transform: "perspective(700px) rotateY(-10deg) rotateX(5deg)" }}
        >
          {/* Shelf planks. */}
          <rect x="15" y="58" width="170" height="4" rx="1" fill="#6aa0dc" opacity="0.3" />
          <rect x="15" y="98" width="170" height="4" rx="1" fill="#6aa0dc" opacity="0.3" />
          <rect x="15" y="138" width="170" height="4" rx="1" fill="#6aa0dc" opacity="0.3" />
          <rect x="15" y="178" width="170" height="4" rx="1" fill="#6aa0dc" opacity="0.3" />

          {/* Books on shelves — varied heights and colors. */}
          {[
            { x: 18, y: 28, w: 12, h: 30, color: "#e6b64f", glow: true },
            { x: 32, y: 32, w: 10, h: 26, color: "#6aa0dc", glow: false },
            { x: 45, y: 26, w: 14, h: 32, color: "#e6b64f", glow: true },
            { x: 62, y: 34, w: 11, h: 24, color: "#6aa0dc", glow: false },
            { x: 76, y: 28, w: 13, h: 30, color: "#e6b64f", glow: true },
            { x: 92, y: 32, w: 10, h: 26, color: "#6aa0dc", glow: false },
            { x: 105, y: 26, w: 15, h: 32, color: "#e6b64f", glow: true },
            { x: 123, y: 34, w: 11, h: 24, color: "#6aa0dc", glow: false },
            { x: 137, y: 28, w: 13, h: 30, color: "#e6b64f", glow: true },
            { x: 153, y: 32, w: 10, h: 26, color: "#6aa0dc", glow: false },
            { x: 166, y: 26, w: 14, h: 32, color: "#e6b64f", glow: true },
          ].map(({ x, y, w, h, color, glow }, i) => (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} rx="1" fill="#0d2238" stroke={color} strokeWidth={glow ? 1 : 0.5} opacity={glow ? 0.8 : 0.5} />
              <rect x={x + 2} y={y + 3} width={w - 4} height="2" rx="0.5" fill={color} opacity={glow ? 0.5 : 0.25} />
              <rect x={x + 2} y={y + 7} width={w - 6} height="1.5" rx="0.5" fill={color} opacity={glow ? 0.3 : 0.15} />
              {glow && (
                <rect x={x - 1} y={y - 1} width={w + 2} height={h + 2} rx="2" fill="none" stroke={color} strokeWidth="0.3" opacity="0.4" />
              )}
            </g>
          ))}

          {/* Second shelf books. */}
          {[
            { x: 22, y: 76, w: 12, h: 22, color: "#6aa0dc" },
            { x: 38, y: 74, w: 14, h: 24, color: "#e6b64f" },
            { x: 56, y: 78, w: 10, h: 20, color: "#6aa0dc" },
            { x: 70, y: 74, w: 16, h: 24, color: "#e6b64f" },
            { x: 90, y: 76, w: 12, h: 22, color: "#6aa0dc" },
            { x: 106, y: 74, w: 14, h: 24, color: "#e6b64f" },
            { x: 124, y: 78, w: 10, h: 20, color: "#6aa0dc" },
            { x: 138, y: 74, w: 16, h: 24, color: "#e6b64f" },
            { x: 158, y: 76, w: 12, h: 22, color: "#6aa0dc" },
          ].map(({ x, y, w, h, color }, i) => (
            <g key={`s2-${i}`}>
              <rect x={x} y={y} width={w} height={h} rx="1" fill="#0d2238" stroke={color} strokeWidth="0.5" opacity="0.5" />
              <rect x={x + 2} y={y + 3} width={w - 4} height="2" rx="0.5" fill={color} opacity="0.3" />
            </g>
          ))}

          {/* Third shelf — open book at center. */}
          <g>
            <rect x="70" y="116" width="60" height="22" rx="2" fill="#0d2238" stroke="#e6b64f" strokeWidth="1" opacity="0.7" />
            <line x1="100" y1="116" x2="100" y2="138" stroke="#e6b64f" strokeWidth="0.6" opacity="0.6" />
            <rect x="74" y="120" width="22" height="2" rx="0.5" fill="#e6b64f" opacity="0.4" />
            <rect x="74" y="124" width="18" height="2" rx="0.5" fill="#6aa0dc" opacity="0.3" />
            <rect x="74" y="128" width="20" height="2" rx="0.5" fill="#6aa0dc" opacity="0.3" />
            <rect x="104" y="120" width="22" height="2" rx="0.5" fill="#e6b64f" opacity="0.4" />
            <rect x="104" y="124" width="16" height="2" rx="0.5" fill="#6aa0dc" opacity="0.3" />
            <rect x="104" y="128" width="18" height="2" rx="0.5" fill="#6aa0dc" opacity="0.3" />
          </g>

          {/* Knowledge rays from the open book. */}
          <g stroke="#e6b64f" strokeWidth="0.3" opacity="0.3">
            <line x1="100" y1="127" x2="60" y2="60" />
            <line x1="100" y1="127" x2="140" y2="60" />
            <line x1="100" y1="127" x2="40" y2="90" />
            <line x1="100" y1="127" x2="160" y2="90" />
          </g>

          {/* Floating particles. */}
          <circle cx="25" cy="15" r="1.5" fill="#e6b64f" opacity="0.4" />
          <circle cx="175" cy="25" r="1" fill="#6aa0dc" opacity="0.5" />
          <circle cx="15" cy="100" r="1" fill="#e6b64f" opacity="0.3" />
          <circle cx="185" cy="110" r="1.5" fill="#6aa0dc" opacity="0.4" />
          <circle cx="30" cy="160" r="1" fill="#e6b64f" opacity="0.3" />
          <circle cx="170" cy="170" r="1.5" fill="#6aa0dc" opacity="0.5" />
        </svg>

        <div className="fx-orb pointer-events-none right-[15%] top-[5%] h-[20rem] w-[20rem] bg-[#6aa0dc]/10" />
        <div className="fx-orb pointer-events-none left-[-5%] bottom-[-10%] h-[16rem] w-[16rem] bg-accent/8" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="fx-scanlines absolute inset-0 opacity-[0.14]" />
      </div>

      <Container className="relative z-10 flex min-h-[360px] items-center py-20 sm:min-h-[420px] sm:py-24 lg:min-h-[460px]">
        <Reveal>
          <div className="flex items-center gap-3">
            <Library className="h-5 w-5 text-accent" />
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              Toolkit
            </p>
          </div>
          <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            DFIR <span className="text-accent-2">Resources</span>
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
