import Link from "next/link";
import { Logo } from "@/components/logo";
import { Container } from "@/components/container";
import { NewsletterForm } from "@/components/newsletter-form";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/brand-icons";
import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";

/** Section 9 — footer. Mirrors the new nav dropdown structure. */
const EXPLORE = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/writeups", label: "Write-ups" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/ethics", label: "Ethics" },
];

const COLLECTIVE = [
  { href: "/team", label: "The Collective" },
  { href: "/roles", label: "Roles" },
  { href: "/resources", label: "Resources" },
  { href: "/join", label: "Join us" },
  { href: "/contact", label: "Contact" },
  { href: "/apply", label: "Apply" },
  { href: "/security", label: "Security" },
];

const LEARN = [
  { href: "/resources", label: "Resources" },
  { href: "/resources/datasets", label: "Practice Datasets" },
  { href: "/resources/tools", label: "Tools" },
  { href: "/writeups", label: "Write-ups" },
];

export function SiteFooter({
  name,
  description,
  motto,
  email,
  social,
}: {
  name: string;
  description: string;
  motto: string;
  email: string;
  social: {
    github: string;
    linkedin: string;
    instagram: string;
    youtube: string;
  };
}) {
  const year = new Date().getFullYear();

  const socials = [
    { href: social.github, label: "GitHub", Icon: GitHubIcon },
    { href: social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: social.youtube, label: "YouTube", Icon: YouTubeIcon },
  ].filter((item) => item.href);

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border-gold bg-surface">
      {/* Background atmosphere. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-damask absolute inset-0 opacity-[0.15]" />
        <div className="fx-orb -left-[10%] -top-[20%] h-[24rem] w-[24rem] bg-accent/6" />
        <div className="fx-orb -right-[10%] bottom-[-15%] h-[20rem] w-[20rem] bg-[#6aa0dc]/6" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(230,182,79,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(230,182,79,0.4) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <Container className="relative z-10 py-16 sm:py-20">
        {/* Top brand + newsletter row. */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-16">
          {/* Brand block. */}
          <div>
            <div className="flex items-center gap-4">
              <Logo size={52} />
              <div>
                <p className="font-display text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
                  {name}
                </p>
                <p className="mt-1 text-[12px] text-accent-2">{motto}</p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              {description}
            </p>

            {socials.length > 0 ? (
              <div className="mt-8 flex items-center gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-muted transition-all duration-300 hover:border-accent/60 hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_20px_-4px] hover:shadow-accent/40"
                  >
                    <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Newsletter + contact. */}
          <div className="rounded-2xl border border-border-gold/40 bg-background/40 p-6 backdrop-blur-sm sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                  Stay in the loop
                </p>
                <p className="mt-0.5 text-sm text-muted">
                  Get updates on new cases, write-ups, and opportunities.
                </p>
              </div>
            </div>
            <div className="mt-5">
              <NewsletterForm />
            </div>
            <a
              href={`mailto:${email}`}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted transition hover:text-accent"
            >
              {email}
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Divider. */}
        <div className="fx-rule mt-14 mb-12" />

        {/* Link columns. */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Explore */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              Explore
            </p>
            <ul className="mt-5 space-y-2">
              {EXPLORE.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-foreground"
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collective */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              Collective
            </p>
            <ul className="mt-5 space-y-2">
              {COLLECTIVE.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-foreground"
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              Learn
            </p>
            <ul className="mt-5 space-y-2">
              {LEARN.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-foreground"
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar. */}
        <div className="mt-14 flex flex-col gap-4 border-t border-border/50 pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            <p>© {year} {name}. Proud to be a student collective.</p>
          </div>
          <p className="font-mono tracking-[0.28em] text-accent/80">
            LEARN / INVESTIGATE / BUILD
          </p>
        </div>
        <p className="mt-3 text-[11px] text-muted/70">
          Public sample evidence only. No real victim data.
        </p>
      </Container>
    </footer>
  );
}
