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

/** Section 9 — footer. */
const EXPLORE = [
  { href: "/about", label: "About" },
  { href: "/roles", label: "Roles" },
  { href: "/team", label: "Team" },
  { href: "/projects", label: "Projects" },
  { href: "/writeups", label: "Write-ups" },
];

const COLLECTIVE = [
  { href: "/roadmap", label: "Roadmap" },
  { href: "/writeups", label: "Research" },
  { href: "/resources", label: "Resources" },
  { href: "/join", label: "Join us" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter({
  name,
  description,
  email,
  social,
}: {
  name: string;
  description: string;
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
    <footer className="relative mt-24 border-t border-border-gold bg-surface">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:pr-6">
            <div className="flex items-center gap-3">
              <Logo size={46} />
              <div>
                <p className="font-display text-base font-semibold uppercase tracking-[0.18em] text-foreground">
                  {name}
                </p>
                <p className="mt-0.5 text-[11px] text-muted">
                  Digital Evidence for a Safer Tomorrow.
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm text-muted">{description}</p>
            {socials.length > 0 ? (
              <div className="mt-6 flex items-center gap-2.5">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition hover:border-accent/60 hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Explore */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {EXPLORE.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition hover:text-foreground"
                  >
                    {item.label}
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
            <ul className="mt-5 space-y-3">
              {COLLECTIVE.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              Stay in the loop
            </p>
            <p className="mt-5 text-sm text-muted">
              Get updates on new cases, write-ups, and opportunities.
            </p>
            <NewsletterForm />
            <a
              href={`mailto:${email}`}
              className="mt-4 inline-block text-xs text-muted transition hover:text-accent"
            >
              {email}
            </a>
          </div>
        </div>

        <div className="fx-rule mt-12" />

        <div className="mt-6 flex flex-col gap-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {name}. Proud to be a student collective.</p>
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
