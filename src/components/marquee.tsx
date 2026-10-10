import { cn } from "@/lib/utils";

/** Infinite, seamless marquee. Pauses on hover. */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const trackClass =
    "flex shrink-0 animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]";

  const track = (
    <div className={trackClass}>
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="inline-flex items-center gap-10 text-sm text-muted"
        >
          <span className="whitespace-nowrap font-mono uppercase tracking-[0.2em]">
            {item}
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-accent/70" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("group fx-fade-x flex overflow-hidden", className)}>
      {track}
      <div aria-hidden="true" className="contents">
        {track}
      </div>
    </div>
  );
}
