import { cn } from "@/lib/utils";

/** Renders pre-rendered markdown HTML with the Forensyra prose styles. */
export function Markdown({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={cn("prose-forensyra", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
