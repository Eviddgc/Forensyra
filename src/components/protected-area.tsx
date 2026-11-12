"use client";

import type { ReactNode } from "react";

/**
 * Deters casual copying inside a section: no right-click menu, no drag, no
 * text selection, no copy/cut. It cannot stop screenshots or a determined
 * visitor; browsers do not allow that.
 */
export function ProtectedArea({ children }: { children: ReactNode }) {
  const block = (event: { preventDefault: () => void }) => event.preventDefault();
  return (
    <div
      onContextMenu={block}
      onDragStart={block}
      onCopy={block}
      onCut={block}
      className="select-none [-webkit-touch-callout:none] [-webkit-user-drag:none]"
    >
      {children}
    </div>
  );
}
