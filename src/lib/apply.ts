/**
 * The FORENSYRA team application — one source of truth.
 *
 * `APPLY_SECTIONS` is the schema: the form UI (`apply-form.tsx`) renders it and
 * the API route (`app/api/apply/route.ts`) validates against the same rules, so
 * the browser and the server can never disagree about what a valid application
 * is. Everything the 20-question Microsoft Form asked is represented here,
 * grouped into the same six sections.
 */

export type ApplyFieldKind =
  | "text"
  | "email"
  | "textarea"
  | "radio"
  | "select"
  | "checkboxes";

export interface ApplyOption {
  value: string;
  label: string;
  /** Short line shown under a choice card. */
  hint?: string;
}

export interface ApplyField {
  name: string;
  /** Question number, matching the original form. */
  number: number;
  kind: ApplyFieldKind;
  label: string;
  required?: boolean;
  placeholder?: string;
  /** Extra guidance under the control. */
  help?: string;
  options?: ApplyOption[];
  minLength?: number;
  maxLength?: number;
  autoComplete?: string;
  inputMode?: "text" | "email" | "url";
  /** A valid answer must be one of these values. */
  mustBe?: string[];
  mustBeMessage?: string;
  /** Take both columns on wide screens. */
  wide?: boolean;
  /** Multi-choice presentation: compact pills or full-width cards. */
  variant?: "cards" | "chips";
}

export interface ApplySection {
  id: string;
  eyebrow: string;
  title: string;
  blurb?: string;
  fields: ApplyField[];
}

/* ── Option sets ─────────────────────────────────────────────────────────── */

/** The open roles, plus a "not sure yet" escape hatch. Kept in the form (not
 *  read from content) so the list matches the recruiting form exactly and the
 *  founder's own Lead Investigator role stays out of the applicant pool. */
const ROLE_OPTIONS: ApplyOption[] = [
  { value: "Coordinator / Operations Coordinator", label: "Coordinator / Operations Coordinator" },
  { value: "Legal & Digital Evidence Advisor", label: "Legal & Digital Evidence Advisor" },
  { value: "Evidence Custodian & Chain-of-Custody Lead", label: "Evidence Custodian & Chain-of-Custody Lead" },
  { value: "Endpoint Forensics Analyst", label: "Endpoint Forensics Analyst" },
  { value: "Network Forensics Analyst", label: "Network Forensics Analyst" },
  { value: "Memory & Malware Analysis Analyst", label: "Memory & Malware Analysis Analyst" },
  { value: "Threat Intelligence & OSINT Analyst", label: "Threat Intelligence & OSINT Analyst" },
  { value: "Timeline & Forensic Reporting Analyst", label: "Timeline & Forensic Reporting Analyst" },
  { value: "Cloud Forensics Analyst", label: "Cloud Forensics Analyst" },
  { value: "Multimedia Forensics Analyst", label: "Multimedia Forensics Analyst" },
  { value: "AI Forensics & AI Security Analyst", label: "AI Forensics & AI Security Analyst" },
  { value: "Mobile Device Forensics Analyst", label: "Mobile Device Forensics Analyst" },
  { value: "I'm unsure and open to guidance", label: "I'm unsure and open to guidance" },
];

const TOOL_OPTIONS: ApplyOption[] = [
  { value: "Autopsy / FTK Imager", label: "Autopsy / FTK Imager" },
  { value: "Wireshark", label: "Wireshark" },
  { value: "Volatility", label: "Volatility" },
  { value: "Windows Event Logs / Sysmon", label: "Windows Event Logs / Sysmon" },
  { value: "Linux command line", label: "Linux command line" },
  { value: "Python / Bash", label: "Python / Bash" },
  { value: "YARA", label: "YARA" },
  { value: "Splunk / Wazuh", label: "Splunk / Wazuh" },
  { value: "AWS / Azure / Google Cloud logs", label: "AWS / Azure / Google Cloud logs" },
  { value: "ExifTool / FFmpeg / MediaInfo", label: "ExifTool / FFmpeg / MediaInfo" },
  { value: "Mobile forensic tools", label: "Mobile forensic tools" },
  { value: "MITRE ATT&CK", label: "MITRE ATT&CK" },
  { value: "Other", label: "Other" },
];

