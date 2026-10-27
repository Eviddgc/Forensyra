import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { MentorForm } from "@/components/mentor-form";
import { pageMetadata } from "@/lib/seo";
import { getSite } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/apply/mentor", "Mentor Application", "Apply to mentor FORENSYRA — share your DFIR expertise and guide the next generation of forensic analysts.");

export default async function MentorApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const site = getSite();

  const configured = Boolean(
    process.env.EMAILJS_SERVICE_ID &&
      process.env.EMAILJS_TEMPLATE_ID &&
      process.env.EMAILJS_PUBLIC_KEY,
  );

  return (
    <>
      <PageHeader
        eyebrow="Mentoring"
        title="Mentor / Advisor Application"
        description="Share your expertise and help guide the next generation of forensic analysts. We value your time and will review every application."
        variant="mentor"
      />

      <Container variant="form" className="py-12 sm:py-16">
        {status === "invalid" || status === "error" ? (
          <div
            role="alert"
            className="mx-auto mb-6 flex max-w-3xl items-start gap-3 rounded-2xl border border-danger/45 bg-danger/10 p-4 text-sm text-danger"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              {status === "invalid"
                ? "We couldn't submit that application — please check the highlighted fields and try again."
                : "Something went wrong sending your application. Please try again, or email us directly."}
            </p>
          </div>
        ) : null}

        <MentorForm configured={configured} email={site.email} />
      </Container>
    </>
  );
}
