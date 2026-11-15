import Link from "next/link";
import { ArrowRight, CalendarDays, FolderOpen } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/**
 * Homepage notice for the start of Case File 001 solving. Sits between the
 * hero and the featured projects; remove it once the case is underway.
 */
export function CaseStartNotice() {
  return (
    <Container variant="wide" className="pb-2 pt-6 sm:pt-10">
      <Reveal>
        <section
          aria-label="Case File 001 start date announcement"
          className="fx-glass relative overflow-hidden rounded-[28px] px-6 py-8 sm:px-10 sm:py-10"
        >
          {/* gold hairline frame */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 rounded-[22px] border border-accent/15"
          />
          {/* faint case-file watermark */}
          <p
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 bottom-0 select-none font-mono text-[11rem] font-bold leading-none text-accent/[0.05] sm:text-[16rem]"
          >
            001
          </p>

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <p className="fx-eyebrow flex items-center gap-4 text-accent">
                <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
                Notice — First Investigation
              </p>

              <h2 className="font-display mt-6 text-[clamp(1.9rem,4.5vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.01em] text-foreground">
                Case File 001 opens{" "}
                <span className="text-accent">5 January 2027</span>.
              </h2>

              <p className="mt-5 max-w-xl text-[14.5px] leading-[1.8] text-muted sm:text-[15.5px]">
                The founding team takes on its first case: a data leakage
                investigation built on real forensic evidence — a Windows 7
                workstation, two USB drives and one CD. Thirteen roles. One
                team. One report.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.22em] text-accent/80">
                <span className="inline-flex items-center gap-2">
                  <FolderOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  NIST CFReDS · Data Leakage
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  Solving begins 05 · 01 · 2027
                </span>
              </div>

              <div className="mt-8">
                <Link
                  href="/projects/case-file-001"
                  className="fx-gold-btn inline-flex items-center justify-center gap-3 rounded-xl px-6 py-3.5 text-[14px] font-semibold transition hover:brightness-110"
                >
                  Read the case briefing
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Exhibit-style date tag */}
            <div className="relative mx-auto w-full max-w-[15rem] lg:max-w-none">
              <div className="rounded-2xl border border-accent/30 bg-background/40 px-6 py-7 text-center shadow-[0_0_40px_rgba(230,182,79,0.08)]">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-accent">
                  Case opens
                </p>
                <p className="font-display mt-3 text-[4.6rem] font-medium leading-none text-accent-2">
                  05
                </p>
                <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.34em] text-foreground">
                  Jan 2027
                </p>
                <div
                  aria-hidden="true"
                  className="mx-auto mt-5 h-px w-16 bg-accent/40"
                />
                <p className="mt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.22em] text-muted">
                  Exhibit A — Data Leakage
                  <br />
                  Windows 7 · 2× USB · 1× CD
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </Container>
  );
}
