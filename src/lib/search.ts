import { getEntries } from "@/lib/content";
import { getAllLearnItems } from "@/lib/learn";
import type { SearchDoc } from "@/lib/search-core";

export type { SearchKind, SearchDoc } from "@/lib/search-core";
export { searchDocs } from "@/lib/search-core";

/** A single entry in the site-wide search index (built from content + Learn). */
export interface SearchIndex {
  generatedAt: string;
  docs: SearchDoc[];
}

/**
 * Build the whole-site search index. Small enough to ship to the client for
 * the ⌘K palette, and reusable by the /search page and tests.
 */
export async function getSearchIndex(): Promise<SearchIndex> {
  const [projects, writeups, roles, pages] = await Promise.all([
    getEntries("projects"),
    getEntries("writeups"),
    getEntries("roles"),
    getEntries("pages"),
  ]);

  const docs: SearchDoc[] = [];

  for (const entry of projects) {
    docs.push({
      title: entry.title,
      description: entry.description ?? "",
      href: `/projects/${entry.slug}`,
      kind: "Case file",
      tags: entry.tags,
    });
  }

  for (const entry of writeups) {
    docs.push({
      title: entry.title,
      description: entry.description ?? "",
      href: `/writeups/${entry.slug}`,
      kind: "Write-up",
      tags: entry.tags,
    });
  }

  for (const entry of roles) {
    docs.push({
      title: entry.title,
      description: entry.description ?? entry.work ?? "",
      href: `/roles#role-${entry.slug}`,
      kind: "Role",
      tags: entry.tags,
    });
  }

  for (const item of getAllLearnItems()) {
    docs.push({
      title: item.label,
      description: item.description,
      href: item.href,
      kind: "Resource",
      tags: [...item.tags, item.group],
    });
  }

  const staticPages: Array<{ title: string; description: string; href: string }> = [
    { title: "Home", description: "FORENSYRA — Digital Evidence & DFIR Collective", href: "/" },
    { title: "About", description: "Why the collective exists and what it stands for", href: "/about" },
    { title: "Roadmap", description: "Phases, milestones and what comes next", href: "/roadmap" },
    { title: "Ethics", description: "Rules of engagement for legal, ethical practice", href: "/ethics" },
    { title: "Roles", description: "The thirteen specialisations across DFIR", href: "/roles" },
    { title: "Find your role", description: "A six-question role matcher", href: "/roles/matcher" },
    { title: "Members", description: "The people building the collective", href: "/team" },
    { title: "Join", description: "How to apply and what to expect", href: "/join" },
    { title: "Apply", description: "Submit your application to join the team", href: "/apply" },
    { title: "Mentor / Advisor", description: "Guide the team as a subject expert", href: "/apply/mentor" },
    { title: "Learn", description: "Resources, datasets and DFIR tools", href: "/resources" },
    { title: "Practice Datasets", description: "Public evidence for hands-on labs", href: "/resources/datasets" },
    { title: "DFIR Tools", description: "The analyst toolkit", href: "/resources/tools" },
    { title: "Terminal Playground", description: "A simulated DFIR shell — and a real SHA-256 tool", href: "/playground" },
    { title: "Case board", description: "Published case files and investigations", href: "/projects" },
    { title: "Write-ups", description: "Investigation logs, tutorials and research", href: "/writeups" },
    { title: "Contact", description: "Talk to the collective", href: "/contact" },
    { title: "Security policy", description: "Responsible disclosure and scope", href: "/security" },
    { title: "Search", description: "Search the whole site", href: "/search" },
  ];

  for (const page of staticPages) {
    docs.push({ ...page, kind: "Page", tags: [] });
  }

  const covered = new Set(["about", "ethics", "join", "resources"]);
  for (const page of pages) {
    if (covered.has(page.slug)) continue;
    docs.push({
      title: page.title,
      description: page.description ?? "",
      href: `/${page.slug}`,
      kind: "Page",
      tags: page.tags,
    });
  }

  return { generatedAt: new Date().toISOString(), docs };
}
