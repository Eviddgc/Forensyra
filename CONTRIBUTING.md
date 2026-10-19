# Contributing to Forensyra

Thanks for helping build the collective. This guide covers the three things most
people will do: **adding content**, **contributing code**, and **reporting a
problem**.

## Adding content

Content is Markdown/JSON in the `content/` folder. You can edit it directly on
GitHub (pencil icon on any file) or from the CMS at `/admin`.

- **Write-ups** → `content/writeups/` (add `pinned: true` to feature it)
- **Case files** → `content/projects/` (uses `evidence`, `plan`, `deliverables`)
- **Learn library** → `content/learn/library.json` (references, datasets, tools)
- **Team** → `content/team/` (link a member to a role with `roleId`)
- **Roles** → `content/roles/` (uses `work`, `responsibilities`, `skills`)
- **About summary** → `content/pages/about.md` (the hero subtitle)

The roadmap is code-managed in `src/lib/roadmap.ts` because its timeline
layout is built around fixed milestones with icons, tags, and artwork.

Each file starts with frontmatter. Copy an existing file as a template.

### Writing rules

- Never include real victim data, personal data, or leaked material.
- Use public, legal sample evidence only — see `/ethics`.
- Keep claims evidence-led: say what the artefact shows, not what you assume.
- Remember the Markdown renderer has **no table support** — use headings and
  lists instead of pipe tables.
- Give body headings a clear name; they become the on-page table of contents.

## Contributing code

0. Use **Node 24.12.0** (`nvm use`) so your npm matches the committed lockfile
   and CI. See the toolchain note in the README.
1. Create a branch: `git checkout -b feat/short-description`.
2. Make your change. Keep it consistent with the surrounding code and style.
3. Run the checks — all four must pass:

   ```bash
   npm run lint
   npm run typecheck
   npm test
   npm run build
   ```

4. Check anything interactive at 320, 375, 768, 1024 and 1440 px widths, and
   with the keyboard only.
5. Open a pull request using the template.

### Conventions

- **Next.js App Router** under `src/app`, reusable UI in `src/components`.
- **Tailwind CSS** for styling; shared class strings live in `src/lib/ui.ts`.
- Keep components small and typed. Prefer server components unless interactivity
  is needed (then add `"use client"`).
- Keep client components free of Node APIs. If a module needs both, split the
  pure part out (see `src/lib/search-core.ts` vs `src/lib/search.ts`).
- Respect `prefers-reduced-motion`, give interactive targets ≥24px, and label
  every control.
- Don't hand-edit generated files or `node_modules`.
- **Do not run the dev server with `--webpack`** — Tailwind is loaded by a
  Turbopack rule in `next.config.ts`.

## Reporting issues

Open an issue using the templates in `.github/ISSUE_TEMPLATE/` and include what
you expected, what happened, and steps to reproduce. For content corrections, a
link to the page is enough.

**Security issues must not be filed publicly.** See `SECURITY.md` or `/security`.

## Community standards

By contributing you agree to follow the [code of conduct](CODE_OF_CONDUCT.md)
and the [ethics rules](/ethics).
