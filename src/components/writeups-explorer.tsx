"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  Search,
  SlidersHorizontal,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface WriteupCardData {
  slug: string;
  title: string;
  description: string;
  date?: string;
  author?: string;
  tags: string[];
  minutes: number;
}

/** Brand-artwork variants for card visuals (no stock photography). */
const VISUALS = ["document", "fingerprint", "terminal", "network"] as const;
type Visual = (typeof VISUALS)[number];

function visualForSlug(slug: string): Visual {
  const index =
    Math.abs(slug.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0)) %
    VISUALS.length;
  return VISUALS[index];
}

/** Decorative SVG panel standing in for a stock photo. */
function CardVisual({ variant }: { variant: Visual }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden",
        variant === "document" &&
          "bg-[radial-gradient(120%_110%_at_80%_30%,#22262f_0%,#10141c_55%,#080D15_100%)]",
        variant === "fingerprint" &&
          "bg-[radial-gradient(120%_110%_at_75%_25%,#1b1f29_0%,#10141c_50%,#080D15_100%)]",
        variant === "terminal" &&
          "bg-[radial-gradient(120%_110%_at_80%_20%,#14304e_0%,#10141c_50%,#080D15_100%)]",
        variant === "network" &&
          "bg-[radial-gradient(120%_110%_at_75%_30%,#152e4b_0%,#10141c_50%,#080D15_100%)]",
      )}
    >
      <div className="bg-damask absolute inset-0 opacity-80" />
      {variant === "document" && (
        <svg
          className="absolute right-[10%] top-1/2 h-[12rem] w-[12rem] -translate-y-1/2 opacity-[0.15]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <rect x="40" y="20" width="120" height="160" rx="4" stroke="#d4af5f" strokeWidth="0.8" />
          <rect x="55" y="40" width="90" height="6" rx="2" fill="#d4af5f" opacity="0.4" />
          <rect x="55" y="55" width="70" height="4" rx="2" fill="#d4af5f" opacity="0.3" />
          <rect x="55" y="65" width="80" height="4" rx="2" fill="#d4af5f" opacity="0.3" />
          <rect x="55" y="75" width="60" height="4" rx="2" fill="#d4af5f" opacity="0.3" />
          <rect x="55" y="85" width="75" height="4" rx="2" fill="#d4af5f" opacity="0.3" />
        </svg>
      )}
      {variant === "fingerprint" && (
        <svg
          className="absolute right-[10%] top-1/2 h-[12rem] w-[12rem] -translate-y-1/2 opacity-[0.15]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="90" stroke="#d4af5f" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="75" stroke="#d4af5f" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="60" stroke="#d4af5f" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="45" stroke="#d4af5f" strokeWidth="0.4" />
          <path d="M100 10 C 130 10 155 35 155 65 C 155 95 130 120 100 120 C 70 120 45 95 45 65 C 45 35 70 10 100 10" stroke="#d4af5f" strokeWidth="0.8" />
          <path d="M100 25 C 120 25 140 45 140 65 C 140 85 120 105 100 105 C 80 105 60 85 60 65 C 60 45 80 25 100 25" stroke="#d4af5f" strokeWidth="0.6" />
        </svg>
      )}
      {variant === "terminal" && (
        <svg
          className="absolute right-[8%] top-1/2 h-[12rem] w-[12rem] -translate-y-1/2 opacity-[0.12]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <rect x="30" y="30" width="140" height="100" rx="4" stroke="#d4af5f" strokeWidth="0.6" />
          <rect x="40" y="40" width="120" height="80" rx="2" stroke="#d4af5f" strokeWidth="0.4" />
          <line x1="50" y1="55" x2="150" y2="55" stroke="#d4af5f" strokeWidth="0.3" />
          <line x1="50" y1="65" x2="130" y2="65" stroke="#d4af5f" strokeWidth="0.3" />
          <line x1="50" y1="75" x2="140" y2="75" stroke="#d4af5f" strokeWidth="0.3" />
          <line x1="50" y1="85" x2="120" y2="85" stroke="#d4af5f" strokeWidth="0.3" />
          <line x1="50" y1="95" x2="135" y2="95" stroke="#d4af5f" strokeWidth="0.3" />
        </svg>
      )}
      {variant === "network" && (
        <svg
          className="absolute right-[10%] top-1/2 h-[12rem] w-[12rem] -translate-y-1/2 opacity-[0.12]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="70" stroke="#d4af5f" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" stroke="#d4af5f" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="30" stroke="#d4af5f" strokeWidth="0.3" />
          <line x1="100" y1="30" x2="100" y2="170" stroke="#d4af5f" strokeWidth="0.3" />
          <line x1="30" y1="100" x2="170" y2="100" stroke="#d4af5f" strokeWidth="0.3" />
          <circle cx="100" cy="30" r="4" fill="#d4af5f" opacity="0.6" />
          <circle cx="100" cy="170" r="4" fill="#d4af5f" opacity="0.6" />
          <circle cx="30" cy="100" r="4" fill="#d4af5f" opacity="0.6" />
          <circle cx="170" cy="100" r="4" fill="#d4af5f" opacity="0.6" />
        </svg>
      )}
      <div className="fx-orb absolute -right-[10%] top-[-20%] h-[8rem] w-[8rem] bg-[#d4af5f]/10" />
      <div className="fx-scanlines absolute inset-0 opacity-[0.15]" />
    </div>
  );
}

