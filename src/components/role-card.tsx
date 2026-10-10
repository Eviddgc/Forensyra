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
    <div className={cn(cardClass, "flex flex-col p-5")}>
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Badge variant="outline">{phaseLabel(role.phase)}</Badge>
          <Badge variant={filled ? "success" : "accent"}>
            {filled ? "Filled" : "Open"}
          </Badge>
        </div>
      </div>

      <h3 className="mt-3 text-base font-semibold text-foreground">
        {role.title}
      </h3>
      {role.description ? (
        <p className="mt-2 text-sm text-muted">{role.description}</p>
      ) : null}

      <div className="mt-4 border-t border-border pt-3 text-xs text-muted">
        {filled ? (
          <span>
            Filled by{" "}
            <span className="text-foreground">
              {holders.map((holder) => holder.title).join(", ")}
            </span>
          </span>
        ) : (
          <span>Open — apply from the Join page.</span>
        )}
      </div>
    </div>
  );
}
