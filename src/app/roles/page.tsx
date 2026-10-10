import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { RoleCard } from "@/components/role-card";
import { CtaBand } from "@/components/cta-band";
import { getEntries } from "@/lib/content";
import { getSite } from "@/lib/site";

export const metadata: Metadata = {
  title: "Roles",
  description:
    "Thirteen specialist roles across digital forensics — filled in phases. Find the one that fits you.",
};

export default async function RolesPage() {
  const [roles, team] = await Promise.all([
    getEntries("roles"),
    getEntries("team"),
  ]);
  const site = getSite();

  const holdersFor = (roleSlug: string) =>
    team.filter((member) => member.roleId === roleSlug);

  const phase1 = roles.filter((role) => String(role.phase) === "1");
  const phase2 = roles.filter((role) => String(role.phase) === "2");

  return (
    <>
      <PageHeader
        eyebrow="Thirteen roles"
        title="Find your specialisation"
        description="Every member owns a defined role. We fill them in phases so the team stays focused and never overloaded."
      />

      <Container className="space-y-16 py-14">
        <section>
          <SectionHeading
            eyebrow="Phase 1"
            title="Found the core team"
            description="The founding group that will run our first mock case. The Lead covers coordination at first, and Legal can begin as a mentor."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {phase1.map((role, index) => (
              <RoleCard key={role.slug} role={role} index={index} holders={holdersFor(role.slug)} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="Phase 2"
            title="Grow the collective"
            description="Added once the core team has shipped a project together — including AI forensics, a strong differentiator for a student group."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {phase2.map((role, index) => (
              <RoleCard key={role.slug} role={role} index={index + phase1.length} holders={holdersFor(role.slug)} />
            ))}
          </div>
        </section>
      </Container>

      <CtaBand
        title="Claim a role"
        description="Applications are open for the founding team. Choose the specialisation that fits you best."
        applyUrl={site.applyUrl}
      />
    </>
  );
}
