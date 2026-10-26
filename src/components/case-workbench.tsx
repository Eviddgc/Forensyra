"use client";

import { useMemo, useRef, useState } from "react";
import {
  Check,
  ClipboardList,
  Copy,
  FileStack,
  Hash,
  ListChecks,
  Search,
  ShieldCheck,
} from "lucide-react";
import type { EntryStep } from "@/lib/content";
import { cn } from "@/lib/utils";
import { HashVerifier } from "@/components/hash-verifier";

type TabId = "evidence" | "verify" | "plan";

const TABS: Array<{ id: TabId; label: string; icon: typeof FileStack }> = [
  { id: "evidence", label: "Evidence register", icon: FileStack },
  { id: "verify", label: "Verify a hash", icon: ShieldCheck },
  { id: "plan", label: "Investigation plan", icon: ListChecks },
];

function evidenceId(index: number): string {
  return `EVID-${String(index + 1).padStart(3, "0")}`;
}

/** Every row is pending acquisition; the filter matches this label too. */
const STATUS_LABEL = "Pending";

/**
 * Interactive workspace for a case file: an evidence register, a local hash
 * verifier, and the investigation plan. Nothing here simulates findings — it
 * exposes the process and the tooling honestly, whatever the case status.
 */
export function CaseWorkbench({
  evidence,
  plan,
  deliverables,
  sourceUrl,
}: {
  evidence: string[];
  plan: EntryStep[];
  deliverables: string[];
  sourceUrl?: string;
}) {
  const [tab, setTab] = useState<TabId>("evidence");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return evidence
      .map((item, index) => ({ item, index }))
      .filter(({ item, index }) => {
        if (!q) return true;
        return (
          item.toLowerCase().includes(q) ||
          evidenceId(index).toLowerCase().includes(q) ||
          STATUS_LABEL.toLowerCase().includes(q)
        );
      });
  }, [evidence, query]);

  async function copyRegister() {
    const header = "| ID | Evidence item | SHA-256 | Status |\n| --- | --- | --- | --- |";
    const rows = evidence
      .map(
        (item, index) =>
          `| ${evidenceId(index)} | ${item} | _(recorded on acquisition)_ | ${STATUS_LABEL} |`,
      )
      .join("\n");
    const body = `${header}\n${rows}\n\nCustody log — every copy is hashed and recorded on receipt.`;
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function onTabKeydown(event: React.KeyboardEvent, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const offset = event.key === "ArrowRight" ? 1 : -1;
    const next = (index + offset + TABS.length) % TABS.length;
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      aria-label="Case workbench"
      className="overflow-hidden rounded-3xl border border-border-gold/40 bg-surface/50"
    >
      {/* Tab list */}
      <div
        role="tablist"
        aria-label="Case workbench sections"
        className="flex flex-wrap gap-1 border-b border-border/70 bg-background/40 p-2"
      >
        {TABS.map((item, index) => {
          const Icon = item.icon;
          const selected = tab === item.id;
          return (
            <button
              key={item.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              role="tab"
              id={`fx-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`fx-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(item.id)}
              onKeyDown={(event) => onTabKeydown(event, index)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium transition",
                selected
                  ? "bg-accent text-ink"
                  : "text-muted hover:bg-surface-2/70 hover:text-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Evidence */}
      <div
        role="tabpanel"
        id="fx-panel-evidence"
        aria-labelledby="fx-tab-evidence"
        hidden={tab !== "evidence"}
        tabIndex={0}
        className="p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {evidence.length} item{evidence.length === 1 ? "" : "s"} in the
            register. Hashes are recorded on acquisition and published when the
            case closes.
          </p>
          <button
            type="button"
            onClick={copyRegister}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition hover:border-accent/60 hover:text-accent-2"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-success" />
                Copied
              </>
            ) : (
              <>
                <ClipboardList className="h-3.5 w-3.5" />
                Copy as custody log
              </>
            )}
          </button>
        </div>

        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
          <label htmlFor="fx-evidence-search" className="sr-only">
            Filter evidence
          </label>
          <input
            id="fx-evidence-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter the register…"
            className="w-full rounded-full border border-border bg-background/50 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted/60 transition focus:border-accent/60 focus:outline-none"
          />
        </div>

        <ul className="mt-4 space-y-2">
          {filtered.map(({ item, index }) => (
            <li
              key={item}
              className="flex items-center gap-4 rounded-2xl border border-border/70 bg-background/30 px-4 py-3"
            >
              <span className="font-mono text-[11px] text-accent">
                {evidenceId(index)}
              </span>
              <span className="min-w-0 flex-1 text-sm text-foreground">
                {item}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted/80">
                <Hash className="h-3 w-3" />
                {STATUS_LABEL}
              </span>
            </li>
          ))}
          {filtered.length === 0 ? (
            <li className="rounded-2xl border border-border/70 bg-background/30 px-4 py-6 text-center text-sm text-muted">
              Nothing in the register matches “{query}”.
            </li>
          ) : null}
        </ul>

        {sourceUrl ? (
          <p className="mt-4 text-xs text-muted">
            Source:{" "}
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-accent-2 underline decoration-accent/40 underline-offset-4 transition hover:text-accent"
            >
              the published evidence collection
            </a>
            . Verify every copy before analysis.
          </p>
        ) : null}
      </div>

      {/* Verify */}
      <div
        role="tabpanel"
        id="fx-panel-verify"
        aria-labelledby="fx-tab-verify"
        hidden={tab !== "verify"}
        tabIndex={0}
        className="p-5 sm:p-6"
      >
        <HashVerifier />
      </div>

      {/* Plan */}
      <div
        role="tabpanel"
        id="fx-panel-plan"
        aria-labelledby="fx-tab-plan"
        hidden={tab !== "plan"}
        tabIndex={0}
        className="p-5 sm:p-6"
      >
        {plan.length > 0 ? (
          <ol className="relative space-y-6 border-l border-border/70 pl-6">
            {plan.map((step, index) => (
              <li key={step.label} className="relative">
                <span className="absolute -left-[1.9rem] flex h-6 w-6 items-center justify-center rounded-full border border-accent/40 bg-background font-mono text-[10px] text-accent">
                  {index + 1}
                </span>
                <p className="font-display text-lg font-semibold text-foreground">
                  {step.label}
                </p>
                {step.detail ? (
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {step.detail}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        ) : null}

        {deliverables.length > 0 ? (
          <div className="mt-8 rounded-2xl border border-border/70 bg-background/30 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Deliverables
            </p>
            <ul className="mt-3 space-y-2">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                  <Copy className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
