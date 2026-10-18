"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import type { Entry } from "@/lib/content";

const FILTERS = ["All", "Mock Cases", "Research", "Analysis", "Published"] as const;
type Filter = (typeof FILTERS)[number];

/** Brand-artwork variants for card visuals (no stock photography). */
const VISUALS = ["fingerprint", "network", "terminal", "evidence"] as const;
type Visual = (typeof VISUALS)[number];

function visualForSlug(slug: string): Visual {
  const index = Math.abs(slug.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0)) % VISUALS.length;
  return VISUALS[index];
}

/** Decorative SVG panel standing in for a stock photo. */
function CardVisual({ variant }: { variant: Visual }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden",
        variant === "fingerprint" &&
          "bg-[radial-gradient(120%_110%_at_80%_30%,#1b365d_0%,#0d2238_55%,#071827_100%)]",
        variant === "network" &&
          "bg-[radial-gradient(120%_110%_at_75%_25%,#16304f_0%,#0d2238_50%,#071827_100%)]",
        variant === "terminal" &&
          "bg-[radial-gradient(120%_110%_at_80%_20%,#14304e_0%,#0d2238_50%,#071827_100%)]",
        variant === "evidence" &&
          "bg-[radial-gradient(120%_110%_at_75%_30%,#152e4b_0%,#0d2238_50%,#071827_100%)]",
      )}
    >
      <div className="bg-damask absolute inset-0 opacity-80" />
      {variant === "fingerprint" && (
        <svg
          className="absolute right-[10%] top-1/2 h-[14rem] w-[14rem] -translate-y-1/2 opacity-[0.15]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="90" stroke="#6aa0dc" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="75" stroke="#6aa0dc" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="60" stroke="#6aa0dc" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="45" stroke="#6aa0dc" strokeWidth="0.4" />
          <path d="M100 10 C 130 10 155 35 155 65 C 155 95 130 120 100 120 C 70 120 45 95 45 65 C 45 35 70 10 100 10" stroke="#6aa0dc" strokeWidth="0.8" />
          <path d="M100 25 C 120 25 140 45 140 65 C 140 85 120 105 100 105 C 80 105 60 85 60 65 C 60 45 80 25 100 25" stroke="#6aa0dc" strokeWidth="0.6" />
        </svg>
      )}
      {variant === "network" && (
        <svg
          className="absolute right-[5%] top-1/2 h-[16rem] w-[16rem] -translate-y-1/2 opacity-[0.15]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="80" stroke="#6aa0dc" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="55" stroke="#6aa0dc" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="30" stroke="#6aa0dc" strokeWidth="0.3" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="#6aa0dc" strokeWidth="0.3" />
          <line x1="20" y1="100" x2="180" y2="100" stroke="#6aa0dc" strokeWidth="0.3" />
          <line x1="44" y1="44" x2="156" y2="156" stroke="#6aa0dc" strokeWidth="0.3" />
          <line x1="156" y1="44" x2="44" y2="156" stroke="#6aa0dc" strokeWidth="0.3" />
          <circle cx="100" cy="20" r="4" fill="#6aa0dc" opacity="0.6" />
          <circle cx="100" cy="180" r="4" fill="#6aa0dc" opacity="0.6" />
          <circle cx="20" cy="100" r="4" fill="#6aa0dc" opacity="0.6" />
          <circle cx="180" cy="100" r="4" fill="#6aa0dc" opacity="0.6" />
        </svg>
      )}
      {variant === "terminal" && (
        <svg
          className="absolute right-[8%] top-1/2 h-[14rem] w-[14rem] -translate-y-1/2 opacity-[0.12]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <rect x="30" y="30" width="140" height="100" rx="4" stroke="#6aa0dc" strokeWidth="0.6" />
          <rect x="40" y="40" width="120" height="80" rx="2" stroke="#6aa0dc" strokeWidth="0.4" />
          <line x1="50" y1="55" x2="150" y2="55" stroke="#6aa0dc" strokeWidth="0.3" />
          <line x1="50" y1="65" x2="130" y2="65" stroke="#6aa0dc" strokeWidth="0.3" />
          <line x1="50" y1="75" x2="140" y2="75" stroke="#6aa0dc" strokeWidth="0.3" />
          <line x1="50" y1="85" x2="120" y2="85" stroke="#6aa0dc" strokeWidth="0.3" />
          <line x1="50" y1="95" x2="135" y2="95" stroke="#6aa0dc" strokeWidth="0.3" />
          <rect x="70" y="140" width="60" height="8" rx="2" stroke="#6aa0dc" strokeWidth="0.4" />
        </svg>
      )}
      {variant === "evidence" && (
        <svg
          className="absolute right-[10%] top-1/2 h-[14rem] w-[14rem] -translate-y-1/2 opacity-[0.12]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="70" stroke="#6aa0dc" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" stroke="#6aa0dc" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="30" stroke="#6aa0dc" strokeWidth="0.3" />
          <circle cx="100" cy="100" r="10" fill="#6aa0dc" opacity="0.4" />
          <line x1="100" y1="30" x2="100" y2="170" stroke="#6aa0dc" strokeWidth="0.3" />
          <line x1="30" y1="100" x2="170" y2="100" stroke="#6aa0dc" strokeWidth="0.3" />
        </svg>
      )}
      <div className="fx-orb absolute -right-[10%] top-[-20%] h-[10rem] w-[10rem] bg-[#6aa0dc]/10" />
      <div className="fx-scanlines absolute inset-0 opacity-[0.15]" />
    </div>
  );
}

