"use client";

import { useState } from "react";
import { ChevronDown, User } from "lucide-react";
import { Badge } from "@/components/badge";
import { cardClass } from "@/lib/ui";
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

function Node({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative pb-6 last:pb-1">
      <span className="absolute -left-[35px] top-1 h-3.5 w-3.5 rounded-full border-2 border-accent bg-background" />
      <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{label}</h4>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
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
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {roles.map((role, index) => {
        const guide = MENTOR_GUIDES[role.slug];
        if (!guide) return null;
        const mentors = MENTORS_BY_ROLE[role.slug] ?? [];
        const isOpen = openSlug === role.slug;
        const panelId = `mentor-role-${role.slug}`;
        return (
          <div
            key={role.slug}
            className={cn(cardClass, "p-0", isOpen && "border-accent/50")}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenSlug(isOpen ? null : role.slug)}
              className="flex w-full items-start justify-between gap-4 p-5 text-left"
            >
              <div>
                <span className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-base font-semibold text-foreground">{role.title}</h3>
                {role.description ? (
                  <p className="mt-1 text-xs text-muted">{role.description}</p>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Badge variant={mentors.length > 0 ? "success" : "accent"}>
                  {mentors.length > 0 ? "Filled" : "Open"}
                </Badge>
                <ChevronDown
                  aria-hidden="true"
                  className={cn("h-4 w-4 text-accent transition-transform", isOpen && "rotate-180")}
                />
              </div>
            </button>

            {isOpen ? (
              <div id={panelId} className="px-5 pb-6">
                <div className="ml-2 border-l border-accent/35 pl-7 pt-2">
                  <Node label="What the mentor does">
                    <Bullets items={guide.does} />
                  </Node>
                  <Node label="How the mentor guides">
                    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
                      {MENTOR_FLOW.map((step) => (
                        <div key={step.title} className="rounded-xl border border-border bg-background/50 p-3">
                          <p className="text-[13px] font-semibold text-accent-2">{step.title}</p>
                          <p className="mt-1 text-[11.5px] leading-relaxed text-muted">{step.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Bullets items={guide.guides} />
                    </div>
                  </Node>
                  <Node label="What students learn">
                    <Bullets items={guide.learn} />
                  </Node>
                  <Node label="Your mentor">
                    <div className="flex flex-wrap gap-3">
                      {mentors.map((m) => (
                        <div
                          key={m.name}
                          className="flex w-44 flex-col items-center gap-2 rounded-xl border border-[#d4af5f]/25 bg-[#151922]/50 p-4 text-center"
                        >
                          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-mono text-sm font-semibold text-accent">
                            {initials(m.name)}
                          </div>
                          <p className="text-sm font-semibold text-foreground">{m.name}</p>
                          <p className="text-[11px] text-accent">{m.designation}</p>
                        </div>
                      ))}
                      {mentors.length === 0 ? (
                        <div className="flex w-44 flex-col items-center gap-2 rounded-xl border border-dashed border-[#d4af5f]/30 bg-[#10141c]/40 p-4 text-center">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-accent/30 bg-accent/5 text-accent/60">
                            <User aria-hidden="true" className="h-6 w-6" />
                          </div>
                          <p className="text-xs text-muted">Open seat</p>
                          <a href="/apply/mentor" className="text-[11px] font-medium text-accent-2 underline">
                            Become a mentor
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </Node>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
