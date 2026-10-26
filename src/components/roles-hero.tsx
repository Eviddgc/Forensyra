import { Target } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { HeroSection } from "@/components/heroes/hero-backdrop";

/**
 * Roles hero — the thirteen specialisations as one interlocking honeycomb.
 */
export function RolesHero({ description }: { description: string }) {
  return (
    <HeroSection variant="roles">
      <Container className="relative z-10 flex min-h-[260px] items-center pb-8 pt-14 sm:min-h-[280px] sm:pt-16">
        <Reveal>
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-accent" />
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              Thirteen Roles
            </p>
          </div>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Find your <span className="text-accent-2">Specialisation</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      </Container>
    </HeroSection>
  );
}
