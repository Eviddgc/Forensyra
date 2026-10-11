import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  size = 40,
  className,
  preload = false,
}: {
  size?: number;
  className?: string;
  preload?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt="FORENSYRA emblem"
      width={size}
      height={size}
      preload={preload}
      className={cn("rounded-full ring-1 ring-border-gold", className)}
    />
  );
}
