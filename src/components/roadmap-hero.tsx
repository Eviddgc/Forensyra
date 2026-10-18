import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/**
 * Roadmap hero — a cinematic mountain-at-sunset scene built entirely from
 * layered SVG peaks in the FORENSYRA navy palette with a warm gold horizon.
 * No stock photography, so it stays unmistakably on-brand.
 */
export function RoadmapHero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Layered mountain ranges with a warm gold sun — pure SVG. */}
      <div aria-hidden="true" className="absolute inset-0">
        <svg
          className="absolute inset-x-0 bottom-0 h-[75%] w-full"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="rm-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#071827" />
              <stop offset="55%" stopColor="#0d2238" />
              <stop offset="100%" stopColor="#16304f" />
            </linearGradient>
            <radialGradient id="rm-sun" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f5d58a" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#e6b64f" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#e6b64f" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="rm-ridge-a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1b365d" />
              <stop offset="100%" stopColor="#12283f" />
            </linearGradient>
            <linearGradient id="rm-ridge-b" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16304f" />
              <stop offset="100%" stopColor="#0d2238" />
            </linearGradient>
            <linearGradient id="rm-ridge-c" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#122b46" />
              <stop offset="100%" stopColor="#0a1a2c" />
            </linearGradient>
          </defs>

          <rect width="1440" height="400" fill="url(#rm-sky)" />

          {/* Warm gold sun low on the horizon. */}
          <circle cx="1080" cy="215" r="130" fill="url(#rm-sun)" />
          <circle cx="1080" cy="215" r="34" fill="#f5d58a" opacity="0.95" />

          {/* Far ridge. */}
          <path
            d="M0 250 L140 190 L300 235 L460 170 L640 230 L820 165 L1000 225 L1180 180 L1320 220 L1440 195 L1440 400 L0 400 Z"
            fill="url(#rm-ridge-a)"
            opacity="0.85"
          />
          {/* Mid ridge. */}
          <path
            d="M0 300 L180 240 L360 290 L540 225 L760 295 L960 235 L1160 290 L1300 250 L1440 280 L1440 400 L0 400 Z"
            fill="url(#rm-ridge-b)"
          />
          {/* Near ridge. */}
          <path
            d="M0 350 L220 295 L440 345 L680 290 L920 350 L1140 300 L1440 345 L1440 400 L0 400 Z"
            fill="url(#rm-ridge-c)"
          />

          {/* Snow / light caps on the tallest peaks. */}
          <path
            d="M1000 225 L1022 232 L1000 238 L978 232 Z"
            fill="#f5f4f0"
            opacity="0.35"
          />
          <path
            d="M640 230 L660 236 L640 242 L620 236 Z"
            fill="#f5f4f0"
            opacity="0.3"
          />
        </svg>

        {/* Dark navy overlay so text stays readable. */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

        {/* Subtle investigative line-work radiating from the sun. */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            background:
              "repeating-conic-gradient(from 0deg at 75% 54%, rgba(230,182,79,0.35) 0deg 2deg, transparent 2deg 14deg)",
          }}
        />
        <div className="fx-scanlines absolute inset-0 opacity-[0.16]" />
      </div>

      <Container className="relative z-10 flex min-h-[420px] items-center py-20 sm:min-h-[480px] sm:py-24 lg:min-h-[520px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
            Plans
          </p>
          <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      </Container>

      {/* Thin gold curved divider along the bottom. */}
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
