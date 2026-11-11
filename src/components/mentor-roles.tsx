"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronRight, Clock, MousePointerClick, Repeat2, TriangleAlert, User, Wrench } from "lucide-react";
import { Badge } from "@/components/badge";
import { cn } from "@/lib/utils";
import { MENTOR_GUIDES, MENTOR_INTRO, MENTORS_BY_ROLE, type MentorGuide } from "@/lib/mentor-guides";

type Role = { slug: string; title: string; description?: string };

const TABS = [
  { id: "part", label: "Your part" },
  { id: "flow", label: "How you guide" },
  { id: "review", label: "Feedback and quality" },
  { id: "tools", label: "Tools and rhythm" },
  { id: "growth", label: "Student growth" },
] as const;
type TabId = (typeof TABS)[number]["id"];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function rise(i: number) {
  return { animationDelay: `${i * 70}ms` };
}

function Flow({ guide }: { guide: MentorGuide }) {
  const [step, setStep] = useState(0);
  const stage = guide.stages[step];
  return (
    <div>
      <p className="rounded-xl border border-accent/25 bg-accent/[0.07] px-4 py-3 text-[13px] leading-relaxed text-accent-2">
        {MENTOR_INTRO}
      </p>
      <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
        <ol className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0" role="tablist" aria-label="Guidance stages">
          {guide.stages.map((s, i) => (
            <li key={s.t} className="shrink-0 md:shrink">
              <button
                type="button"
                role="tab"
                aria-selected={i === step}
                onClick={() => setStep(i)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition",
                  i === step
                    ? "border-accent bg-accent/[0.12] shadow-[0_12px_30px_-16px_rgba(214,176,104,0.6)]"
                    : "border-border bg-background/40 hover:border-accent/40",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold",
                    i === step ? "border-accent bg-accent text-ink" : "border-accent/40 text-accent",
                  )}
                >
                  {i + 1}
                </span>
                <span className={cn("whitespace-nowrap text-sm font-semibold md:whitespace-normal", i === step ? "text-accent-2" : "text-foreground")}>
                  {s.t}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div key={step} className="mentor-rise rounded-2xl border border-border bg-background/50 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Stage {step + 1} of {guide.stages.length}</p>
          <h5 className="font-display mt-1 text-xl font-semibold text-foreground">{stage.t}</h5>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-border p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Starts from</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground">{stage.inputs}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Students do</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground">{stage.students}</p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/[0.08] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">The mentor</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground">{stage.mentor}</p>
            </div>
            <p className="flex items-center gap-2 text-[13px] text-muted">
              <ArrowRight className="h-4 w-4 shrink-0 text-accent" /> Produces: <span className="font-semibold text-accent-2">{stage.output}</span>
            </p>
            <p className="rounded-xl border border-success/30 bg-success/10 px-3 py-2 text-[13px] leading-relaxed text-foreground">
              <span className="font-semibold text-success">Quality bar: </span>{stage.bar}
            </p>
          </div>
          <div className="mt-5 flex justify-between gap-3">
            <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)} className="rounded-full border border-border px-4 py-1.5 text-xs text-foreground transition enabled:hover:border-accent disabled:opacity-30">
              Previous
            </button>
            <button type="button" disabled={step === guide.stages.length - 1} onClick={() => setStep(step + 1)} className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-ink transition enabled:hover:bg-accent-2 disabled:opacity-30">
              Next stage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ role, guide, onBack }: { role: Role; guide: MentorGuide; onBack: () => void }) {
  const [tab, setTab] = useState<TabId>("part");
  const mentors = MENTORS_BY_ROLE[role.slug] ?? [];
  return (
    <section
      id="mentor-detail"
      aria-live="polite"
      className="mentor-rise fx-glass relative scroll-mt-24 overflow-hidden rounded-2xl border border-accent/40 p-4 shadow-[0_30px_80px_-40px_rgba(214,176,104,0.45)] sm:p-6"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <button type="button" onClick={onBack} className="mb-4 inline-flex items-center gap-1.5 text-sm text-accent-2 lg:hidden">
        <ArrowLeft className="h-4 w-4" /> All roles
      </button>

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">{guide.tagline}</p>
          <h3 className="font-display mt-2 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">{role.title}</h3>
        </div>
        <Badge variant={mentors.length > 0 ? "success" : "accent"}>{mentors.length > 0 ? "Filled" : "Open"}</Badge>
      </div>
      <p className="relative mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{guide.summary}</p>

      {/* Mentor card first */}
      <div className="mentor-rise relative mt-4 flex flex-wrap gap-3" style={rise(1)}>
        {mentors.map((m) => (
          <div key={m.name} className="flex items-center gap-4 rounded-xl border border-accent/40 bg-[#151922]/70 p-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-accent/10 font-mono text-sm font-semibold text-accent">{initials(m.name)}</div>
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
              <a href="/apply/mentor" className="text-xs font-medium text-accent-2 underline">Become a mentor</a>
            </div>
          </div>
        ) : null}
      </div>

      {/* Tabs */}
      <div role="tablist" aria-label="Role sections" className="relative mt-5 flex gap-1 overflow-x-auto rounded-full border border-border bg-background/50 p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition",
              tab === t.id ? "bg-accent text-ink shadow-[0_8px_24px_-10px_rgba(214,176,104,0.8)]" : "text-muted hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div key={tab} className="mentor-rise relative mt-6">
        {tab === "part" ? (
          <div className="space-y-3">
            {guide.part.map((p, i) => (
              <div key={p.t} className="flex gap-4 rounded-xl border border-border bg-background/50 p-4 transition hover:border-accent/40">
                <span className="font-display text-2xl font-semibold text-accent/70">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-sm font-semibold text-accent-2">{p.t}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">{p.d}</p>
                </div>
              </div>
            ))}
            <p className="pt-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">Decisions you will coach</p>
            <div className="grid gap-3 md:grid-cols-3">
              {guide.decisions.map((d) => (
                <div key={d.q} className="rounded-xl border border-accent/20 bg-accent/[0.06] p-4">
                  <p className="text-sm font-semibold text-foreground">{d.q}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{d.c}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/[0.07] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{guide.unique.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground">{guide.unique.items}</p>
            </div>
          </div>
        ) : null}

        {tab === "flow" ? <Flow guide={guide} /> : null}

        {tab === "review" ? (
          <div className="space-y-6">
            <div>
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-accent"><Repeat2 className="h-3.5 w-3.5" /> The feedback loop</p>
              <ol className="mt-3 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
                {guide.loop.map((l, i) => (
                  <li key={l} className="relative rounded-xl border border-border bg-background/50 p-4 text-[13px] leading-relaxed text-foreground">
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-1">{l}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Weak work and strong work</p>
              <div className="mt-3 overflow-hidden rounded-xl border border-border">
                {guide.vs.map((v, i) => (
                  <div key={v.a} className={cn("grid gap-2 p-4 md:grid-cols-[0.6fr_1fr_1fr]", i > 0 && "border-t border-border")}>
                    <p className="text-sm font-semibold text-accent-2">{v.a}</p>
                    <p className="text-[13px] leading-relaxed text-muted"><span className="font-semibold text-danger">Weak: </span>{v.weak}</p>
                    <p className="text-[13px] leading-relaxed text-foreground"><span className="font-semibold text-success">Strong: </span>{v.strong}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">What the mentor reviews</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {guide.review.map((r) => (
                <div key={r.t} className="rounded-xl border border-accent/20 bg-accent/[0.06] p-4">
                  <p className="text-sm font-semibold text-foreground">{r.t}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">{r.d}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-border bg-background/50 p-4">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                <TriangleAlert className="h-3.5 w-3.5" /> Mistakes the mentor helps correct
              </p>
              <ul className="mt-3 space-y-2">
                {guide.mistakes.map((m) => (
                  <li key={m} className="relative pl-4 text-sm leading-relaxed text-foreground">
                    <span className="absolute left-0 top-[9px] h-1.5 w-1.5 rounded-full bg-accent" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        {tab === "tools" ? (
          <div className="space-y-6">
            <div>
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-accent"><Clock className="h-3.5 w-3.5" /> Time and rhythm</p>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {guide.rhythm.map((r) => (
                  <div key={r.w} className="rounded-xl border border-accent/20 bg-accent/[0.06] p-4">
                    <p className="text-sm font-semibold text-accent-2">{r.w}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">{r.d}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted">About 1 to 2 hours a month in total. No fixed schedule. Telugu or English.</p>
            </div>
            <div>
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-accent"><Wrench className="h-3.5 w-3.5" /> Tools and artefacts in this role</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {guide.tools.map((t) => (
                  <div key={t.n} className="rounded-xl border border-border bg-background/50 p-4">
                    <p className="text-sm font-semibold text-foreground">{t.n}</p>
                    <p className="mt-1 text-[13px] text-muted">{t.u}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {tab === "growth" ? (
          <div className="space-y-3">
            {guide.growth.map((g) => (
              <div key={g.a} className="grid items-center gap-3 rounded-xl border border-border bg-background/50 p-4 sm:grid-cols-[1fr_auto_1fr]">
                <p className="text-sm text-muted">{g.a}</p>
                <ArrowRight className="hidden h-4 w-4 text-accent sm:block" />
                <p className="text-sm font-semibold text-accent-2">{g.b}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function MentorRoles({ roles }: { roles: Role[] }) {
  const available = roles.filter((r) => MENTOR_GUIDES[r.slug]);
  const [selected, setSelected] = useState<string | null>(null);
  const active = available.find((r) => r.slug === selected);
  const guide = active ? MENTOR_GUIDES[active.slug] : undefined;

  function choose(slug: string) {
    setSelected(slug);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      requestAnimationFrame(() => document.getElementById("mentor-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:items-start">
      <nav
        aria-label="Roles"
        className={cn("flex flex-col gap-2 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:p-1", selected !== null && "hidden lg:flex")}
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
                "relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-left transition duration-300 motion-safe:hover:translate-x-0.5",
                isActive
                  ? "border-accent bg-accent/[0.12] shadow-[0_0_0_1px_rgba(214,176,104,0.35),0_18px_44px_-18px_rgba(214,176,104,0.55)]"
                  : "fx-glass border-border hover:border-accent/50",
              )}
            >
              <span aria-hidden="true" className={cn("absolute inset-y-0 left-0 w-1 bg-accent transition-opacity", isActive ? "opacity-100" : "opacity-0")} />
              <span className={cn("font-mono text-xs", isActive ? "text-accent" : "text-muted")}>{String(index + 1).padStart(2, "0")}</span>
              <span className={cn("min-w-0 flex-1 text-sm font-semibold", isActive ? "text-accent-2" : "text-foreground")}>{role.title}</span>
              <Badge variant={filled ? "success" : "accent"}>{filled ? "Filled" : "Open"}</Badge>
              <ChevronRight aria-hidden="true" className={cn("h-4 w-4 shrink-0 text-accent transition", isActive && "translate-x-0.5")} />
            </button>
          );
        })}
      </nav>

      {!active || !guide ? (
        <div className="fx-glass hidden min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-accent/30 p-10 text-center lg:flex">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
            <MousePointerClick aria-hidden="true" className="h-6 w-6" />
          </span>
          <p className="font-display mt-5 text-2xl font-semibold text-foreground">Choose a role</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">Pick any role on the left to see its mentor, what they do and how they guide.</p>
        </div>
      ) : (
        <Detail
          key={active.slug}
          role={active}
          guide={guide}
          onBack={() => {
            setSelected(null);
            document.getElementById("mentor-roles-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
      )}
    </div>
  );
}
