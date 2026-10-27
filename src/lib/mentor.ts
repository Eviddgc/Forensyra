/**
 * The FORENSYRA mentor/advisor application — separate from the team form.
 * Same schema/validation patterns as apply.ts for consistency.
 */

import { ApplyField, ApplySection, ApplyOption, ApplyValues } from "@/lib/apply";

export type { ApplyField, ApplySection, ApplyOption, ApplyValues };

export const MENTOR_SECTIONS: ApplySection[] = [
  {
    id: "about",
    eyebrow: "Section 1",
    title: "About you",
    blurb: "Tell us who you are and where you're based.",
    fields: [
      {
        name: "fullName",
        number: 1,
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
        number: 2,
        kind: "email",
        label: "Email address",
        required: true,
        placeholder: "you@example.com",
        autoComplete: "email",
        inputMode: "email",
        maxLength: 200,
        wide: true,
      },
      {
        name: "linkedin",
        number: 3,
        kind: "text",
        label: "LinkedIn profile URL",
        required: true,
        placeholder: "linkedin.com/in/your-handle",
        inputMode: "url",
        maxLength: 300,
      },
      {
        name: "location",
        number: 4,
        kind: "text",
        label: "Country and city",
        required: true,
        placeholder: "Enter your answer",
        maxLength: 120,
      },
      {
        name: "currentRole",
        number: 5,
        kind: "text",
        label: "Current role and organisation",
        required: true,
        placeholder: "e.g. Senior Forensic Analyst at Acme Corp",
        maxLength: 200,
        wide: true,
      },
    ],
  },
  {
    id: "expertise",
    eyebrow: "Section 2",
    title: "Expertise",
    blurb: "What do you bring to the table?",
    fields: [
      {
        name: "yearsExperience",
        number: 6,
        kind: "select",
        label: "Years of experience in DFIR / cybersecurity",
        required: true,
        placeholder: "Choose…",
        options: [
          { value: "0-2", label: "0-2 years" },
          { value: "3-5", label: "3-5 years" },
          { value: "6-10", label: "6-10 years" },
          { value: "10+", label: "10+ years" },
        ],
      },
      {
        name: "primaryExpertise",
        number: 7,
        kind: "select",
        label: "Primary area of expertise",
        required: true,
        placeholder: "Choose…",
        options: [
          { value: "Disk forensics", label: "Disk forensics" },
          { value: "Memory forensics", label: "Memory forensics" },
          { value: "Network forensics", label: "Network forensics" },
          { value: "Mobile forensics", label: "Mobile forensics" },
          { value: "Malware analysis", label: "Malware analysis" },
          { value: "Cloud forensics", label: "Cloud forensics" },
          { value: "Incident response", label: "Incident response" },
          { value: "Legal and reporting", label: "Legal and reporting" },
          { value: "Other", label: "Other" },
        ],
      },
      {
        name: "toolsUsed",
        number: 8,
        kind: "textarea",
        label: "Tools you use regularly",
        required: true,
        placeholder: "e.g. Autopsy, FTK, Volatility, Wireshark",
        help: "List the tools you work with day-to-day.",
        minLength: 3,
        maxLength: 1000,
        wide: true,
      },
      {
        name: "certifications",
        number: 9,
        kind: "text",
        label: "Relevant certifications",
        placeholder: "e.g. GCFE, EnCE, OSCP (optional)",
        help: "Optional — list any certifications you hold.",
        maxLength: 300,
      },
      {
        name: "workLinks",
        number: 10,
        kind: "text",
        label: "Link to your work: publications, GitHub, talks, blog",
        placeholder: "https://...",
        help: "Optional — share links to your public work.",
        inputMode: "url",
        maxLength: 500,
      },
    ],
  },
  {
    id: "mentoring",
    eyebrow: "Section 3",
    title: "Mentoring",
    blurb: "How would you like to contribute?",
    fields: [
      {
        name: "howHelp",
        number: 11,
        kind: "checkboxes",
        label: "How would you like to help?",
        required: true,
        help: "Select everything that applies.",
        variant: "chips",
        options: [
          { value: "Review case reports", label: "Review case reports" },
          { value: "Guide investigations", label: "Guide investigations" },
          { value: "Live Q&A or talks", label: "Live Q&A or talks" },
          { value: "Career guidance", label: "Career guidance" },
          { value: "Tool training", label: "Tool training" },
          { value: "Other", label: "Other" },
        ],
        wide: true,
      },
      {
        name: "hoursPerMonth",
        number: 12,
        kind: "select",
        label: "Hours per month you can give",
        required: true,
        placeholder: "Choose…",
        options: [
          { value: "1", label: "1 hour" },
          { value: "2-4", label: "2-4 hours" },
          { value: "5+", label: "5+ hours" },
        ],
      },
      {
        name: "preferredMode",
        number: 13,
        kind: "checkboxes",
        label: "Preferred mode",
        required: true,
        help: "Select everything that applies.",
        variant: "chips",
        options: [
          { value: "WhatsApp group", label: "WhatsApp group" },
          { value: "Online calls", label: "Online calls" },
          { value: "Written feedback", label: "Written feedback" },
        ],
        wide: true,
      },
      {
        name: "mentoredBefore",
        number: 14,
        kind: "radio",
        label: "Have you mentored students before?",
        required: true,
        options: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
      },
      {
        name: "mentorNote",
        number: 15,
        kind: "textarea",
        label: "If yes, please share a short note about your mentoring experience",
        placeholder: "Describe your mentoring experience…",
        help: "Optional — only if you answered Yes above.",
        maxLength: 500,
        wide: true,
      },
      {
        name: "whyMentor",
        number: 16,
        kind: "textarea",
        label: "Why do you want to mentor FORENSYRA?",
        required: true,
        placeholder: "Write up to 100 words.",
        help: "Maximum 100 words.",
        minLength: 10,
        maxLength: 700,
        wide: true,
      },
    ],
  },
  {
    id: "confirm",
    eyebrow: "Section 4",
    title: "Confirm",
    blurb: "Please review and agree to the following.",
    fields: [
      {
        name: "agreeEthics",
        number: 17,
        kind: "checkboxes",
        label: "I agree to follow ethical and legal standards of digital forensics",
        required: true,
        help: "This is required to proceed.",
        variant: "cards",
        options: [
          { value: "I agree", label: "I agree to follow ethical and legal standards of digital forensics" },
        ],
        wide: true,
      },
      {
        name: "consentContact",
        number: 18,
        kind: "checkboxes",
        label: "I consent to FORENSYRA contacting me about this role",
        required: true,
        help: "This is required to proceed.",
        variant: "cards",
        options: [
          { value: "I consent", label: "I consent to FORENSYRA contacting me about this role" },
        ],
        wide: true,
      },
    ],
  },
];

