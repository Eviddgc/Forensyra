import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { btnPrimary, btnSecondary } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "This trace does not exist — the page may have been moved, renamed, or never preserved.",
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        Evidence not found
      </p>
      <h1 className="mt-4 font-mono text-6xl font-semibold text-foreground">
        404
      </h1>
      <p className="mt-4 max-w-md text-muted">
        This trace does not exist — the file may have been moved, renamed, or
        never preserved. Let us return you to the case board.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={btnPrimary}>
          Back to home
        </Link>
        <Link href="/projects" className={btnSecondary}>
          View projects
        </Link>
      </div>
    </Container>
  );
}
