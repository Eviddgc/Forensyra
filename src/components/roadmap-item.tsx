import { Badge } from "@/components/badge";
import { Markdown } from "@/components/markdown";
import { cardClass } from "@/lib/ui";
import type { Entry } from "@/lib/content";
import { cn, formatDate } from "@/lib/utils";

function statusVariant(status?: string) {
  const value = (status ?? "").toLowerCase();
  if (value.includes("complete") || value.includes("done")) return "success";
  if (value.includes("active") || value.includes("progress")) return "accent";
  if (value.includes("planned") || value.includes("upcoming")) return "muted";
  return "outline" as const;
}

export function RoadmapItem({ item, index }: { item: Entry; index: number }) {
  return (
    <li className="relative pl-8">
      <span className="absolute left-0 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-accent/60 bg-background">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </span>

      <div className={cn(cardClass, "p-5 hover:bg-surface-2")}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <Badge variant={statusVariant(item.status)}>
            {item.status ?? "Planned"}
          </Badge>
          {item.date ? (
            <span className="font-mono text-xs text-muted">
              {formatDate(item.date)}
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 text-lg font-semibold text-foreground">
          {item.title}
        </h3>
        {item.description ? (
          <p className="mt-2 text-sm text-muted">{item.description}</p>
        ) : null}
        {item.raw.trim() ? (
          <Markdown html={item.content} className="mt-3 text-sm" />
        ) : null}
        {item.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-border bg-surface-2 px-2.5 py-0.5 font-mono text-[11px] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </li>
  );
}
