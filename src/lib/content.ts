import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export type Collection =
  | "projects"
  | "writeups"
  | "roadmap"
  | "team"
  | "roles"
  | "pages";

export interface EntryLink {
  label: string;
  url: string;
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
  location?: string;
  joined?: string;
  /** Projects */
  caseType?: string;
  evidence: string[];
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
const COLLECTIONS: Collection[] = [
  "projects",
  "writeups",
  "roadmap",
  "team",
  "roles",
  "pages",
];

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

async function renderMarkdown(markdown: string): Promise<string> {
  const file = await remark().use(remarkHtml, { sanitize: false }).process(markdown);
  return file.toString();
}

async function parseFile(
  collection: Collection,
  fileName: string,
): Promise<Entry> {
  const fullPath = path.join(collectionDir(collection), fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const slug = fileName.replace(/\.mdx?$/, "");
  const rendered = await renderMarkdown(content);

  return {
    collection,
    slug,
    title: String(data.title ?? slug),
    description: data.description ? String(data.description) : undefined,
    date: data.date ? String(data.date) : undefined,
    updated: data.updated ? String(data.updated) : undefined,
    status: data.status ? String(data.status) : undefined,
    tags: toArray(data.tags),
    pinned: data.pinned === true,
    order: typeof data.order === "number" ? data.order : 999,
    role: data.role ? String(data.role) : undefined,
    roleId: data.roleId ? String(data.roleId) : undefined,
    phase: data.phase ?? undefined,
    location: data.location ? String(data.location) : undefined,
    joined: data.joined ? String(data.joined) : undefined,
    caseType: data.caseType ? String(data.caseType) : undefined,
    evidence: toArray(data.evidence),
    author: data.author ? String(data.author) : undefined,
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

/** Entries flagged `pinned: true` in frontmatter. */
export async function getPinned(collection: Collection): Promise<Entry[]> {
  const entries = await getEntries(collection);
  return entries.filter((entry) => entry.pinned);
}

export const ALL_COLLECTIONS = COLLECTIONS;
