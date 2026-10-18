"use client";

import { useState } from "react";
import { Check, Copy, Quote } from "lucide-react";

/**
 * Copyable citation block. Gives readers a stable, paste-ready reference to
 * quote the work — useful for students citing the recording of an investigation.
 */
export function CiteBlock({
  citation,
  url,
}: {
  citation: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = `${citation}\n${url}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      aria-labelledby="cite-heading"
      className="mt-12 rounded-2xl border border-border bg-surface/40 p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent-2">
            <Quote className="h-3.5 w-3.5" />
          </span>
          <h2
            id="cite-heading"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent"
          >
            Cite this work
          </h2>
        </div>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition hover:border-accent/60 hover:text-accent-2"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-success" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <p className="mt-4 font-mono text-[13px] leading-relaxed text-muted">
        {citation}
      </p>
      <p className="mt-1.5 break-all font-mono text-[13px] text-muted/70">
        {url}
      </p>
    </section>
  );
}
