/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Human-readable date, e.g. "Oct 10, 2026". */
export function formatDate(date?: string): string {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function phaseLabel(phase?: number | string): string {
  if (phase === undefined || phase === null || phase === "") return "Open";
  const value = String(phase);
  if (value.toLowerCase().startsWith("phase")) return value;
  return `Phase ${value}`;
}
