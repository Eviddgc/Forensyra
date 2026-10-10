import Link from "next/link";
import { Logo } from "@/components/logo";
import { Container } from "@/components/container";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";

const EXPLORE = [
  { href: "/about", label: "About" },
  { href: "/roles", label: "Roles" },
  { href: "/team", label: "Team" },
  { href: "/projects", label: "Projects" },
  { href: "/writeups", label: "Write-ups" },
];

const COLLECTIVE = [
  { href: "/roadmap", label: "Roadmap" },
  { href: "/ethics", label: "Ethics" },
  { href: "/resources", label: "Resources" },
  { href: "/join", label: "Join us" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter({
  name,
  descriptor,
  motto,
  email,
  github,
  linkedin,
}: {
  name: string;
  descriptor: string;
  motto: string;
  email: string;
  github?: string;
  linkedin?: string;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-surface/40">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Logo size={44} />
              <div>
                <p className="font-mono text-sm font-semibold tracking-[0.22em] text-foreground">
                  {name}
                </p>
                <p className="text-xs text-muted">{descriptor}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm text-muted">
              {motto} A collaborative space for students and early-career
              professionals learning digital forensics, incident response, and
              evidence-led investigation.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {github ? (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="rounded-full border border-border p-2 text-muted transition hover:border-accent/50 hover:text-accent"
                >
                  <GitHubIcon className="h-4 w-4" />
                </a>
              ) : null}
              {linkedin ? (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="rounded-full border border-border p-2 text-muted transition hover:border-accent/50 hover:text-accent"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              ) : null}
              <a
                href={`mailto:${email}`}
                className="rounded-full border border-border px-3 py-2 text-xs text-muted transition hover:border-accent/50 hover:text-accent"
              >
                {email}
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE.map((item) => (
                <li key={item.href}>
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

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
              Collective
            </p>
            <ul className="mt-4 space-y-2.5">
              {COLLECTIVE.map((item) => (
                <li key={item.href}>
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
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            {`\u00A9 ${year} ${name}. Preserve the Trace. Prove the Story.`}
          </p>
          <p className="font-mono">
            Legal practice cases only · Public sample evidence · No real victim
            data
          </p>
        </div>
      </Container>
    </footer>
  );
}
