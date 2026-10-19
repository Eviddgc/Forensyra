import Link from "next/link";
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

  return (
    <details className={cn(cardClass, "group flex flex-col p-5 open:ring-1 open:ring-accent/30")}>
      <summary className="flex cursor-pointer list-none items-start justify-between gap-3 [&::-webkit-details-marker]:hidden">
        <div className="flex items-start gap-3">
          <span className="font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-base font-semibold text-foreground">{role.title}</h3>
            {role.description ? (
              <p className="mt-1 text-sm text-muted">{role.description}</p>
            ) : null}
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          {role.phase !== undefined ? (
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              {phaseLabel(role.phase)}
            </span>
          ) : null}
          <Badge variant={filled ? "success" : "accent"}>
            {filled ? "Filled" : "Open"}
          </Badge>
        </div>
      </summary>

      <div className="mt-4 space-y-4 border-t border-border pt-4 text-sm">
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
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-muted">
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
                  className="inline-flex items-center rounded-full border border-[#6aa0dc]/30 bg-[#0d2238]/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
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
            <span>
              Open —{" "}
              <Link href="/apply" className="text-accent-2 underline">
                apply now
              </Link>
              .
            </span>
          )}
        </div>
      </div>
    </details>
  );
}
