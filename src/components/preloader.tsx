"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LOGS = [
  "initialising forensyra shell",
  "mounting evidence locker",
  "verifying sha-256 hashes",
  "reconstructing incident timeline",
  "establishing chain of custody",
  "handshake complete",
];

/**
 * Full-screen boot sequence shown on first arrival: the logo assembles, a boot
 * log streams, progress fills, then the curtain lifts away. Shown once per
 * browser session (full reloads), not on client-side navigation.
 */
export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;

    if (html.classList.contains("intro-seen")) {
      // Returning visitor this session — the overlay is already hidden by CSS
      // (.intro-seen .fx-intro), so skip the boot animation entirely.
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 500 : 2000;
    const start = performance.now();
    let raf = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      try {
        sessionStorage.setItem("fx-intro-seen", "1");
      } catch {
        /* ignore */
      }
      setDone(true);
      html.classList.remove("intro-active");
      window.setTimeout(
        () => {
          html.classList.add("intro-seen");
          setGone(true);
        },
        reduce ? 0 : 950,
      );
    };

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      setLogIndex(Math.min(LOGS.length - 1, Math.floor(eased * LOGS.length)));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    raf = requestAnimationFrame(tick);

    // Failsafe: requestAnimationFrame is paused in background tabs, so never
    // leave the site stuck behind the overlay. A timer still fires (throttled).
    const failsafe = window.setTimeout(finish, duration + 1500);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      html.classList.remove("intro-active");
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fx-intro fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background",
        done && "is-done",
      )}
    >
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="fx-scanlines absolute inset-0 opacity-40" />

      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="relative flex h-44 w-44 items-center justify-center">
          <span className="absolute inset-0 animate-spin-slower rounded-full border border-accent/20" />
          <span className="absolute inset-4 animate-spin-reverse rounded-full border border-dashed border-accent/40" />
          <span className="absolute inset-0 animate-pulse-ring rounded-full border border-accent/40" />
          <div className="relative h-24 w-24 overflow-hidden rounded-full ring-1 ring-accent/40 shadow-[0_0_70px_-12px] shadow-accent/70">
            <Image
              src="/brand-mark.png"
              alt="FORENSYRA"
              fill
              sizes="96px"
              priority
              className="object-cover"
            />
          </div>
        </div>

        <p className="mt-10 font-mono text-lg font-semibold tracking-[0.55em] text-foreground">
          FORENSYRA
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
          Where Digital Truth Takes Form
        </p>

        <p className="mt-9 h-5 font-mono text-xs text-muted">
          <span className="text-accent">&gt;</span> {LOGS[logIndex]}
          <span className="animate-blink">_</span>
        </p>

        <div className="mt-4 h-1 w-64 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full bg-gradient-to-r from-accent to-accent-2 transition-[width] duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 font-mono text-[10px] tracking-[0.35em] text-muted">
          {String(progress).padStart(3, "0")}% · SECURING SESSION
        </p>
      </div>
    </div>
  );
}
