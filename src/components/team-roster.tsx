import Link from "next/link";
import { MapPin, User } from "lucide-react";
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

function MemberSlot({
  member,
  roleTitle,
}: {
  member?: Entry;
  roleTitle: string;
}) {
  if (!member) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-[#d4af5f]/30 bg-[#10141c]/40 p-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-accent/30 bg-accent/5 text-accent/60">
          <User aria-hidden="true" className="h-6 w-6" />
        </div>
        <p className="text-xs text-muted">Open seat</p>
        <Link
          href="/apply"
          className="text-[11px] font-medium text-accent-2 underline"
        >
          Apply
        </Link>
      </div>
    );
  }

  const github = member.links.find((link) => /github/i.test(link.label));
  const linkedin = member.links.find((link) => /linked/i.test(link.label));

  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-[#d4af5f]/25 bg-[#151922]/50 p-4 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-accent/40 bg-accent/10 font-mono text-sm font-semibold text-accent">
        {member.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.cover}
            alt={member.title}
            className="h-full w-full object-cover"
          />
        ) : (
          initials(member.title) || "FX"
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">
          {member.title}
        </p>
        <p className="text-[11px] text-accent">{roleTitle}</p>
      </div>
      {member.location ? (
        <span className="inline-flex items-center gap-1 text-[11px] text-muted">
          <MapPin className="h-3 w-3" />
          {member.location}
        </span>
      ) : null}
      {(github || linkedin) && (
        <div className="flex items-center gap-2">
          {github ? (
            <a
              href={github.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.title} on GitHub`}
              className="rounded-full border border-border p-1 text-muted transition hover:border-accent/50 hover:text-accent"
            >
              <GitHubIcon className="h-3 w-3" />
            </a>
          ) : null}
          {linkedin ? (
            <a
              href={linkedin.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.title} on LinkedIn`}
              className="rounded-full border border-border p-1 text-muted transition hover:border-accent/50 hover:text-accent"
            >
              <LinkedInIcon className="h-3 w-3" />
            </a>
          ) : null}
        </div>
      )}
    </div>
  );
}

export function TeamRoster({
  roles,
  members,
}: {
  roles: Entry[];
  members: Entry[];
}) {
  const membersByRole = new Map<string, Entry[]>();
  for (const member of members) {
    if (!member.roleId) continue;
    const list = membersByRole.get(member.roleId) ?? [];
    list.push(member);
    membersByRole.set(member.roleId, list);
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {roles.map((role, index) => {
        const holders = membersByRole.get(role.slug) ?? [];
        const slots = [holders[0], holders[1]];
        if (role.comingSoon) {
          return (
            <div
              key={role.slug}
              className={cn(cardClass, "flex flex-col p-5 opacity-80")}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="font-mono text-xs text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-foreground">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    Revealing soon. This role opens in Phase 2.
                  </p>
                </div>
                <Badge variant="muted">Soon</Badge>
              </div>
            </div>
          );
        }
        return (
          <div
            key={role.slug}
            className={cn(cardClass, "flex flex-col p-5")}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-base font-semibold text-foreground">
                  {role.title}
                </h3>
                {role.description ? (
                  <p className="mt-1 text-xs text-muted">{role.description}</p>
                ) : null}
              </div>
              <Badge variant={holders.length > 0 ? "success" : "accent"}>
                {holders.length > 0 ? "Filled" : "Open"}
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {slots.map((member, slotIndex) => (
                <MemberSlot
                  key={slotIndex}
                  member={member}
                  roleTitle={role.title}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