function formatDate(date?: string) {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function WriteupCard({ entry }: { entry: WriteupCardData }) {
  return (
    <Link
      href={`/writeups/${entry.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#d4af5f]/25 bg-[#151922]/50 transition-colors duration-300 hover:border-accent/40"
    >
      <div className="relative h-40 overflow-hidden">
        <CardVisual variant={visualForSlug(entry.slug)} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151922] via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-[#d4af5f]/30 bg-[#10141c]/80 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted backdrop-blur-sm">
            Write-up
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#d4af5f]/30 bg-[#10141c]/80 px-2.5 py-0.5 font-mono text-[10px] text-muted backdrop-blur-sm">
            <Clock className="h-2.5 w-2.5" />
            {entry.minutes} min
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
          <Calendar className="h-3 w-3" />
          {formatDate(entry.date)}
          {entry.author ? (
            <>
              <span className="text-border">·</span>
              <User className="h-3 w-3" />
              {entry.author}
            </>
          ) : null}
        </div>

        <h3 className="font-display mt-3 text-lg font-semibold leading-snug tracking-tight text-foreground transition group-hover:text-accent-2">
          {entry.title}
        </h3>

        {entry.description ? (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
            {entry.description}
          </p>
        ) : null}

        {entry.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {entry.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-[#d4af5f]/25 bg-[#10141c]/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-accent-2">
          Read more
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

type SortKey = "newest" | "oldest" | "title";

const SORTS: Array<{ value: SortKey; label: string }> = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title", label: "Title A–Z" },
];

/**
 * Client-side explorer for the write-up archive: free-text search across title,
 * summary, author and tags, plus tag chips and sorting. The whole archive is
 * small enough to filter in the browser, so results are instant.
 */
export function WriteupsExplorer({ items }: { items: WriteupCardData[] }) {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("newest");

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      for (const tag of item.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag);
  }, [items]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = items.filter((item) => {
      const matchesQuery = q
        ? [item.title, item.description, item.author ?? "", item.tags.join(" ")]
            .join(" ")
            .toLowerCase()
            .includes(q)
        : true;
      const matchesTags =
        activeTags.length === 0 ||
        activeTags.every((tag) => item.tags.includes(tag));
      return matchesQuery && matchesTags;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      const da = a.date ? Date.parse(a.date) : 0;
      const db = b.date ? Date.parse(b.date) : 0;
      return sort === "newest" ? db - da : da - db;
    });
  }, [items, query, activeTags, sort]);

  function toggleTag(tag: string) {
    setActiveTags((previous) =>
      previous.includes(tag)
        ? previous.filter((item) => item !== tag)
        : [...previous, tag],
    );
  }

  const filtering = query.trim().length > 0 || activeTags.length > 0;

  return (
    <div>
      {/* Toolbar */}
      <div className="mt-8 rounded-2xl border border-border bg-surface/40 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <label htmlFor="fx-writeup-search" className="sr-only">
              Search write-ups
            </label>
            <input
              id="fx-writeup-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search write-ups by title, topic or author…"
              className="w-full rounded-full border border-border bg-background/50 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted/60 transition focus:border-accent/60 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted" />
            <label htmlFor="fx-writeup-sort" className="sr-only">
              Sort write-ups
            </label>
            <select
              id="fx-writeup-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="rounded-full border border-border bg-background/50 px-3.5 py-2.5 text-sm text-foreground transition focus:border-accent/60 focus:outline-none"
            >
              {SORTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Topics
            </span>
            {tags.map((tag) => {
              const active = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] transition",
                    active
                      ? "border-accent bg-accent/15 text-accent-2"
                      : "border-[#d4af5f]/25 bg-[#10141c]/50 text-muted hover:border-accent/50 hover:text-foreground",
                  )}
                >
                  {tag}
                </button>
              );
            })}
            {filtering ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveTags([]);
                }}
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-muted transition hover:text-foreground"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <p className="mt-5 text-sm text-muted" aria-live="polite">
        {results.length} of {items.length} write-up
        {items.length === 1 ? "" : "s"}
        {filtering ? " match your filters" : ""}
      </p>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((entry) => (
            <WriteupCard key={entry.slug} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-border bg-surface/40 p-12 text-center">
          <p className="text-muted">No write-ups match those filters.</p>
          <p className="mt-2 text-sm text-muted/70">
            Try clearing a topic, or search for something broader.
          </p>
        </div>
      )}
    </div>
  );
}
