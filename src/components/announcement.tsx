import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";

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
    <div className="border-b border-accent/20 bg-accent/10">
      <Container className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2 text-center text-xs text-accent sm:text-sm">
        <span className="font-mono uppercase tracking-[0.2em] text-accent/80">
          Notice
        </span>
        <span className="text-ink/90">{text}</span>
        <Link
          href={link}
          className="inline-flex items-center gap-1 font-semibold text-ink underline underline-offset-2 hover:text-accent-deep"
        >
          {linkLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Container>
    </div>
  );
}
