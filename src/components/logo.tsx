import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  size = 40,
  className,
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt="FORENSYRA emblem"
      width={size}
      height={size}
      priority={priority}
      className={cn("rounded-full ring-1 ring-border", className)}
    />
  );
}
