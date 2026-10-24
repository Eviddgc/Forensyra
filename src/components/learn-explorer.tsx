"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Folder,
  FolderOpen,
  ListOrdered,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { TreeNode } from "@/lib/learn-types";
import { cn } from "@/lib/utils";

function findNode(list: TreeNode[], id: string | null): TreeNode | null {
  if (!id) return null;
  for (const node of list) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

function wordCount(node: TreeNode): number {
  const guide = node.guide;
  if (!guide) return 0;
  const text = [
    guide.overview,
    guide.why,
    guide.watchOut,
    guide.fieldNote,
    ...(guide.keyPoints ?? []),
    ...(guide.workflow ?? []),
  ]
    .filter(Boolean)
    .join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

function readingMinutes(node: TreeNode): number {
  return Math.max(2, Math.ceil(wordCount(node) / 200));
}

function domainOf(href?: string): string | null {
  if (!href) return null;
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
      {children}
    </p>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#6aa0dc]/30 bg-[#0d2238]/60 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
      {children}
    </span>
  );
}

function ReadingTime({ node }: { node: TreeNode }) {
  if (!node.guide) return null;
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#6aa0dc]/25 bg-[#0d2238]/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
      <Clock3 className="h-3.5 w-3.5 text-accent" />
      {readingMinutes(node)} min read
    </span>
  );
}

