import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "accent"
  | "muted"
  | "success"
  | "warning"
  | "outline";

const VARIANTS: Record<BadgeVariant, string> = {
  default: "border-border bg-surface-2 text-foreground",
  accent:
    "border-accent/30 bg-accent/10 text-accent",
  muted: "border-border bg-surface text-muted",
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  outline: "border-border bg-transparent text-muted",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
