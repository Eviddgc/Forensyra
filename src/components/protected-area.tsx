"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Best-effort deterrents for casual copying and screenshots inside a section.
 * Browsers cannot truly block screenshots: phone screenshots, OS screen
 * capture, cameras and dev tools are outside what a page can control.
 *
 * - no right-click menu, drag, text selection, copy or cut
 * - photos are hidden while the tab is hidden or the window loses focus
 *   (many snipping tools and screen recorders take focus first)
 * - photos are hidden briefly on PrintScreen / common screenshot shortcuts,
 *   and the clipboard is overwritten after PrintScreen
 * - photos are not printed
 */
export function ProtectedArea({ children }: { children: ReactNode }) {
  const [shielded, setShielded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const holdShield = (ms: number) => {
      setShielded(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setShielded(false), ms);
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") setShielded(true);
      else if (document.hasFocus()) setShielded(false);
    };
    const onBlur = () => setShielded(true);
    const onFocus = () => setShielded(false);
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const printScreen = key === "printscreen" || event.code === "PrintScreen";
      const winSnip = event.metaKey && event.shiftKey && key === "s";
      const macSnip = event.metaKey && event.shiftKey && ["3", "4", "5"].includes(key);
      const macSnipCode =
        event.metaKey && event.shiftKey && ["Digit3", "Digit4", "Digit5"].includes(event.code);
      if (printScreen || winSnip || macSnip || macSnipCode) {
        holdShield(2500);
        if (printScreen) {
          navigator.clipboard?.writeText(" ").catch(() => undefined);
        }
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const block = (event: { preventDefault: () => void }) => event.preventDefault();
  return (
    <div
      data-shielded={shielded ? "true" : "false"}
      onContextMenu={block}
      onDragStart={block}
      onCopy={block}
      onCut={block}
      className="select-none [-webkit-touch-callout:none] [-webkit-user-drag:none] data-[shielded=true]:[&_[role=img]_span]:opacity-0 print:[&_[role=img]_span]:hidden"
    >
      {children}
    </div>
  );
}
