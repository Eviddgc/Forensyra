import { Map } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { HeroSection } from "@/components/heroes/hero-backdrop";

/**
 * Roadmap hero — a marked trail climbing through layered ridgelines toward a
 * gold summit. Pure SVG; no stock photography.
 */
export function RoadmapHero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <HeroSection variant="roadmap">
      <Container className="relative z-10 flex min-h-[440px] items-center py-20 sm:min-h-[490px] sm:py-24 lg:min-h-[530px]">
        <Reveal>
          <div className="flex items-center gap-3">
            <Map className="h-5 w-5 text-accent" />
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              Plans
            </p>
          </div>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      </Container>
    </HeroSection>
  );
}
