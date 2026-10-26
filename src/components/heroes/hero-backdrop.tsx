import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { HeroArt, type HeroVariant } from "@/components/heroes/hero-art";

type Theme = {
  wash: string;
  glow: string;
  pattern: string;
  patternSize: string;
  patternOpacity: number;
  label: string;
  artWidth: string;
};

const THEMES: Record<HeroVariant, Theme> = {
  about: {
    wash: "linear-gradient(118deg, #080D15 0%, #0b2036 46%, #102b46 100%)",
    glow: "radial-gradient(48% 62% at 86% 38%, rgba(212,175,95,0.2), transparent 72%), radial-gradient(54% 58% at 6% 12%, rgba(214,176,104,0.12), transparent 70%)",
    pattern: "radial-gradient(rgba(245,213,138,0.18) 1px, transparent 1.4px)",
    patternSize: "30px 30px",
    patternOpacity: 0.28,
    label: "The collective",
    artWidth: "md:w-[41rem] lg:w-[44rem]",
  },
  roles: {
    wash: "linear-gradient(122deg, #080D15 0%, #0a2138 44%, #11304a 100%)",
    glow: "radial-gradient(50% 60% at 88% 26%, rgba(214,176,104,0.16), transparent 70%), radial-gradient(46% 56% at 4% 80%, rgba(212,175,95,0.12), transparent 72%)",
    pattern: "linear-gradient(60deg, rgba(212,175,95,0.09) 1px, transparent 1px), linear-gradient(-60deg, rgba(212,175,95,0.07) 1px, transparent 1px)",
    patternSize: "34px 60px",
    patternOpacity: 0.55,
    label: "Thirteen roles",
    artWidth: "md:w-[42rem] lg:w-[45rem]",
  },
  projects: {
    wash: "linear-gradient(120deg, #080D15 0%, #0e1219 48%, #0f304d 100%)",
    glow: "radial-gradient(52% 62% at 84% 28%, rgba(212,175,95,0.22), transparent 72%), radial-gradient(48% 54% at 4% 90%, rgba(214,176,104,0.1), transparent 70%)",
    pattern: "linear-gradient(rgba(212,175,95,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,95,0.1) 1px, transparent 1px)",
    patternSize: "44px 44px",
    patternOpacity: 0.45,
    label: "Case board",
    artWidth: "md:w-[44rem] lg:w-[47rem]",
  },
  writeups: {
    wash: "linear-gradient(116deg, #080D15 0%, #0c233b 44%, #181c25 100%)",
    glow: "radial-gradient(50% 60% at 82% 34%, rgba(214,176,104,0.13), transparent 70%), radial-gradient(52% 62% at 8% 78%, rgba(212,175,95,0.12), transparent 72%)",
    pattern: "repeating-linear-gradient(to bottom, rgba(245,244,240,0.06) 0 1px, transparent 1px 28px)",
    patternSize: "auto",
    patternOpacity: 0.5,
    label: "Lab notes",
    artWidth: "md:w-[43rem] lg:w-[46rem]",
  },
  resources: {
    wash: "linear-gradient(124deg, #080D15 0%, #0b223a 46%, #12324c 100%)",
    glow: "radial-gradient(54% 64% at 82% 48%, rgba(214,176,104,0.14), transparent 70%), radial-gradient(48% 58% at 6% 20%, rgba(212,175,95,0.14), transparent 72%)",
    pattern: "repeating-linear-gradient(to right, rgba(214,176,104,0.07) 0 1px, transparent 1px 52px)",
    patternSize: "auto",
    patternOpacity: 0.55,
    label: "The library",
    artWidth: "md:w-[42rem] lg:w-[45rem]",
  },
  roadmap: {
    wash: "linear-gradient(180deg, #080D15 0%, #0a2036 46%, #18354d 100%)",
    glow: "radial-gradient(52% 58% at 76% 26%, rgba(214,176,104,0.24), transparent 72%), radial-gradient(44% 52% at 8% 86%, rgba(212,175,95,0.12), transparent 70%)",
    pattern: "repeating-radial-gradient(ellipse at 72% 54%, transparent 0 42px, rgba(212,175,95,0.07) 43px 44px)",
    patternSize: "auto",
    patternOpacity: 0.5,
    label: "The route",
    artWidth: "md:w-[45rem] lg:w-[48rem]",
  },
  team: {
    wash: "linear-gradient(118deg, #080D15 0%, #0b223b 48%, #151922 100%)",
    glow: "radial-gradient(50% 60% at 84% 46%, rgba(212,175,95,0.18), transparent 72%), radial-gradient(46% 54% at 4% 12%, rgba(214,176,104,0.12), transparent 70%)",
    pattern: "radial-gradient(rgba(212,175,95,0.18) 1px, transparent 1.4px)",
    patternSize: "34px 34px",
    patternOpacity: 0.4,
    label: "The roster",
    artWidth: "md:w-[45rem] lg:w-[48rem]",
  },
  join: {
    wash: "linear-gradient(122deg, #080D15 0%, #0d2337 46%, #1b3042 100%)",
    glow: "radial-gradient(56% 66% at 78% 34%, rgba(214,176,104,0.2), transparent 70%), radial-gradient(46% 58% at 4% 82%, rgba(212,175,95,0.14), transparent 72%)",
    pattern: "repeating-linear-gradient(90deg, rgba(214,176,104,0.06) 0 1px, transparent 1px 46px)",
    patternSize: "auto",
    patternOpacity: 0.6,
    label: "The open door",
    artWidth: "md:w-[40rem] lg:w-[43rem]",
  },
  ethics: {
    wash: "linear-gradient(120deg, #080D15 0%, #0f131b 44%, #1e3243 100%)",
    glow: "radial-gradient(54% 64% at 80% 36%, rgba(214,176,104,0.2), transparent 70%), radial-gradient(46% 56% at 4% 16%, rgba(245,244,240,0.08), transparent 72%)",
    pattern: "repeating-linear-gradient(to right, rgba(214,176,104,0.08) 0 1px, transparent 1px 64px)",
    patternSize: "auto",
    patternOpacity: 0.55,
    label: "Our standard",
    artWidth: "md:w-[43rem] lg:w-[46rem]",
  },
  contact: {
    wash: "linear-gradient(118deg, #080D15 0%, #0d1118 48%, #0d3150 100%)",
    glow: "radial-gradient(56% 64% at 86% 42%, rgba(212,175,95,0.22), transparent 72%), radial-gradient(48% 56% at 6% 82%, rgba(214,176,104,0.1), transparent 70%)",
    pattern: "repeating-radial-gradient(circle at 64% 50%, transparent 0 60px, rgba(212,175,95,0.08) 61px 62px)",
    patternSize: "auto",
    patternOpacity: 0.45,
    label: "The signal",
    artWidth: "md:w-[42rem] lg:w-[45rem]",
  },
  security: {
    wash: "linear-gradient(124deg, #080D15 0%, #0b1017 46%, #0b2c48 100%)",
    glow: "radial-gradient(50% 62% at 82% 32%, rgba(214,176,104,0.16), transparent 70%), radial-gradient(52% 60% at 6% 84%, rgba(212,175,95,0.16), transparent 72%)",
    pattern: "linear-gradient(rgba(212,175,95,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,95,0.09) 1px, transparent 1px)",
    patternSize: "38px 38px",
    patternOpacity: 0.4,
    label: "Responsible disclosure",
    artWidth: "md:w-[42rem] lg:w-[45rem]",
  },
  playground: {
    wash: "linear-gradient(120deg, #080D15 0%, #0b1017 44%, #0d2c46 100%)",
    glow: "radial-gradient(54% 64% at 82% 32%, rgba(212,175,95,0.22), transparent 72%), radial-gradient(44% 54% at 6% 18%, rgba(214,176,104,0.08), transparent 70%)",
    pattern: "radial-gradient(rgba(212,175,95,0.2) 1px, transparent 1.4px)",
    patternSize: "26px 26px",
    patternOpacity: 0.45,
    label: "The shell",
    artWidth: "md:w-[44rem] lg:w-[47rem]",
  },
  apply: {
    wash: "linear-gradient(122deg, #080D15 0%, #0f131b 46%, #1b3248 100%)",
    glow: "radial-gradient(54% 64% at 80% 36%, rgba(214,176,104,0.18), transparent 70%), radial-gradient(48% 56% at 6% 84%, rgba(212,175,95,0.14), transparent 72%)",
    pattern: "radial-gradient(rgba(214,176,104,0.16) 1px, transparent 1.4px)",
    patternSize: "32px 32px",
    patternOpacity: 0.32,
    label: "Application",
    artWidth: "md:w-[44rem] lg:w-[47rem]",
  },
  mentor: {
    wash: "linear-gradient(118deg, #080D15 0%, #0e1219 46%, #13304a 100%)",
    glow: "radial-gradient(52% 62% at 82% 34%, rgba(212,175,95,0.18), transparent 72%), radial-gradient(46% 56% at 6% 16%, rgba(214,176,104,0.12), transparent 70%)",
    pattern: "radial-gradient(rgba(245,213,138,0.18) 1px, transparent 1.4px)",
    patternSize: "36px 36px",
    patternOpacity: 0.28,
    label: "Mentoring",
    artWidth: "md:w-[42rem] lg:w-[45rem]",
  },
  matcher: {
    wash: "linear-gradient(122deg, #080D15 0%, #0e1219 46%, #151922 100%)",
    glow: "radial-gradient(52% 62% at 84% 38%, rgba(212,175,95,0.18), transparent 72%), radial-gradient(46% 56% at 4% 14%, rgba(214,176,104,0.1), transparent 70%)",
    pattern: "repeating-linear-gradient(45deg, rgba(212,175,95,0.08) 0 1px, transparent 1px 30px)",
    patternSize: "auto",
    patternOpacity: 0.4,
    label: "Role matcher",
    artWidth: "md:w-[44rem] lg:w-[47rem]",
  },
  search: {
    wash: "linear-gradient(120deg, #080D15 0%, #0a2139 46%, #102e47 100%)",
    glow: "radial-gradient(52% 62% at 84% 38%, rgba(212,175,95,0.18), transparent 72%), radial-gradient(46% 56% at 4% 84%, rgba(214,176,104,0.1), transparent 70%)",
    pattern: "repeating-linear-gradient(to bottom, rgba(245,244,240,0.055) 0 1px, transparent 1px 32px)",
    patternSize: "auto",
    patternOpacity: 0.45,
    label: "The archive",
    artWidth: "md:w-[41rem] lg:w-[44rem]",
  },
  datasets: {
    wash: "linear-gradient(122deg, #080D15 0%, #0d1118 46%, #113653 100%)",
    glow: "radial-gradient(54% 64% at 82% 40%, rgba(212,175,95,0.22), transparent 72%), radial-gradient(46% 56% at 4% 86%, rgba(214,176,104,0.1), transparent 70%)",
    pattern: "repeating-radial-gradient(circle at 64% 50%, transparent 0 50px, rgba(212,175,95,0.06) 51px 52px)",
    patternSize: "auto",
    patternOpacity: 0.45,
    label: "Practice data",
    artWidth: "md:w-[43rem] lg:w-[46rem]",
  },
  tools: {
    wash: "linear-gradient(120deg, #080D15 0%, #0a223a 46%, #17334c 100%)",
    glow: "radial-gradient(52% 62% at 84% 34%, rgba(214,176,104,0.14), transparent 72%), radial-gradient(50% 58% at 6% 82%, rgba(212,175,95,0.14), transparent 72%)",
    pattern: "radial-gradient(rgba(212,175,95,0.2) 1px, transparent 1.4px)",
    patternSize: "24px 24px",
    patternOpacity: 0.4,
    label: "The toolkit",
    artWidth: "md:w-[44rem] lg:w-[47rem]",
  },
  case: {
    wash: "linear-gradient(120deg, #080D15 0%, #0e1219 46%, #151922 100%)",
    glow: "radial-gradient(54% 64% at 82% 36%, rgba(214,176,104,0.15), transparent 72%), radial-gradient(48% 58% at 6% 84%, rgba(212,175,95,0.14), transparent 72%)",
    pattern: "linear-gradient(rgba(212,175,95,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,95,0.08) 1px, transparent 1px)",
    patternSize: "44px 44px",
    patternOpacity: 0.38,
    label: "Case file",
    artWidth: "md:w-[43rem] lg:w-[46rem]",
  },
  research: {
    wash: "linear-gradient(118deg, #080D15 0%, #0e1219 46%, #181c25 100%)",
    glow: "radial-gradient(52% 62% at 82% 36%, rgba(214,176,104,0.13), transparent 72%), radial-gradient(48% 58% at 6% 84%, rgba(212,175,95,0.13), transparent 72%)",
    pattern: "repeating-linear-gradient(to bottom, rgba(245,244,240,0.06) 0 1px, transparent 1px 30px)",
    patternSize: "auto",
    patternOpacity: 0.45,
    label: "Research note",
    artWidth: "md:w-[42rem] lg:w-[45rem]",
  },
};

