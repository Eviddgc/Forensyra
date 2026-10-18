import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

/** Premium announcement bar — Section 1 of the homepage shell. */
export function Announcement({
  enabled,
  text,
  link,
  linkLabel,
}: {
  enabled: boolean;
  text: string;
  link: string;
  linkLabel: string;
}) {
  if (!enabled) return null;

  return (
    <div className="relative z-50 overflow-hidden border-b border-border-gold/60 bg-[#0a1a2c]">
      {/* Animated gold gradient sweep. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--color-accent) 6%, transparent) 20%, color-mix(in oklab, var(--color-accent) 12%, transparent) 50%, color-mix(in oklab, var(--color-accent) 6%, transparent) 80%, transparent 100%)",
          animation: "fx-announce-sweep 6s ease-in-out infinite",
        }}
      />
      {/* Subtle scanlines. */}
      <div className="fx-scanlines pointer-events-none absolute inset-0 opacity-[0.08]" />

      <Container className="relative flex items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center text-[11px] sm:justify-between sm:text-xs">
        <p className="flex items-center gap-2.5">
          {/* Animated gold pulse dot. */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_2px] shadow-accent/60" />
          </span>
          <span className="font-mono uppercase tracking-[0.24em] text-accent">
            Notice
          </span>
          <span aria-hidden="true" className="text-border">
            —
          </span>
          <span className="text-foreground/85">{text}</span>
        </p>
        <Link
          href={link}
          className={cn(
            "group hidden shrink-0 items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent transition-all duration-200 hover:border-accent/60 hover:bg-accent/20 hover:text-accent-2 sm:inline-flex",
          )}
        >
          <Sparkles className="h-3 w-3" />
          {linkLabel}
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Container>

    </div>
  );
}
