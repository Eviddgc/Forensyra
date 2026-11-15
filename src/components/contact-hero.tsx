import { Radio } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { HeroSection } from "@/components/heroes/hero-backdrop";

/**
 * Contact hero — a signal sent out, with rings travelling across the network.
 */
export function ContactHero({ description }: { description: string }) {
  return (
    <HeroSection variant="contact">
      <Container className="relative z-10 flex min-h-[220px] items-center pb-4 pt-12 sm:min-h-[240px] sm:pt-14">
        <Reveal>
          <div className="flex items-center gap-3">
            <Radio className="h-5 w-5 text-accent" />
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              Say Hello
            </p>
          </div>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Get in <span className="text-accent-2">Touch</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      </Container>
    </HeroSection>
  );
}
