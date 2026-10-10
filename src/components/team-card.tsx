import { MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { Badge } from "@/components/badge";
import { cardClass } from "@/lib/ui";
import type { Entry } from "@/lib/content";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function TeamCard({
  member,
  roleTitle,
}: {
  member: Entry;
  roleTitle?: string;
}) {
  const github = member.links.find((link) => /github/i.test(link.label));
  const linkedin = member.links.find((link) => /linked/i.test(link.label));

  return (
    <div className={cn(cardClass, "flex flex-col p-5")}>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-mono text-sm font-semibold text-accent">
          {initials(member.title) || "FX"}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-foreground">
            {member.title}
          </h3>
          <p className="text-xs text-accent">{roleTitle ?? member.role}</p>
        </div>
      </div>

      {member.description ? (
        <p className="mt-4 text-sm text-muted">{member.description}</p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
        {member.location ? (
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {member.location}
          </span>
        ) : null}
        {member.phase ? (
          <Badge variant="outline">Phase {member.phase}</Badge>
        ) : null}
      </div>

      {(github || linkedin) && (
        <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
          {github ? (
            <a
              href={github.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.title} on GitHub`}
              className="rounded-full border border-border p-1.5 text-muted transition hover:border-accent/50 hover:text-accent"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
            </a>
          ) : null}
          {linkedin ? (
            <a
              href={linkedin.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.title} on LinkedIn`}
              className="rounded-full border border-border p-1.5 text-muted transition hover:border-accent/50 hover:text-accent"
            >
              <LinkedInIcon className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      )}
    </div>
  );
}
