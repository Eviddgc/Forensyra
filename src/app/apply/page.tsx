import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ApplyForm } from "@/components/apply-form";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Team Application",
  description:
    "Apply to join Forensyra — tell us about your interests, skills, availability, and preferred role.",
  alternates: pageAlternates("/apply"),
};

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const configured = Boolean(
    process.env.EMAILJS_SERVICE_ID &&
      process.env.EMAILJS_TEMPLATE_ID &&
      process.env.EMAILJS_PUBLIC_KEY,
  );

  return (
    <>
      <PageHeader
        eyebrow="Recruiting"
        title="Team Application"
        description="Apply to join Forensyra. Tell us about your interests, skills, availability, and preferred role."
      />

      <Container className="py-12 sm:py-16">
        {status === "invalid" || status === "error" ? (
          <div
            role="alert"
            className="mx-auto mb-6 flex max-w-3xl items-start gap-3 rounded-2xl border border-danger/45 bg-danger/10 p-4 text-sm text-danger"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              {status === "invalid"
                ? "We couldn’t submit that application — please check the highlighted fields and try again."
                : "Something went wrong sending your application. Please try again."}
            </p>
          </div>
        ) : null}

        <ApplyForm configured={configured} />
      </Container>
    </>
  );
}
