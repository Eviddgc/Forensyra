import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { HeroSection } from "@/components/heroes/hero-backdrop";

/**
 * Cinematic page hero for the About page. The visual is a constellation of
 * thirteen nodes — the people and roles that make up the collective.
 */
export function AboutHero({
  name,
  subtitle,
}: {
  name: string;
  subtitle: string;
}) {
  return (
    <HeroSection variant="about" id="top">
      <Container className="relative z-10 flex min-h-[240px] items-center pb-6 pt-14 sm:min-h-[260px] sm:pt-16">
        <div className="max-w-2xl">
          <Reveal>
            <p className="fx-eyebrow text-accent">Who We Are</p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display mt-4 text-[clamp(2.5rem,6.5vw,4rem)] font-medium leading-[1.03] tracking-[-0.01em] text-foreground">
              About {name}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/90 sm:text-lg">
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
    </HeroSection>
  );
}
