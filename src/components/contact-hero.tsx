import { Radio } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/**
 * Contact hero — a communication/signal visual with concentric signal
 * rings radiating outward from a central message icon, representing
 * reaching out across the network.
 */
export function ContactHero({
  description,
}: {
  description: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_20%,#122b46_0%,#0d2238_50%,#071827_100%)]" />

        {/* Signal rings radiating from a message icon. */}
        <svg
          className="absolute right-[8%] top-1/2 hidden h-[24rem] w-[24rem] -translate-y-1/2 opacity-[0.2] md:block"
          viewBox="0 0 200 200"
          fill="none"
          style={{ transform: "perspective(700px) rotateY(-8deg) rotateX(3deg)" }}
        >
          {/* Concentric signal rings. */}
          <circle cx="100" cy="100" r="20" fill="#0d2238" stroke="#e6b64f" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="#e6b64f" strokeWidth="1" opacity="0.6" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#6aa0dc" strokeWidth="0.8" opacity="0.5" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="#6aa0dc" strokeWidth="0.6" opacity="0.35" />
          <circle cx="100" cy="100" r="100" fill="none" stroke="#6aa0dc" strokeWidth="0.4" opacity="0.2" />

          {/* Center message icon. */}
          <path
            d="M85 90 L115 90 L115 110 L105 110 L100 115 L95 110 L85 110 Z"
            fill="#e6b64f"
            opacity="0.8"
          />

          {/* Signal dots on rings. */}
          <circle cx="100" cy="20" r="3" fill="#e6b64f" opacity="0.7" />
          <circle cx="180" cy="100" r="3" fill="#6aa0dc" opacity="0.6" />
          <circle cx="100" cy="180" r="3" fill="#e6b64f" opacity="0.7" />
          <circle cx="20" cy="100" r="3" fill="#6aa0dc" opacity="0.6" />

          {/* Diagonal signal dots. */}
          <circle cx="142" cy="42" r="2" fill="#6aa0dc" opacity="0.4" />
          <circle cx="158" cy="142" r="2" fill="#e6b64f" opacity="0.4" />
          <circle cx="58" cy="158" r="2" fill="#6aa0dc" opacity="0.4" />
          <circle cx="42" cy="58" r="2" fill="#e6b64f" opacity="0.4" />

          {/* Pulse rings. */}
          <circle cx="100" cy="100" r="16" fill="none" stroke="#e6b64f" strokeWidth="0.5" opacity="0.3" />
          <circle cx="100" cy="100" r="22" fill="none" stroke="#e6b64f" strokeWidth="0.3" opacity="0.15" />

          {/* Floating particles. */}
          <circle cx="30" cy="30" r="1.5" fill="#e6b64f" opacity="0.4" />
          <circle cx="170" cy="40" r="1" fill="#6aa0dc" opacity="0.5" />
          <circle cx="20" cy="160" r="1" fill="#e6b64f" opacity="0.3" />
          <circle cx="180" cy="170" r="1.5" fill="#6aa0dc" opacity="0.4" />
        </svg>

        {/* Rotating signal rings. */}
        <div
          className="absolute right-[8%] top-1/2 hidden h-[20rem] w-[20rem] -translate-y-1/2 rounded-full border border-accent/8 md:block"
          style={{ animation: "fx-spin-slow 25s linear infinite" }}
        />
        <div
          className="absolute right-[10%] top-1/2 hidden h-[16rem] w-[16rem] -translate-y-1/2 rounded-full border border-dashed border-accent/5 md:block"
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
            <Radio className="h-5 w-5 text-accent" />
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              Say Hello
            </p>
          </div>
          <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Get in <span className="text-accent-2">Touch</span>
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
