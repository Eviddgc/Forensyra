"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";
import { cn } from "@/lib/utils";

/**
 * Sticky table of contents. Highlights the section currently in view using an
 * IntersectionObserver, and keeps itself scrollable on long articles.
 */
export function ArticleToc({
  items,
  title = "On this page",
}: {
  items: TocItem[];
  title?: string;
}) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -65% 0px", threshold: [0, 1] },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
        {title}
      </p>
      <ol className="mt-4 space-y-0.5 border-l border-border/70">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pr-2 transition-colors",
                  item.level === 3 ? "pl-7 text-[13px]" : "pl-4",
                  isActive
                    ? "border-accent text-accent-2"
                    : "border-transparent text-muted hover:border-border hover:text-foreground",
                )}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
