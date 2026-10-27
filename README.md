# FORENSYRA — Digital Evidence & DFIR Collective

> **Where Digital Truth Takes Form.**
> _Preserve the Trace. Prove the Story._

This repository is the **public hub and website** for FORENSYRA — a student-led
digital forensics collective. Everything lives in one place: the flagship case
files, write-ups, roadmap, the team, and the ethics rules that govern our work.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, with content
managed as Markdown in the repo and editable from a browser via **Decap CMS**.

---

## Quick start

```bash
npm install       # install dependencies
npm run dev       # start the dev server → http://localhost:3000
npm run build     # production build
npm run start     # run the production build
npm run lint      # ESLint
npm run typecheck # TypeScript check
npm test          # unit tests (node:test)
```

**Node.js 24.12.0** — see `.nvmrc` and run `nvm use`. CI installs that exact
version. The committed `package-lock.json` is maintained by the npm bundled with
it (11.6.2); npm majors disagree about *optional* wasm dependencies
(`@emnapi/*`, pulled in by `@img/sharp-wasm32` and
`@tailwindcss/oxide-wasm32-wasi`), so `npm ci` run by a different major can fail
its sync check. The lockfile itself is complete, so both npm 11 and npm 12
install it — the pin just keeps CI reproducible.

> **Dev server note.** Tailwind is wired through `next.config.ts` →
> `turbopack.rules`. Keep `npm run dev` as `next dev` — running the dev server
> with `--webpack` bypasses that loader and the site renders with no styles.

---

## What's inside

| Area | Route | Source |
| --- | --- | --- |
| Home (pinned items, highlights) | `/` | `src/app/page.tsx` + content |
| About | `/about` | `src/components/about/*` + `content/pages/about.md` (summary) |
| Roles (13 specialisations) | `/roles` | `content/roles/*.md` |
| Role matcher (6-question quiz) | `/roles/matcher` | `src/components/role-matcher.tsx` |
| Team | `/team` | `content/team/*.md` |
| Projects / case files | `/projects`, `/projects/[slug]` | `content/projects/*.md` |
| Write-ups | `/writeups`, `/writeups/[slug]` | `content/writeups/*.md` |
| Roadmap (present + upcoming) | `/roadmap` | `src/lib/roadmap.ts` |
| Ethics & legal rules | `/ethics` | `src/app/ethics/page.tsx` |
| Join / apply | `/join` | `src/app/join/page.tsx` + `site.json` |
| Learn library | `/resources` | `content/learn/library.json` |
| Practice datasets | `/resources/datasets` | `content/learn/library.json` |
| DFIR tools | `/resources/tools` | `content/learn/library.json` |
| Terminal playground | `/playground` | `src/components/terminal-playground.tsx` |
| Site search (no-JS fallback) | `/search?q=` | `src/lib/search.ts` |
| Security policy / disclosure | `/security` | `src/app/security/page.tsx` + `SECURITY.md` |
| RSS feed | `/feed.xml` | `src/app/feed.xml/route.ts` |
| Contact | `/contact` | `src/app/contact/page.tsx` + `site.json` |
| Content manager (CMS) | `/admin` (dev only by default) | `content/admin/config.yml` + `content/admin/index.html` |