function TreeItem({
  node,
  depth,
  expanded,
  selectedId,
  onToggle,
  onSelect,
}: {
  node: TreeNode;
  depth: number;
  expanded: Set<string>;
  selectedId: string | null;
  onToggle: (id: string) => void;
  onSelect: (node: TreeNode) => void;
}) {
  const isFolder = node.kind === "folder";
  const isOpen = expanded.has(node.id);
  const isSelected = selectedId === node.id;
  const count = isFolder ? node.children?.length ?? 0 : 0;

  return (
    <li className="select-none">
      <button
        type="button"
        aria-expanded={isFolder ? isOpen : undefined}
        aria-current={isSelected ? "true" : undefined}
        onClick={() => {
          if (isFolder) onToggle(node.id);
          onSelect(node);
        }}
        className={cn(
          "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/70",
          isSelected
            ? "bg-accent/15 text-accent-2"
            : "text-muted hover:bg-[#122b46]/60 hover:text-foreground",
        )}
        style={{ paddingLeft: `${depth * 14 + 8}px` }}
      >
        {isFolder ? (
          <ChevronRight
            className={cn(
              "h-3.5 w-3.5 shrink-0 text-accent transition-transform duration-200",
              isOpen && "rotate-90",
            )}
          />
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        <span
          className={cn(
            "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border",
            isFolder
              ? "border-accent/40 bg-accent/10 text-accent-2"
              : node.guide
                ? "border-accent/25 bg-accent/[0.07] text-accent-2"
                : "border-[#6aa0dc]/30 bg-[#0d2238]/60 text-muted",
          )}
        >
          {isFolder ? (
            isOpen ? (
              <FolderOpen className="h-3.5 w-3.5" />
            ) : (
              <Folder className="h-3.5 w-3.5" />
            )
          ) : node.guide ? (
            <BookOpen className="h-3.5 w-3.5" />
          ) : (
            <FileText className="h-3.5 w-3.5" />
          )}
        </span>
        <span className="min-w-0 flex-1 truncate">{node.label}</span>
        {count > 0 ? (
          <span className="shrink-0 font-mono text-[9px] text-muted/60">
            {count}
          </span>
        ) : null}
      </button>
      {isFolder && isOpen && node.children && node.children.length > 0 ? (
        <ul>
          {node.children.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function GroupView({
  node,
  onSelect,
}: {
  node: TreeNode;
  onSelect: (node: TreeNode) => void;
}) {
  const children = node.children ?? [];
  const guides = children.filter(
    (child) => child.kind !== "folder" && child.guide,
  );
  const links = children.filter(
    (child) => child.kind !== "folder" && !child.guide,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent-2">
          <FolderOpen className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <Eyebrow>Learn library</Eyebrow>
          <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {node.label}
          </h2>
          {node.description ? (
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {node.description}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#6aa0dc]/20 pt-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
          {guides.length} on-site {guides.length === 1 ? "guide" : "guides"}
        </p>
        <p className="text-xs text-muted">
          Read the notes here first. Follow the official source only when you
          want the full primary material.
        </p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {guides.map((child) => (
          <li key={child.id}>
            <button
              type="button"
              onClick={() => onSelect(child)}
              className="group flex h-full w-full flex-col items-start gap-3 rounded-xl border border-[#6aa0dc]/20 bg-[#0d2238]/40 p-4 text-left transition-colors hover:border-accent/45 hover:bg-[#122b46]/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/70"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/[0.07] text-accent-2">
                <BookOpen className="h-4 w-4" />
              </span>
              <div className="min-w-0 w-full">
                <span className="flex items-start justify-between gap-2">
                  <span className="text-sm font-medium text-foreground group-hover:text-accent-2">
                    {child.label}
                  </span>
                  <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted/50 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-2" />
                </span>
                {child.description ? (
                  <span className="mt-1 block text-xs leading-relaxed text-muted">
                    {child.description}
                  </span>
                ) : null}
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {child.tags?.slice(0, 3).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.1em] text-muted/70">
                    <Clock3 className="h-3 w-3" />
                    {readingMinutes(child)} min
                  </span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {links.length > 0 ? (
        <div>
          <Eyebrow>Related pages</Eyebrow>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {links.map((child) => {
              const body = (
                <>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#6aa0dc]/30 bg-[#0d2238]/60 text-muted">
                    <FileText className="h-4 w-4" />
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
                  <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted/50" />
                </>
              );
              const className =
                "group flex w-full items-center gap-3 rounded-xl border border-[#6aa0dc]/20 bg-[#0d2238]/40 p-3 text-left transition-colors hover:border-accent/40";
              return (
                <li key={child.id}>
                  {child.href ? (
                    child.href.startsWith("http") ? (
                      <a
                        href={child.href}
                        target="_blank"
                        rel="noreferrer"
                        className={className}
                      >
                        {body}
                      </a>
                    ) : (
                      <Link href={child.href} className={className}>
                        {body}
                      </Link>
                    )
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelect(child)}
                      className={className}
                    >
                      {body}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function GuideView({
  node,
  parent,
  onSelect,
}: {
  node: TreeNode;
  parent: TreeNode | null;
  onSelect: (node: TreeNode) => void;
}) {
  const guide = node.guide;
  const external = Boolean(node.href?.startsWith("http"));
  const domain = domainOf(node.href);
  const keyPoints = guide?.keyPoints ?? [];
  const workflow = guide?.workflow ?? [];

  return (
    <article className="max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => parent && onSelect(parent)}
          disabled={!parent}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#6aa0dc]/25 bg-[#0d2238]/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted transition hover:border-accent/45 hover:text-accent-2 disabled:cursor-default disabled:opacity-60"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          {node.groupLabel ?? "Learn library"}
        </button>
        <ReadingTime node={node} />
      </div>

      <div className="mt-5">
        <Eyebrow>{node.groupLabel ?? "Learn library"}</Eyebrow>
        <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {node.label}
        </h2>
        {node.description ? (
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {node.description}
          </p>
        ) : null}
        {node.tags && node.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {node.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        ) : null}
      </div>

      {guide ? (
        <>
          {guide.overview ? (
            <section className="mt-8">
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                The short version
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {guide.overview}
              </p>
            </section>
          ) : null}

          {guide.why ? (
            <section className="mt-6 rounded-2xl border border-accent/25 bg-accent/[0.06] p-5 sm:p-6">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  Why it matters in an investigation
                </h3>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {guide.why}
              </p>
            </section>
          ) : null}

          {keyPoints.length > 0 || workflow.length > 0 ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {keyPoints.length > 0 ? (
                <section className="rounded-2xl border border-[#6aa0dc]/20 bg-[#0d2238]/35 p-5">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                      Key ideas
                    </h3>
                  </div>
                  <ul className="mt-3 space-y-3">
                    {keyPoints.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <span className="text-sm leading-relaxed text-muted">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {workflow.length > 0 ? (
                <section className="rounded-2xl border border-[#6aa0dc]/20 bg-[#0d2238]/35 p-5">
                  <div className="flex items-center gap-2.5">
                    <ListOrdered className="h-5 w-5 text-accent" />
                    <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                      How to use it
                    </h3>
                  </div>
                  <ol className="mt-3 space-y-3">
                    {workflow.map((step, index) => (
                      <li key={step} className="flex gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-accent/10 font-mono text-[10px] text-accent-2">
                          {index + 1}
                        </span>
                        <span className="text-sm leading-relaxed text-muted">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}
            </div>
          ) : null}

          {guide.watchOut ? (
            <section className="mt-6 rounded-2xl border border-warning/35 bg-warning/[0.06] p-5">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  Watch out
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {guide.watchOut}
              </p>
            </section>
          ) : null}

          {guide.fieldNote ? (
            <section className="mt-4 rounded-2xl border border-[#6aa0dc]/25 bg-[#122b46]/45 p-5">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-accent" />
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  FORENSYRA field note
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {guide.fieldNote}
              </p>
            </section>
          ) : null}
        </>
      ) : null}

      <footer className="mt-8 border-t border-[#6aa0dc]/20 pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-foreground">
              {external ? "Want to go deeper?" : "Continue in the library"}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {external
                ? "The notes above cover the essentials. The official source is the authoritative reference and may go into far more technical detail."
                : "Open the related page to keep exploring this collection."}
            </p>
          </div>
          {external && node.href ? (
            <a
              href={node.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-accent-2"
            >
              Official source
              {domain ? (
                <span className="font-mono text-[10px] font-normal text-ink/70">
                  {domain}
                </span>
              ) : null}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : node.href ? (
            <Link
              href={node.href}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-accent-2"
            >
              Open page
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </footer>
    </article>
  );
}

export function LearnExplorer({ nodes }: { nodes: TreeNode[] }) {
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(nodes.map((node) => node.id)),
  );
  const [selectedId, setSelectedId] = useState<string | null>(
    nodes[0]?.id ?? null,
  );
  const panelRef = useRef<HTMLElement | null>(null);

  const selected = useMemo(() => findNode(nodes, selectedId), [nodes, selectedId]);
  const parent = useMemo(
    () => (selected?.groupId ? findNode(nodes, selected.groupId) : null),
    [nodes, selected],
  );

  function scrollToPanel() {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    panelRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }

  function selectNode(node: TreeNode) {
    setSelectedId(node.id);
    if (typeof window !== "undefined") {
      const nextHash = `#${node.id}`;
      if (window.location.hash !== nextHash) {
        window.history.replaceState(null, "", nextHash);
      }
    }
    if (node.kind !== "folder") scrollToPanel();
  }

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  useEffect(() => {
    let frame = 0;
    let introListener: (() => void) | null = null;

    function scrollToPanelFromHash() {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      frame = requestAnimationFrame(() => {
        panelRef.current?.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "start",
        });
      });
    }

    function selectFromHash() {
      const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!hash) return;
      const node = findNode(nodes, hash);
      if (!node) return;
      setSelectedId(node.id);
      setExpanded((prev) => {
        const next = new Set(prev);
        if (node.groupId) next.add(node.groupId);
        return next;
      });

      if (introListener) {
        window.removeEventListener("fx:intro-done", introListener);
        introListener = null;
      }
      if (document.documentElement.classList.contains("intro-active")) {
        introListener = () => {
          if (introListener) {
            window.removeEventListener("fx:intro-done", introListener);
            introListener = null;
          }
          scrollToPanelFromHash();
        };
        window.addEventListener("fx:intro-done", introListener);
      } else {
        scrollToPanelFromHash();
      }
    }

    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);
    return () => {
      window.removeEventListener("hashchange", selectFromHash);
      if (introListener) {
        window.removeEventListener("fx:intro-done", introListener);
      }
      if (frame) cancelAnimationFrame(frame);
    };
  }, [nodes]);

  return (
    <div className="relative rounded-3xl border border-[#6aa0dc]/25 bg-[#122b46]/30 p-3 sm:p-4 lg:p-6">
      <div className="grid gap-4 lg:grid-cols-[380px_1fr] lg:gap-8">
        <aside className="min-w-0 max-h-[46vh] overflow-auto rounded-2xl border border-[#6aa0dc]/20 bg-[#0d2238]/40 p-3 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-auto">
          <div className="px-2 pb-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
              Learn library
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted">
              On-site notes first. Official sources second.
            </p>
          </div>
          <ul className="space-y-0.5">
            {nodes.map((node) => (
              <TreeItem
                key={node.id}
                node={node}
                depth={0}
                expanded={expanded}
                selectedId={selectedId}
                onToggle={toggle}
                onSelect={selectNode}
              />
            ))}
          </ul>
        </aside>

        <section
          ref={panelRef}
          id="learn-panel"
          className="min-h-[60vh] min-w-0 scroll-mt-24 rounded-2xl bg-[#0d2238]/40 p-5 sm:p-7 lg:p-8"
        >
          {selected ? (
            selected.kind === "folder" ? (
              <GroupView node={selected} onSelect={selectNode} />
            ) : (
              <GuideView node={selected} parent={parent} onSelect={selectNode} />
            )
          ) : (
            <div className="flex h-full items-center justify-center text-muted">
              Select an item from the tree.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}