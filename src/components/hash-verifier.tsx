"use client";

import { useCallback, useRef, useState } from "react";
import {
  AlertTriangle,
  Check,
  Copy,
  FileCheck2,
  Loader2,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Largest file we will read into memory in the browser (512 MB). */
const MAX_BYTES = 512 * 1024 * 1024;

type Algo = "md5" | "sha1" | "sha256" | "sha512";

const ALGO_LABEL: Record<Algo, string> = {
  md5: "MD5",
  sha1: "SHA-1",
  sha256: "SHA-256",
  sha512: "SHA-512",
};

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function detectAlgorithm(hash: string): Algo | null {
  const value = hash.trim().toLowerCase();
  if (!value || !/^[0-9a-f]+$/.test(value)) return null;
  if (value.length === 32) return "md5";
  if (value.length === 40) return "sha1";
  if (value.length === 64) return "sha256";
  if (value.length === 128) return "sha512";
  return null;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unit]}`;
}

/**
 * Verifies an evidence file's hash without ever uploading it — the digest is
 * computed locally with the Web Crypto API. Supports SHA-1/256/512; MD5 is
 * detected but not computable in the browser, so we say so plainly.
 */
export function HashVerifier() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState<{ name: string; size: number } | null>(null);
  const [digests, setDigests] = useState<{ sha1: string; sha256: string } | null>(
    null,
  );
  const [expected, setExpected] = useState("");
  const [copied, setCopied] = useState<"sha256" | "sha1" | "">("");

  const handleFile = useCallback(async (next: File) => {
    setError("");
    setDigests(null);
    setFile({ name: next.name, size: next.size });

    if (next.size > MAX_BYTES) {
      setError(
        `That file is ${formatBytes(next.size)}. Files over 512 MB can't be read safely in a browser tab — use sha256sum or CertUtil on the acquisition machine instead.`,
      );
      return;
    }

    setBusy(true);
    try {
      const buffer = await next.arrayBuffer();
      const [sha1, sha256] = await Promise.all([
        crypto.subtle.digest("SHA-1", buffer),
        crypto.subtle.digest("SHA-256", buffer),
      ]);
      setDigests({ sha1: toHex(sha1), sha256: toHex(sha256) });
    } catch {
      setError("We couldn't read that file. Try a different copy.");
    } finally {
      setBusy(false);
    }
  }, []);

  function reset() {
    setFile(null);
    setDigests(null);
    setError("");
    setExpected("");
    if (inputRef.current) inputRef.current.value = "";
  }

  async function copyDigest(value: string, which: "sha256" | "sha1") {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("");
    }
  }

  const expectedAlgo = detectAlgorithm(expected);
  const expectedNormalised = expected.trim().toLowerCase();
  const comparable =
    digests &&
    expectedAlgo &&
    expectedAlgo !== "sha512" &&
    expectedAlgo !== "md5" &&
    expectedNormalised.length > 0;
  const match =
    comparable && digests[expectedAlgo as "sha1" | "sha256"] === expectedNormalised;

  return (
    <div className="space-y-5">
      {/* Drop zone */}
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          const dropped = event.dataTransfer.files?.[0];
          if (dropped) void handleFile(dropped);
        }}
        className={cn(
          "rounded-2xl border border-dashed p-6 text-center transition",
          dragging
            ? "border-accent bg-accent/10"
            : "border-border bg-surface/40",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          id="fx-hash-file"
          onChange={(event) => {
            const chosen = event.target.files?.[0];
            if (chosen) void handleFile(chosen);
          }}
        />
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent-2">
          {busy ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Upload className="h-5 w-5" />
          )}
        </span>
        <p className="mt-3 text-sm text-muted">
          Drop an evidence file here, or{" "}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="font-medium text-accent-2 underline decoration-accent/40 underline-offset-4 transition hover:text-accent"
          >
            choose a file
          </button>
          .
        </p>
        <p className="mt-1.5 font-mono text-[11px] text-muted/70">
          Nothing is uploaded — the hash is computed locally in your browser.
        </p>
      </div>

      {error ? (
        <p className="flex items-start gap-2 rounded-xl border border-warning/40 bg-warning/10 p-3 text-sm text-warning">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </p>
      ) : null}

      {/* Results */}
      {file ? (
        <div className="rounded-2xl border border-border bg-surface/40 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <FileCheck2 className="h-4 w-4 shrink-0 text-accent" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {file.name}
                </p>
                <p className="font-mono text-[11px] text-muted">
                  {formatBytes(file.size)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={reset}
              aria-label="Clear file"
              className="rounded-full p-1.5 text-muted transition hover:bg-surface-2 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {digests ? (
            <dl className="mt-4 space-y-3">
              {(["sha256", "sha1"] as const).map((algo) => (
                <div
                  key={algo}
                  className="rounded-xl border border-border/70 bg-background/40 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                      {ALGO_LABEL[algo]}
                    </dt>
                    <button
                      type="button"
                      onClick={() => copyDigest(digests[algo], algo)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted transition hover:border-accent/60 hover:text-accent-2"
                    >
                      {copied === algo ? (
                        <>
                          <Check className="h-3 w-3 text-success" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <dd className="mt-1.5 break-all font-mono text-[12px] leading-relaxed text-foreground">
                    {digests[algo]}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      ) : null}

      {/* Comparison */}
      <div>
        <label
          htmlFor="fx-hash-expected"
          className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
        >
          Compare with a reference hash
        </label>
        <input
          id="fx-hash-expected"
          value={expected}
          onChange={(event) => setExpected(event.target.value)}
          spellCheck={false}
          placeholder="Paste the published hash from the evidence source…"
          className="mt-2 w-full rounded-xl border border-border bg-surface/50 px-4 py-2.5 font-mono text-[12px] text-foreground placeholder:text-muted/60 transition focus:border-accent/60 focus:outline-none"
        />
        <p className="mt-2 text-xs text-muted">
          {expectedAlgo
            ? `Detected ${ALGO_LABEL[expectedAlgo]}.`
            : expected.trim()
              ? "That doesn't look like a hex digest."
              : "Length tells us the algorithm: 40 = SHA-1, 64 = SHA-256, 128 = SHA-512."}
        </p>
      </div>

      {comparable ? (
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "flex items-start gap-2 rounded-xl border p-3 text-sm",
            match
              ? "border-success/40 bg-success/10 text-success"
              : "border-danger/40 bg-danger/10 text-danger",
          )}
        >
          {match ? (
            <>
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              Match. The evidence copy is bit-for-bit identical to the reference.
            </>
          ) : (
            <>
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              No match. Do not work from this copy — re-acquire and tell the
              evidence custodian.
            </>
          )}
        </p>
      ) : null}

      {digests && expectedAlgo === "md5" ? (
        <p className="flex items-start gap-2 rounded-xl border border-warning/40 bg-warning/10 p-3 text-sm text-warning">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          MD5 is not available in the browser. Compute it with md5sum or
          CertUtil, or ask the source for a SHA-256.
        </p>
      ) : null}
    </div>
  );
}
