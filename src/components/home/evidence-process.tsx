import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  FileText,
  Microscope,
  Share2,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { btnOutlineDarkLg } from "@/lib/ui";

/** Section 5 — evidence handling process (dark cinematic band). */
const STEPS: Array<{
  number: string;
  title: string;
  text: string;
  Icon: LucideIcon;
}> = [
  {
    number: "01",
    title: "Collect & Preserve",
    text: "Secure the data, maintain chain of custody, and document every step.",
    Icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "Analyze & Investigate",
    text: "Use industry-standard tools to uncover the truth in the data.",
    Icon: Microscope,
  },
  {
    number: "03",
    title: "Document & Report",
    text: "Build detailed reports with findings and actionable insights.",
    Icon: FileText,
  },
  {
    number: "04",
    title: "Share & Learn",
    text: "Present findings, review with the team, and improve with every case.",
    Icon: Share2,
  },
];

export function EvidenceProcess() {
  return (
    <section className="relative isolate overflow-hidden bg-surface">
      <Image
        src="/images/evidence-mountain.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-30"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/95" />

      <Container className="relative z-10 py-20 sm:py-28">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="fx-eyebrow text-accent">Latest Write-ups</p>
            <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              How We Handle Evidence
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              From the crime scene to the final report, here&apos;s how
              Forensyra members break down real-world cases.
            </p>
          </div>
          <Link
            href="/writeups"
            className={`${btnOutlineDarkLg} shrink-0`}
          >
            Read the write-ups
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="relative mt-14">
          {/* Vertical connector — mobile / tablet */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-6 top-6 w-px bg-border-gold lg:hidden"
          />

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, index) => (
              <li key={step.number} className="relative flex gap-4 lg:block">
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-accent/10 text-accent">
                  <step.Icon className="h-5 w-5" />
                </span>
                <div className="pt-1 lg:pt-0">
                  <span className="font-display block text-4xl font-semibold leading-none text-foreground/20">
                    {step.number}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                    {step.text}
                  </p>
                </div>
                {index < STEPS.length - 1 ? (
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute -right-3 top-4 hidden h-4 w-4 text-accent/40 lg:block"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
