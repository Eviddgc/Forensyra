# Contributing to Forensyra

Thanks for helping build the collective. This guide covers the two things most
people will do: **adding content** and **contributing code**.

## Adding content

Content is Markdown in the `content/` folder. You can edit it directly on GitHub
(pencil icon on any file) or from the CMS at `/admin`.

- **Write-ups** → `content/writeups/` (add `pinned: true` to feature it)
- **Case files** → `content/projects/`
- **Roadmap** → `content/roadmap/`
- **Team** → `content/team/` (link a member to a role with `roleId`)
- **Pages** → `content/pages/`

Each file starts with frontmatter. Copy an existing file as a template.

### Writing rules

- Never include real victim data, personal data, or leaked material.
- Use public, legal sample evidence only — see `/ethics`.
- Keep claims evidence-led: say what the artefact shows, not what you assume.

## Contributing code

1. Create a branch: `git checkout -b feat/short-description`.
2. Make your change. Keep it consistent with the surrounding code and style.
3. Run the checks:

   ```bash
   npm run typecheck
   npm run lint
   npm run build
   ```

4. Open a pull request with a short summary and screenshots if it changes the UI.

### Conventions

- **Next.js App Router** under `src/app`, reusable UI in `src/components`.
- **Tailwind CSS** for styling; shared class strings live in `src/lib/ui.ts`.
- Keep components small and typed. Prefer server components unless interactivity
  is needed (then add `"use client"`).
- Don't hand-edit generated files or `node_modules`.

## Reporting issues

Open an issue using the templates and include what you expected, what happened,
and steps to reproduce. For content corrections, a link to the page is enough.

By contributing you agree to follow the [ethics rules](/ethics).
