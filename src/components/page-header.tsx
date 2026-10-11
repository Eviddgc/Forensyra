import Image from "next/image";
import { Container } from "@/components/container";

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

      {/* The emblem is the only hero visual on inner pages, so they read as
          unmistakably FORENSYRA. */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center xl:justify-end">
        <Image
          src="/brand-mark.png"
          alt=""
          width={768}
          height={768}
          sizes="(max-width: 1280px) 52vw, 15rem"
          className="h-[min(52vw,11rem)] w-auto opacity-[0.13] drop-shadow-[0_0_60px_rgba(230,182,79,0.4)] xl:mr-[3%] xl:h-[15rem] xl:translate-x-[3%] xl:opacity-90"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <Container className="relative py-16 sm:py-20">
        {eyebrow ? (
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
            {eyebrow}
          </p>
        ) : null}

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
