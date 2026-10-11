"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { btnGhost, btnPrimary } from "@/lib/ui";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/roles", label: "Roles" },
  { href: "/team", label: "Team" },
  { href: "/projects", label: "Projects" },
  { href: "/writeups", label: "Write-ups" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/ethics", label: "Ethics" },
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
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={cn(
          "fx-glass fx-shine mx-auto flex max-w-4xl items-center gap-1 rounded-full border px-2.5 py-2 transition-all duration-300 sm:gap-1.5 sm:px-3",
          scrolled
            ? "border-accent/40 shadow-[0_22px_55px_-22px] shadow-black/80"
            : "border-border/70 shadow-[0_12px_35px_-22px] shadow-black/70",
        )}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2"
        >
          <Logo size={30} />
          <span className="leading-tight">
            <span className="block font-mono text-[13px] font-semibold tracking-[0.2em] text-foreground">
              {name}
            </span>
            <span className="hidden text-[10px] text-muted sm:block">
              {descriptor}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-[13px] transition",
                isActive(item.href)
                  ? "bg-accent/15 text-accent-2"
                  : "text-muted hover:bg-surface-2 hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <Link
            href="/contact"
            className={cn(
              btnGhost,
              "hidden rounded-full px-3 py-1.5 text-[13px] sm:inline-flex",
            )}
          >
            Contact
          </Link>
          <a
            href={applyUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(btnPrimary, "fx-shine rounded-full px-4 py-1.5 text-[13px]")}
          >
            Apply
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-border p-2 text-foreground lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="fx-glass mx-auto mt-2 max-w-4xl rounded-2xl border border-border/70 p-3 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm",
                  isActive(item.href)
                    ? "bg-accent/15 text-accent-2"
                    : "text-muted hover:bg-surface-2 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-surface-2 hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
