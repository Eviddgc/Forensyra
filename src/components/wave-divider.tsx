import { cn } from "@/lib/utils";

/**
 * A gentle curved transition between two full-bleed sections. The band is
 * painted with `from` (the section above) and the curve itself with `to`
 * (the section below), so it drops cleanly between any two surfaces.
 */
export function WaveDivider({
  from,
  to,
  flip = false,
  className,
}: {
  from: string;
  to: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative leading-[0]", className)}
      style={{ background: from }}
    >
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        className={cn("fx-curve block h-[52px] w-full sm:h-[86px]", flip && "rotate-180")}
      >
        <path
          d="M0 30 C 260 96 470 4 720 40 C 970 76 1180 108 1440 44 L 1440 110 L 0 110 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}
