import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Markdown } from "@/components/markdown";
import { Badge } from "@/components/badge";
import { btnPrimary } from "@/lib/ui";
import { getEntries, getEntry } from "@/lib/content";
import { getSite } from "@/lib/site";
import { phaseLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Apply for a role in the FORENSYRA founding team and help build our first investigation.",
};

const STEPS = [
  "Open the application form (about 3 minutes).",
  "Choose your role — and a second choice if you like.",
  "Tell us what you have used and what you want to learn.",
  "Selected members are contacted by email.",
];

export default async function JoinPage() {
  const [page, roles] = await Promise.all([
    getEntry("pages", "join"),
    getEntries("roles"),
  ]);
  const site = getSite();

  return (
    <>
      <PageHeader
        eyebrow="Recruiting"
        title="Join Forensyra"
        description="Applications are open for the founding team. Limited spots — pick a role and apply."
      >
        <a
          href={site.applyUrl}
          target="_blank"
          rel="noreferrer"
          className={btnPrimary}
        >
          Open the application form
          <ArrowRight className="h-4 w-4" />
        </a>
      </PageHeader>

      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            {page ? (
              <Markdown html={page.content} />
            ) : (
              <p className="text-muted">
                We are welcoming people interested in every part of digital
                forensics.
              </p>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                How to apply
              </p>
              <ul className="mt-5 space-y-3">
                {STEPS.map((step) => (
                  <li key={step} className="flex gap-3 text-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {step}
                  </li>
                ))}
              </ul>
              <a
                href={site.applyUrl}
                target="_blank"
                rel="noreferrer"
                className={`${btnPrimary} mt-6 w-full`}
              >
                Apply now
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mt-3 text-center text-xs text-muted">
                Limited spots. Selected members will be contacted by email.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <p className="mt-4 text-sm text-muted">
                By joining, you agree to our ethics rules: legal practice cases
                and public sample evidence only, with no real victim data.
              </p>
              <Link
                href="/ethics"
                className="mt-3 -mb-1 inline-flex items-center gap-1 py-1 text-sm font-medium text-accent hover:underline"
              >
                Read the ethics rules
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Roles available
          </h2>
          <p className="mt-2 text-muted">
            Choose the specialisation that fits you best.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <div
                key={role.slug}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3"
              >
                <span className="text-sm text-foreground">{role.title}</span>
                <Badge variant="outline">
                  {role.phase ? phaseLabel(role.phase) : "Open"}
                </Badge>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
