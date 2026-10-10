"use client";

import { useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%$&/*+=<>";

/**
 * Decodes text into place on mount (SSR renders the final string, so SEO and
 * layout are unaffected). Respects prefers-reduced-motion.
 */
export function ScrambleText({
  text,
  className,
  speed = 34,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // SSR already rendered the final string, so nothing to animate.
      return;
    }

    const chars = text.split("");
    let frame = 0;
    const interval = window.setInterval(() => {
      frame += 1;
      setDisplay(
        chars
          .map((char, index) => {
            if (char === " ") return " ";
            if (frame >= index * 2.5 + 6) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );
      if (frame > chars.length * 2.5 + 12) {
        window.clearInterval(interval);
        setDisplay(text);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [text, speed]);

  return <span className={className}>{display}</span>;
}
