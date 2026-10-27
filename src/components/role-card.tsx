"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import Link from "next/link";
import { Lock, Plus } from "lucide-react";
import { Badge } from "@/components/badge";
import { cardClass } from "@/lib/ui";
import type { Entry } from "@/lib/content";
import { cn, phaseLabel } from "@/lib/utils";

export function RoleCard({
  role,
  index,
  holders = [],
}: {
  role: Entry;
  index: number;
  holders?: Entry[];
}) {
  const filled = holders.length > 0;

  if (role.comingSoon) {
    return (
      <div
        className={cn(
          cardClass,
          "relative flex flex-col gap-3 overflow-hidden p-5 opacity-70 select-none md:h-[148px]",
        )}
      >
        {/* blurred content hint */}
        <div className="flex items-start gap-3">
          <span className="font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-foreground blur-[3px]">
              {role.title}
            </h3>
            {role.description ? (
              <p className="mt-1 text-sm text-muted blur-[2px]">
                {role.description}
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
            {role.phase !== undefined ? (
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                {phaseLabel(role.phase)}
              </span>
            ) : null}
            <Badge variant="muted">Soon</Badge>
          </div>
        </div>

        {/* lock overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-[inherit] bg-background/60 backdrop-blur-[1px]">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
            <Lock className="h-4 w-4" />
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            Revealing soon
          </p>
          <p className="max-w-[16rem] text-center text-xs text-muted">
            This role is coming in Phase 2. Stay tuned.
          </p>
        </div>
      </div>
    );
  }

  return <ExpandCard role={role} index={index} holders={holders} filled={filled} />;
}

function ExpandCard({
  role,
  index,
  holders,
  filled,
}: {
  role: Entry;
  index: number;
  holders: Entry[];
  filled: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Lift the whole grid cell above its neighbours while open (the cell sits
  // inside a Reveal stacking context, so z-index must be set on the wrapper).
  useEffect(() => {
    const cell = ref.current?.closest<HTMLElement>("[id^='role-']");
    if (!cell) return;
    cell.style.position = "relative";
    cell.style.zIndex = open ? "50" : "";
  }, [open]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 5, y: px * 9 });
  };

  const lifted = open
    ? ({
        "--t": `perspective(1100px) rotateX(${tilt.x + 2}deg) rotateY(${tilt.y}deg) translateY(-10px) translateZ(40px) scale(1.04)`,
      } as CSSProperties)
    : undefined;

  return (
    <div
      className="relative md:h-[148px] [perspective:1100px]"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        setOpen(false);
        setTilt({ x: 0, y: 0 });
      }}
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) setOpen(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        style={lifted}
        className={cn(
          "group flex flex-col rounded-2xl border p-5 backdrop-blur-xl will-change-transform [transform-style:preserve-3d]",
          "transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none",
          "relative md:absolute md:inset-x-0 md:top-0 md:[transform:var(--t,none)]",
          open
            ? "z-30 border-accent/80 bg-[#0f131b] shadow-[0_0_0_1px_rgba(214,176,104,0.25),0_0_46px_-6px_rgba(214,176,104,0.45),0_36px_70px_-20px_rgba(0,0,0,0.85)]"
            : "z-0 border-[#d6b068]/25 bg-[linear-gradient(160deg,rgba(28,29,33,0.78),rgba(9,13,21,0.82))] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)]",
        )}
      >
        {open ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(115deg,rgba(255,235,190,0.12),transparent_40%)]"
          />
        ) : null}
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full cursor-pointer items-start justify-between gap-3 text-left"
        >
          <div className="flex items-start gap-3">
            <span className="font-mono text-xs text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground">{role.title}</h3>
              {role.description ? (
                <p
                  className={cn(
                    "mt-1 text-sm text-muted",
                    open ? "" : "line-clamp-2",
                  )}
                >
                  {role.description}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <Badge variant={filled ? "success" : "accent"}>
              {filled ? "Filled" : "Open"}
            </Badge>
            <Plus
              className={cn(
                "h-4 w-4 text-accent transition-transform duration-300",
                open ? "rotate-45" : "",
              )}
            />
          </div>
        </button>

        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <div className="mt-4 space-y-4 border-t border-accent/20 pt-4 text-sm">
              {role.phase !== undefined ? (
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {phaseLabel(role.phase)}
                </p>
              ) : null}
              {role.work ? (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                    The work
                  </p>
                  <p className="mt-1.5 leading-relaxed text-muted">{role.work}</p>
                </div>
              ) : null}

              {role.responsibilities && role.responsibilities.length > 0 ? (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                    Responsibilities
                  </p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-muted marker:text-accent">
                    {role.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {role.skills && role.skills.length > 0 ? (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                    Skills & tools
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {role.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-full border border-[#d4af5f]/40 bg-accent/[0.08] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-accent-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="border-t border-border pt-3 text-xs text-muted">
                {filled ? (
                  <span>
                    Filled by{" "}
                    <span className="text-foreground">
                      {holders.map((holder) => holder.title).join(", ")}
                    </span>
                  </span>
                ) : (
                  <Link
                    href="/apply"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-ink shadow-[0_8px_24px_-8px_rgba(214,176,104,0.6)] transition hover:bg-accent-2"
                  >
                    Apply for this role
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
