import { Container } from "@/components/container";

/** Branded route-skeleton shown while a server page streams in. */
export default function Loading() {
  return (
    <Container className="py-24" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <div className="animate-pulse space-y-6">
        <div className="h-3 w-40 rounded-full bg-accent/20" />
        <div className="h-12 w-3/4 max-w-2xl rounded-2xl bg-foreground/[0.06]" />
        <div className="h-4 w-full max-w-xl rounded-full bg-foreground/[0.05]" />
        <div className="grid gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-40 rounded-2xl border border-border/60 bg-surface/40"
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
