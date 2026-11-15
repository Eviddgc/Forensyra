"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export interface NoticeItem {
  text: string;
  link: string;
  linkLabel: string;
}

/**
 * Floating glass notice strip that sits above the floating nav. With one
 * notice it is static; with several it crossfades between them every few
 * seconds, with a small mono pager. Auto-rotation stops for reduced motion.
 */
export function Announcement({
  enabled,
  text,
  link,
  linkLabel,
  notices,
}: {
  enabled: boolean;
  text: string;
  link: string;
  linkLabel: string;
  notices?: NoticeItem[];
}) {
  const items = useMemo<NoticeItem[]>(
    () => (notices && notices.length > 0 ? notices : [{ text, link, linkLabel }]),
    [notices, text, link, linkLabel],
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!enabled || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      7000,
    );
    return () => window.clearInterval(id);
  }, [enabled, items.length]);

  if (!enabled || items.length === 0) return null;

  const active = items[index % items.length];
  const many = items.length > 1;

  return (
    <div className="relative z-50 px-4 pt-5 sm:px-8">
      <div
        aria-live="polite"
        className="fx-glass-nav flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5 text-[11px] sm:gap-4 sm:px-5 sm:text-[12.5px]"
      >
        <p className="flex min-w-0 flex-1 items-center justify-center gap-2.5 sm:justify-start sm:gap-3">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px] shadow-accent/50" />
          </span>
          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-accent sm:text-[10px] sm:tracking-[0.28em]">
            Notice
            {many && (
              <span className="text-accent/55">
                {" "}
                {String(index + 1).padStart(2, "0")}/{String(items.length).padStart(2, "0")}
              </span>
            )}
          </span>
          <span aria-hidden="true" className="hidden h-px w-8 bg-accent/40 sm:block" />
          <span
            key={index}
            className="hidden min-w-0 animate-[fx-notice-fade_500ms_ease-out] sm:inline"
          >
            <span className="block truncate text-foreground/85">{active.text}</span>
          </span>
          <span
            key={`m-${index}`}
            className="min-w-0 flex-1 overflow-hidden animate-[fx-notice-fade_500ms_ease-out] sm:hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 14px, black calc(100% - 14px), transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 14px, black calc(100% - 14px), transparent)",
            }}
          >
            <span className="flex w-max animate-[fx-notice-marquee_16s_linear_infinite]">
              <span className="whitespace-nowrap pr-12 text-foreground/85">{active.text}</span>
              <span aria-hidden="true" className="whitespace-nowrap pr-12 text-foreground/85">
                {active.text}
              </span>
            </span>
          </span>
        </p>
        <Link
          key={`link-${index}`}
          href={active.link}
          className="group inline-flex shrink-0 animate-[fx-notice-fade_500ms_ease-out] items-center gap-1.5 border-l border-accent/30 pl-3 font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-accent transition-colors hover:text-accent-2 sm:gap-2 sm:pl-5 sm:text-[10.5px] sm:tracking-[0.24em]"
        >
          {active.linkLabel}
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
