import { cn } from "@/lib/utils";

/** A gold filigree divider — a line, a diamond, a line. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/50 to-accent/80" />
      <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-accent/50 to-accent/80" />
    </div>
  );
}
