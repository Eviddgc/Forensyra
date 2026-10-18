import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/**
 * Projects hero — cinematic forensic-workstation scene built from brand
 * artwork (no stock photography). Cool blue tones with a deep navy overlay.
 */
export function ProjectsHero({
  description,
}: {
  description: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Forensic workstation visual — pure SVG brand artwork. */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_20%,#122b46_0%,#0d2238_50%,#071827_100%)]" />

        {/* Fingerprint motif. */}
        <svg
          className="absolute right-[8%] top-1/2 hidden h-[22rem] w-[22rem] -translate-y-1/2 opacity-[0.1] md:block"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="90" stroke="#6aa0dc" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="75" stroke="#6aa0dc" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="60" stroke="#6aa0dc" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="45" stroke="#6aa0dc" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="30" stroke="#6aa0dc" strokeWidth="0.3" />
          <path
            d="M100 10 C 130 10 155 35 155 65 C 155 95 130 120 100 120 C 70 120 45 95 45 65 C 45 35 70 10 100 10"
            stroke="#6aa0dc"
            strokeWidth="0.8"
          />
          <path
            d="M100 25 C 120 25 140 45 140 65 C 140 85 120 105 100 105 C 80 105 60 85 60 65 C 60 45 80 25 100 25"
            stroke="#6aa0dc"
            strokeWidth="0.6"
          />
        </svg>

        {/* Cool blue orbs. */}
        <div className="fx-orb pointer-events-none right-[15%] top-[5%] h-[20rem] w-[20rem] bg-[#6aa0dc]/10" />
        <div className="fx-orb pointer-events-none left-[-5%] bottom-[-10%] h-[18rem] w-[18rem] bg-accent/8" />

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
              Case Files
            </p>
          </div>
          <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Projects <span className="text-accent-2">in the field</span>
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
