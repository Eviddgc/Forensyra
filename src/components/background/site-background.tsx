"use client";

import { usePathname } from "next/navigation";
import {
  Circuit,
  Constellation,
  OriginRidge,
  Threshold,
  Vault,
} from "@/components/background/scenes";

export type BackgroundVariant =
  | "circuit"
  | "ridge"
  | "vault"
  | "constellation"
  | "threshold";

/** Route to background. Anything not listed gets the Golden Circuit. */
export function variantFor(pathname: string): BackgroundVariant {
  const is = (base: string) =>
    pathname === base || pathname.startsWith(`${base}/`);
  if (is("/about")) return "ridge";
  if (is("/projects")) return "vault";
  if (is("/roles") || is("/team")) return "constellation";
  if (is("/apply")) return "threshold";
  return "circuit";
}

/**
 * Fixed, procedural background layer that sits behind all page content.
 * Pure SVG + CSS: no canvas loop, no images, no scroll or pointer work.
 */
export function SiteBackground() {
  const pathname = usePathname() ?? "/";
  const variant = variantFor(pathname);
  const dim = pathname !== "/";

  return (
    <div
      aria-hidden="true"
      data-bg={variant}
      className="fx-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {variant === "circuit" && <Circuit dim={dim} />}
      {variant === "ridge" && <OriginRidge />}
      {variant === "vault" && <Vault />}
      {variant === "constellation" && <Constellation />}
      {variant === "threshold" && <Threshold />}
      <div className="fx-bg-vignette absolute inset-0" />
    </div>
  );
}
