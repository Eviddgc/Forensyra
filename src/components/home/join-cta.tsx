import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { btnOutlineDarkLg, btnPrimaryLg } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** Section 8 — full-width cinematic join CTA (reused by the About page). */
export function JoinCta({
  applyUrl,
  eyebrow = "Join the Collective",
  title = "Help build the definitive student DFIR team",
  description = "Applications are open. Bring your curiosity, pick a role, and work on a real investigation with us.",
  applyLabel = "Apply Now",
}: {
  applyUrl: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  applyLabel?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-t border-border-gold bg-background">
      <Image
        src="/images/cta-sunset.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-50"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/45" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/25 to-background/70" />

      <Container className="relative z-10 py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <Reveal>
            <p className="fx-eyebrow text-accent">{eyebrow}</p>
            <h2 className="font-display mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
              {description}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={applyUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(btnPrimaryLg, "fx-shine")}
              >
                {applyLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/contact" className={btnOutlineDarkLg}>
                Talk to us
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex items-center lg:justify-end">
              <p className="fx-accent-type text-3xl sm:text-4xl">
                Real Cases
                <br />
                Real Skills
                <br />
                Real Impact
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
