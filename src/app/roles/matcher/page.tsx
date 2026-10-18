import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { RoleMatcher } from "@/components/role-matcher";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";
import { getEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Find Your Role",
  description:
    "Answer six questions and find which of the thirteen digital forensics roles fits you best.",
  alternates: { canonical: "/roles/matcher" },
};

export default async function RoleMatcherPage() {
  const roles = await getEntries("roles");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Roles", path: "/roles" },
          { name: "Find your role", path: "/roles/matcher" },
        ])}
      />

      <section className="relative isolate overflow-hidden bg-background">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_20%,#122b46_0%,#0d2238_50%,#071827_100%)]" />
          <div className="fx-orb pointer-events-none right-[12%] top-[10%] h-[18rem] w-[18rem] bg-accent/8" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        <Container className="relative py-20 sm:py-24">
          <Reveal>
            <Link
              href="/roles"
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              All thirteen roles
            </Link>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.32em] text-accent">
              Role matcher
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Which seat is yours?
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
              Six questions, no wrong answers. We map your instincts against all
              thirteen specialisations and show you where you fit.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container className="pb-20 sm:pb-28">
        <Reveal>
          <div className="mx-auto max-w-2xl">
            <RoleMatcher
              roles={roles.map((role) => ({
                slug: role.slug,
                title: role.title,
                description: role.description ?? "",
              }))}
            />
          </div>
        </Reveal>
      </Container>
    </>
  );
}
