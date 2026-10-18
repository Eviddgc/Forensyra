"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Compass,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MatcherRole {
  slug: string;
  title: string;
  description: string;
}

interface MatcherOption {
  label: string;
  /** Weight 2 — a strong signal for these roles. */
  primary: string[];
  /** Weight 1 — a supporting signal. */
  secondary?: string[];
}

interface MatcherQuestion {
  id: string;
  prompt: string;
  options: MatcherOption[];
}

/**
 * Six questions, each option casting weighted votes for the roles it points
 * at. Scores are normalised against the best a role could possibly score, so a
 * narrow specialism isn't penalised for appearing in fewer answers.
 */
const QUESTIONS: MatcherQuestion[] = [
  {
    id: "q1",
    prompt: "It's 2am on a live case. What are you doing?",
    options: [
      {
        label: "Piecing together exactly what happened, in order",
        primary: ["timeline-forensic-reporting-analyst", "lead-forensic-investigator"],
        secondary: ["coordinator-operations"],
      },
      {
        label: "Digging through a disk image for the one file that matters",
        primary: ["endpoint-forensics-analyst", "evidence-custodian-chain-of-custody"],
        secondary: ["multimedia-forensics-analyst"],
      },
      {
        label: "Following an intruder across network traffic and logs",
        primary: ["network-forensics-analyst", "threat-intelligence-osint-analyst"],
        secondary: ["cloud-forensics-analyst"],
      },
      {
        label: "Taking a suspicious binary apart",
        primary: ["memory-malware-analysis-analyst", "ai-forensics-ai-security-analyst"],
        secondary: ["endpoint-forensics-analyst"],
      },
    ],
  },
  {
    id: "q2",
    prompt: "Which artefact do you most want on your bench?",
    options: [
      {
        label: "A Windows or Linux disk image",
        primary: ["endpoint-forensics-analyst", "evidence-custodian-chain-of-custody"],
        secondary: ["memory-malware-analysis-analyst"],
      },
      {
        label: "A memory dump",
        primary: ["memory-malware-analysis-analyst", "endpoint-forensics-analyst"],
        secondary: ["ai-forensics-ai-security-analyst"],
      },
      {
        label: "A phone or tablet",
        primary: ["mobile-device-forensics-analyst", "multimedia-forensics-analyst"],
        secondary: ["evidence-custodian-chain-of-custody"],
      },
      {
        label: "Photos, audio, documents and their metadata",
        primary: ["multimedia-forensics-analyst", "threat-intelligence-osint-analyst"],
        secondary: ["legal-digital-evidence-advisor"],
      },
    ],
  },
  {
    id: "q3",
    prompt: "How do you do your best work?",
    options: [
      {
        label: "Deep focus, alone, on one hard artefact",
        primary: ["memory-malware-analysis-analyst", "multimedia-forensics-analyst"],
        secondary: ["mobile-device-forensics-analyst", "endpoint-forensics-analyst"],
      },
      {
        label: "Across many sources, constantly joining dots",
        primary: ["threat-intelligence-osint-analyst", "network-forensics-analyst"],
        secondary: ["cloud-forensics-analyst", "timeline-forensic-reporting-analyst"],
      },
      {
        label: "Organising people and keeping the pace up",
        primary: ["coordinator-operations", "lead-forensic-investigator"],
        secondary: ["timeline-forensic-reporting-analyst"],
      },
      {
        label: "Checking, documenting and proving every step",
        primary: ["evidence-custodian-chain-of-custody", "legal-digital-evidence-advisor"],
        secondary: ["timeline-forensic-reporting-analyst"],
      },
    ],
  },
  {
    id: "q4",
    prompt: "The report is going out. What must be true?",
    options: [
      {
        label: "The chain of custody is unbroken and provable",
        primary: ["evidence-custodian-chain-of-custody"],
        secondary: ["legal-digital-evidence-advisor"],
      },
      {
        label: "The narrative is clear, and it holds together",
        primary: ["timeline-forensic-reporting-analyst", "lead-forensic-investigator"],
        secondary: ["coordinator-operations"],
      },
      {
        label: "Every technical finding can be reproduced",
        primary: ["endpoint-forensics-analyst", "memory-malware-analysis-analyst"],
        secondary: ["ai-forensics-ai-security-analyst"],
      },
      {
        label: "We stayed inside the law and our own ethics",
        primary: ["legal-digital-evidence-advisor", "evidence-custodian-chain-of-custody"],
        secondary: ["lead-forensic-investigator"],
      },
    ],
  },
  {
    id: "q5",
    prompt: "Which set of tools would you reach for first?",
    options: [
      {
        label: "Autopsy, RegRipper, KAPE",
        primary: ["endpoint-forensics-analyst"],
        secondary: ["evidence-custodian-chain-of-custody", "multimedia-forensics-analyst"],
      },
      {
        label: "Volatility, MemProcFS, YARA",
        primary: ["memory-malware-analysis-analyst"],
        secondary: ["threat-intelligence-osint-analyst", "ai-forensics-ai-security-analyst"],
      },
      {
        label: "Wireshark, Zeek, Plaso",
        primary: ["network-forensics-analyst", "timeline-forensic-reporting-analyst"],
        secondary: ["threat-intelligence-osint-analyst"],
      },
      {
        label: "Cloud APIs, mobile parsers, AI assistants",
        primary: ["cloud-forensics-analyst", "mobile-device-forensics-analyst", "ai-forensics-ai-security-analyst"],
        secondary: ["multimedia-forensics-analyst"],
      },
    ],
  },
  {
    id: "q6",
    prompt: "How should the collective run?",
    options: [
      {
        label: "Fast and coordinated — everyone knows their job",
        primary: ["coordinator-operations", "lead-forensic-investigator"],
        secondary: ["timeline-forensic-reporting-analyst"],
      },
      {
        label: "Cautiously — nothing moves without a hash and a log",
        primary: ["evidence-custodian-chain-of-custody", "legal-digital-evidence-advisor"],
        secondary: ["endpoint-forensics-analyst"],
      },
      {
        label: "Openly — publish what we find and teach others",
        primary: ["ai-forensics-ai-security-analyst", "threat-intelligence-osint-analyst"],
        secondary: ["coordinator-operations", "timeline-forensic-reporting-analyst"],
      },
      {
        label: "Methodically — verify everything twice",
        primary: ["endpoint-forensics-analyst", "memory-malware-analysis-analyst", "multimedia-forensics-analyst"],
        secondary: ["mobile-device-forensics-analyst", "cloud-forensics-analyst"],
      },
    ],
  },
];

