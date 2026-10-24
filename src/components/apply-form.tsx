"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Loader2,
  Lock,
  Send,
  ShieldCheck,
} from "lucide-react";
import {
  APPLY_FIELDS,
  APPLY_SECTIONS,
  applyProgress,
  isApplyAnswerFilled,
  validateApply,
  type ApplyField,
  type ApplySection,
  type ApplyValues,
} from "@/lib/apply";
import { btnPrimaryLg } from "@/lib/ui";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

interface ApplyFormProps {
  /** False when the EmailJS environment variables are missing. */
  configured: boolean;
  /** True when the confirmation (auto-reply) email is wired up too. */
  autoReply: boolean;
  /** Public contact address, read from the site settings. */
  email: string;
}

export function ApplyForm({ configured, autoReply, email }: ApplyFormProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const fieldId = useCallback((name: string) => `${uid}-${name}`, [uid]);

  const [values, setValues] = useState<ApplyValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorCount, setErrorCount] = useState(0);
  const [serverError, setServerError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [activeSection, setActiveSection] = useState<string>(APPLY_SECTIONS[0].id);
  const [submitted, setSubmitted] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);

  /* Bring the success panel into view once it replaces the form. */
  useEffect(() => {
    if (status === "sent") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      panelRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }, [status]);

  const progress = useMemo(() => applyProgress(values), [values]);

  const doneSections = useMemo(() => {
    const done = new Set<string>();
    for (const section of APPLY_SECTIONS) {
      const required = section.fields.filter((field) => field.required);
      if (required.length && required.every((field) => isApplyAnswerFilled(field, values[field.name]))) {
        done.add(section.id);
      }
    }
    return done;
  }, [values]);

  /* Track which section is in view so the rail can highlight it. */
  useEffect(() => {
    const nodes = APPLY_SECTIONS.map((section) =>
      document.getElementById(`apply-${section.id}`),
    ).filter((node): node is HTMLElement => Boolean(node));

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) {
          setActiveSection(visible.target.id.replace(/^apply-/, ""));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const revalidate = useCallback((next: ApplyValues) => {
    const { errors: fresh } = validateApply(next);
    setErrors(fresh);
    return fresh;
  }, []);

  const setValue = useCallback(
    (name: string, value: string | string[]) => {
      setValues((prev) => {
        const next = { ...prev, [name]: value };
        if (submitted) revalidate(next);
        return next;
      });
      if (status === "error") setStatus("idle");
    },
    [revalidate, status, submitted],
  );

  const toggleInList = useCallback(
    (name: string, option: string) => {
      setValues((prev) => {
        const current = Array.isArray(prev[name]) ? (prev[name] as string[]) : [];
        const next = current.includes(option)
          ? current.filter((item) => item !== option)
          : [...current, option];
        const merged = { ...prev, [name]: next };
        if (submitted) revalidate(merged);
        return merged;
      });
      if (status === "error") setStatus("idle");
    },
    [revalidate, status, submitted],
  );

  const onFieldBlur = useCallback(
    (name: string) => {
      if (!submitted) return;
      const { errors: fresh } = validateApply(values);
      setErrors((prev) => {
        const next = { ...prev };
        if (fresh[name]) next[name] = fresh[name];
        else delete next[name];
        return next;
      });
    },
    [submitted, values],
  );

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitted(true);
      setServerError("");

      const { errors: fresh, values: clean } = validateApply(values);
      setErrors(fresh);

      const count = Object.keys(fresh).length;
      setErrorCount(count);
      if (count > 0) {
        setStatus("error");
        requestAnimationFrame(() => {
          const first = APPLY_FIELDS.find((field) => fresh[field.name]);
          if (!first) return;
          const container = document.getElementById(`apply-field-${first.name}`);
          const focusable = container?.querySelector<HTMLElement>(
            "input:not([type=hidden]), select, textarea",
          );
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          container?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
          focusable?.focus({ preventScroll: true });
        });
        return;
      }

      if (!configured) {
        setStatus("error");
        setServerError("The application form isn't connected yet. Please email us directly.");
        return;
      }

      setStatus("sending");
      try {
        const response = await fetch("/api/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...clean, website: honeypot, _ts: startedAt }),
        });
        const data = (await response.json().catch(() => ({}))) as {
          error?: string;
          errors?: Record<string, string>;
        };

        if (!response.ok && data.errors) {
          setErrors(data.errors);
          setErrorCount(Object.keys(data.errors).length);
        }
        if (!response.ok) {
          setStatus("error");
          setServerError(data.error || "Something went wrong sending your application. Please try again.");
          return;
        }

        setStatus("sent");
      } catch {
        setStatus("error");
        setServerError("We couldn't reach the server. Please check your connection and try again.");
      }
    },
    [configured, honeypot, startedAt, values],
  );

  /* ── Success ──────────────────────────────────────────────────────────── */

  if (status === "sent") {
    return (
      <div ref={panelRef} className="scroll-mt-24">
        <ApplySuccess
          name={String(values.fullName ?? "")}
          email={String(values.email ?? "")}
          autoReply={autoReply}
          directEmail={email}
        />
      </div>
    );
  }

  const sending = status === "sending";
  const percent = Math.round(progress * 100);

  return (
    <div ref={panelRef} className="relative fx-form-panel fx-holo scroll-mt-24 overflow-hidden p-5 sm:p-8">
      {/* Floating 3D background orbs. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[5%] h-[18rem] w-[18rem] rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute -right-[8%] top-[15%] h-[14rem] w-[14rem] rounded-full bg-[#6aa0dc]/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[30%] h-[12rem] w-[12rem] rounded-full bg-accent-2/6 blur-3xl" />
        {/* Gold scanline grid. */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(230,182,79,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(230,182,79,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Floating gold particles. */}
        <span className="absolute left-[15%] top-[20%] h-1 w-1 rounded-full bg-accent/60 animate-pulse" />
        <span className="absolute left-[75%] top-[10%] h-1.5 w-1.5 rounded-full bg-accent-2/50 animate-pulse" style={{ animationDelay: "0.5s" }} />
        <span className="absolute left-[45%] top-[80%] h-1 w-1 rounded-full bg-[#6aa0dc]/60 animate-pulse" style={{ animationDelay: "1s" }} />
        <span className="absolute left-[90%] top-[60%] h-1.5 w-1.5 rounded-full bg-accent/40 animate-pulse" style={{ animationDelay: "1.5s" }} />
        <span className="absolute left-[25%] top-[55%] h-1 w-1 rounded-full bg-accent-2/40 animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Panel header + progress */}
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="fx-eyebrow text-accent">Team application</p>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {percent}% complete
          </span>
        </div>
        <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Apply to join Forensyra
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Tell us about your interests, skills, availability, and preferred role. It takes about
          three minutes, and selected members are contacted by email.
        </p>
        <div className="fx-progress mt-5" role="presentation">
          <span style={{ width: `${percent}%` }} />
        </div>
      </div>

      {!configured ? (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-warning/40 bg-warning/10 p-4 text-sm text-warning">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            The on-site form is being connected. You can still explore it below — if you need to
            apply now, email us directly at {email}.
          </p>
        </div>
      ) : null}

      <form
        onSubmit={onSubmit}
        action="/api/apply"
        method="post"
        noValidate
        className="mt-8"
      >
        <div className="grid gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
          {/* Section rail — desktop */}
          <aside className="hidden lg:block">
            <nav aria-label="Application sections" className="lg:sticky lg:top-24">
              <p className="fx-eyebrow mb-3 pl-1 text-muted/70">Sections</p>
              <ol className="space-y-1">
                {APPLY_SECTIONS.map((section) => {
                  const active = activeSection === section.id;
                  const done = doneSections.has(section.id);
                  return (
                    <li key={section.id}>
                      <a
                        href={`#apply-${section.id}`}
                        data-active={active}
                        data-done={done}
                        className="fx-rail-link text-sm"
                      >
                        <span className="fx-rail-dot" aria-hidden="true">
                          {done ? <Check className="h-3 w-3" /> : section.eyebrow.replace("Section ", "")}
                        </span>
                        <span className="min-w-0 truncate">{section.title}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0">
            {/* Mobile section chips */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {APPLY_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#apply-${section.id}`}
                  data-active={activeSection === section.id}
                  data-done={doneSections.has(section.id)}
                  className="fx-rail-link fx-rail-link--chip shrink-0 text-xs"
                >
                  <span className="fx-rail-dot" aria-hidden="true">
                    {doneSections.has(section.id) ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      section.eyebrow.replace("Section ", "")
                    )}
                  </span>
                  {section.title}
                </a>
              ))}
            </div>

            {/* Form-level errors */}
            <div aria-live="assertive">
              {status === "error" && (errorCount > 0 || serverError) ? (
                <div
                  role="alert"
                  className="mb-6 flex items-start gap-3 rounded-2xl border border-danger/45 bg-danger/10 p-4 text-sm text-danger"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    {errorCount > 0 ? (
                      <p>
                        {errorCount === 1
                          ? "One field needs your attention."
                          : `${errorCount} fields need your attention.`}
                      </p>
                    ) : null}
                    {serverError ? <p className={cn(errorCount > 0 && "mt-1")}>{serverError}</p> : null}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="space-y-6">
              {APPLY_SECTIONS.map((section) => (
                <SectionBlock
                  key={section.id}
                  section={section}
                  values={values}
                  errors={errors}
                  fieldId={fieldId}
                  onValue={setValue}
                  onToggle={toggleInList}
                  onBlur={onFieldBlur}
                />
              ))}
            </div>

            {/* Consent + submit */}
            <div id="apply-submit" className="fx-form-section mt-6">
              <div className="flex items-start gap-3 text-sm text-muted">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p>
                  Your answers are used only to review this application. We work on legal,
                  authorised, educational cases only — see the{" "}
                  <Link href="/ethics" className="text-accent-2 underline">
                    ethics rules
                  </Link>
                  .
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  {percent}% complete
                </p>
                <button
                  type="submit"
                  disabled={sending}
                  className={cn(
                    btnPrimaryLg,
                    "fx-shine w-full px-7 py-3.5 text-base disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto",
                  )}
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Submit application
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="mt-4 text-xs text-muted">
                Having trouble? Email{" "}
                <a href={`mailto:${email}`} className="text-accent-2 underline">
                  {email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Bot trap: hidden from people, tempting to scripts. */}
        <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor={fieldId("website")}>Website</label>
          <input
            id={fieldId("website")}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>
        <input type="hidden" name="_ts" value={startedAt || ""} />
      </form>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */

function SectionBlock({
  section,
  values,
  errors,
  fieldId,
  onValue,
  onToggle,
  onBlur,
}: {
  section: ApplySection;
  values: ApplyValues;
  errors: Record<string, string>;
  fieldId: (name: string) => string;
  onValue: (name: string, value: string | string[]) => void;
  onToggle: (name: string, option: string) => void;
  onBlur: (name: string) => void;
}) {
  return (
    <section
      id={`apply-${section.id}`}
      aria-labelledby={`apply-${section.id}-title`}
      className="fx-form-section scroll-mt-28"
    >
      <div className="flex items-start gap-3">
        <span className="fx-num mt-0.5">{section.eyebrow.replace("Section ", "")}</span>
        <div>
          <p className="fx-eyebrow text-accent/80">{section.eyebrow}</p>
          <h3
            id={`apply-${section.id}-title`}
            className="font-display text-xl font-semibold tracking-tight text-foreground"
          >
            {section.title}
          </h3>
          {section.blurb ? <p className="mt-1 text-sm text-muted">{section.blurb}</p> : null}
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {section.fields.map((field) => (
          <FieldControl
            key={field.name}
            field={field}
            value={values[field.name]}
            error={errors[field.name]}
            id={fieldId(field.name)}
            onValue={onValue}
            onToggle={onToggle}
            onBlur={onBlur}
          />
        ))}
      </div>
    </section>
  );
}

/* ── Field ───────────────────────────────────────────────────────────────── */

function FieldControl({
  field,
  value,
  error,
  id,
  onValue,
  onToggle,
  onBlur,
}: {
  field: ApplyField;
  value: string | string[] | undefined;
  error?: string;
  id: string;
  onValue: (name: string, value: string | string[]) => void;
  onToggle: (name: string, option: string) => void;
  onBlur: (name: string) => void;
}) {
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  const describedBy = cn(error && errorId, field.help && helpId) || undefined;
  const stringValue = typeof value === "string" ? value : "";

  return (
    <div
      id={`apply-field-${field.name}`}
      className={cn("min-w-0", field.wide && "sm:col-span-2")}
    >
      {field.kind === "radio" || field.kind === "checkboxes" ? (
        <fieldset>
          <legend className="flex items-baseline gap-2 text-sm font-medium text-foreground">
            <QuestionNumber number={field.number} />
            <span>
              {field.label}
              {field.required ? <Req /> : null}
            </span>
          </legend>
          {field.help ? (
            <p id={helpId} className="mt-1.5 pl-8 text-xs text-muted">
              {field.help}
            </p>
          ) : null}

          {field.kind === "radio" ? (
            <div
              className={cn(
                "mt-3 grid gap-2.5",
                (field.options?.length ?? 0) <= 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2",
              )}
            >
              {field.options?.map((option) => (
                <ChoiceCard
                  key={option.value}
                  name={field.name}
                  option={option}
                  checked={stringValue === option.value}
                  square={false}
                  onSelect={() => onValue(field.name, option.value)}
                />
              ))}
            </div>
          ) : field.variant === "chips" ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {field.options?.map((option) => (
                <ChoiceCard
                  key={option.value}
                  name={field.name}
                  option={option}
                  chip
                  checked={Array.isArray(value) && value.includes(option.value)}
                  square
                  onSelect={() => onToggle(field.name, option.value)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-3 grid grid-cols-1 gap-2.5">
              {field.options?.map((option) => (
                <ChoiceCard
                  key={option.value}
                  name={field.name}
                  option={option}
                  checked={Array.isArray(value) && value.includes(option.value)}
                  square
                  onSelect={() => onToggle(field.name, option.value)}
                />
              ))}
            </div>
          )}

          <FieldError id={errorId} error={error} className="mt-2" />
        </fieldset>
      ) : (
        <>
          <label
            htmlFor={id}
            className="flex items-baseline gap-2 text-sm font-medium text-foreground"
          >
            <QuestionNumber number={field.number} />
            <span>
              {field.label}
              {field.required ? <Req /> : null}
            </span>
          </label>
          {field.help ? (
            <p id={helpId} className="mt-1.5 pl-8 text-xs text-muted">
              {field.help}
            </p>
          ) : null}

          <div className="mt-2 pl-0 sm:pl-8">
            {field.kind === "textarea" ? (
              <textarea
                id={id}
                name={field.name}
                rows={4}
                className="fx-input min-h-[6.5rem] resize-y"
                placeholder={field.placeholder}
                value={stringValue}
                maxLength={field.maxLength}
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy}
                onChange={(event) => onValue(field.name, event.target.value)}
                onBlur={() => onBlur(field.name)}
              />
            ) : field.kind === "select" ? (
              <select
                id={id}
                name={field.name}
                className="fx-input fx-select"
                value={stringValue}
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy}
                onChange={(event) => onValue(field.name, event.target.value)}
                onBlur={() => onBlur(field.name)}
              >
                <option value="" disabled>
                  {field.placeholder ?? "Choose…"}
                </option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                name={field.name}
                type={field.kind === "email" ? "email" : "text"}
                className="fx-input"
                placeholder={field.placeholder}
                value={stringValue}
                autoComplete={field.autoComplete}
                inputMode={field.inputMode}
                maxLength={field.maxLength}
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy}
                onChange={(event) => onValue(field.name, event.target.value)}
                onBlur={() => onBlur(field.name)}
              />
            )}
            <FieldError id={errorId} error={error} className="mt-2" />
          </div>
        </>
      )}
    </div>
  );
}

function ChoiceCard({
  name,
  option,
  checked,
  square,
  chip,
  onSelect,
}: {
  name: string;
  option: { value: string; label: string; hint?: string };
  checked: boolean;
  square: boolean;
  chip?: boolean;
  onSelect: () => void;
}) {
  return (
    <label className={cn("fx-choice", chip && "fx-choice--chip")} data-checked={checked}>
      <input
        type={square ? "checkbox" : "radio"}
        name={name}
        value={option.value}
        checked={checked}
        onChange={onSelect}
        className="sr-only"
      />
      <span className={cn("fx-mark", square && "fx-mark--square")} aria-hidden="true">
        <Check />
      </span>
      <span className="min-w-0">
        <span className="block text-sm leading-snug text-foreground">{option.label}</span>
        {option.hint ? <span className="mt-0.5 block text-xs text-muted">{option.hint}</span> : null}
      </span>
    </label>
  );
}

function QuestionNumber({ number }: { number: number }) {
  return (
    <span className="font-mono text-xs text-accent/70" aria-hidden="true">
      {String(number).padStart(2, "0")}
    </span>
  );
}

function Req() {
  return (
    <span className="ml-1 text-accent" aria-hidden="true" title="Required">
      *
    </span>
  );
}

function FieldError({
  id,
  error,
  className,
}: {
  id: string;
  error?: string;
  className?: string;
}) {
  if (!error) return null;
  return (
    <p id={id} role="alert" className={cn("flex items-center gap-1.5 text-xs text-danger", className)}>
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {error}
    </p>
  );
}

/* ── Success ─────────────────────────────────────────────────────────────── */

function ApplySuccess({
  name,
  email,
  autoReply,
  directEmail,
}: {
  name: string;
  email: string;
  autoReply: boolean;
  directEmail: string;
}) {
  const firstName = name.trim().split(/\s+/)[0] || "there";
  return (
    <div className="relative fx-form-panel fx-holo overflow-hidden p-8 text-center sm:p-14">
      {/* Celebration background. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute right-[10%] top-[10%] h-[12rem] w-[12rem] rounded-full bg-[#6aa0dc]/10 blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="flex justify-center">
          <span className="fx-seal">
            <Check className="h-12 w-12" strokeWidth={2.5} />
          </span>
        </div>
        <p className="fx-eyebrow mt-7 text-accent">Application received</p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Thank you, {firstName}.
        </h2>
        {autoReply ? (
          <>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              Your application is on its way to the team. We&apos;ve sent a confirmation to{" "}
              <span className="text-foreground">{email || "your inbox"}</span> — if it isn&apos;t
              there in a few minutes, check your spam folder.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
              Only limited spots are open. Selected members are contacted by email, and we read
              every application.
            </p>
          </>
        ) : (
          <>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              Your application is on its way to the team. We read every application and contact
              selected members by email — no automatic newsletter, just a real reply.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
              Questions meanwhile? Write to{" "}
              <a href={`mailto:${directEmail}`} className="text-accent-2 underline">
                {directEmail}
              </a>
              .
            </p>
          </>
        )}

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/roles" className={btnPrimaryLg}>
            Explore the roles
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-[15px] font-medium text-foreground transition hover:border-accent/60 hover:text-accent-2"
          >
            Back to home
          </Link>
        </div>

        <p className="mt-8 inline-flex items-center gap-2 text-xs text-muted">
          <Lock className="h-3.5 w-3.5" />
          We keep your answers private and use them only to review this application.
        </p>
      </div>
    </div>
  );
}
