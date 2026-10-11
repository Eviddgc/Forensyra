"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Container } from "@/components/container";
import { btnPrimary } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** Section 2 — primary navigation. */
const PRIMARY = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

const SECONDARY = [
  { href: "/roles", label: "Roles" },
  { href: "/writeups", label: "Write-ups" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/ethics", label: "Ethics" },
  { href: "/resources", label: "Resources" },
  { href: "/join", label: "Join us" },
];

export function SiteHeader({
  name,
  descriptor,
  applyUrl,
}: {
  name: string;
  descriptor: string;
  applyUrl: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "border-b backdrop-blur-xl transition-colors duration-300",
          scrolled
            ? "border-border-gold bg-background/85 shadow-[0_16px_40px_-30px] shadow-black/90"
            : "border-border/60 bg-background/60",
        )}
      >
        <Container className="flex h-16 items-center gap-4 lg:h-[74px]">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Logo size={36} />
            <span className="leading-none">
              <span className="font-display block text-[17px] font-semibold uppercase tracking-[0.16em] text-foreground">
                {name}
              </span>
              <span className="mt-1 hidden text-[9.5px] uppercase tracking-[0.28em] text-muted sm:block">
                {descriptor}
              </span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="mx-auto hidden items-center gap-1 lg:flex"
          >
            {PRIMARY.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition",
                    active
                      ? "text-accent-2"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-center bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <a
              href={applyUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(
                btnPrimary,
                "fx-shine hidden rounded-full px-4 py-2 text-[13px] sm:inline-flex",
              )}
            >
              Apply to Join
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition hover:border-accent/60 hover:text-accent lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-b bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden",
          open
            ? "max-h-[80vh] border-border-gold opacity-100"
            : "max-h-0 border-transparent opacity-0",
        )}
      >
        <Container className="py-4">
          <nav aria-label="Mobile" className="flex flex-col">
            {PRIMARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  isActive(item.href)
                    ? "bg-accent/10 text-accent-2"
                    : "text-muted hover:bg-surface hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <p className="mt-4 px-3 font-mono text-[10px] uppercase tracking-[0.28em] text-muted/70">
            The collective
          </p>
          <nav aria-label="More" className="mt-1 flex flex-col">
            {SECONDARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm transition",
                  isActive(item.href)
                    ? "bg-accent/10 text-accent-2"
                    : "text-muted hover:bg-surface hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={applyUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(btnPrimary, "mt-4 w-full rounded-full py-3")}
          >
            Apply to Join
            <ArrowRight className="h-4 w-4" />
          </a>
        </Container>
      </div>
    </header>
  );
}
