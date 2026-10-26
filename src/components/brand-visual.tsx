import Image from "next/image";
import { cn } from "@/lib/utils";

const ALIGN = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
} as const;

const EMBLEM_DEFAULT = "h-[min(80vw,20rem)] opacity-[0.06]";

/**
 * Full-bleed decorative backdrop for sections that would otherwise use stock
 * photography: navy depth, the gold velvet lattice, aurora orbs and the
 * FORENSYRA emblem as a quiet watermark. Purely ornamental — it always sits
 * beneath the content and is hidden from assistive tech.
 */
export function BrandBackdrop({
  align = "center",
  emblemClassName = EMBLEM_DEFAULT,
  className,
}: {
  align?: keyof typeof ALIGN;
  /** Replaces the watermark's default size and opacity. */
  emblemClassName?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div className="bg-damask absolute inset-0 opacity-70" />
      <div className="fx-orb -left-[12%] top-[6%] h-[30rem] w-[30rem] bg-accent/15" />
      <div className="fx-orb -right-[10%] bottom-[-16%] h-[26rem] w-[26rem] bg-accent-2/20" />
      <div className={cn("absolute inset-0 flex items-center", ALIGN[align])}>
        <Image
          src="/brand-mark.png"
          alt=""
          width={768}
          height={768}
          sizes="(max-width: 1024px) 80vw, 32rem"
          className={cn("w-auto", emblemClassName)}
        />
      </div>
      <div className="fx-scanlines absolute inset-0 opacity-[0.2]" />
    </div>
  );
}

/**
 * Brand plate — a self-contained panel that stands in for a stock photo inside
 * cards and figures. Built from the emblem, the gold lattice and soft rings so
 * it reads as deliberate brand artwork rather than a placeholder.
 */
export function BrandPlate({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden bg-[radial-gradient(130%_120%_at_18%_0%,#151922_0%,#10141c_48%,#080D15_100%)]",
        className,
      )}
    >
      <div className="bg-damask absolute inset-0 opacity-80" />
      <div className="fx-orb -left-[20%] top-[-12%] h-[18rem] w-[18rem] bg-accent/20" />
      <div className="fx-orb bottom-[-25%] right-[-15%] h-[16rem] w-[16rem] bg-accent-2/20" />

      <div className="absolute inset-0">
        <span className="absolute left-1/2 top-1/2 aspect-square w-[min(64%,13rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15" />
        <span className="absolute left-1/2 top-1/2 aspect-square w-[min(74%,15rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/10" />
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <Image
          src="/brand-mark.png"
          alt=""
          width={768}
          height={768}
          sizes="(max-width: 1024px) 60vw, 22rem"
          className="h-auto w-[42%] max-w-[11rem] opacity-90 drop-shadow-[0_0_50px_rgba(214,176,104,0.35)]"
        />
      </div>

      <div className="fx-scanlines absolute inset-0 opacity-[0.2]" />
    </div>
  );
}
