import Link from "next/link";
import { MapPin } from "lucide-react";
import { LinkedInIcon } from "@/components/brand-icons";
import type { Entry } from "@/lib/content";
import { phaseLabel } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Find a LinkedIn link by label or domain, so editors can enter either
 * "LinkedIn" / "linkedin.com/in/..." and still get the right button.
 */
function linkedinLink(member: Entry) {
  return member.links.find((link) => {
    const label = link.label.toLowerCase();
    const url = link.url.toLowerCase();
    return label.includes("linkedin") || url.includes("linkedin.com");
  });
}

function MemberPhoto({ member }: { member: Entry }) {
  if (!member.cover) {
    return (
      <div className="absolute inset-0 bg-grid bg-surface-2">
        <div className="absolute inset-0 bg-radial-glow opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-6xl font-semibold text-accent/90 sm:text-7xl">
            {initials(member.title) || "FX"}
          </span>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={member.cover}
      alt={`Portrait of ${member.title}`}
      className="h-full w-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
      loading="lazy"
      decoding="async"
    />
  );
}

function MemberCard({ member }: { member: Entry }) {
  const linkedin = linkedinLink(member);
  const hasLinkedIn = Boolean(linkedin);

  return (
    <li className="group h-full">
      <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border-gold bg-surface transition duration-300 hover:border-accent/60 hover:shadow-[0_28px_70px_-30px] hover:shadow-accent/45 focus-within:border-accent/70">
        <div className="relative aspect-[4/5] overflow-hidden">
          <MemberPhoto member={member} />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
          <div className="pointer-events-none absolute inset-3 rounded-[1.15rem] border border-accent/35" />

          {member.phase !== undefined ? (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-background/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-2 backdrop-blur-sm">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              {phaseLabel(member.phase)}
            </span>
          ) : null}

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              {member.role ?? "Member"}
            </p>
            <h3 className="font-display mt-1.5 break-words text-2xl font-semibold leading-tight text-foreground sm:text-[1.7rem]">
              {member.title}
            </h3>
          </div>
        </div>

        {member.location || hasLinkedIn ? (
          <div className="mt-auto flex items-center gap-3 border-t border-border/70 px-5 py-4">
            {member.location ? (
              <span className="inline-flex min-w-0 items-center gap-1.5 text-xs text-muted">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-accent/80" />
                <span className="truncate">{member.location}</span>
              </span>
            ) : null}

            {hasLinkedIn && linkedin ? (
              <div className="ml-auto flex shrink-0 items-center gap-2">
                <a
                  href={linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.title} on LinkedIn (opens in a new tab)`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-accent/45 bg-accent/[0.08] px-3 py-1.5 text-[11px] font-semibold text-accent-2 transition hover:border-accent hover:bg-accent hover:text-ink"
                >
                  <LinkedInIcon className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
              </div>
            ) : null}
          </div>
        ) : null}
      </article>
    </li>
  );
}

/**
 * Member-first gallery for the team page. The roster below still owns the
 * role/open-seat view; this section simply gives each person a proper card.
 */
export function TeamMembers({
  members,
  seats,
}: {
  members: Entry[];
  seats: number;
}) {
  const memberCount = String(members.length).padStart(2, "0");
  const seatCount = String(seats).padStart(2, "0");

  return (
    <section aria-labelledby="members-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
            The Collective
          </p>
          <h2
            id="members-heading"
            className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Members
          </h2>
          <p className="mt-2 max-w-xl text-[15px] text-muted">
            The people behind the work — each holding one of the collective&apos;s
            thirteen specialist roles.
          </p>
        </div>

        <p className="shrink-0 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="text-accent-2">{memberCount}</span>{" "}
          {members.length === 1 ? "member" : "members"}{" "}
          <span aria-hidden="true" className="text-border">
            /
          </span>{" "}
          <span className="text-foreground">{seatCount}</span> seats
        </p>
      </div>

      {members.length > 0 ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <MemberCard key={member.slug} member={member} />
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-3xl border border-dashed border-accent/30 bg-surface/40 p-8 text-center sm:p-10">
          <p className="font-display text-2xl font-semibold text-foreground">
            The founding team is forming
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            As applications are reviewed, members and their profiles will appear
            here.
          </p>
          <Link
            href="/apply"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-accent-2"
          >
            Apply for a seat
          </Link>
        </div>
      )}
    </section>
  );
}