const STATEMENT_OPTIONS: ApplyOption[] = [
  { value: "I understand Forensyra is an educational group", label: "I understand Forensyra is an educational group" },
  { value: "I will use only legal, authorized training data", label: "I will use only legal, authorized training data" },
  { value: "I will not publish confidential or unauthorized evidence", label: "I will not publish confidential or unauthorized evidence" },
  { value: "I will document work honestly and avoid unsupported claims", label: "I will document work honestly and avoid unsupported claims" },
  { value: "I understand applying does not guarantee selection", label: "I understand applying does not guarantee selection" },
];

/* ── The form ────────────────────────────────────────────────────────────── */

export const APPLY_SECTIONS: ApplySection[] = [
  {
    id: "eligibility",
    eyebrow: "Section 1",
    title: "Eligibility",
    blurb: "A quick check before you start — every answer here should be a Yes.",
    fields: [
      {
        name: "interested",
        number: 1,
        kind: "radio",
        label: "Are you interested in joining Forensyra?",
        required: true,
        options: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
        mustBe: ["Yes"],
        mustBeMessage: "No worries — applications are for people who want to join.",
      },
      {
        name: "legalCases",
        number: 2,
        kind: "radio",
        label: "Do you agree to work only on legal, authorized, educational cases?",
        required: true,
        options: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
        mustBe: ["Yes"],
        mustBeMessage: "This is a condition of taking part.",
      },
      {
        name: "simulations",
        number: 3,
        kind: "radio",
        label:
          "Do you understand that Forensyra projects and cases are simulations, not real client or law-enforcement investigations?",
        required: true,
        options: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
        mustBe: ["Yes"],
        mustBeMessage: "This is a condition of taking part.",
      },
    ],
  },
  {
    id: "about",
    eyebrow: "Section 2",
    title: "About you",
    fields: [
      {
        name: "fullName",
        number: 4,
        kind: "text",
        label: "What is your full name?",
        required: true,
        placeholder: "Enter your answer",
        autoComplete: "name",
        maxLength: 120,
        wide: true,
      },
      {
        name: "email",
        number: 5,
        kind: "email",
        label: "Email",
        required: true,
        placeholder: "you@example.com",
        autoComplete: "email",
        inputMode: "email",
        maxLength: 200,
        wide: true,
      },
      {
        name: "location",
        number: 6,
        kind: "text",
        label: "What city and country are you based in?",
        placeholder: "Enter your answer",
        autoComplete: "address-level2",
        maxLength: 120,
      },
      {
        name: "background",
        number: 7,
        kind: "radio",
        label: "Which best describes you?",
        required: true,
        options: [
          { value: "University/college student", label: "University / college student" },
          { value: "Recent graduate", label: "Recent graduate" },
          { value: "Early-career professional", label: "Early-career professional" },
          { value: "Working professional", label: "Working professional" },
          { value: "Other", label: "Other" },
        ],
      },
      {
        name: "organization",
        number: 8,
        kind: "text",
        label: "College, university, or organization?",
        required: true,
        placeholder: "Enter your answer",
        autoComplete: "organization",
        maxLength: 160,
        wide: true,
      },
      {
        name: "linkedin",
        number: 9,
        kind: "text",
        label: "LinkedIn profile link",
        required: true,
        placeholder: "linkedin.com/in/your-handle",
        inputMode: "url",
        maxLength: 300,
      },
      {
        name: "github",
        number: 10,
        kind: "text",
        label: "GitHub or portfolio",
        required: true,
        placeholder: "github.com/your-handle",
        inputMode: "url",
        maxLength: 300,
      },
    ],
  },
  {
    id: "roles",
    eyebrow: "Section 3",
    title: "Role preferences",
    blurb: "Pick the specialisation that fits you best — you can change your mind later.",
    fields: [
      {
        name: "roleFirst",
        number: 11,
        kind: "select",
        label: "Which role is your first choice?",
        required: true,
        placeholder: "Choose a role…",
        options: ROLE_OPTIONS,
        wide: true,
      },
      {
        name: "roleWhy",
        number: 12,
        kind: "textarea",
        label: "Why did you choose this role, and what do you hope to contribute?",
        required: true,
        placeholder: "A few sentences is plenty.",
        minLength: 15,
        maxLength: 2000,
        wide: true,
      },
    ],
  },
  {
    id: "skills",
    eyebrow: "Section 4",
    title: "Skills and experience",
    fields: [
      {
        name: "experience",
        number: 13,
        kind: "radio",
        label: "What is your current DFIR experience level?",
        options: [
          { value: "New to the field", label: "New to the field", hint: "No prior experience yet" },
          { value: "Beginner: tutorials or labs", label: "Beginner", hint: "Tutorials or labs" },
          { value: "Intermediate: practical projects or labs", label: "Intermediate", hint: "Practical projects or labs" },
          { value: "Advanced: strong experience; can mentor others", label: "Advanced", hint: "Strong experience; can mentor others" },
        ],
      },
      {
        name: "tools",
        number: 14,
        kind: "checkboxes",
        label: "Which tools or areas have you used?",
        required: true,
        help: "Select everything that applies.",
        options: TOOL_OPTIONS,
        variant: "chips",
        wide: true,
      },
      {
        name: "skillImprove",
        number: 15,
        kind: "textarea",
        label: "What skill do you most want to improve?",
        required: true,
        placeholder: "Enter your answer",
        minLength: 3,
        maxLength: 1000,
        wide: true,
      },
    ],
  },
  {
    id: "commitment",
    eyebrow: "Section 5",
    title: "Commitment",
    fields: [
      {
        name: "weeklyMeeting",
        number: 16,
        kind: "radio",
        label: "Can you attend one regular weekly meeting?",
        options: [
          { value: "Yes, most weeks", label: "Yes, most weeks" },
          { value: "Usually, but my schedule changes", label: "Usually, but my schedule changes" },
          { value: "Occasionally", label: "Occasionally" },
          { value: "No", label: "No" },
        ],
      },
      {
        name: "missDeadline",
        number: 17,
        kind: "radio",
        label: "If you may miss a deadline, what would you do?",
        options: [
          { value: "Tell the team early and agree on a plan", label: "Tell the team early and agree on a plan" },
          { value: "Wait until someone asks", label: "Wait until someone asks" },
          { value: "Submit without explaining", label: "Submit without explaining" },
          { value: "Stop contributing", label: "Stop contributing" },
        ],
      },
    ],
  },
  {
    id: "ethics",
    eyebrow: "Section 6",
    title: "Ethics and acknowledgement",
    blurb: "These rules govern every case we touch.",
    fields: [
      {
        name: "noPersonalData",
        number: 18,
        kind: "radio",
        label:
          "Do you agree not to upload personal, confidential, stolen, or unauthorized data to Forensyra or GitHub?",
        required: true,
        options: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
        mustBe: ["Yes"],
        mustBeMessage: "This is a condition of taking part.",
      },
      {
        name: "documentWork",
        number: 19,
        kind: "radio",
        label: "Do you agree to document your work?",
        required: true,
        options: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
        mustBe: ["Yes"],
        mustBeMessage: "This is a condition of taking part.",
      },
      {
        name: "acceptStatements",
        number: 20,
        kind: "checkboxes",
        label: "Select every statement you accept.",
        required: true,
        help: "Tick each statement you agree to.",
        options: STATEMENT_OPTIONS,
        wide: true,
      },
    ],
  },
];

