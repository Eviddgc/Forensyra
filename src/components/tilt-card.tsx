"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A card that tilts in 3D toward the pointer and lights up under the cursor.
 * Falls back to a static card when the user prefers reduced motion.
 */
export function TiltCard({
  children,
  className,
  intensity = 9,
  spotlight = true,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  spotlight?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * intensity}deg) rotateY(${
      (px - 0.5) * intensity
    }deg) translateZ(0)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn(spotlight && "fx-spotlight", "fx-tilt", className)}
    >
      {children}
    </div>
  );
}
