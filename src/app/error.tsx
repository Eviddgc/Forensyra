"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Container } from "@/components/container";
import { btnPrimary, btnSecondary } from "@/lib/ui";

/** Route-level error boundary — keeps the brand frame when a page fails. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[forensyra] route error:", error);
  }, [error]);

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-danger/40 bg-danger/10 text-danger">
        <AlertTriangle className="h-6 w-6" />
      </span>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
        Evidence chain interrupted
      </p>
      <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Something went wrong loading this page
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The trace could not be read. Try again — if it keeps happening the page
        may have been moved or the evidence is temporarily unavailable.
      </p>
      {error.digest ? (
        <p className="mt-3 font-mono text-xs text-muted/70">
          Reference: {error.digest}
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className={btnPrimary}>
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
        <Link href="/" className={btnSecondary}>
          Back to home
        </Link>
      </div>
    </Container>
  );
}