/** Best score a role could possibly achieve across all questions. */
const ROLE_CEILING = (() => {
  const ceiling = new Map<string, number>();
  for (const question of QUESTIONS) {
    const best = new Map<string, number>();
    for (const option of question.options) {
      for (const slug of option.primary) best.set(slug, Math.max(best.get(slug) ?? 0, 2));
      for (const slug of option.secondary ?? [])
        best.set(slug, Math.max(best.get(slug) ?? 0, 1));
    }
    for (const [slug, value] of best) {
      ceiling.set(slug, (ceiling.get(slug) ?? 0) + value);
    }
  }
  return ceiling;
})();

interface MatchResult {
  role: MatcherRole;
  score: number;
  ceiling: number;
  percent: number;
}

export function RoleMatcher({ roles }: { roles: MatcherRole[] }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const finished = step >= QUESTIONS.length;
  const question = QUESTIONS[Math.min(step, QUESTIONS.length - 1)];
  const answered = answers[question?.id ?? ""] !== undefined;

  const results = useMemo<MatchResult[]>(() => {
    const scores = new Map<string, number>();
    for (const item of QUESTIONS) {
      const choice = answers[item.id];
      if (choice === undefined) continue;
      const option = item.options[choice];
      if (!option) continue;
      for (const slug of option.primary) {
        scores.set(slug, (scores.get(slug) ?? 0) + 2);
      }
      for (const slug of option.secondary ?? []) {
        scores.set(slug, (scores.get(slug) ?? 0) + 1);
      }
    }

    return roles
      .map((role) => {
        const score = scores.get(role.slug) ?? 0;
        const ceiling = ROLE_CEILING.get(role.slug) ?? 1;
        return {
          role,
          score,
          ceiling,
          percent: Math.round((score / ceiling) * 100),
        };
      })
      .sort(
        (a, b) =>
          b.percent - a.percent ||
          b.score - a.score ||
          a.role.title.localeCompare(b.role.title),
      );
  }, [answers, roles]);

  function choose(index: number) {
    setAnswers((previous) => ({ ...previous, [question.id]: index }));
  }

  function restart() {
    setAnswers({});
    setStep(0);
  }

  // Results view
  if (finished) {
    const top = results.slice(0, 3);
    return (
      <div className="rounded-3xl border border-border-gold/40 bg-surface/50 p-6 sm:p-8">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent-2">
            <Sparkles className="h-4 w-4" />
          </span>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Your closest matches
          </h2>
        </div>
        <p className="mt-3 text-sm text-muted">
          A guide, not a verdict. The strongest analysts usually grow into two or
          three of these.
        </p>

        <ol className="mt-7 space-y-4">
          {top.map((result, index) => (
            <li
              key={result.role.slug}
              className="rounded-2xl border border-border bg-background/40 p-5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {result.role.title}
                  </h3>
                </div>
                <span className="shrink-0 font-mono text-sm text-accent-2">
                  {result.percent}%
                </span>
              </div>

              <div
                aria-hidden="true"
                className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2 transition-[width] duration-700"
                  style={{ width: `${Math.max(4, result.percent)}%` }}
                />
              </div>

              {result.role.description ? (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {result.role.description}
                </p>
              ) : null}

              <Link
                href={`/roles#role-${result.role.slug}`}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-2 transition hover:text-accent"
              >
                Read the full role
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/apply"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-ink transition hover:bg-accent-2"
          >
            Apply for a role
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-[15px] font-medium text-foreground transition hover:border-accent/60 hover:text-accent-2"
          >
            <RotateCcw className="h-4 w-4" />
            Start again
          </button>
        </div>
      </div>
    );
  }

  const progress = Math.round((step / QUESTIONS.length) * 100);

  return (
    <div className="rounded-3xl border border-border-gold/40 bg-surface/50 p-6 sm:p-8">
      {/* Progress */}
      <div className="flex items-center gap-4">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent-2">
          <Compass className="h-4 w-4" />
        </span>
        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Question {step + 1} of {QUESTIONS.length}
            </p>
            <p className="font-mono text-[10px] text-muted">{progress}%</p>
          </div>
          <div
            aria-hidden="true"
            className="mt-2 h-1 overflow-hidden rounded-full bg-surface-2"
          >
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-500"
              style={{ width: `${Math.max(4, progress)}%` }}
            />
          </div>
        </div>
      </div>

      <fieldset className="mt-7">
        <legend className="font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl">
          {question.prompt}
        </legend>
        <div className="mt-5 space-y-2.5">
          {question.options.map((option, index) => {
            const selected = answers[question.id] === index;
            return (
              <button
                key={option.label}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => choose(index)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm transition",
                  selected
                    ? "border-accent bg-accent/12 text-foreground"
                    : "border-border bg-background/40 text-muted hover:border-accent/50 hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition",
                    selected
                      ? "border-accent bg-accent text-ink"
                      : "border-border",
                  )}
                >
                  {selected ? <Check className="h-3 w-3" /> : null}
                </span>
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-7 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((value) => Math.max(0, value - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
        <button
          type="button"
          onClick={() => setStep((value) => value + 1)}
          disabled={!answered}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-ink transition hover:bg-accent-2 disabled:pointer-events-none disabled:opacity-40"
        >
          {step === QUESTIONS.length - 1 ? "See my matches" : "Next"}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
