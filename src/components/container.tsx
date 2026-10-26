import { cn } from "@/lib/utils";

export type ContainerVariant =
  | "default"       // max-w-6xl (1152px) - legacy, used by some pages
  | "wide"          // max-w-[90rem] (1440px) - most pages
  | "dense"         // max-w-[96rem] (1536px) - resources/datasets/tools
  | "reading"       // max-w-[75rem] (1200px) with prose cap ~70ch
  | "form"          // max-w-[72rem] (1152px) - forms
  | "hero"          // full-width hero shell, content capped
  | "narrow";       // max-w-[45rem] (720px) - role matcher

const variantClasses: Record<ContainerVariant, string> = {
  default: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
  wide: "mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8",
  dense: "mx-auto w-full max-w-[96rem] px-4 sm:px-6 lg:px-8",
  reading: "mx-auto w-full max-w-[75rem] px-4 sm:px-6 lg:px-8",
  form: "mx-auto w-full max-w-[72rem] px-4 sm:px-6 lg:px-8",
  hero: "mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8",
  narrow: "mx-auto w-full max-w-[45rem] px-4 sm:px-6 lg:px-8",
};

export function Container({
  className,
  children,
  variant = "default",
}: {
  className?: string;
  children: React.ReactNode;
  variant?: ContainerVariant;
}) {
  return (
    <div className={cn(variantClasses[variant], className)}>
      {children}
    </div>
  );
}
