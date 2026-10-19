"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Loader2,
  Send,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import {
  MENTOR_SECTIONS,
  MENTOR_FIELDS,
  validateMentor,
  type ApplyValues as MentorValues,
} from "@/lib/mentor";
import { btnPrimaryLg } from "@/lib/ui";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

interface MentorFormProps {
  configured: boolean;
  /** Public contact address, read from the site settings. */
  email: string;
}

export function MentorForm({ configured, email }: MentorFormProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const fieldId = useCallback((name: string) => `${uid}-${name}`, [uid]);

  const [values, setValues] = useState<MentorValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorCount, setErrorCount] = useState(0);
  const [serverError, setServerError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [activeSection, setActiveSection] = useState<string>(MENTOR_SECTIONS[0].id);
  const [submitted, setSubmitted] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "sent") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      panelRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }, [status]);

  const progress = useMemo(() => {
    const required = MENTOR_FIELDS.filter((f) => f.required);
    if (required.length === 0) return 0;
    let done = 0;
    for (const f of required) {
      const raw = values[f.name];
      const filled = Array.isArray(raw) ? raw.length > 0 : typeof raw === "string" && raw.trim().length > 0;
      if (filled) done += 1;
    }
    return done / required.length;
  }, [values]);

  const doneSections = useMemo(() => {
    const done = new Set<string>();
    for (const section of MENTOR_SECTIONS) {
      const required = section.fields.filter((f) => f.required);
      if (required.length && required.every((f) => {
        const raw = values[f.name];
        return Array.isArray(raw) ? raw.length > 0 : typeof raw === "string" && raw.trim().length > 0;
      })) {
        done.add(section.id);
      }
    }
    return done;
  }, [values]);

  useEffect(() => {
    const nodes = MENTOR_SECTIONS.map((s) => document.getElementById(`mentor-${s.id}`)).filter(Boolean) as HTMLElement[];
    if (nodes.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActiveSection(visible.target.id.replace(/^mentor-/, ""));
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const revalidate = useCallback((next: MentorValues) => {
    const { errors: fresh } = validateMentor(next);
    setErrors(fresh);
    return fresh;
  }, []);

  const setValue = useCallback((name: string, value: string | string[]) => {
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      if (submitted) revalidate(next);
      return next;
    });
    if (status === "error") setStatus("idle");
  }, [revalidate, status, submitted]);

  const toggleInList = useCallback((name: string, option: string) => {
    setValues((prev) => {
      const current = Array.isArray(prev[name]) ? (prev[name] as string[]) : [];
      const next = current.includes(option) ? current.filter((i) => i !== option) : [...current, option];
      const merged = { ...prev, [name]: next };
      if (submitted) revalidate(merged);
      return merged;
    });
    if (status === "error") setStatus("idle");
  }, [revalidate, status, submitted]);

  const onFieldBlur = useCallback((name: string) => {
    if (!submitted) return;
    const { errors: fresh } = validateMentor(values);
    setErrors((prev) => {
      const next = { ...prev };
      if (fresh[name]) next[name] = fresh[name];
      else delete next[name];
      return next;
    });
  }, [submitted, values]);

  const onSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setServerError("");

    const { errors: fresh, values: clean } = validateMentor(values);
    setErrors(fresh);

    const count = Object.keys(fresh).length;
    setErrorCount(count);
    if (count > 0) {
      setStatus("error");
      requestAnimationFrame(() => {
        const first = MENTOR_FIELDS.find((f) => fresh[f.name]);
        if (!first) return;
        const container = document.getElementById(`mentor-field-${first.name}`);
        const focusable = container?.querySelector<HTMLElement>("input:not([type=hidden]), select, textarea");
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        container?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
        focusable?.focus({ preventScroll: true });
      });
      return;
    }

    if (!configured) {
      setStatus("error");
      setServerError("The mentor form isn't connected yet. Please email us directly.");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...clean, website: honeypot, _ts: startedAt }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string; errors?: Record<string, string> };

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
      window.scrollTo({ top: panelRef.current?.offsetTop ?? 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      setServerError("We couldn't reach the server. Please check your connection and try again.");
    }
  }, [configured, honeypot, startedAt, values]);

  if (status === "sent") {
    return (
      <div ref={panelRef} className="scroll-mt-24">
        <div className="relative fx-form-panel fx-holo overflow-hidden p-8 text-center sm:p-14">
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
              Thank you, {String(values.fullName ?? "").trim().split(/\s+/)[0] || "there"}.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              Your mentor application is on its way to the team. We&apos;ll review it and
              get back to you soon.
            </p>
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
          </div>
        </div>
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
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(230,182,79,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(230,182,79,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <span className="absolute left-[15%] top-[20%] h-1 w-1 rounded-full bg-accent/60 animate-pulse" />
        <span className="absolute left-[75%] top-[10%] h-1.5 w-1.5 rounded-full bg-accent-2/50 animate-pulse" style={{ animationDelay: "0.5s" }} />
        <span className="absolute left-[45%] top-[80%] h-1 w-1 rounded-full bg-[#6aa0dc]/60 animate-pulse" style={{ animationDelay: "1s" }} />
        <span className="absolute left-[90%] top-[60%] h-1.5 w-1.5 rounded-full bg-accent/40 animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Panel header + progress */}
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-accent" />
            <p className="fx-eyebrow text-accent">Mentor application</p>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {percent}% complete
          </span>
        </div>
        <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Apply as a mentor / advisor
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Share your expertise and help guide the next generation of forensic analysts.
          We value your time and will review every application.
        </p>
        <div className="fx-progress mt-5" role="presentation">
          <span style={{ width: `${percent}%` }} />
        </div>
      </div>

      {!configured ? (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-warning/40 bg-warning/10 p-4 text-sm text-warning">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            The mentor form is being connected. You can still explore it below — if you need to
            apply now, email us directly.
          </p>
        </div>
      ) : null}

      <form onSubmit={onSubmit} action="/api/mentor" method="post" noValidate className="mt-8">
        <div className="grid gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
          {/* Section rail — desktop */}
          <aside className="hidden lg:block">
            <nav aria-label="Application sections" className="lg:sticky lg:top-24">
              <p className="fx-eyebrow mb-3 pl-1 text-muted/70">Sections</p>
              <ol className="space-y-1">
                {MENTOR_SECTIONS.map((section) => {
                  const active = activeSection === section.id;
                  const done = doneSections.has(section.id);
                  return (
                    <li key={section.id}>
                      <a
                        href={`#mentor-${section.id}`}
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
              {MENTOR_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#mentor-${section.id}`}
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
              {MENTOR_SECTIONS.map((section) => (
                <section
                  key={section.id}
                  id={`mentor-${section.id}`}
                  aria-labelledby={`mentor-${section.id}-title`}
                  className="fx-form-section scroll-mt-28"
                >
                  <div className="flex items-start gap-3">
                    <span className="fx-num mt-0.5">{section.eyebrow.replace("Section ", "")}</span>
                    <div>
                      <p className="fx-eyebrow text-accent/80">{section.eyebrow}</p>
                      <h3
                        id={`mentor-${section.id}-title`}
                        className="font-display text-xl font-semibold tracking-tight text-foreground"
                      >
                        {section.title}
                      </h3>
                      {section.blurb ? <p className="mt-1 text-sm text-muted">{section.blurb}</p> : null}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {section.fields.map((field) => {
                      const value = values[field.name];
                      const error = errors[field.name];
                      const id = fieldId(field.name);
                      const stringValue = typeof value === "string" ? value : "";
                      const errorId = `${id}-error`;
                      const helpId = `${id}-help`;
                      const describedBy = cn(error && errorId, field.help && helpId) || undefined;

                      return (
                        <div
                          key={field.name}
                          id={`mentor-field-${field.name}`}
                          className={cn("min-w-0", field.wide && "sm:col-span-2")}
                        >
                          {field.kind === "radio" || field.kind === "checkboxes" ? (
                            <fieldset>
                              <legend className="flex items-baseline gap-2 text-sm font-medium text-foreground">
                                <span className="font-mono text-xs text-accent/70" aria-hidden="true">
                                  {String(field.number).padStart(2, "0")}
                                </span>
                                <span>
                                  {field.label}
                                  {field.required ? <span className="ml-1 text-accent" aria-hidden="true">*</span> : null}
                                </span>
                              </legend>
                              {field.help ? (
                                <p id={helpId} className="mt-1.5 pl-8 text-xs text-muted">{field.help}</p>
                              ) : null}

                              {field.kind === "radio" ? (
                                <div className={cn("mt-3 grid gap-2.5", (field.options?.length ?? 0) <= 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2")}>
                                  {field.options?.map((option) => (
                                    <label
                                      key={option.value}
                                      className="fx-choice"
                                      data-checked={stringValue === option.value}
                                    >
                                      <input
                                        type="radio"
                                        name={field.name}
                                        value={option.value}
                                        checked={stringValue === option.value}
                                        onChange={() => setValue(field.name, option.value)}
                                        className="sr-only"
                                      />
                                      <span className="fx-mark" aria-hidden="true">
                                        <Check />
                                      </span>
                                      <span className="min-w-0">
                                        <span className="block text-sm leading-snug text-foreground">{option.label}</span>
                                        {option.hint ? <span className="mt-0.5 block text-xs text-muted">{option.hint}</span> : null}
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              ) : field.variant === "chips" ? (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {field.options?.map((option) => (
                                    <label
                                      key={option.value}
                                      className="fx-choice fx-choice--chip"
                                      data-checked={Array.isArray(value) && value.includes(option.value)}
                                    >
                                      <input
                                        type="checkbox"
                                        name={field.name}
                                        value={option.value}
                                        checked={Array.isArray(value) && value.includes(option.value)}
                                        onChange={() => toggleInList(field.name, option.value)}
                                        className="sr-only"
                                      />
                                      <span className="fx-mark fx-mark--square" aria-hidden="true">
                                        <Check />
                                      </span>
                                      <span className="min-w-0">
                                        <span className="block text-sm leading-snug text-foreground">{option.label}</span>
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              ) : (
                                <div className="mt-3 grid grid-cols-1 gap-2.5">
                                  {field.options?.map((option) => (
                                    <label
                                      key={option.value}
                                      className="fx-choice"
                                      data-checked={Array.isArray(value) && value.includes(option.value)}
                                    >
                                      <input
                                        type="checkbox"
                                        name={field.name}
                                        value={option.value}
                                        checked={Array.isArray(value) && value.includes(option.value)}
                                        onChange={() => toggleInList(field.name, option.value)}
                                        className="sr-only"
                                      />
                                      <span className="fx-mark fx-mark--square" aria-hidden="true">
                                        <Check />
                                      </span>
                                      <span className="min-w-0">
                                        <span className="block text-sm leading-snug text-foreground">{option.label}</span>
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              )}

                              {error ? (
                                <p id={errorId} role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-danger">
                                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                                  {error}
                                </p>
                              ) : null}
                            </fieldset>
                          ) : (
                            <>
                              <label
                                htmlFor={id}
                                className="flex items-baseline gap-2 text-sm font-medium text-foreground"
                              >
                                <span className="font-mono text-xs text-accent/70" aria-hidden="true">
                                  {String(field.number).padStart(2, "0")}
                                </span>
                                <span>
                                  {field.label}
                                  {field.required ? <span className="ml-1 text-accent" aria-hidden="true">*</span> : null}
                                </span>
                              </label>
                              {field.help ? (
                                <p id={helpId} className="mt-1.5 pl-8 text-xs text-muted">{field.help}</p>
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
                                    onChange={(e) => setValue(field.name, e.target.value)}
                                    onBlur={() => onFieldBlur(field.name)}
                                  />
                                ) : field.kind === "select" ? (
                                  <select
                                    id={id}
                                    name={field.name}
                                    className="fx-input fx-select"
                                    value={stringValue}
                                    aria-invalid={Boolean(error)}
                                    aria-describedby={describedBy}
                                    onChange={(e) => setValue(field.name, e.target.value)}
                                    onBlur={() => onFieldBlur(field.name)}
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
                                    onChange={(e) => setValue(field.name, e.target.value)}
                                    onBlur={() => onFieldBlur(field.name)}
                                  />
                                )}
                                {error ? (
                                  <p id={errorId} role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-danger">
                                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                                    {error}
                                  </p>
                                ) : null}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
        </div>
      </div>

        {/* Bot trap */}
        <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor={fieldId("website")}>Website</label>
          <input
            id={fieldId("website")}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>
        <input type="hidden" name="_ts" value={startedAt || ""} />

        {/* Consent + submit */}
        <div className="fx-form-section mt-6">
          <div className="flex items-start gap-3 text-sm text-muted">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p>
              Your answers are used only to review this mentor application. We work on legal,
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
      </form>
    </div>
  );
}
