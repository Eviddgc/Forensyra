import { UserPlus } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/**
 * Join hero — an open invitation visual with a glowing doorway, stepping
 * stones, floating particles, and a "welcome" light beam pouring through.
 */
export function JoinHero({
  description,
}: {
  description: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_20%,#122b46_0%,#0d2238_50%,#071827_100%)]" />

        {/* Open doorway with light beam and stepping stones. */}
        <svg
          className="absolute right-[8%] top-1/2 hidden h-[24rem] w-[24rem] -translate-y-1/2 opacity-[0.2] md:block"
          viewBox="0 0 200 200"
          fill="none"
          style={{ transform: "perspective(700px) rotateY(-8deg) rotateX(3deg)" }}
        >
          {/* Doorway frame with inner glow. */}
          <rect x="60" y="20" width="80" height="160" rx="4" fill="#0d2238" stroke="#e6b64f" strokeWidth="1.2" />
          <rect x="70" y="30" width="60" height="140" rx="2" fill="#071827" stroke="#6aa0dc" strokeWidth="0.6" />

          {/* Light beam pouring through. */}
          <defs>
            <radialGradient id="join-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f5d58a" stopOpacity="0.5" />
              <stop offset="40%" stopColor="#e6b64f" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#e6b64f" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="join-beam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5d58a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#e6b64f" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="70" y="30" width="60" height="140" rx="2" fill="url(#join-glow)" />
          <polygon points="70,30 130,30 160,170 40,170" fill="url(#join-beam)" opacity="0.3" />

          {/* Door handle. */}
          <circle cx="120" cy="100" r="3" fill="#e6b64f" opacity="0.8" />
          <circle cx="120" cy="100" r="5" fill="none" stroke="#e6b64f" strokeWidth="0.5" opacity="0.4" />

          {/* Stepping stones leading in. */}
          <rect x="48" y="185" width="22" height="6" rx="3" fill="#6aa0dc" opacity="0.4" />
          <rect x="78" y="190" width="26" height="6" rx="3" fill="#6aa0dc" opacity="0.5" />
          <rect x="110" y="185" width="22" height="6" rx="3" fill="#6aa0dc" opacity="0.4" />
          <rect x="142" y="190" width="26" height="6" rx="3" fill="#6aa0dc" opacity="0.3" />

          {/* Floating particles rising upward. */}
          <circle cx="45" cy="50" r="2" fill="#e6b64f" opacity="0.5" />
          <circle cx="160" cy="40" r="1.5" fill="#6aa0dc" opacity="0.6" />
          <circle cx="30" cy="90" r="1" fill="#e6b64f" opacity="0.4" />
          <circle cx="175" cy="110" r="2" fill="#6aa0dc" opacity="0.5" />
          <circle cx="50" cy="130" r="1.5" fill="#e6b64f" opacity="0.4" />
          <circle cx="165" cy="150" r="1" fill="#6aa0dc" opacity="0.6" />
          <circle cx="80" cy="20" r="1" fill="#f5d58a" opacity="0.5" />
          <circle cx="120" cy="15" r="1.5" fill="#f5d58a" opacity="0.4" />

          {/* Pulse rings from the doorway. */}
          <circle cx="100" cy="100" r="30" fill="none" stroke="#e6b64f" strokeWidth="0.4" opacity="0.2" />
          <circle cx="100" cy="100" r="45" fill="none" stroke="#e6b64f" strokeWidth="0.3" opacity="0.12" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#6aa0dc" strokeWidth="0.2" opacity="0.08" />
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
            <UserPlus className="h-5 w-5 text-accent" />
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              Recruiting
            </p>
          </div>
          <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Join <span className="text-accent-2">Forensyra</span>
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
