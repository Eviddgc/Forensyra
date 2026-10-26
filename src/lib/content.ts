import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { decodeHtmlEntities } from "@/lib/html-entities";

export type Collection =
  | "projects"
  | "writeups"
  | "team"
  | "roles"
  | "pages";

export interface EntryLink {
  label: string;
  url: string;
}

/** A labelled step, used by the case-file investigation plan. */
export interface EntryStep {
  label: string;
  detail?: string;
}

export interface Entry {
  collection: Collection;
  slug: string;
  title: string;
  description?: string;
  date?: string;
  updated?: string;
  status?: string;
  tags: string[];
  pinned: boolean;
  order: number;
  /** Roles / team */
  role?: string;
  roleId?: string;
  phase?: number | string;
  /** Roles */
  skills?: string[];
  responsibilities?: string[];
  work?: string;
  location?: string;
  joined?: string;
  /** Projects */
  caseType?: string;
  evidence: string[];
  plan: EntryStep[];
  deliverables: string[];
  /** Coming-soon placeholder roles */
  comingSoon: boolean;
  /** Write-ups */
  author?: string;
  cover?: string;
  links: EntryLink[];
  /** Rendered HTML body */
  content: string;
  /** Raw markdown body */
  raw: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function collectionDir(collection: Collection) {
  return path.join(CONTENT_DIR, collection);
}

function parseLinks(value: unknown): EntryLink[] {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is Record<string, unknown> => Boolean(item))
      .map((item) => ({
        label: String(item.label ?? "Link"),
        url: String(item.url ?? "#"),
      }))
      .filter((link) => link.url && link.url !== "#");
  }
  return [];
}

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v));
  if (typeof value === "string" && value.trim())
    return value.split(",").map((v) => v.trim());
  return [];
}

function parseSteps(value: unknown): EntryStep[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item): EntryStep | null => {
      if (typeof item === "string") {
        return item.trim() ? { label: item.trim() } : null;
      }
      if (item && typeof item === "object") {
        const record = item as Record<string, unknown>;
        const label = String(record.label ?? record.title ?? "").trim();
        if (!label) return null;
        const detail = record.detail ? String(record.detail) : undefined;
        return { label, ...(detail ? { detail } : {}) };
      }
      return null;
    })
    .filter((step): step is EntryStep => step !== null);
}

function slugifyHeading(text: string): string {
  const plain = decodeHtmlEntities(text)
    .replace(/<[^>]+>/g, "")
    .replace(/&/g, " and ")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
  return plain.slice(0, 64);
}

/** Give h2/h3 headings stable ids so the table of contents can link to them. */
function addHeadingIds(html: string): string {
  const seen = new Map<string, number>();
  return html.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (match, level: string, inner: string) => {
      const base = slugifyHeading(inner);
      if (!base) return match;
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count + 1}`;
      return `<h${level} id="${id}">${inner}</h${level}>`;
    },
  );
}

async function renderMarkdown(markdown: string): Promise<string> {
  // Sanitising raw HTML costs nothing for the current content (all of it is
  // plain Markdown) and means a CMS edit cannot inject script or event
  // handlers into a prerendered page.
  const file = await remark().use(remarkHtml, { sanitize: true }).process(markdown);
  return addHeadingIds(file.toString());
}

/**
 * Split a Markdown file into its YAML frontmatter and body.
 *
 * Frontmatter is always a single `---` block at the very top of the file, so a
 * small parser is enough; it also keeps gray-matter's old js-yaml 3 tree (and
 * its unpatched argparse/sprintf-js advisories) out of the dependency graph.
 */
function readFrontmatter(raw: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return { data: {}, content: raw };
  const parsed = yaml.load(match[1]);
  return {
    data:
      parsed && typeof parsed === "object"
        ? (parsed as Record<string, unknown>)
        : {},
    content: raw.slice(match[0].length),
  };
}

/**
 * YAML parses an unquoted `date: 2026-10-10` into a Date object. `String()`
 * would then produce a long, locale-dependent form ("Sat Oct 10 2026 ..."),
 * which is invalid in JSON-LD and in sitemap `lastModified`. Normalise every
 * frontmatter date to an ISO calendar date instead.
 */
function isoDate(value: unknown): string | undefined {
  if (!value) return undefined;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime())
      ? undefined
      : value.toISOString().slice(0, 10);
  }
  const raw = String(value).trim();
  if (!raw) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime())
    ? raw
    : parsed.toISOString().slice(0, 10);
}

async function parseFile(
  collection: Collection,
  fileName: string,
): Promise<Entry> {
  const fullPath = path.join(collectionDir(collection), fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = readFrontmatter(fileContents);
  const slug = fileName.replace(/\.mdx?$/, "");
  const rendered = await renderMarkdown(content);

  return {
    collection,
    slug,
    title: String(data.title ?? slug),
    description: data.description ? String(data.description) : undefined,
    date: isoDate(data.date),
    updated: isoDate(data.updated),
    status: data.status ? String(data.status) : undefined,
    tags: toArray(data.tags),
    pinned: data.pinned === true,
    order: typeof data.order === "number" ? data.order : 999,
    role: data.role ? String(data.role) : undefined,
    roleId: data.roleId ? String(data.roleId) : undefined,
    phase:
      typeof data.phase === "number" || typeof data.phase === "string"
        ? data.phase
        : undefined,
    skills: toArray(data.skills),
    responsibilities: toArray(data.responsibilities),
    work: data.work ? String(data.work) : undefined,
    location: data.location ? String(data.location) : undefined,
    joined: data.joined ? String(data.joined) : undefined,
    caseType: data.caseType ? String(data.caseType) : undefined,
    evidence: toArray(data.evidence),
    plan: parseSteps(data.plan),
    deliverables: toArray(data.deliverables),
    author: data.author ? String(data.author) : undefined,
    comingSoon: data.comingSoon === true,
    cover: data.cover ? String(data.cover) : undefined,
    links: parseLinks(data.links),
    content: rendered,
    raw: content,
  };
}

function listFiles(collection: Collection): string[] {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => /\.mdx?$/.test(file) && !file.startsWith("_"));
}

function sortEntries(entries: Entry[]): Entry[] {
  return entries.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    const da = a.date ? Date.parse(a.date) : 0;
    const db = b.date ? Date.parse(b.date) : 0;
    return db - da;
  });
}

/** All entries in a collection, sorted (order asc, then date desc). */
export async function getEntries(collection: Collection): Promise<Entry[]> {
  const files = listFiles(collection);
  const entries = await Promise.all(
    files.map((file) => parseFile(collection, file)),
  );
  return sortEntries(entries);
}

/** A single entry by slug, or null. */
export async function getEntry(
  collection: Collection,
  slug: string,
): Promise<Entry | null> {
  const dir = collectionDir(collection);
  const match = listFiles(collection).find(
    (file) => file.replace(/\.mdx?$/, "") === slug,
  );
  if (!match || !fs.existsSync(path.join(dir, match))) return null;
  return parseFile(collection, match);
}

/** Slugs for generateStaticParams. */
export function getSlugs(collection: Collection): string[] {
  return listFiles(collection).map((file) => file.replace(/\.mdx?$/, ""));
}


