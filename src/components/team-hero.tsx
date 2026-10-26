import { Users } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { HeroSection } from "@/components/heroes/hero-backdrop";

/**
 * Team hero — a round table with thirteen seats, some filled and some open.
 */
export function TeamHero() {
  return (
    <HeroSection variant="team">
      <Container variant="wide" className="relative z-10 flex min-h-[360px] items-center py-16 sm:min-h-[400px] sm:py-20 lg:min-h-[440px] lg:py-20">
        <Reveal>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-accent" />
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              The People
            </p>
          </div>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Meet the <span className="text-accent-2">Collective</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Members hold defined roles and work the part of each case that matches
            their specialisation.
          </p>
        </Reveal>
      </Container>
    </HeroSection>
  );
}
