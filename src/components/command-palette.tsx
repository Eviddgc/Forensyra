"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CornerDownLeft, Search, X } from "lucide-react";
import { searchDocs, type SearchDoc } from "@/lib/search-core";
import { cn } from "@/lib/utils";

/** Broadcast this to open the palette from anywhere (e.g. the header button). */
export const OPEN_SEARCH_EVENT = "fx:open-search";

const KIND_STYLE: Record<string, string> = {
  "Case file": "border-accent/50 bg-accent/10 text-accent-2",
  "Write-up": "border-[#6aa0dc]/40 bg-[#6aa0dc]/10 text-[#9cc3ee]",
  Role: "border-success/40 bg-success/10 text-success",
  Resource: "border-warning/40 bg-warning/10 text-warning",
  Page: "border-border bg-surface-2/60 text-muted",
};

/**
 * ⌘K / Ctrl-K command palette. Searches case files, write-ups, roles, learn
 * resources and pages — entirely client-side from the index passed in.
 */
export function CommandPalette({ docs }: { docs: SearchDoc[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(
    () => searchDocs(docs, query, 12),
    [docs, query],
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const go = useCallback(
    (doc: SearchDoc | undefined) => {
      if (!doc) return;
      close();
      if (doc.href.startsWith("http")) {
        window.open(doc.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(doc.href);
      }
    },
    [close, router],
  );

  // Global shortcuts + cross-component open event.
  useEffect(() => {
    function onKeydown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    }
    function onOpenRequest() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKeydown);
    window.addEventListener(OPEN_SEARCH_EVENT, onOpenRequest);
    return () => {
      window.removeEventListener("keydown", onKeydown);
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpenRequest);
    };
  }, []);

  // Focus the input and lock the page when open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(id);
    };
  }, [open]);

  const onListKeydown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[active]);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search FORENSYRA"
      className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh]"
    >
      <button
        type="button"
        aria-label="Close search"
        onClick={close}
        className="absolute inset-0 cursor-default bg-background/80 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border-gold/50 bg-surface shadow-[0_40px_80px_-30px] shadow-black/90">
        <div className="flex items-center gap-3 border-b border-border/60 px-4">
          <Search className="h-4 w-4 shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onListKeydown}
            role="combobox"
            aria-expanded="true"
            aria-controls="fx-palette-results"
            aria-activedescendant={
              results[active] ? `fx-palette-${active}` : undefined
            }
            placeholder="Search case files, write-ups, roles, tools…"
            className="h-14 w-full bg-transparent text-[15px] text-foreground placeholder:text-muted/60 focus:outline-none"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="rounded-full p-1.5 text-muted transition hover:bg-surface-2 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul
          id="fx-palette-results"
          ref={listRef}
          role="listbox"
          className="max-h-[min(60vh,26rem)] overflow-y-auto p-2"
        >
          {results.length === 0 ? (
            <li className="px-4 py-10 text-center text-sm text-muted">
              No matches for “{query}”.
            </li>
          ) : (
            results.map((doc, index) => {
              const external = doc.href.startsWith("http");
              return (
                <li key={`${doc.kind}-${doc.href}-${doc.title}`} role="none">
                  <button
                    type="button"
                    id={`fx-palette-${index}`}
                    role="option"
                    aria-selected={index === active}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => go(doc)}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition",
                      index === active
                        ? "bg-accent/12"
                        : "hover:bg-surface-2/70",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em]",
                        KIND_STYLE[doc.kind] ?? KIND_STYLE.Page,
                      )}
                    >
                      {doc.kind}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {doc.title}
                      </span>
                      {doc.description ? (
                        <span className="block truncate text-xs text-muted">
                          {doc.description}
                        </span>
                      ) : null}
                    </span>
                    {index === active ? (
                      <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-accent" />
                    ) : external ? (
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted/50 transition group-hover:text-accent-2" />
                    ) : null}
                  </button>
                </li>
              );
            })
          )}
        </ul>

        <div className="flex items-center justify-between gap-3 border-t border-border/60 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          <span className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
          </span>
          <span className="flex items-center gap-2">
            <kbd className="rounded border border-border bg-surface-2 px-1.5 py-0.5">
              Esc
            </kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}
