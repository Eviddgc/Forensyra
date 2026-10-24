# EmailJS templates — FORENSYRA forms

Copy-paste HTML for the two EmailJS templates that the site's server-side
relay expects. Each file is a self-contained, Outlook-safe email (table
layout, inline styles, no images) in the FORENSYRA navy + gold brand.

| File | EmailJS template | Environment variable |
|---|---|---|
| `team-application.html` | Team application notification | `EMAILJS_TEMPLATE_ID` (**required**) |
| `mentor-application.html` | Mentor application notification | `EMAILJS_MENTOR_TEMPLATE_ID` (falls back to `EMAILJS_TEMPLATE_ID`) |

Every value the code sends is HTML-escaped server-side before it reaches the
template, so pasting `{{…}}` placeholders into HTML is safe.

## How to install a template (once per file)

1. Sign in at <https://dashboard.emailjs.com> → **Email Templates** → open the template by name.
2. In the content editor, switch the toggle from **Editor** to **Code** / click the `</>` source icon, delete the sample content, and paste the whole file.
3. Fill the fields around the editor exactly:
   - **To Email:** `forensyra@outlook.in`
   - **Reply To:** `{{reply_to}}` (the applicant — answers come back to their address)
   - **Subject:** the suggested subject from the table below.
   - **From Name:** `FORENSYRA` (the From address comes from your connected mailbox service).
4. Press **Save** (or **Save & Test**). The template **ID** appears next to
   the name — that is what goes into the environment variable.
5. Set the IDs in `.env.local` (local) and in your hosting provider's
   environment variables (production).

## Template settings cheat-sheet

| Template | To Email | Reply To | Subject |
|---|---|---|---|
| `team-application` | `forensyra@outlook.in` | `{{reply_to}}` | `Team application — {{full_name}} · {{role_first}}` |
| `mentor-application` | `forensyra@outlook.in` | `{{reply_to}}` | `Mentor application — {{full_name}} · {{primary_expertise}}` |

## Variables each template receives

**team-application:** `full_name`, `name`, `email`, `reply_to`, `location`,
`background`, `organization`, `linkedin`, `github`, `role_first`, `role_why`,
`experience`, `tools`, `skill_improve`, `weekly_meeting`, `miss_deadline`,
`interest_join`, `legal_cases`, `simulations_ok`, `no_personal_data`,
`document_work`, `accept_statements`, `submitted_at`

**mentor-application:** `full_name`, `name`, `email`, `reply_to`, `linkedin`,
`location`, `current_role`, `years_experience`, `primary_expertise`,
`tools_used`, `certifications`, `work_links`, `how_help`, `hours_per_month`,
`preferred_mode`, `mentored_before`, `mentor_note`, `why_mentor`,
`agree_ethics`, `consent_contact`, `submitted_at`

Empty optional answers arrive as a dash (`—`) so the design never shows a
blank hole.

## What you did not create (and what that means)

- **Applicant auto-reply** — no confirmation email is sent to the applicant.
  That is exactly why the success screens say "We read every application and
  contact selected members by email — no automatic newsletter, just a real
  reply." If you ever want one later, set `EMAILJS_AUTOREPLY_TEMPLATE_ID` and
  the copy upgrades itself.
- **Newsletter** — the footer sign-up stays in its honest "not connected"
  state: it never pretends to subscribe anyone until
  `EMAILJS_NEWSLETTER_TEMPLATE_ID` is set (which is optional).
