import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { HeroDial } from "@/components/home/hero-dial";
import { btnOutlineDarkLg, btnPrimaryLg } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** Section 3 — cinematic hero. */
const STATS: Array<{
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}> = [
  { value: 13, label: "Specialized Roles" },
  { value: 2, label: "Active Projects" },
  { value: 1, label: "Flagship Case" },
  { value: 2, prefix: "~", suffix: "h", label: "Per Week" },
];

export function Hero({ name, applyUrl }: { name: string; applyUrl: string }) {
  // Per-glyph spans so the wordmark can roll in one letter at a time. Both
  // faces below reuse these spans, which keeps the ivory and gold layers
  // pixel-identical.
  const glyphs = Array.from(name).map((letter, index) => (
    <span
      key={index}
      className="fx-letter"
      style={{ "--i": index } as CSSProperties}
    >
      {letter === " " ? "\u00A0" : letter}
    </span>
  ));

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[600px] items-center overflow-hidden bg-background lg:min-h-[680px]"
    >
      {/* The hero's visual is the full FORENSYRA lockup rather than stock
          photography, so the first screen reads as unmistakably FORENSYRA. */}
      <div className="bg-damask pointer-events-none absolute inset-0 opacity-70" />
{/* Orb layers */}
      <div className="fx-orb pointer-events-none left-[-12%] top-[4%] h-[38rem] w-[38rem] bg-accent/10 border-2 border-accent-2 rounded-full" />
      <div className="fx-orb pointer-events-none left-[-10%] top-[6%] h-[34rem] w-[34rem] bg-accent/15" />
      <div className="fx-orb pointer-events-none bottom-[-20%] right-[-8%] h-[30rem] w-[30rem] bg-accent-2/20" />
{/* Tiny evidence tags */}
      <div className="pointer-events-none absolute left-[5%] top-[20%] flex flex-col gap-2">
        <span className="text-xs text-accent-2">#disk</span>
        <span className="text-xs text-accent-2">#usb</span>
        <span className="text-xs text-accent-2">#cd</span>
      </div>

      {/* Dark navy gradient + stronger overlay behind the text */}
      <div className="fx-cinematic pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_110%_at_12%_45%,rgba(7,24,39,0.92),rgba(7,24,39,0.35)_45%,transparent_70%)]" />
      <div className="fx-scanlines pointer-events-none absolute inset-0 opacity-[0.28]" />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center xl:justify-end xl:pr-[3%]">
        <div className="relative flex items-center justify-center">
          <HeroDial className="absolute left-1/2 top-1/2 hidden h-[min(82vw,34rem)] w-[min(82vw,34rem)] -translate-x-1/2 -translate-y-1/2 opacity-70 drop-shadow-[0_0_40px_rgba(230,182,79,0.18)] sm:block lg:opacity-80" />
          <Image
            src="/brand-logo.webp"
            alt=""
            width={1024}
            height={1024}
            preload
            sizes="(max-width: 1280px) 56vw, 22rem"
            className="relative h-[min(58vw,13rem)] w-auto opacity-[0.15] drop-shadow-[0_0_60px_rgba(230,182,79,0.45)] md:opacity-20 lg:opacity-30 xl:h-[22rem] xl:opacity-95"
          />
        </div>
      </div>

      <Container className="relative z-10 py-16 sm:py-20 lg:py-20">
        <div className="max-w-2xl">
          <Reveal>
            <p className="fx-eyebrow text-accent">
              Digital Evidence × Deeper Truth
            </p>
          </Reveal>

          <Reveal delay={30}>
            <h1 className="fx-wordmark w-fit font-display mt-4 text-[clamp(2.5rem,10.5vw,7rem)] font-bold leading-[0.95] tracking-[-0.02em]">
              <span className="fx-wordmark-stack">
                <span className="fx-wordmark-face">{glyphs}</span>
                <span
                  className="fx-wordmark-face fx-wordmark-face-foil"
                  aria-hidden="true"
                >
                  {glyphs}
                </span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={60}>
            <p className="font-display mt-5 text-[clamp(1.4rem,3.4vw,2.25rem)] font-medium italic leading-snug text-foreground/95">
              Where Digital Truth Takes Form.
            </p>
          </Reveal>

          <Reveal delay={90}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
              {name} is a collective for students and early-career professionals
              in digital forensics, incident response, and cybersecurity. We
              come together, practise on real-world problems, and build public
              portfolios — turning curiosity into impact.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={applyUrl} className={cn(btnPrimaryLg, "fx-shine")}>
                Apply to Join
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/projects" className={btnOutlineDarkLg}>
                Explore the Case Board
              </Link>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-y-8 sm:grid-cols-4">
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    "px-1 sm:px-5",
                    index > 0 && "sm:border-l sm:border-border-gold",
                  )}
                >
                  <dt className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                    <Counter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </dt>
                  <dd className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
