import { Container } from "@/components/container";
import { Crown } from "@/components/crown";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-grid opacity-[0.22]" />
      <div className="absolute inset-0 bg-radial-glow" />

      {/* Slow golden sunburst */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 animate-spin-slower opacity-[0.28]"
        style={{
          background:
            "repeating-conic-gradient(from 0deg, rgba(201,154,71,0.12) 0deg 4deg, transparent 4deg 16deg)",
        }}
      />
      <div className="fx-scanlines pointer-events-none absolute inset-0 opacity-[0.18]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <Container className="relative py-16 sm:py-20">
        <div className="flex items-center gap-3">
          <Crown className="h-6 w-7 shrink-0 drop-shadow-[0_0_12px] drop-shadow-accent/60" />
          {eyebrow ? (
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              {eyebrow}
            </p>
          ) : null}
        </div>

        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-gradient-anim sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {description ? (
          <p className="mt-5 max-w-2xl text-lg text-muted">{description}</p>
        ) : null}

        {children ? <div className="mt-6">{children}</div> : null}
      </Container>
    </section>
  );
}
