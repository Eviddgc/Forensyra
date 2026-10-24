import fs from "node:fs";
import path from "node:path";
import type {
  LearnGroup,
  LearnItem,
  TreeNode,
} from "@/lib/learn-types";

export type { LearnGroup, LearnItem, LearnGuide, TreeNode } from "@/lib/learn-types";

interface LearnLibraryFile {
  groups: LearnGroup[];
}

const LIBRARY_PATH = path.join(
  process.cwd(),
  "content",
  "learn",
  "library.json",
);

let cached: LearnGroup[] | null = null;

/** A URL-safe, stable id for a library item. */
export function learnItemSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

/** The id used by the tree, search links and #anchors. */
export function learnNodeId(groupId: string, label: string): string {
  return `${groupId}-${learnItemSlug(label)}`;
}

/** The whole Learn library, grouped (managed from /admin in the CMS). */
export function getLearnGroups(): LearnGroup[] {
  if (cached) return cached;
  const raw = fs.readFileSync(LIBRARY_PATH, "utf8");
  const parsed = JSON.parse(raw) as LearnLibraryFile;
  cached = Array.isArray(parsed.groups) ? parsed.groups : [];
  return cached;
}

export function getLearnGroup(id: string): LearnGroup | undefined {
  return getLearnGroups().find((group) => group.id === id);
}

/** Turn a library group into a LearnTree folder node. */
export function groupToNode(
  group: LearnGroup,
  options?: { defaultOpen?: boolean; idPrefix?: string },
): TreeNode {
  const prefix = options?.idPrefix ?? group.id;
  return {
    id: group.id,
    label: group.label,
    kind: "folder",
    description: group.description,
    defaultOpen: options?.defaultOpen,
    groupId: group.id,
    groupLabel: group.label,
    children: group.items.map((item) => ({
      id: learnNodeId(prefix, item.label),
      label: item.label,
      kind: "link" as const,
      href: item.href,
      description: item.description,
      tags: item.tags,
      guide: item.guide,
      groupId: group.id,
      groupLabel: group.label,
    })),
  };
}

/** Flatten every item across every group — used by site search. */
export function getAllLearnItems(): Array<
  LearnItem & { group: string; groupId: string; nodeId: string }
> {
  return getLearnGroups().flatMap((group) =>
    group.items.map((item) => ({
      ...item,
      group: group.label,
      groupId: group.id,
      nodeId: learnNodeId(group.id, item.label),
    })),
  );
}
