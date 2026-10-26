"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BrandPlate } from "@/components/brand-visual";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/** Section 4 — featured projects (light editorial band). */
export interface FeaturedProject {
  slug: string;
  href: string;
  title: string;
  description?: string;
  status?: string;
  caseType?: string;
}

const FALLBACK: FeaturedProject = {
  slug: "case-file-001",
  href: "/projects/case-file-001",
  title: "The Data Leakage Investigation",
  description:
    "A complete insider-threat investigation built on public evidence from NIST CFReDS — every role has a defined job, findings land in one final report.",
  status: "Planning",
  caseType: "Case File 001",
};

export function FeaturedProjects({
  projects,
}: {
  projects: FeaturedProject[];
}) {
  const [index, setIndex] = useState(0);
  const items = projects.length > 0 ? projects : [FALLBACK];
  const active = items[Math.min(index, items.length - 1)];

  return (
    <section className="bg-light pb-20 pt-10 text-light-ink sm:pb-28 sm:pt-14">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="fx-eyebrow text-accent-ink">Case Files</p>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Projects in the field
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-light-muted">
              Our flagship work, one-off and ongoing — built by students, for
              real-world impact. Dive into our latest investigations and open
              case files.
            </p>
            <Link
              href="/projects"
              className="group mt-6 -mb-1 inline-flex items-center gap-2 py-1 text-sm font-semibold text-light-ink transition hover:text-accent-deep"
            >
              View All Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <Link
              href={active.href}
              className="fx-media group relative block overflow-hidden rounded-[26px] border border-light-border shadow-[0_50px_90px_-55px_rgba(16,39,65,0.75)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[5/4]">
                <BrandPlate className="transition-transform duration-700 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071827] via-[#071827]/70 to-[#071827]/20" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-2 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {active.status ?? "Active"}
                  </span>
                </div>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                  {active.caseType ?? "Case File"}
                </p>
                <h3 className="font-display mt-2 max-w-md text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  {active.title}
                </h3>
                {active.description ? (
                  <p className="mt-3 line-clamp-3 max-w-md pr-16 text-sm leading-relaxed text-muted">
                    {active.description}
                  </p>
                ) : null}
                <span
                  aria-hidden="true"
                  className="fx-arrow-btn absolute bottom-6 right-6 h-12 w-12"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </Link>

            {items.length > 1 ? (
              <div className="mt-5 flex items-center justify-center gap-2">
                {items.map((item, i) => (
                  <button
                    key={`${item.slug}-${i}`}
                    type="button"
                    aria-label={`Show project ${i + 1}: ${item.title}`}
                    aria-current={i === index}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === index
                        ? "w-7 bg-accent-deep"
                        : "w-2 bg-light-ink/25 hover:bg-light-ink/50",
                    )}
                  />
                ))}
              </div>
            ) : null}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