export function HeroBackdrop({ variant }: { variant: HeroVariant }) {
  const theme = THEMES[variant];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: theme.wash }} />
      <div className="absolute inset-0" style={{ background: theme.glow }} />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: theme.pattern,
          backgroundSize: theme.patternSize,
          opacity: theme.patternOpacity,
        }}
      />

      <div className="absolute inset-y-0 right-0 flex w-full items-center justify-end">
        <div
          className={cn(
            "relative w-[26rem] shrink-0 translate-x-[10%] opacity-50 sm:w-[32rem] sm:translate-x-[6%] sm:opacity-60 md:max-w-[38rem] md:-translate-y-6 md:translate-x-[10%] md:opacity-50 lg:max-w-[36rem] lg:translate-x-0 lg:opacity-65 xl:max-w-none xl:opacity-100",
            theme.artWidth,
          )}
          style={{
            filter:
              "brightness(1.32) saturate(1.08) drop-shadow(0 0 22px rgba(214,176,104,0.1))",
          }}
        >
          <HeroArt variant={variant} />
        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,#080D15_0%,rgba(8,13,21,0.97)_20%,rgba(8,13,21,0.86)_40%,rgba(8,13,21,0.55)_56%,rgba(8,13,21,0.18)_70%,rgba(8,13,21,0.04)_84%,rgba(8,13,21,0)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,#080D15_0%,rgba(8,13,21,0.4)_20%,transparent_52%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,13,21,0.48)_0%,transparent_30%)]" />

      <div className="fx-scanlines absolute inset-0 opacity-[0.1]" />
      <div className="fx-noise absolute inset-0 opacity-[0.025]" />

      <div className="absolute right-8 top-8 hidden items-center gap-3 xl:flex">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent/70">
          {theme.label}
        </span>
        <span className="h-px w-10 bg-gradient-to-r from-accent/50 to-transparent" />
      </div>
    </div>
  );
}

export function HeroSection({
  variant,
  children,
  className,
  id,
}: {
  variant: HeroVariant;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative isolate", className)}
    >
      {children}
    </section>
  );
}
