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
npm run typecheck # TypeScript check
npm run lint      # ESLint
```

Node.js **20.9+** is required (this project was built on Node 24).

---

## What's inside

| Area | Route | Source |
| --- | --- | --- |
| Home (pinned items, highlights) | `/` | `src/app/page.tsx` + content |
| About | `/about` | `content/pages/about.md` |
| Roles (13 specialisations) | `/roles` | `content/roles/*.md` |
| Team | `/team` | `content/team/*.md` |
| Projects / case files | `/projects`, `/projects/[slug]` | `content/projects/*.md` |
| Write-ups | `/writeups`, `/writeups/[slug]` | `content/writeups/*.md` |
| Roadmap (present + upcoming) | `/roadmap` | `content/roadmap/*.md` |
| Ethics & legal rules | `/ethics` | `content/pages/ethics.md` |
| Join / apply | `/join` | `content/pages/join.md` + `site.json` |
| Resources | `/resources` | `content/pages/resources.md` |
| Contact | `/contact` | `src/app/contact/page.tsx` + `site.json` |
| Content manager (CMS) | `/admin` | `public/admin/*` |

---

## Editing content

All content is plain Markdown/JSON in the `content/` folder, so it is public,
versioned, and reusable.

### Option A — directly on GitHub (works right now)

Open any file under `content/` on GitHub and click the pencil to edit. This is
the simplest way to add a write-up, update the roadmap, or pin a project.

### Option B — the browser content manager (`/admin`)

Decap CMS gives you a click-and-type interface. It needs a **one-time GitHub
OAuth setup** (see below). For **local** editing it works without any setup:

```bash
npx decap-server   # terminal 1
npm run dev        # terminal 2
# then open http://localhost:3000/admin
```

### Pinning ("keep it at the top")

Add `pinned: true` to any project, write-up, or roadmap item. Pinned items are
surfaced first and highlighted on the home page. The site announcement banner is
controlled from `content/settings/site.json`.

---

## Content model

```
content/
  settings/site.json   # name, tagline, motto, links, announcement, apply URL
  projects/*.md        # case files (title, status, evidence, tags, pinned…)
  writeups/*.md        # write-ups (title, author, date, tags, pinned…)
  roadmap/*.md         # present + upcoming plans (status, order…)
  team/*.md            # members (role, roleId, phase, links…)
  roles/*.md           # the 13 roles (description, phase, order…)
  pages/*.md           # about, ethics, join, resources
public/
  admin/               # Decap CMS (only used for /admin)
  uploads/             # media uploaded through the CMS
```

Every entry supports: `title`, `description`, `date`, `updated`, `status`,
`tags`, `pinned`, `links`, plus a Markdown body.

---

## Deploying to Vercel

1. Push this repository to `github.com/Eviddgc/Forensyra`.
2. In Vercel, **Add New → Project** and import the repo. Next.js is detected
   automatically — no configuration needed.
3. Deploy. You get a free `*.vercel.app` URL immediately.
4. Add a **custom domain** later in Vercel → Settings → Domains, and update
   `url` in `content/settings/site.json`.

### Enabling the CMS on Vercel (one-time GitHub OAuth)

Decap CMS saves content through GitHub, which needs an OAuth app:

1. Create a **GitHub OAuth App** (GitHub → Settings → Developer settings):
   - Homepage URL: your deployed site, e.g. `https://forensyra.vercel.app`
   - Authorization callback URL: your OAuth proxy callback (step 2)
2. Deploy a small OAuth proxy (e.g. a Vercel function) and give it the OAuth
   app's client ID and secret. (Any Decap-compatible GitHub OAuth proxy works.)
3. In `public/admin/config.yml`, set `base_url:` to the proxy URL.
4. Commit and redeploy — `/admin` now signs in with GitHub.

Until this is done, edit the Markdown files directly on GitHub. Nothing about
the site breaks without it.

---

## Project structure

```
src/
  app/            # routes (App Router) + sitemap, robots, OG image
  components/     # UI: header, footer, cards, badges, markdown renderer…
  lib/
    content.ts    # reads + renders the Markdown collections
    site.ts       # reads content/settings/site.json
    utils.ts      # helpers (dates, class names)
    ui.ts         # shared Tailwind class strings
```

---

## Our ethics (short version)

Legal practice cases and public sample evidence only. No real victim data.
Privacy, consent, and evidence integrity come first. See `/ethics`.

---

## License

Code: MIT (see `LICENSE`). Content (write-ups, case reports, documentation):
© FORENSYRA — please credit and link back if you reuse it.
