import fs from "node:fs";
import path from "node:path";
import type { TreeNode } from "@/components/learn-tree";

export interface LearnItem {
  label: string;
  href: string;
  description: string;
  tags: string[];
}

export interface LearnGroup {
  id: string;
  label: string;
  description: string;
  items: LearnItem[];
}

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
    children: group.items.map((item, index) => ({
      id: `${prefix}-${index}`,
      label: item.label,
      kind: "link" as const,
      href: item.href,
      description: item.description,
      tags: item.tags,
    })),
  };
}

/** Flatten every item across every group — used by site search. */
export function getAllLearnItems(): Array<LearnItem & { group: string }> {
  return getLearnGroups().flatMap((group) =>
    group.items.map((item) => ({ ...item, group: group.label })),
  );
}
