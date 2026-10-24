/** A short, on-site lesson that sits in front of the official source. */
export interface LearnGuide {
  /** What the resource or technique actually is. */
  overview?: string;
  /** Why an investigator should care about it. */
  why?: string;
  /** The core ideas worth remembering. */
  keyPoints?: string[];
  /** A safe, practical way to start using it. */
  workflow?: string[];
  /** A common mistake, limitation or safety note. */
  watchOut?: string;
  /** How this connects to FORENSYRA's own work. */
  fieldNote?: string;
}

export interface LearnItem {
  label: string;
  href: string;
  description: string;
  tags: string[];
  guide?: LearnGuide;
}

export interface LearnGroup {
  id: string;
  label: string;
  description: string;
  items: LearnItem[];
}

export interface TreeNode {
  id: string;
  label: string;
  kind?: "folder" | "link";
  href?: string;
  description?: string;
  tags?: string[];
  children?: TreeNode[];
  defaultOpen?: boolean;
  guide?: LearnGuide;
  groupId?: string;
  groupLabel?: string;
}
