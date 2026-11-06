import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/badge";

/**
 * Mentors subsection for the team page. Mentors are outside experts, so the
 * section sits apart from the member roster. No mentors have confirmed yet,
 * so the section honestly shows a forming panel rather than people; there is
 * no fixed number of mentor seats - every DFIR specialty is welcome. When a
 * mentor confirms, their card joins this section in the member-card visual
 * language (photo, name, LinkedIn).
 */
export function TeamMentors() {
  return (
    <section aria-labelledby="mentors-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
            Guidance
          </p>
          <h2
            id="mentors-heading"
            className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Mentors &amp; advisors
          </h2>
          <p className="mt-2 max-w-xl text-[15px] text-muted">
            Experienced DFIR professionals we hope to learn from as we practise
            on realistic mock cases. Confirmed mentors will appear here with
            their profiles.
          </p>
        </div>

        <Badge variant="accent">Panel forming</Badge>
      </div>

      <div className="mt-8 rounded-3xl border border-dashed border-accent/30 bg-surface/40 p-8 text-center sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-accent/30 bg-accent/5 text-accent/70">
          <GraduationCap aria-hidden="true" className="h-7 w-7" />
        </div>
        <p className="font-display mt-5 text-2xl font-semibold text-foreground">
          Our mentor panel is forming
        </p>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted">
          We are reaching out to experienced digital forensics professionals to
          guide the team as it learns. There is no fixed number of seats -
          every specialty is welcome, and each mentor will be introduced here
          in their own field.
        </p>
        <Link
          href="/apply/mentor"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-accent-2"
        >
          Become a mentor
        </Link>
      </div>
    </section>
  );
}