Site-wide, the layout also renders structured data (Organization + WebSite),
a `⌘K` / `Ctrl-K` command palette, per-article Open Graph cards, a sitemap, an
RSS feed and a web manifest. Every response carries the security headers set in
`next.config.ts` (see [Security posture](#security-posture)).

---

## Editing content

All content is plain Markdown/JSON in the `content/` folder, so it is public,
versioned, and reusable.

### Option A — directly on GitHub (works right now)

Open any file under `content/` on GitHub and click the pencil to edit. This is
the simplest way to add a write-up or update a case file.

### Option B — the browser content manager (`/admin`)

Decap CMS gives you a click-and-type interface. It needs a **one-time GitHub
OAuth setup** (see below). For **local** editing it works without any setup:

```bash
npx decap-server   # terminal 1
npm run dev        # terminal 2
# then open http://localhost:3000/admin
```

In production `/admin`, `/admin/config.yml` and `/admin/theme.css` return
**404** unless the `ENABLE_CMS` environment variable is `"true"`. Leave it unset
until the OAuth proxy is configured.

### Pinning ("keep it at the top")

Add `pinned: true` to any project or write-up. Pinned items are surfaced first
and highlighted on the home page. The site announcement banner is
controlled from `content/settings/site.json`.

---

## Content model

```
content/
  settings/site.json     # name, tagline, motto, links, announcement, apply URL
  learn/library.json     # the Learn library: references, datasets, tools, standards, reading
  projects/*.md          # case files (title, status, evidence, plan, deliverables, tags…)
  writeups/*.md          # write-ups (title, author, date, tags, pinned…)
  pages/about.md         # About page summary (the roadmap is in src/lib/roadmap.ts)
  team/*.md              # members (role, roleId, phase, location, cover, links…)
  roles/*.md             # the 13 roles (description, work, responsibilities, skills…)
  admin/config.yml       # Decap CMS configuration (served at /admin/config.yml in development)
  admin/index.html       # Decap CMS app shell (served at /admin in development)
  admin/theme.css        # FORENSYRA navy/gold styling for the CMS shell
public/
  uploads/               # media uploaded through the CMS
  .well-known/security.txt
```

Every entry supports: `title`, `description`, `date`, `updated`, `status`,
`tags`, `pinned`, `links`, plus a Markdown body. Case files add `caseType`,
`evidence`, `plan` and `deliverables`; roles add `work`, `responsibilities`
and `skills`.

Headings in Markdown bodies get deterministic `id` attributes automatically
(`src/lib/content.ts`), which is what powers the on-page table of contents and
`#anchor` links.

---

## Environment variables

Everything is optional — the site runs without any of them, it just cannot
deliver email. Copy the template and fill in what you need:

```bash
cp .env.example .env.local        # macOS / Linux
Copy-Item .env.example .env.local # Windows PowerShell
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Overrides `url` in `site.json` (canonicals, sitemap, OG) |
| `EMAILJS_SERVICE_ID` | EmailJS service for the application/mentor/newsletter forms |
| `EMAILJS_TEMPLATE_ID` | Team application template |
| `EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `EMAILJS_PRIVATE_KEY` | Optional — only for non-browser EmailJS access |
| `EMAILJS_AUTOREPLY_TEMPLATE_ID` | Optional applicant auto-reply |
| `EMAILJS_MENTOR_TEMPLATE_ID` | Mentor form template (falls back to `EMAILJS_TEMPLATE_ID`) |
| `EMAILJS_MENTOR_AUTOREPLY_TEMPLATE_ID` | Optional mentor auto-reply |
| `EMAILJS_NEWSLETTER_TEMPLATE_ID` | Footer newsletter template |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (public — ships in the client bundle) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key (server-only, never commit) |

Ready-made branded HTML for the team and mentor application emails lives in
[`docs/email-templates/`](docs/email-templates/README.md) — paste it into the
EmailJS template editor's code view and copy the IDs into the variables above.

When email is not configured the forms fail **honestly** — they never claim a
message was sent.

The apply, mentor and newsletter forms are guarded by Cloudflare Turnstile
(Managed mode). Create a free widget in the Cloudflare dashboard with
hostnames `forensyra.in` and `www.forensyra.in`, set both Turnstile variables
in Vercel and redeploy — the site key is baked in at build time. Until the
variables are set the forms work exactly as before; once set, every
submission must carry a valid one-time token, verified server-side against
Cloudflare's siteverify endpoint.

---

## Deploying to Vercel

1. Push this repository to `github.com/Eviddgc/Forensyra`.
2. In Vercel, **Add New → Project** and import the repo. Next.js is detected
   automatically — no configuration needed.
3. Deploy. You get a free `*.vercel.app` URL immediately.
4. Add a **custom domain** later in Vercel → Settings → Domains, and either
   update `url` in `content/settings/site.json` **or** set the
   `NEXT_PUBLIC_SITE_URL` environment variable in Vercel (it overrides the
   committed value, so previews and production always get correct canonical
   URLs, sitemaps and OG tags).

### Enabling the CMS on Vercel (one-time GitHub OAuth)

Decap CMS saves content through GitHub, which needs an OAuth app:

1. Create a **GitHub OAuth App** (GitHub → Settings → Developer settings):
   - Homepage URL: your deployed site, e.g. `https://forensyra.vercel.app`
   - Authorization callback URL: your OAuth proxy callback (step 2)
2. Deploy a small OAuth proxy (e.g. a Vercel function) and give it the OAuth
   app's client ID and secret. (Any Decap-compatible GitHub OAuth proxy works.)
3. In `content/admin/config.yml`, set `base_url:` to the proxy URL.
4. Set `ENABLE_CMS=true` in Vercel (Project → Settings → Environment Variables)
   and redeploy. Commit the `base_url` change at the same time. Until both are
   done, `/admin` and `/admin/config.yml` return 404 in production.

---

## Project structure

```
src/
  app/            # routes (App Router) + sitemap, robots, feed, manifest, OG images
  components/     # UI: header, footer, command palette, workbench, terminal…
  lib/
    content.ts        # reads + renders the Markdown collections (adds heading ids)
    learn.ts          # loads content/learn/library.json
    search-core.ts    # client-safe search (matcher + types)
    search.ts         # builds the site-wide search index
    structured-data.ts# schema.org JSON-LD builders
    toc.ts            # heading extraction + reading time
    og.tsx            # shared Open Graph card renderer
    seo.ts            # per-page canonical + feed discovery links
    site.ts           # reads content/settings/site.json
    utils.ts          # helpers (dates, class names)
    ui.ts             # shared Tailwind class strings
tests/            # node:test unit tests (npm test)
```

---

## Verification

Every change is expected to keep these green:

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

GitHub Actions runs the same four commands for every push to `main` and every
pull request (`.github/workflows/ci.yml`).

---

## Security posture

Every response carries the headers configured in `next.config.ts`:

- a same-origin `Content-Security-Policy` (`/admin` gets a relaxed policy,
  because Decap CMS loads its bundle from a CDN, validates its config with
  `new Function`, and talks to GitHub);
- `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `X-Frame-Options: DENY` and a restrictive `Permissions-Policy`;
- `Strict-Transport-Security` in production only, and no `X-Powered-By`.

Nonces are deliberately not used for the CSP: they would force every route to
render dynamically, trading away the site's static output. Inline script and
style therefore stay allowed, so the policy pins *sources* rather than
individual inline blocks.

`npm audit` reports one unfixable, dev-only advisory: `braces`
(GHSA-vfj7-8cjw-p6xm), reached through `eslint-config-next` → `fast-glob` →
`micromatch`. Every published version is affected and no patched release
exists, so no version override can clear it — it runs at lint time only and
never reaches a visitor's browser.

---

## Our ethics (short version)

Legal practice cases and public sample evidence only. No real victim data.
Privacy, consent, and evidence integrity come first. See `/ethics`.

---

## License

Code: MIT (see `LICENSE`). Content (write-ups, case reports, documentation):
© FORENSYRA — please credit and link back if you reuse it.
