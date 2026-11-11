"use client";

import { useState } from "react";
import { ArrowLeft, Check, ChevronRight, MousePointerClick, User } from "lucide-react";
import { Badge } from "@/components/badge";
import { cn } from "@/lib/utils";
import {
  MENTOR_FIRST_STEP,
  MENTOR_GUIDES,
  MENTORS_BY_ROLE,
} from "@/lib/mentor-guides";

type Role = { slug: string; title: string; description?: string };

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function Heading({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-accent/70">{n}</span>
      <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-accent">{children}</h4>
      <span className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
    </div>
  );
}

function rise(i: number) {
  return { animationDelay: `${i * 70}ms` };
}

export function MentorRoles({ roles }: { roles: Role[] }) {
  const available = roles.filter((r) => MENTOR_GUIDES[r.slug]);
  const [selected, setSelected] = useState<string | null>(null);
  const active = available.find((r) => r.slug === selected);
  const guide = active ? MENTOR_GUIDES[active.slug] : undefined;
  const mentors = active ? (MENTORS_BY_ROLE[active.slug] ?? []) : [];

  function choose(slug: string) {
    setSelected(slug);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      requestAnimationFrame(() =>
        document.getElementById("mentor-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] lg:items-start">
      {/* Left: all roles */}
      <nav
        aria-label="Roles"
        className={cn(
          "flex flex-col gap-2 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:p-1",
          selected !== null && "hidden lg:flex",
        )}
      >
        {available.map((role, index) => {
          const filled = (MENTORS_BY_ROLE[role.slug] ?? []).length > 0;
          const isActive = role.slug === selected;
          return (
            <button
              key={role.slug}
              type="button"
              aria-pressed={isActive}
              onClick={() => choose(role.slug)}
              className={cn(
                "group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-left transition duration-300 motion-safe:hover:translate-x-0.5",
                isActive
                  ? "border-accent bg-accent/[0.12] shadow-[0_0_0_1px_rgba(214,176,104,0.35),0_18px_44px_-18px_rgba(214,176,104,0.55)]"
                  : "fx-glass border-border hover:border-accent/50",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-0 left-0 w-1 bg-accent transition-opacity",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              />
              <span className={cn("font-mono text-xs", isActive ? "text-accent" : "text-muted")}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "min-w-0 flex-1 text-sm font-semibold",
                  isActive ? "text-accent-2" : "text-foreground",
                )}
              >
                {role.title}
              </span>
              <Badge variant={filled ? "success" : "accent"}>{filled ? "Filled" : "Open"}</Badge>
              <ChevronRight
                aria-hidden="true"
                className={cn("h-4 w-4 shrink-0 text-accent transition", isActive && "translate-x-0.5")}
              />
            </button>
          );
        })}
      </nav>

      {/* Right: idle prompt, or details of the chosen role */}
      {!active || !guide ? (
        <div className="fx-glass hidden min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-accent/30 p-10 text-center lg:flex">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
            <MousePointerClick aria-hidden="true" className="h-6 w-6" />
          </span>
          <p className="font-display mt-5 text-2xl font-semibold text-foreground">Choose a role</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Pick any role on the left to see its mentor, what they do, how they guide and what students gain.
          </p>
        </div>
      ) : (
        <section
          key={active.slug}
          id="mentor-detail"
          aria-live="polite"
          className="mentor-rise fx-glass relative scroll-mt-24 overflow-hidden rounded-2xl border border-accent/40 p-5 shadow-[0_30px_80px_-40px_rgba(214,176,104,0.45)] sm:p-8"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

          <button
            type="button"
            onClick={() => {
              setSelected(null);
              document.getElementById("mentor-roles-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-accent-2 lg:hidden"
          >
            <ArrowLeft className="h-4 w-4" /> All roles
          </button>

          <div className="relative flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Role</p>
              <h3 className="font-display mt-2 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                {active.title}
              </h3>
            </div>
            <Badge variant={mentors.length > 0 ? "success" : "accent"}>
              {mentors.length > 0 ? "Filled" : "Open"}
            </Badge>
          </div>
          <p className="relative mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{guide.summary}</p>

          {/* Mentor card first */}
          <div className="mentor-rise relative mt-6 flex flex-wrap gap-3" style={rise(1)}>
            {mentors.map((m) => (
              <div key={m.name} className="flex items-center gap-4 rounded-xl border border-accent/40 bg-[#151922]/70 p-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-accent/10 font-mono text-sm font-semibold text-accent">
                  {initials(m.name)}
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Your mentor</p>
                  <p className="text-base font-semibold text-foreground">{m.name}</p>
                  <p className="text-xs text-accent">{m.designation}</p>
                </div>
              </div>
            ))}
            {mentors.length === 0 ? (
              <div className="flex items-center gap-4 rounded-xl border border-dashed border-accent/40 bg-[#10141c]/50 p-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-dashed border-accent/40 bg-accent/5 text-accent/60">
                  <User aria-hidden="true" className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Your mentor</p>
                  <p className="text-base font-semibold text-foreground">Seat open</p>
                  <a href="/apply/mentor" className="text-xs font-medium text-accent-2 underline">
                    Become a mentor
                  </a>
                </div>
              </div>
            ) : null}
          </div>

          <div className="relative mt-9 space-y-9">
            {/* What the mentor does */}
            <div className="mentor-rise" style={rise(2)}>
              <Heading n="01">What the mentor does</Heading>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {guide.does.map((p) => (
                  <div key={p.t} className="rounded-xl border border-border bg-background/50 p-4 transition hover:border-accent/40">
                    <p className="text-sm font-semibold text-accent-2">{p.t}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{p.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How the mentor guides: step by step */}
            <div className="mentor-rise" style={rise(3)}>
              <Heading n="02">How the mentor guides, step by step</Heading>
              <ol className="mt-5 space-y-0">
                {[MENTOR_FIRST_STEP, ...guide.steps].map((s, i, all) => (
                  <li key={s.t} className="relative flex gap-4 pb-5 last:pb-0">
                    {i < all.length - 1 ? (
                      <span aria-hidden="true" className="absolute left-[15px] top-8 bottom-0 w-px bg-gradient-to-b from-accent/50 to-accent/10" />
                    ) : null}
                    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/60 bg-background font-mono text-xs font-semibold text-accent">
                      {i + 1}
                    </span>
                    <div className="pt-0.5">
                      <p className="text-sm font-semibold text-foreground">{s.t}</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-muted">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* What students gain */}
            <div className="mentor-rise" style={rise(4)}>
              <Heading n="03">What students gain</Heading>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {guide.gain.map((p) => (
                  <div key={p.t} className="flex gap-3 rounded-xl border border-accent/20 bg-accent/[0.06] p-4">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{p.t}</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-muted">{p.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Example tasks */}
            <div className="mentor-rise" style={rise(5)}>
              <Heading n="04">Example tasks</Heading>
              <ul className="mt-4 space-y-2">
                {guide.tasks.map((t, i) => (
                  <li key={t} className="flex gap-3 rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground">
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {guide.tools.map((t) => (
                  <span key={t} className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs text-accent-2">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
