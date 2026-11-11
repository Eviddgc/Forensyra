"use client";

import { useState } from "react";
import { ArrowLeft, ChevronRight, User } from "lucide-react";
import { Badge } from "@/components/badge";
import { cn } from "@/lib/utils";
import {
  MENTOR_FLOW,
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

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative border-t border-border pt-5">
      <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{label}</h4>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="relative pl-4 text-sm leading-relaxed text-foreground">
          <span className="absolute left-0 top-[9px] h-1.5 w-1.5 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function MentorRoles({ roles }: { roles: Role[] }) {
  const available = roles.filter((r) => MENTOR_GUIDES[r.slug]);
  // null = nothing chosen yet: desktop shows the first role, mobile shows the list.
  const [selected, setSelected] = useState<string | null>(null);
  const activeSlug = selected ?? available[0]?.slug;
  const active = available.find((r) => r.slug === activeSlug);
  const guide = active ? MENTOR_GUIDES[active.slug] : undefined;
  const mentors = active ? (MENTORS_BY_ROLE[active.slug] ?? []) : [];

  function choose(slug: string) {
    setSelected(slug);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      requestAnimationFrame(() =>
        document
          .getElementById("mentor-detail")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:items-start">
      {/* Left: all roles */}
      <nav
        aria-label="Roles"
        className={cn(
          "flex flex-col gap-2 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-1",
          selected !== null && "hidden lg:flex",
        )}
      >
        {available.map((role, index) => {
          const filled = (MENTORS_BY_ROLE[role.slug] ?? []).length > 0;
          const isActive = role.slug === activeSlug;
          return (
            <button
              key={role.slug}
              type="button"
              aria-pressed={isActive && (selected !== null || index === 0)}
              onClick={() => choose(role.slug)}
              className={cn(
                "fx-glass flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition hover:border-accent/50",
                isActive ? "border-accent/60 bg-accent/10" : "border-border",
              )}
            >
              <span className="font-mono text-xs text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1 text-sm font-semibold text-foreground">
                {role.title}
              </span>
              <Badge variant={filled ? "success" : "accent"}>{filled ? "Filled" : "Open"}</Badge>
              <ChevronRight aria-hidden="true" className={cn("h-4 w-4 shrink-0 text-accent transition", isActive && "translate-x-0.5")} />
            </button>
          );
        })}
      </nav>

      {/* Right: details of the chosen role */}
      {active && guide ? (
        <section
          id="mentor-detail"
          aria-live="polite"
          className={cn(
            "fx-glass scroll-mt-24 rounded-2xl border border-accent/30 p-5 sm:p-7",
            selected === null && "hidden lg:block",
          )}
        >
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

          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Role</p>
              <h3 className="font-display mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                {active.title}
              </h3>
              {active.description ? (
                <p className="mt-2 text-sm leading-relaxed text-muted">{active.description}</p>
              ) : null}
            </div>
            <Badge variant={mentors.length > 0 ? "success" : "accent"}>
              {mentors.length > 0 ? "Filled" : "Open"}
            </Badge>
          </div>

          {/* Mentor card first */}
          <div className="mt-6">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Your mentor</h4>
            <div className="mt-3 flex flex-wrap gap-3">
              {mentors.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center gap-4 rounded-xl border border-[#d4af5f]/30 bg-[#151922]/60 p-4"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-mono text-sm font-semibold text-accent">
                    {initials(m.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{m.name}</p>
                    <p className="text-xs text-accent">{m.designation}</p>
                  </div>
                </div>
              ))}
              {mentors.length === 0 ? (
                <div className="flex items-center gap-4 rounded-xl border border-dashed border-[#d4af5f]/35 bg-[#10141c]/50 p-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-dashed border-accent/35 bg-accent/5 text-accent/60">
                    <User aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Mentor seat open</p>
                    <a href="/apply/mentor" className="text-xs font-medium text-accent-2 underline">
                      Become a mentor
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <Section label="What the mentor does">
              <Bullets items={guide.does} />
            </Section>
            <Section label="How the mentor guides">
              <ol className="grid gap-2.5 sm:grid-cols-2">
                {MENTOR_FLOW.map((step, i) => (
                  <li key={step.title} className="flex gap-3 rounded-xl border border-border bg-background/50 p-3">
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="text-[13px] font-semibold text-accent-2">{step.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-4">
                <Bullets items={guide.guides} />
              </div>
            </Section>
            <Section label="What students learn">
              <Bullets items={guide.learn} />
            </Section>
          </div>
        </section>
      ) : null}
    </div>
  );
}
