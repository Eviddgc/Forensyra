"use client";

import { useId, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "ok" | "error";

/**
 * Newsletter sign-up. Posts to /api/newsletter, which relays to EmailJS from
 * the server. Until the EmailJS env keys are set, the endpoint answers with a
 * clear "not connected" message and we show it verbatim — we never claim an
 * email was sent when it wasn't.
 */
export function NewsletterForm({ className }: { className?: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (response.ok && data.ok) {
        setStatus("ok");
        setMessage("Thanks — you're on the list. Welcome aboard.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("We couldn't reach the server. Please try again.");
    }
  }

  const sending = status === "sending";

  return (
    <div className={className}>
      <form onSubmit={onSubmit} noValidate className="mt-4">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <div className="flex items-center gap-2">
          <input
            id={`${id}-email`}
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            disabled={sending}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== "idle") {
                setStatus("idle");
                setMessage("");
              }
            }}
            placeholder="you@example.com"
            aria-invalid={status === "error"}
            aria-describedby={message ? `${id}-msg` : undefined}
            className={cn(
              "min-w-0 flex-1 rounded-full border bg-foreground/[0.05] px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 transition focus:outline-none disabled:opacity-60",
              status === "error"
                ? "border-danger/70"
                : "border-border focus:border-accent/70",
            )}
          />
          <button
            type="submit"
            disabled={sending}
            aria-label={sending ? "Subscribing" : "Subscribe"}
            className="fx-arrow-btn h-11 w-11 shrink-0 disabled:opacity-70"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : status === "ok" ? (
              <Check className="h-4 w-4" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </button>
        </div>
      </form>
      {message ? (
        <p
          id={`${id}-msg`}
          role="status"
          aria-live="polite"
          className={cn(
            "mt-3 text-xs",
            status === "error" ? "text-danger" : "text-accent-2",
          )}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
