import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";

/** Thin announcement bar — Section 1 of the homepage shell. */
export function Announcement({
  enabled,
  text,
  link,
  linkLabel,
}: {
  enabled: boolean;
  text: string;
  link: string;
  linkLabel: string;
}) {
  if (!enabled) return null;

  return (
    <div className="relative z-50 border-b border-border-gold bg-surface">
      <Container className="flex items-center justify-center gap-x-2 gap-y-1 py-2 text-center text-[11px] sm:justify-between sm:text-xs">
        <p className="flex items-center gap-2">
          <span className="font-mono uppercase tracking-[0.24em] text-accent">
            Notice
          </span>
          <span aria-hidden="true" className="text-border">
            —
          </span>
          <span className="text-foreground/85">{text}</span>
        </p>
        <Link
          href={link}
          className="group hidden shrink-0 items-center gap-1 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent transition hover:text-accent-2 sm:inline-flex"
        >
          {linkLabel}
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Container>
    </div>
  );
}
