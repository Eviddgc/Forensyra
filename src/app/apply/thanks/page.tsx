import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Lock } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { btnPrimaryLg } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Application received",
  description: "Thank you — your Forensyra application has been received.",
  robots: { index: false, follow: false },
};

/**
 * The landing spot for a no-JavaScript submission, which the API route reaches
 * with a 303 redirect. With JavaScript the form shows its own success state and
 * this page is never seen.
 */
export default function ApplyThanksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Recruiting"
        title="Application received"
        description="Thank you — your application is on its way to the team."
      >
        <Link href="/" className={btnPrimaryLg}>
          Back to home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHeader>

      <Container className="py-12 sm:py-16">
        <div className="fx-form-panel fx-holo mx-auto max-w-2xl p-8 text-center sm:p-12">
          <div className="flex justify-center">
            <span className="fx-seal">
              <Check className="h-9 w-9" strokeWidth={2.5} />
            </span>
          </div>
          <h2 className="font-display mt-7 text-3xl font-semibold tracking-tight text-foreground">
            We&apos;ve got it.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted">
            Your application has reached the team and a confirmation is on its way to your inbox. If
            it isn&apos;t there in a few minutes, check your spam folder.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            Only limited spots are open. Selected members are contacted by email, and we read every
            application.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/roles" className={btnPrimaryLg}>
              Explore the roles
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-[15px] font-medium text-foreground transition hover:border-accent/60 hover:text-accent-2"
            >
              Back to home
            </Link>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 text-xs text-muted">
            <Lock className="h-3.5 w-3.5" />
            We keep your answers private and use them only to review this application.
          </p>
        </div>
      </Container>
    </>
  );
}
