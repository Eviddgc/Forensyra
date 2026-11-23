import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { pageMetadata } from "@/lib/seo";
import { getSite } from "@/lib/site";
import { btnPrimary } from "@/lib/ui";

export const metadata: Metadata = pageMetadata("/apply", "Team Application", "Phase 1 team applications are filled — the founding team is complete. Phase 2 opens later.");

export default async function ApplyPage() {
  const site = getSite();

  return (
    <>
      <PageHeader
        eyebrow="Recruiting"
        title="Team Application"
        description="Phase 1 applications are filled — the founding team is complete."
      />

      <Container variant="form" className="py-8 sm:py-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#d4af5f]/30 bg-[#151922]/50 p-8 text-center sm:p-10">
          <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
            <Lock className="h-5 w-5" />
          </span>
          <h2 className="font-display mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Phase 1 is filled
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            Every founding-team seat is now taken. Thank you to everyone who
            applied — the response was amazing. New roles open with Phase 2,
            so stay tuned.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-[15px] leading-relaxed text-muted">
            Mentor and advisor applications are still open.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/apply/mentor" className={btnPrimary}>
              Mentor / Advisor
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/team"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d4af5f]/40 bg-background/40 px-6 py-3 text-[15px] font-medium text-foreground backdrop-blur-sm transition hover:border-accent hover:text-accent-2"
            >
              Meet the founding team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted">
            Questions? Write to us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-accent-2 underline decoration-accent/40 underline-offset-2 transition hover:text-accent"
            >
              {site.email}
            </a>
          </p>
        </div>
      </Container>
    </>
  );
}
