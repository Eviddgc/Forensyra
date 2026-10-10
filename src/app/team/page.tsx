import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { TeamCard } from "@/components/team-card";
import { EmptyState } from "@/components/empty-state";
import { CtaBand } from "@/components/cta-band";
import { btnSecondary } from "@/lib/ui";
import { getEntries } from "@/lib/content";
import { getSite } from "@/lib/site";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the members of FORENSYRA and the roles they hold across the collective.",
};

export default async function TeamPage() {
  const [team, roles] = await Promise.all([
    getEntries("team"),
    getEntries("roles"),
  ]);
  const site = getSite();

  const roleTitle = new Map(roles.map((role) => [role.slug, role.title]));
  const filledRoleIds = new Set(team.map((member) => member.roleId));
  const openRoles = roles.filter((role) => !filledRoleIds.has(role.slug));

  return (
    <>
      <PageHeader
        eyebrow="The people"
        title="Meet the collective"
        description="Members hold defined roles and work the part of each case that matches their specialisation."
      />

      <Container className="space-y-16 py-14">
        <section>
          <SectionHeading title="Current members" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.length > 0 ? (
              team.map((member) => (
                <TeamCard
                  key={member.slug}
                  member={member}
                  roleTitle={member.roleId ? roleTitle.get(member.roleId) : member.role}
                />
              ))
            ) : (
              <EmptyState
                title="The founding team is forming"
                description="As applications are reviewed, members and their roles will appear here."
                className="sm:col-span-2 lg:col-span-3"
              />
            )}
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="We are hiring"
            title="Open roles"
            description="These specialisations are still open for the founding team."
            action={
              <Link href="/roles" className={btnSecondary}>
                Role details
              </Link>
            }
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {openRoles.map((role) => (
              <span
                key={role.slug}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-muted"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {role.title}
              </span>
            ))}
          </div>
        </section>
      </Container>

      <CtaBand
        title="Join the team"
        description="We are building the founding group now. Apply and tell us which role interests you."
        applyUrl={site.applyUrl}
      />
    </>
  );
}
