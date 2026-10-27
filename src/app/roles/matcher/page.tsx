import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Route } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { HeroSection } from "@/components/heroes/hero-backdrop";
import { RoleMatcher } from "@/components/role-matcher";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";
import { getEntries } from "@/lib/content";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Find Your Role",
  description:
    "Answer six questions and find which of the thirteen open digital forensics roles fits you best.",
  alternates: pageAlternates("/roles/matcher"),
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

      <HeroSection variant="matcher">
        <Container variant="wide" className="relative z-10 flex min-h-[260px] items-center pb-8 pt-14 sm:min-h-[280px] sm:pt-16">
          <Reveal>
            <Link
              href="/roles"
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              All thirteen open roles
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <Route className="h-5 w-5 text-accent" />
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
                Role matcher
              </p>
            </div>
            <h1 className="font-display mt-4 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Which seat is <span className="text-accent-2">yours?</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
              Six questions, no wrong answers. We map your instincts against all
              thirteen open specialisations and show you where you fit.
            </p>
          </Reveal>
        </Container>
      </HeroSection>

      <Container variant="narrow" className="pb-20 sm:pb-28">
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
