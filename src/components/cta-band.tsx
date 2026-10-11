import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { btnPrimary, btnSecondary } from "@/lib/ui";

export function CtaBand({
  title,
  description,
  applyUrl,
  secondaryHref = "/contact",
  secondaryLabel = "Talk to us",
}: {
  title: string;
  description: string;
  applyUrl: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <Container className="mt-20">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-12">
        <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-70" />
        <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              Join the collective
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-muted">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={applyUrl}
              target="_blank"
              rel="noreferrer"
              className={btnPrimary}
            >
              Apply now
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={secondaryHref} className={btnSecondary}>
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
