"use client";

import { useEffect, useState } from "react";

/** Slim gradient bar showing page scroll progress. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[95] h-0.5">
      <div
        className="h-full bg-gradient-to-r from-accent via-accent-2 to-accent"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
