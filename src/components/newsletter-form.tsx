"use client";

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "error" | "ready";

/**
 * Newsletter sign-up. There is no email provider wired up yet, so this
 * validates the address and acknowledges locally — it never claims an email
 * was actually sent. Point `action` at a real endpoint to go live.
 */
export function NewsletterForm({ className }: { className?: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!valid) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    // No email service configured yet: acknowledge without pretending a
    // message was sent.
    setStatus("ready");
    setMessage("Thanks — noted. Newsletter delivery isn't connected yet, so no email was sent.");
    setEmail("");
  }

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
              "min-w-0 flex-1 rounded-full border bg-foreground/[0.05] px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 transition focus:outline-none",
              status === "error"
                ? "border-danger/70"
                : "border-border focus:border-accent/70",
            )}
          />
          <button
            type="submit"
            aria-label="Subscribe"
            className="fx-arrow-btn h-11 w-11 shrink-0"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
      {message ? (
        <p
          id={`${id}-msg`}
          role="status"
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
