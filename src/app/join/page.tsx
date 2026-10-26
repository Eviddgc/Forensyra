import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Container } from "@/components/container";
import { JoinHero } from "@/components/join-hero";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/badge";
import { pageAlternates } from "@/lib/seo";
import { btnPrimary } from "@/lib/ui";
import { getEntries } from "@/lib/content";


export const metadata: Metadata = {
  title: "Join",
  description:
    "Apply for a role in the FORENSYRA founding team and help build our first investigation.",
  alternates: pageAlternates("/join"),
};

const STEPS = [
  "Open the application form (about 3 minutes).",
  "Pick the role that fits you best.",
  "Tell us what you have used and what you want to learn.",
  "Selected members are contacted by email.",
];

export default async function JoinPage() {
  const roles = await getEntries("roles");

  return (
    <>
      <JoinHero description="Applications are open for the founding team. Limited spots — pick a role and apply." />

      <Container variant="wide" className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          {/* How to apply */}
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
              How to Apply
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Four steps
            </h2>
            <ul className="mt-8 space-y-5">
              {STEPS.map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent-2">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[15px] leading-relaxed text-muted">
                    <span className="font-mono text-xs text-accent-2">
                      {String(index + 1).padStart(2, "0")}
                    </span>{" "}
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Sidebar */}
          <div className="space-y-4">
            <Reveal delay={80}>
              <div className="rounded-2xl border border-[#6aa0dc]/25 bg-[#122b46]/50 p-6">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                  Start here
                </p>
                <div className="mt-5 space-y-3">
                  <Link
                    href="/apply"
                    className={`${btnPrimary} w-full`}
                  >
                    Team Application
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/apply/mentor"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#6aa0dc]/40 bg-background/40 px-6 py-3 text-[15px] font-medium text-foreground backdrop-blur-sm transition hover:border-accent hover:text-accent-2"
                  >
                    Mentor / Advisor
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <p className="mt-3 text-center text-xs text-muted">
                  Limited spots. Selected members will be contacted by email.
                </p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="rounded-2xl border border-[#6aa0dc]/25 bg-[#122b46]/50 p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  By joining, you agree to our ethics rules: legal practice cases and
                  public sample evidence only, with no real victim data.
                </p>
                <Link
                  href="/ethics"
                  className="mt-3 -mb-1 inline-flex items-center gap-1 py-1 text-sm font-medium text-accent-2 transition hover:text-accent"
                >
                  Read the ethics rules
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Roles available */}
        <Reveal>
          <div className="mt-16">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
              Available Roles
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Open specialisations
            </h2>
            <p className="mt-2 max-w-xl text-[15px] text-muted">
              Choose the role that fits you best. You can change your mind later.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map((role) => (
                <div
                  key={role.slug}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#6aa0dc]/25 bg-[#122b46]/50 px-4 py-3"
                >
                  <span className="text-sm text-foreground">{role.title}</span>
                  <Badge variant="accent">Open</Badge>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}



