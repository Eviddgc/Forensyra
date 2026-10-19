import { Container } from "@/components/container";
import { HeroSection } from "@/components/heroes/hero-backdrop";
import type { HeroVariant } from "@/components/heroes/hero-art";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  variant = "apply",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  variant?: HeroVariant;
}) {
  return (
    <HeroSection variant={variant}>
      <Container className="relative z-10 flex min-h-[420px] items-center py-20 sm:min-h-[470px] sm:py-24 lg:min-h-[500px]">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-gradient-anim sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {description ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {description}
            </p>
          ) : null}

          {children ? <div className="mt-6">{children}</div> : null}
        </div>
      </Container>
    </HeroSection>
  );
}
