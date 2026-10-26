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
      <Container className="relative z-10 flex min-h-[260px] items-center pb-8 pt-14 sm:min-h-[280px] sm:pt-16">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="font-display mt-4 text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title.includes(" ") ? (
              <>
                {title.slice(0, title.lastIndexOf(" ") + 1)}
                <span className="text-accent-2">{title.slice(title.lastIndexOf(" ") + 1)}</span>
              </>
            ) : (
              title
            )}
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
