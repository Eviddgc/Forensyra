import {
  ArrowRight,
  Feather,
  GitBranch,
  Layers,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/** Section 6 — how the collective works (cinematic navy band). */
const STEPS: Array<{
  number: string;
  title: string;
  text: string;
  Icon: LucideIcon;
}> = [
  {
    number: "01",
    title: "Roles first",
    text: "Every member owns one defined specialisation, and roles are filled in phases.",
    Icon: Layers,
  },
  {
    number: "02",
    title: "One strong project",
    text: "We aim to finish one complete investigation rather than many partial ones.",
    Icon: Target,
  },
  {
    number: "03",
    title: "Light and sustainable",
    text: "One short call plus about an hour of task work a week.",
    Icon: Feather,
  },
  {
    number: "04",
    title: "Open by default",
    text: "Our work lives in a public GitHub organisation.",
    Icon: GitBranch,
  },
];

export function Approach() {
  return (
    <section className="relative isolate overflow-hidden">

      <Container className="relative z-10 py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <p className="fx-eyebrow text-accent">Our Approach</p>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            How we work
          </h2>
        </Reveal>

        <ol className="relative mt-14 grid gap-6 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step, index) => (
            <li key={step.number} className="relative">
              <Reveal delay={index * 80} className="h-full">
                <div className="h-full rounded-2xl border border-border-gold bg-surface-2/70 p-6 backdrop-blur-sm transition hover:border-accent/60 hover:bg-surface-2">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/35 bg-accent/10 text-accent">
                    <step.Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display mt-5 block text-4xl font-semibold leading-none text-accent">
                    {step.number}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.text}
                  </p>
                </div>
              </Reveal>

              {index < STEPS.length - 1 ? (
                <ArrowRight
                  aria-hidden="true"
                  className="absolute -right-3 top-10 hidden h-4 w-4 text-accent/50 lg:block"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
