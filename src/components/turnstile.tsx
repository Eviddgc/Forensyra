"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Cloudflare Turnstile widget, rendered explicitly so several forms can share
 * one script load. The site key is public by design; the matching secret is
 * verified server-side (src/lib/turnstile.ts).
 *
 * Until NEXT_PUBLIC_TURNSTILE_SITE_KEY is set the component renders nothing
 * and the forms behave exactly as before.
 *
 * The script only starts loading once the widget scrolls near the viewport,
 * so the widget costs nothing on pages the visitor never scrolls through.
 */

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    __turnstileOnload?: () => void;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=__turnstileOnload";

let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    window.__turnstileOnload = () => resolve();
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Turnstile script failed to load."));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export function Turnstile({
  onToken,
  size = "flexible",
  resetSignal = 0,
  className,
}: {
  onToken: (token: string | null) => void;
  size?: "normal" | "compact" | "flexible";
  /** Increment to force a fresh challenge (e.g. after a rejected submit). */
  resetSignal?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  // No IntersectionObserver (very old browsers): load straight away.
  const [nearViewport, setNearViewport] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  // Start loading the script only when the widget approaches the viewport.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || nearViewport) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [nearViewport]);

  useEffect(() => {
    if (!SITE_KEY || !nearViewport || !containerRef.current) return;
    let cancelled = false;

    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current || widgetIdRef.current || !window.turnstile)
          return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          theme: "dark",
          size,
          callback: (token: string) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(null),
          "error-callback": () => onTokenRef.current(null),
          "refresh-expired": "auto",
        });
      })
      .catch(() => onTokenRef.current(null));

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [nearViewport, size]);

  // Reset the challenge when the parent asks (failed submit burns the token).
  const lastResetRef = useRef(resetSignal);
  useEffect(() => {
    if (resetSignal === lastResetRef.current) return;
    lastResetRef.current = resetSignal;
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetSignal]);

  if (!SITE_KEY) return null;

  return (
    <div
      ref={containerRef}
      className={cn("min-h-[65px]", className)}
      data-testid="turnstile-widget"
    />
  );
}

/** True when the site key is baked into the build, i.e. the widget shows. */
export function turnstileConfigured(): boolean {
  return Boolean(SITE_KEY);
}
