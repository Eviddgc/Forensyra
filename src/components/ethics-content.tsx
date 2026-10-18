import Link from "next/link";
import {
  Fingerprint,
  Scale,
  ShieldCheck,
  Users,
  FileCheck,
  Lock,
  BookOpen,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/* ── Data ────────────────────────────────────────────────────────────────── */

const COMMITMENTS: Array<{
  number: string;
  title: string;
  text: string;
  Icon: LucideIcon;
}> = [
  {
    number: "01",
    title: "Legal practice cases only",
    text: "We work exclusively on authorised, educational material.",
    Icon: Scale,
  },
  {
    number: "02",
    title: "Public sample evidence only",
    text: "Disk images, memory dumps, and packet captures come from public, legal sources.",
    Icon: FileCheck,
  },
  {
    number: "03",
    title: "No real victim data",
    text: "We never use or request real case data, personal data, or leaked material.",
    Icon: Lock,
  },
  {
    number: "04",
    title: "Privacy & consent",
    text: "We respect privacy and obtain consent where it applies.",
    Icon: ShieldCheck,
  },
  {
    number: "05",
    title: "Responsible learning",
    text: "Our aim is defence, investigation, and skill-building — never harm.",
    Icon: BookOpen,
  },
];

const EVIDENCE_RULES = [
  "Hash every evidence file (SHA-256) and record the value.",
  "Work only on copies; original evidence stays read-only.",
  "Keep an unbroken chain of custody — who, what, when, why.",
  "Verify integrity again when analysis ends.",
];

const CONDUCT_RULES = [
  "Do not attempt unauthorised access to any system.",
  "Do not publish anything that could expose real people or organisations.",
  "Raise any legal or ethical concern with the Legal & Digital Evidence Advisor before proceeding.",
];

const NON_NEGOTIABLE = [
  "Legal, authorised practice cases only",
  "Public sample evidence only",
  "No real victim data — ever",
  "Privacy, consent, and integrity respected",
];

/* ── Sections ────────────────────────────────────────────────────────────── */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal>
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

function EditorialSection({
  Icon,
  heading,
  rules,
  statement,
}: {
  Icon: LucideIcon;
  heading: string;
  rules?: string[];
  statement?: string;
}) {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
          <Reveal className="shrink-0">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#6aa0dc]/30 bg-[#122b46]/60 text-accent-2">
              <Icon className="h-6 w-6" />
            </span>
          </Reveal>
          <Reveal delay={80} className="min-w-0">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {heading}
            </h2>
            {rules ? (
              <ul className="mt-6 space-y-4">
                {rules.map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-[15px] leading-relaxed text-muted">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {rule}
                  </li>
                ))}
              </ul>
            ) : null}
            {statement ? (
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">
                {statement}
              </p>
            ) : null}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ── Main export ─────────────────────────────────────────────────────────── */

export function EthicsContent() {
  return (
    <>
      {/* Introductory statement */}
      <section className="border-b border-border/50 bg-surface/40">
        <Container className="py-12 sm:py-16">
          <Reveal>
            <p className="max-w-3xl text-lg leading-relaxed text-foreground/90 sm:text-xl">
              These rules apply to every member and every activity.{" "}
              <span className="text-accent-2">They are not optional.</span>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Core commitments */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="The standard"
            title="The core commitments"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {COMMITMENTS.map((card, index) => (
              <Reveal key={card.number} delay={index * 60}>
                <div className="group h-full rounded-2xl border border-[#6aa0dc]/25 bg-[#122b46]/50 p-6 transition-colors duration-300 hover:border-accent/40">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent-2">
                      <card.Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-muted/60">
                      {card.number}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold leading-snug text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {card.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Evidence handling */}
      <div className="border-t border-border/40">
        <EditorialSection
          Icon={Fingerprint}
          heading="Evidence handling"
          rules={EVIDENCE_RULES}
        />
      </div>

      {/* Conduct */}
      <div className="border-t border-border/40">
        <EditorialSection
          Icon={ShieldCheck}
          heading="Conduct"
          rules={CONDUCT_RULES}
        />
      </div>

      {/* A shared standard */}
      <div className="border-t border-border/40">
        <EditorialSection
          Icon={Users}
          heading="A shared standard"
          statement="Every selected member agrees to these rules before they start. If a case cannot be run legally and ethically, we do not run it."
        />
      </div>

      {/* Non-negotiable panel */}
      <section className="border-t border-border/40 py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-[#6aa0dc]/30 bg-gradient-to-br from-[#122b46] via-[#0d2238] to-[#071827] p-8 sm:p-12">
              {/* Fingerprint decoration on the right. */}
              <svg
                aria-hidden="true"
                className="absolute right-[-4%] top-1/2 hidden h-[20rem] w-[20rem] -translate-y-1/2 opacity-[0.08] md:block"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle cx="100" cy="100" r="90" stroke="#e6b64f" strokeWidth="0.8" />
                <circle cx="100" cy="100" r="75" stroke="#e6b64f" strokeWidth="0.6" />
                <circle cx="100" cy="100" r="60" stroke="#e6b64f" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="45" stroke="#e6b64f" strokeWidth="0.4" />
                <circle cx="100" cy="100" r="30" stroke="#e6b64f" strokeWidth="0.3" />
                <path
                  d="M100 10 C 130 10 155 35 155 65 C 155 95 130 120 100 120 C 70 120 45 95 45 65 C 45 35 70 10 100 10"
                  stroke="#e6b64f"
                  strokeWidth="0.8"
                />
                <path
                  d="M100 25 C 120 25 140 45 140 65 C 140 85 120 105 100 105 C 80 105 60 85 60 65 C 60 45 80 25 100 25"
                  stroke="#e6b64f"
                  strokeWidth="0.6"
                />
                <path
                  d="M100 40 C 110 40 125 50 125 65 C 125 80 110 90 100 90 C 90 90 75 80 75 65 C 75 50 90 40 100 40"
                  stroke="#e6b64f"
                  strokeWidth="0.5"
                />
              </svg>

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 text-accent-2">
                    <ShieldCheck className="h-6 w-6" />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
                    Non-negotiable
                  </p>
                </div>
                <ul className="mt-8 space-y-4">
                  {NON_NEGOTIABLE.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/90 sm:text-base"
                    >
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Contact guidance */}
      <section className="pb-16 sm:pb-20">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-[#6aa0dc]/30 bg-[#122b46]/50 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent-2">
                <MessageSquare className="h-5 w-5" />
              </span>
              <p className="text-[15px] leading-relaxed text-muted">
                Questions about a case? Raise them with the Legal &amp; Digital
                Evidence Advisor before any work begins.{" "}
                <Link
                  href="/contact"
                  className="font-medium text-accent-2 underline underline-offset-4 transition hover:text-accent"
                >
                  Contact us
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
