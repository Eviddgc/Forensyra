import Link from "next/link";
import {
  ChevronRight,
  ExternalLink,
  FileText,
  Folder,
  FolderOpen,
} from "lucide-react";

export interface TreeNode {
  id: string;
  label: string;
  kind?: "folder" | "link";
  href?: string;
  description?: string;
  tags?: string[];
  children?: TreeNode[];
  defaultOpen?: boolean;
}

function Leaf({ node }: { node: TreeNode }) {
  const external = Boolean(node.href && node.href.startsWith("http"));
  const content = (
    <>
      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-accent/30 bg-accent/10 text-accent-2">
        <FileText className="h-3.5 w-3.5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-foreground transition group-hover:text-accent-2">
          {node.label}
        </span>
        {node.description ? (
          <span className="block text-xs text-muted">{node.description}</span>
        ) : null}
        {node.tags && node.tags.length > 0 ? (
          <span className="mt-1 flex flex-wrap gap-1">
            {node.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-[#6aa0dc]/30 bg-[#0d2238]/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted"
              >
                {tag}
              </span>
            ))}
          </span>
        ) : null}
      </span>
      {external ? (
        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted/50 transition group-hover:text-accent-2" />
      ) : null}
    </>
  );

  const className =
    "group flex items-start gap-3 rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-[#122b46]/60";

  if (external) {
    return (
      <a
        href={node.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={node.href ?? "#"} className={className}>
      {content}
    </Link>
  );
}

function FolderNode({
  node,
  depth,
  isLast,
}: {
  node: TreeNode;
  depth: number;
  isLast: boolean;
}) {
  const hasChildren = Boolean(node.children && node.children.length > 0);
  return (
    <li className="relative">
      {depth > 0 ? (
        <span
          aria-hidden="true"
          className="absolute left-0 top-[1.15rem] h-px w-4 bg-[#6aa0dc]/40"
        />
      ) : null}
      {depth > 0 && !isLast ? (
        <span
          aria-hidden="true"
          className="absolute -left-4 top-7 bottom-0 w-px bg-[#6aa0dc]/30"
        />
      ) : null}

      <details open={node.defaultOpen ?? depth === 0} className="group">
        <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg px-2 py-1.5 [&::-webkit-details-marker]:hidden hover:bg-[#122b46]/40">
          <ChevronRight className="h-4 w-4 shrink-0 text-accent transition-transform duration-200 group-open:rotate-90" />
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-accent/40 bg-accent/10 text-accent-2">
            <Folder className="h-3.5 w-3.5 group-open:hidden" />
            <FolderOpen className="hidden h-3.5 w-3.5 group-open:block" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-foreground">
              {node.label}
            </span>
            {node.description ? (
              <span className="block text-xs text-muted">{node.description}</span>
            ) : null}
          </span>
          {node.tags && node.tags.length > 0 ? (
            <span className="hidden sm:flex flex-wrap gap-1">
              {node.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-[#6aa0dc]/30 bg-[#0d2238]/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted"
                >
                  {tag}
                </span>
              ))}
            </span>
          ) : null}
        </summary>

        {hasChildren ? (
          <ul className="relative ml-6 mt-1 space-y-1 border-l border-[#6aa0dc]/30 pl-4">
            {node.children!.map((child, i) => {
              const last = i === node.children!.length - 1;
              return child.kind === "folder" ? (
                <FolderNode
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  isLast={last}
                />
              ) : (
                <li key={child.id} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-4 top-[1.15rem] h-px w-4 bg-[#6aa0dc]/40"
                  />
                  {!last ? (
                    <span
                      aria-hidden="true"
                      className="absolute -left-4 top-7 bottom-0 w-px bg-[#6aa0dc]/30"
                    />
                  ) : null}
                  <Leaf node={child} />
                </li>
              );
            })}
          </ul>
        ) : null}
      </details>
    </li>
  );
}

export function LearnTree({
  title,
  subtitle,
  nodes,
}: {
  title?: string;
  subtitle?: string;
  nodes: TreeNode[];
}) {
  return (
    <div>
      {title ? (
        <div className="mb-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}
      <ul className="space-y-1">
        {nodes.map((node, i) => {
          const last = i === nodes.length - 1;
          return node.kind === "folder" ? (
            <FolderNode key={node.id} node={node} depth={0} isLast={last} />
          ) : (
            <li key={node.id} className="relative">
              <Leaf node={node} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
