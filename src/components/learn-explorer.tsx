"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ExternalLink,
  FileText,
  Folder,
  FolderOpen,
} from "lucide-react";
import type { TreeNode } from "@/components/learn-tree";

export function LearnExplorer({ nodes }: { nodes: TreeNode[] }) {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(nodes.map((n) => n.id)));
  const [selectedId, setSelectedId] = useState<string | null>(nodes[0]?.id ?? null);

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function findNode(list: TreeNode[], id: string | null): TreeNode | null {
    if (!id) return null;
    for (const n of list) {
      if (n.id === id) return n;
      if (n.children) {
        const found = findNode(n.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  const selected = findNode(nodes, selectedId);

  function TreeItem({ node, depth }: { node: TreeNode; depth: number }) {
    const isFolder = node.kind === "folder";
    const isOpen = expanded.has(node.id);
    const isSelected = selectedId === node.id;
    return (
      <li className="select-none">
        <div
          className={`group flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors cursor-pointer ${
            isSelected
              ? "bg-accent/15 text-accent-2"
              : "text-muted hover:bg-[#122b46]/60 hover:text-foreground"
          }`}
          style={{ paddingLeft: `${depth * 14 + 8}px` }}
          onClick={() => {
            setSelectedId(node.id);
            if (isFolder) toggle(node.id);
          }}
        >
          {isFolder ? (
            <ChevronRight
              className={`h-3.5 w-3.5 shrink-0 text-accent transition-transform duration-200 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          ) : (
            <span className="w-3.5 shrink-0" />
          )}
          <span
            className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
              isFolder
                ? "border-accent/40 bg-accent/10 text-accent-2"
                : "border-[#6aa0dc]/30 bg-[#0d2238]/60 text-muted"
            }`}
          >
            {isFolder ? (
              isOpen ? (
                <FolderOpen className="h-3.5 w-3.5" />
              ) : (
                <Folder className="h-3.5 w-3.5" />
              )
            ) : (
              <FileText className="h-3.5 w-3.5" />
            )}
          </span>
          <span className="truncate">{node.label}</span>
        </div>
        {isFolder && isOpen && node.children && node.children.length > 0 ? (
          <ul>
            {node.children.map((child) => (
              <TreeItem key={child.id} node={child} depth={depth + 1} />
            ))}
          </ul>
        ) : null}
      </li>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr] lg:gap-6">
      {/* Left: tree */}
      <aside className="rounded-2xl border border-[#6aa0dc]/25 bg-[#122b46]/30 p-3 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-auto">
        <p className="px-2 pb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
          Learn library
        </p>
        <ul className="space-y-0.5">
          {nodes.map((node) => (
            <TreeItem key={node.id} node={node} depth={0} />
          ))}
        </ul>
      </aside>

      {/* Right: content */}
      <section className="min-h-[60vh] rounded-2xl border border-[#6aa0dc]/25 bg-[#122b46]/30 p-6 sm:p-8">
        {selected ? (
          <div>
            <div className="flex items-start gap-4">
              <span
                className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
                  selected.kind === "folder"
                    ? "border-accent/40 bg-accent/10 text-accent-2"
                    : "border-[#6aa0dc]/30 bg-[#0d2238]/60 text-muted"
                }`}
              >
                {selected.kind === "folder" ? (
                  <FolderOpen className="h-6 w-6" />
                ) : (
                  <FileText className="h-6 w-6" />
                )}
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {selected.label}
                </h2>
                {selected.description ? (
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {selected.description}
                  </p>
                ) : null}
                {selected.tags && selected.tags.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {selected.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-[#6aa0dc]/30 bg-[#0d2238]/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            {selected.kind === "folder" && selected.children && selected.children.length > 0 ? (
              <div className="mt-8">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                  Contents
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {selected.children.map((child) => (
                    <li key={child.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(child.id)}
                        className="group flex w-full items-start gap-3 rounded-xl border border-[#6aa0dc]/20 bg-[#0d2238]/40 p-3 text-left transition-colors hover:border-accent/40"
                      >
                        <span
                          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                            child.kind === "folder"
                              ? "border-accent/40 bg-accent/10 text-accent-2"
                              : "border-[#6aa0dc]/30 bg-[#0d2238]/60 text-muted"
                          }`}
                        >
                          {child.kind === "folder" ? (
                            <Folder className="h-4 w-4" />
                          ) : (
                            <FileText className="h-4 w-4" />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-foreground group-hover:text-accent-2">
                            {child.label}
                          </span>
                          {child.description ? (
                            <span className="block text-xs text-muted">
                              {child.description}
                            </span>
                          ) : null}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {selected.href ? (
              <div className="mt-8">
                {selected.href.startsWith("http") ? (
                  <a
                    href={selected.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-ink transition hover:bg-accent-2"
                  >
                    Open source
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    href={selected.href}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-ink transition hover:bg-accent-2"
                  >
                    Open page
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                )}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-muted">
            Select an item from the tree.
          </div>
        )}
      </section>
    </div>
  );
}