export const MENTOR_FIELDS = MENTOR_SECTIONS.flatMap((s) => s.fields);

export function validateMentor(input: ApplyValues) {
  // Reuse the generic validation by temporarily swapping sections
  // We'll just call a custom validation here
  const errors: Record<string, string> = {};
  const values: ApplyValues = {};

  for (const field of MENTOR_FIELDS) {
    const raw = input?.[field.name];

    if (field.kind === "checkboxes") {
      const list = Array.isArray(raw)
        ? raw.map(String)
        : typeof raw === "string" && raw.trim()
          ? [raw]
          : [];
      const allowed = field.options ? new Set(field.options.map((o) => o.value)) : null;
      const clean = [...new Set(list.map((i) => i.trim()).filter(Boolean))].filter(
        (i) => !allowed || allowed.has(i),
      );
      values[field.name] = clean;
      if (field.required && clean.length === 0) {
        errors[field.name] = "Please check this box to continue.";
      }
      continue;
    }

    const value = typeof raw === "string" ? raw.trim() : "";
    values[field.name] = value;

    if (!value) {
      if (field.required) errors[field.name] = "This field is required.";
      continue;
    }

    if (field.kind === "email") {
      const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!EMAIL_RE.test(value)) errors[field.name] = "Please enter a valid email address.";
    }
    if (field.options && !field.options.some((o) => o.value === value)) {
      errors[field.name] = "Please choose one of the options.";
    }
    if (field.minLength && value.length < field.minLength) {
      errors[field.name] = `Please write at least ${field.minLength} characters.`;
    }
    if (field.maxLength && value.length > field.maxLength) {
      errors[field.name] = `Please keep this under ${field.maxLength} characters.`;
    }
  }

  // Word count check for whyMentor
  if (values.whyMentor && typeof values.whyMentor === "string") {
    const wordCount = values.whyMentor.split(/\s+/).filter(Boolean).length;
    if (wordCount > 100) {
      errors.whyMentor = `Please keep your answer to 100 words or fewer (currently ${wordCount}).`;
    }
  }

  // Conditional: mentorNote required if mentoredBefore is Yes
  if (values.mentoredBefore === "Yes" && (!values.mentorNote || (values.mentorNote as string).trim().length < 3)) {
    errors.mentorNote = "Please share a short note about your mentoring experience.";
  }

  return { errors, values };
}

export function buildMentorEmailParams(values: ApplyValues, now = new Date()): Record<string, string> {
  const v = (name: string) => {
    const val = values[name];
    return Array.isArray(val) ? val.join(", ") : typeof val === "string" ? val : "";
  };
  const orDash = (name: string) => v(name) || "—";

  return {
    full_name: v("fullName"),
    name: v("fullName"),
    email: v("email"),
    reply_to: v("email"),
    linkedin: v("linkedin"),
    location: v("location"),
    current_role: v("currentRole"),
    years_experience: v("yearsExperience"),
    primary_expertise: v("primaryExpertise"),
    tools_used: v("toolsUsed"),
    certifications: orDash("certifications"),
    work_links: orDash("workLinks"),
    how_help: v("howHelp"),
    hours_per_month: v("hoursPerMonth"),
    preferred_mode: v("preferredMode"),
    mentored_before: v("mentoredBefore"),
    mentor_note: orDash("mentorNote"),
    why_mentor: v("whyMentor"),
    agree_ethics: v("agreeEthics"),
    consent_contact: v("consentContact"),
    submitted_at: now.toISOString().replace("T", " ").replace(/\.\d+Z$/, " UTC"),
  };
}
