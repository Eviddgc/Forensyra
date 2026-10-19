import { UserPlus } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { HeroSection } from "@/components/heroes/hero-backdrop";

/**
 * Join hero — an open, lit threshold with a path leading through it.
 */
export function JoinHero({ description }: { description: string }) {
  return (
    <HeroSection variant="join">
      <Container className="relative z-10 flex min-h-[430px] items-center py-20 sm:min-h-[480px] sm:py-24 lg:min-h-[520px]">
        <Reveal>
          <div className="flex items-center gap-3">
            <UserPlus className="h-5 w-5 text-accent" />
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              Recruiting
            </p>
          </div>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Join <span className="text-accent-2">Forensyra</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      </Container>
    </HeroSection>
  );
}
