import Image from "next/image";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/**
 * Section 3 — cinematic page hero for the About page.
 * Imagery is biased to the right; copy sits on the left over a navy overlay,
 * with a hairline gold rule closing the section.
 */
export function AboutHero({
  name,
  subtitle,
}: {
  name: string;
  subtitle: string;
}) {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[460px] items-center overflow-hidden bg-background lg:min-h-[560px]"
    >
      <Image
        src="/images/hero-forensics.jpg"
        alt="A digital-forensics workstation with evidence under examination in blue light"
        fill
        preload
        sizes="100vw"
        className="object-cover object-[70%_center] opacity-60"
      />
      {/* Navy cinematic wash + readable left edge */}
      <div className="fx-cinematic pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_110%_at_10%_50%,rgba(7,24,39,0.94),rgba(7,24,39,0.4)_46%,transparent_72%)]" />
      {/* Subtle gold investigative lattice */}
      <div
        aria-hidden="true"
        className="bg-damask pointer-events-none absolute inset-0 opacity-60"
      />

      <Container className="relative z-10 py-20 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          <Reveal>
            <p className="fx-eyebrow text-accent">Who We Are</p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display mt-4 text-[clamp(2.5rem,6.5vw,4rem)] font-bold leading-[1.03] tracking-[-0.02em] text-foreground">
              About {name}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="font-display mt-5 text-[clamp(1.25rem,2.8vw,1.9rem)] font-medium italic leading-snug text-foreground/95">
              {subtitle}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
              Learn together. Investigate responsibly. Build evidence-led work
              that matters.
            </p>
          </Reveal>
        </div>
      </Container>

      <div aria-hidden="true" className="fx-rule absolute inset-x-0 bottom-0" />
    </section>
  );
}