export const APPLY_FIELDS: ApplyField[] = APPLY_SECTIONS.flatMap((section) => section.fields);

const REQUIRED_FIELDS = APPLY_FIELDS.filter((field) => field.required);

/* ── Validation (shared by the browser and the server) ───────────────────── */

export type ApplyValues = Record<string, string | string[]>;

export interface ApplyValidation {
  errors: Record<string, string>;
  /** Trimmed, de-duplicated, option-checked values. */
  values: ApplyValues;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function knownValues(field: ApplyField): Set<string> | null {
  if (!field.options) return null;
  return new Set(field.options.map((option) => option.value));
}

/** Validate a set of answers against the schema. Never throws. */
export function validateApply(input: ApplyValues): ApplyValidation {
  const errors: Record<string, string> = {};
  const values: ApplyValues = {};

  for (const field of APPLY_FIELDS) {
    const raw = input?.[field.name];

    if (field.kind === "checkboxes") {
      const list = Array.isArray(raw)
        ? raw.map(String)
        : typeof raw === "string" && raw.trim()
          ? [raw]
          : [];
      const allowed = knownValues(field);
      const clean = [...new Set(list.map((item) => item.trim()).filter(Boolean))].filter(
        (item) => !allowed || allowed.has(item),
      );
      values[field.name] = clean;
      if (field.required && clean.length === 0) {
        errors[field.name] = "Please choose at least one option.";
      }
      continue;
    }

    const value = typeof raw === "string" ? raw.trim() : "";
    values[field.name] = value;

    if (!value) {
      if (field.required) errors[field.name] = "This field is required.";
      continue;
    }

    if (field.kind === "email" && !EMAIL_RE.test(value)) {
      errors[field.name] = "Please enter a valid email address.";
    }
    if (field.options && !knownValues(field)?.has(value)) {
      errors[field.name] = "Please choose one of the options.";
    }
    if (field.minLength && value.length < field.minLength) {
      errors[field.name] = `Please write at least ${field.minLength} characters.`;
    }
    if (field.maxLength && value.length > field.maxLength) {
      errors[field.name] = `Please keep this under ${field.maxLength} characters.`;
    }
    if (field.mustBe && !field.mustBe.includes(value)) {
      errors[field.name] = field.mustBeMessage ?? "Please review this answer.";
    }
  }

  return { errors, values };
}

/** How far along the applicant is: required fields answered, as a 0–1 ratio. */
export function applyProgress(values: ApplyValues): number {
  if (REQUIRED_FIELDS.length === 0) return 0;
  let done = 0;
  for (const field of REQUIRED_FIELDS) {
    const raw = values[field.name];
    const filled =
      Array.isArray(raw) ? raw.length > 0 : typeof raw === "string" && raw.trim().length > 0;
    if (filled) done += 1;
  }
  return done / REQUIRED_FIELDS.length;
}

export function isApplyAnswerFilled(field: ApplyField, raw: string | string[] | undefined): boolean {
  if (Array.isArray(raw)) return raw.length > 0;
  return typeof raw === "string" && raw.trim().length > 0;
}

/* ── EmailJS payload ─────────────────────────────────────────────────────── */

function joinValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value.join(", ");
  return typeof value === "string" ? value : "";
}

