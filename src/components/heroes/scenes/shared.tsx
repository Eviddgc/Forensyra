import type { ReactNode } from "react";

export const C = {
  gold: "#e6b64f",
  goldLight: "#f5d58a",
  goldDeep: "#a97f22",
  blue: "#6aa0dc",
  blueLight: "#9cc3ee",
  ink: "#071827",
  surface: "#0d2238",
  card: "#122b46",
  line: "rgba(245,244,240,0.18)",
  lineSoft: "rgba(245,244,240,0.1)",
} as const;

export function Scene({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 760 620"
      fill="none"
      aria-hidden="true"
      className="h-auto w-full"
    >
      {children}
    </svg>
  );
}

export function polar(
  cx: number,
  cy: number,
  radius: number,
  degrees: number,
) {
  const radians = ((degrees - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

export function hexPoints(cx: number, cy: number, radius: number) {
  return Array.from({ length: 6 }, (_, index) => {
    const point = polar(cx, cy, radius, index * 60);
    return `${point.x},${point.y}`;
  }).join(" ");
}

export function Spark({
  x,
  y,
  r = 2.4,
  color = C.gold,
  opacity = 0.7,
}: {
  x: number | string;
  y: number | string;
  r?: number | string;
  color?: string;
  opacity?: number | string;
}) {
  const cx = Number(x);
  const cy = Number(y);
  const radius = Number(r);

  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy} r={radius} fill={color} />
      <circle cx={cx} cy={cy} r={radius * 3} stroke={color} strokeWidth="0.5" />
    </g>
  );
}

export function RuleLines({
  x,
  y,
  width,
  rows,
  gap = 14,
  color = C.lineSoft,
  shortEvery = 3,
}: {
  x: number;
  y: number;
  width: number;
  rows: number;
  gap?: number;
  color?: string;
  shortEvery?: number;
}) {
  return (
    <>
      {Array.from({ length: rows }, (_, index) => (
        <rect
          key={index}
          x={x}
          y={y + index * gap}
          width={shortEvery > 0 && index % shortEvery === shortEvery - 1 ? width * 0.62 : width}
          height="2"
          rx="1"
          fill={color}
        />
      ))}
    </>
  );
}
