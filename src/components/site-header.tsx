"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Container } from "@/components/container";
import { OPEN_SEARCH_EVENT } from "@/components/command-palette";
import { cn } from "@/lib/utils";

interface NavLeaf {
  id: string;
  href: string;
  label: string;
  description: string;
  disabled?: boolean;
}

interface NavItem {
  href?: string;
  label: string;
  items: NavLeaf[] | null;
}

/** Navigation structure with dropdowns. Each item has a unique `id` for React keys. */
const NAV: NavItem[] = [
  { href: "/", label: "Home", items: null },

  {
    label: "About",
    items: [
      { id: "about-mission", href: "/about", label: "Mission", description: "Why we exist & what we stand for" },
      { id: "about-roadmap", href: "/roadmap", label: "Roadmap", description: "Phases, milestones & what's next" },
      { id: "about-ethics", href: "/ethics", label: "Ethics", description: "Rules of engagement & responsible use" },
    ],
  },

  {
    label: "Work",
    items: [
      { id: "work-projects", href: "/projects", label: "Projects", description: "Published case files & investigations" },
      { id: "work-writeups", href: "/writeups", label: "Write-ups", description: "Case reports, lab notes, tutorials & research" },
    ],
  },

  {
    label: "Learn",
    items: [
      { id: "learn-library", href: "/resources", label: "Library", description: "Resources, datasets, tools & reading" },
      { id: "learn-datasets", href: "/resources/datasets", label: "Practice Datasets", description: "Public evidence for hands-on labs" },
      { id: "learn-tools", href: "/resources/tools", label: "DFIR Tools", description: "The analyst toolkit" },
      { id: "learn-playground", href: "/playground", label: "Terminal Playground", description: "Explore by typing — and hash, for real" },
    ],
  },

  {
    label: "Team",
    items: [
      { id: "team-roles", href: "/roles", label: "13 Roles", description: "Specialisations across DFIR" },
      { id: "team-members", href: "/team", label: "Members", description: "Current collective members" },
      { id: "team-join", href: "/join", label: "Join", description: "How to apply & what to expect" },
    ],
  },

  { href: "/contact", label: "Contact", items: null },

  {
    label: "Apply",
    items: [
      { id: "apply-team", href: "/apply", label: "Team Application", description: "Join the founding DFIR collective" },
      { id: "apply-mentor", href: "/apply/mentor", label: "Mentor / Advisor", description: "Guide the team as a subject expert" },
    ],
  },
];

/** Mobile-only dropdown for navigation sections. */
function MobileDropdown({
  label,
  items,
  active,
  onClose,
}: {
  label: string;
  items: Array<{ id: string; href: string; label: string; description: string; disabled?: boolean }>;
  active: boolean;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <details
      className="group"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary
        className={cn(
          "flex items-center justify-between px-3 py-2.5 text-sm font-medium transition rounded-xl",
          active || open
            ? "bg-accent/10 text-accent-2"
            : "text-muted hover:bg-surface hover:text-foreground",
        )}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </summary>
      <div className="mt-1 pl-2 space-y-1 border-l border-border/50 ml-1">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={onClose}
            aria-disabled={item.disabled}
            className={cn(
              "block px-3 py-2 rounded-xl text-sm transition",
              item.disabled
                ? "text-muted/60 cursor-not-allowed"
                : "text-muted hover:bg-accent/10 hover:text-accent-2",
            )}
          >
            <span className="block font-medium">{item.label}</span>
            <span className="block text-[11px] text-muted/70">{item.description}</span>
          </Link>
        ))}
      </div>
    </details>
  );
}

export function SiteHeader({
  name,
  descriptor,
}: {
  name: string;
  descriptor: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      dropdownRefs.current.forEach((ref, key) => {
        if (ref && !ref.contains(event.target as Node)) {
          setActiveDropdown((prev) => (prev === key ? null : prev));
        }
      });
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const isDropdownActive = (label: string) => {
    const items = NAV.find((n) => n.label === label)?.items;
    if (!items) return false;
    return items.some((item) => isActive(item.href));
  };

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

          <nav aria-label="Primary" className="mx-auto hidden items-center gap-1 lg:flex">
            {NAV.map((navItem) => {
              const hasDropdown = Boolean(navItem.items);
              const active = hasDropdown ? isDropdownActive(navItem.label) : isActive(navItem.href!);

              if (!hasDropdown) {
                return (
                  <Link
                    key={navItem.href}
                    href={navItem.href!}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium transition",
                      active
                        ? "text-accent-2"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    {navItem.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-px origin-center bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                );
              }

              // Dropdown item
              const dropdownKey = navItem.label;
              const isOpen = activeDropdown === dropdownKey;

              return (
                <div key={dropdownKey} className="relative">
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === dropdownKey}
                    aria-controls={`${dropdownKey}-dropdown`}
                    onClick={() => setActiveDropdown((prev) => (prev === dropdownKey ? null : dropdownKey))}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium transition flex items-center gap-1.5",
                      active || isOpen
                        ? "text-accent-2"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    {navItem.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={`${dropdownKey}-dropdown`}
                      role="menu"
                      className="absolute left-0 top-full mt-2 min-w-[220px] rounded-2xl border border-border bg-surface p-2 shadow-[0_30px_60px_-20px] shadow-black/90 animate-fade-in"
                    >
                      {navItem.items!.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          aria-disabled={item.disabled}
                          role="menuitem"
                          className={cn(
                            "flex items-start gap-3 px-3 py-2.5 rounded-xl text-sm transition",
                            item.disabled
                              ? "text-muted/60 cursor-not-allowed"
                              : "text-muted hover:bg-accent/10 hover:text-accent-2",
                          )}
                        >
                          <div>
                            <span className="block font-medium">{item.label}</span>
                            <span className="block text-[11px] text-muted/70">{item.description}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT))
            }
            aria-label="Search the site (Command or Control + K)"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface/40 px-3 text-muted transition hover:border-accent/60 hover:text-accent-2"
          >
            <Search className="h-4 w-4" />
            {/* Full label and shortcut hint wait for xl: at exactly 1024px the
                desktop nav plus this button overflowed the header. */}
            <span className="hidden text-xs font-medium xl:inline">Search</span>
            <kbd className="hidden rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-muted/80 xl:inline">
              ⌘K
            </kbd>
          </button>

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
        </Container>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        inert={!open}
        className={cn(
          // Closed panels clip so the max-height transition works; open panels
          // scroll, because expanded sub-menus are taller than a small phone.
          "border-b bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden",
          open
            ? "max-h-[calc(100dvh-4rem)] overflow-y-auto border-border-gold opacity-100"
            : "max-h-0 overflow-hidden border-transparent opacity-0",
        )}
      >
        <Container className="py-4">
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV.map((navItem) => {
              const hasDropdown = Boolean(navItem.items);
              const active = hasDropdown ? isDropdownActive(navItem.label) : isActive(navItem.href!);

              if (!hasDropdown) {
                return (
                  <Link
                    key={navItem.href}
                    href={navItem.href!}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-xl px-3 py-2.5 text-sm font-medium transition",
                      active
                        ? "bg-accent/10 text-accent-2"
                        : "text-muted hover:bg-surface hover:text-foreground",
                    )}
                  >
                    {navItem.label}
                  </Link>
                );
              }

              return (
                <MobileDropdown
                  key={navItem.label}
                  label={navItem.label}
                  items={navItem.items!}
                  active={active}
                  onClose={() => setOpen(false)}
                />
              );
            })}
          </nav>
        </Container>
      </div>
    </header>
  );
}