/**
 * Flatten validated answers into the flat strings the EmailJS templates expect.
 * The template variable names are documented in README.md — keep them in sync.
 */
export function buildApplyEmailParams(values: ApplyValues, now = new Date()): Record<string, string> {
  const v = (name: string) => joinValue(values[name]);
  const orDash = (name: string) => v(name) || "—";

  return {
    // Identity + reply routing
    full_name: v("fullName"),
    name: v("fullName"),
    email: v("email"),
    reply_to: v("email"),
    // About you
    location: orDash("location"),
    background: v("background"),
    organization: v("organization"),
    linkedin: v("linkedin"),
    github: v("github"),
    // Role
    role_first: v("roleFirst"),
    role_why: v("roleWhy"),
    // Skills
    experience: orDash("experience"),
    tools: orDash("tools"),
    skill_improve: v("skillImprove"),
    // Commitment
    weekly_meeting: orDash("weeklyMeeting"),
    miss_deadline: orDash("missDeadline"),
    // Eligibility + ethics
    interest_join: v("interested"),
    legal_cases: v("legalCases"),
    simulations_ok: v("simulations"),
    no_personal_data: v("noPersonalData"),
    document_work: v("documentWork"),
    accept_statements: orDash("acceptStatements"),
    submitted_at: now.toISOString().replace("T", " ").replace(/\.\d+Z$/, " UTC"),
  };
}