function statusBadge(status?: string) {
  const value = (status ?? "").toLowerCase();
  if (value.includes("plan") || value.includes("progress") || value.includes("active"))
    return "border-accent/50 bg-accent/10 text-accent-2";
  if (value.includes("upcoming") || value.includes("research"))
    return "border-[#6aa0dc]/40 bg-[#6aa0dc]/10 text-[#9cc3ee]";
  if (value.includes("publish") || value.includes("complete") || value.includes("done"))
    return "border-success/40 bg-success/10 text-success";
  return "border-border bg-surface-2/60 text-muted";
}

export function ProjectsList({ projects }: { projects: Entry[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        (p.description ?? "").toLowerCase().includes(query.toLowerCase());
      const matchesFilter =
        filter === "All" ||
        (p.caseType ?? "").toLowerCase().includes(filter.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase()));
      return matchesQuery && matchesFilter;
    });
  }, [projects, query, filter]);

  return (
    <Container className="py-14 sm:py-20">
      {/* Section heading + search */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
            Our Investigations
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            Explore our case files, research projects, and public investigations.
            Each project includes a complete report, evidence analysis, and
            supporting write-ups, all based on legal and publicly available data.
          </p>
        </Reveal>

        <Reveal delay={80} className="shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                aria-label="Search projects"
                className="w-56 rounded-full border border-border bg-surface/60 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted/60 transition focus:border-accent/60 focus:outline-none sm:w-64"
              />
            </div>
            <span className="font-mono text-xs text-muted">
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </Reveal>
      </div>

      {/* Filter pills */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition",
              filter === f
                ? "border-accent bg-accent text-ink"
                : "border-border bg-surface/40 text-muted hover:border-accent/50 hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
        {filter !== "All" || query ? (
          <button
            type="button"
            onClick={() => {
              setFilter("All");
              setQuery("");
            }}
            className="ml-1 text-xs text-accent hover:underline"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {/* Project cards */}
      {filtered.length > 0 ? (
        <div className="mt-10 space-y-5">
          {filtered.map((project, index) => (
            <Reveal key={project.slug} delay={index * 60}>
              <Link
                href={`/projects/${project.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-[#6aa0dc]/25 bg-[#122b46]/50 transition-colors duration-300 hover:border-accent/40"
              >
                {/* Contextual visual on the right. */}
                <div className="absolute inset-y-0 right-0 hidden w-[38%] md:block">
                  <CardVisual variant={visualForSlug(project.slug)} />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#122b46]/70 via-transparent to-transparent" />
                </div>

                <div className="relative p-6 sm:p-8 md:max-w-[62%]">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em]",
                        project.caseType ? statusBadge(project.caseType) : "border-border bg-surface-2/60 text-muted",
                      )}
                    >
                      {project.caseType ?? "Case file"}
                    </span>
                    <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-0.5",
                          statusBadge(project.status),
                        )}
                      >
                        {project.status ?? "Planned"}
                      </span>
                      {project.date ? (
                        <span>
                          {new Date(project.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      ) : null}
                    </span>
                  </div>

                  <h3 className="font-display mt-4 text-xl font-semibold tracking-tight text-foreground transition group-hover:text-accent-2 sm:text-2xl">
                    {project.title}
                  </h3>

                  {project.description ? (
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
                      {project.description}
                    </p>
                  ) : null}

                  {project.tags.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border border-[#6aa0dc]/30 bg-[#0d2238]/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-2">
                    View details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-12 text-center">
          <p className="text-muted">No projects match your search.</p>
          <button
            type="button"
            onClick={() => {
              setFilter("All");
              setQuery("");
            }}
            className="mt-3 text-sm text-accent hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </Container>
  );
}
