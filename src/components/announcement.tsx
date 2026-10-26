import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Floating glass notice strip that sits above the floating nav. */
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
    <div className="relative z-50 px-4 pt-5 sm:px-8">
      <div className="fx-glass-nav flex items-center justify-between gap-4 rounded-2xl px-5 py-2.5 text-center text-[11px] sm:text-[12.5px]">
        <p className="flex min-w-0 flex-1 items-center justify-center gap-3 sm:justify-start">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px] shadow-accent/50" />
          </span>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
            Notice
          </span>
          <span aria-hidden="true" className="hidden h-px w-8 bg-accent/40 sm:block" />
          <span className="truncate text-foreground/85">{text}</span>
        </p>
        <Link
          href={link}
          className="group hidden shrink-0 items-center gap-2 border-l border-accent/30 pl-5 font-mono text-[10.5px] font-medium uppercase tracking-[0.24em] text-accent transition-colors hover:text-accent-2 sm:inline-flex"
        >
          {linkLabel}
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
