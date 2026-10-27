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
      <div className="fx-glass-nav flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5 text-[11px] sm:gap-4 sm:px-5 sm:text-[12.5px]">
        <p className="flex min-w-0 flex-1 items-center justify-center gap-2.5 sm:justify-start sm:gap-3">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px] shadow-accent/50" />
          </span>
          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-accent sm:text-[10px] sm:tracking-[0.28em]">
            Notice
          </span>
          <span aria-hidden="true" className="hidden h-px w-8 bg-accent/40 sm:block" />
          <span className="hidden truncate text-foreground/85 sm:inline">{text}</span>
          <span
            className="min-w-0 flex-1 overflow-hidden sm:hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 14px, black calc(100% - 14px), transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 14px, black calc(100% - 14px), transparent)",
            }}
          >
            <span className="flex w-max animate-[fx-notice-marquee_16s_linear_infinite]">
              <span className="whitespace-nowrap pr-12 text-foreground/85">{text}</span>
              <span aria-hidden="true" className="whitespace-nowrap pr-12 text-foreground/85">
                {text}
              </span>
            </span>
          </span>
        </p>
        <Link
          href={link}
          className="group inline-flex shrink-0 items-center gap-1.5 border-l border-accent/30 pl-3 font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-accent transition-colors hover:text-accent-2 sm:gap-2 sm:pl-5 sm:text-[10.5px] sm:tracking-[0.24em]"
        >
          {linkLabel}
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
