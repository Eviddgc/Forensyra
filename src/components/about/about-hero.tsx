import Image from "next/image";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/**
 * Section 3 — cinematic page hero for the About page.
 * The visual is the FORENSYRA emblem itself; copy sits on the left over a navy
 * wash, with a hairline gold rule closing the section.
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
      {/* The visual is our own emblem rather than stock photography, so the
          page reads as unmistakably FORENSYRA. */}
      <div className="bg-damask pointer-events-none absolute inset-0 opacity-70" />
      <div className="fx-orb pointer-events-none right-[-10%] top-[2%] h-[30rem] w-[30rem] bg-accent-2/20" />
      <div className="fx-cinematic pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_110%_at_10%_50%,rgba(7,24,39,0.94),rgba(7,24,39,0.4)_46%,transparent_72%)]" />
      <div className="fx-scanlines pointer-events-none absolute inset-0 opacity-[0.28]" />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center xl:justify-end">
        <Image
          src="/brand-mark.png"
          alt=""
          width={768}
          height={768}
          preload
          sizes="(max-width: 1280px) 56vw, 22rem"
          className="h-[min(58vw,13rem)] w-auto opacity-[0.15] drop-shadow-[0_0_60px_rgba(230,182,79,0.45)] xl:mr-[3%] xl:h-[22rem] xl:translate-x-[3%] xl:opacity-95"
        />
      </div>

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
