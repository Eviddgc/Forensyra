"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Container } from "@/components/container";
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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-border/80 bg-background/90 shadow-[0_18px_40px_-30px] shadow-accent/50 backdrop-blur-xl"
          : "border-border/70 bg-background/85 backdrop-blur-md",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Logo size={38} priority />
          <span className="leading-tight">
            <span className="block font-mono text-sm font-semibold tracking-[0.22em] text-foreground">
              {name}
            </span>
            <span className="hidden text-[11px] text-muted sm:block">
              {descriptor}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm transition",
                isActive(item.href)
                  ? "bg-surface-2 text-accent"
                  : "text-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <Link href="/contact" className={btnGhost}>
            Contact
          </Link>
          <a
            href={applyUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(btnPrimary, "fx-shine")}
          >
            Apply
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg border border-border p-2 text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <Container className="flex flex-col py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm",
                  isActive(item.href)
                    ? "bg-surface-2 text-accent"
                    : "text-muted hover:bg-surface hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-surface hover:text-foreground"
            >
              Contact
            </Link>
            <a
              href={applyUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(btnPrimary, "fx-shine mt-3")}
              onClick={() => setOpen(false)}
            >
              Apply to join
              <ArrowRight className="h-4 w-4" />
            </a>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
