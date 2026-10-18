import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/**
 * Write-ups hero — a cinematic research-library scene built from brand
 * artwork (no stock photography). Cool blue tones with a deep navy overlay.
 */
export function WriteupsHero({
  description,
}: {
  description: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Research visual — pure SVG brand artwork. */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_20%,#122b46_0%,#0d2238_50%,#071827_100%)]" />

        {/* Document/page motif. */}
        <svg
          className="absolute right-[10%] top-1/2 hidden h-[20rem] w-[20rem] -translate-y-1/2 opacity-[0.1] md:block"
          viewBox="0 0 200 200"
          fill="none"
        >
          <rect x="40" y="20" width="120" height="160" rx="4" stroke="#6aa0dc" strokeWidth="0.8" />
          <rect x="55" y="40" width="90" height="6" rx="2" fill="#6aa0dc" opacity="0.4" />
          <rect x="55" y="55" width="70" height="4" rx="2" fill="#6aa0dc" opacity="0.3" />
          <rect x="55" y="65" width="80" height="4" rx="2" fill="#6aa0dc" opacity="0.3" />
          <rect x="55" y="75" width="60" height="4" rx="2" fill="#6aa0dc" opacity="0.3" />
          <rect x="55" y="85" width="75" height="4" rx="2" fill="#6aa0dc" opacity="0.3" />
          <rect x="55" y="100" width="90" height="40" rx="2" stroke="#6aa0dc" strokeWidth="0.5" />
          <circle cx="100" cy="120" r="12" stroke="#6aa0dc" strokeWidth="0.5" />
          <line x1="85" y1="135" x2="115" y2="135" stroke="#6aa0dc" strokeWidth="0.5" />
        </svg>

        {/* Cool blue orbs. */}
        <div className="fx-orb pointer-events-none right-[15%] top-[5%] h-[18rem] w-[18rem] bg-[#6aa0dc]/10" />
        <div className="fx-orb pointer-events-none left-[-5%] bottom-[-10%] h-[16rem] w-[16rem] bg-accent/8" />

        {/* Dark navy overlay. */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Subtle investigative rays. */}
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            background:
              "repeating-conic-gradient(from 0deg at 75% 40%, rgba(100,160,220,0.3) 0deg 2deg, transparent 2deg 16deg)",
          }}
        />
        <div className="fx-scanlines absolute inset-0 opacity-[0.14]" />
      </div>

      <Container className="relative z-10 flex min-h-[380px] items-center py-20 sm:min-h-[440px] sm:py-24 lg:min-h-[480px]">
        <Reveal>
          <div className="flex items-center gap-3">
            <svg
              className="h-5 w-5 text-accent"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5zm0 2h14v2H5v-2z" />
            </svg>
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              Lab Notes
            </p>
          </div>
          <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Write-ups <span className="text-accent-2">&amp; Research</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      </Container>

      {/* Thin curved gold divider. */}
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
