import { FolderSearch } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { HeroSection } from "@/components/heroes/hero-backdrop";

/**
 * Projects hero — an evidence board with pinned case cards, built as brand
 * artwork rather than stock photography.
 */
export function ProjectsHero({ description }: { description: string }) {
  return (
    <HeroSection variant="projects">
      <Container className="relative z-10 flex min-h-[260px] items-center pb-8 pt-14 sm:min-h-[280px] sm:pt-16">
        <Reveal>
          <div className="flex items-center gap-3">
            <FolderSearch className="h-5 w-5 text-accent" />
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              Case Files
            </p>
          </div>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Projects <span className="text-accent-2">in the field</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      </Container>
    </HeroSection>
  );
}
