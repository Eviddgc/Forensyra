import {
  ArrowRight,
  BookOpen,
  FolderGit2,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/** Section 5 — why the collective exists (light editorial band). */
const CARDS: Array<{
  title: string;
  text: string;
  Icon: LucideIcon;
}> = [
  {
    title: "Learn together",
    text: "Learn from each other and from mentors.",
    Icon: BookOpen,
  },
  {
    title: "Practice responsibly",
    text: "Practice on legal, authorised mock cases and suitable sample datasets.",
    Icon: ShieldCheck,
  },
  {
    title: "Build real work",
    text: "Create documented, public-facing work as a team.",
    Icon: FolderGit2,
  },
  {
    title: "Grow together",
    text: "Develop stronger portfolios, internship opportunities, and professional connections.",
    Icon: TrendingUp,
  },
];

export function Purpose() {
  return (
    <section className="bg-light py-20 text-light-ink sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="fx-eyebrow text-accent-ink">Our Purpose</p>
            <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Why we exist
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-light-muted">
              Digital forensics is growing quickly, but many learners study it
              alone — mostly theory, with no real case practice. We bring people
              together so they can:
            </p>
            <Link
              href="/ethics"
              className="group mt-5 -mb-1 inline-flex items-center gap-2 py-1 text-sm font-medium text-accent-ink transition hover:text-light-ink"
            >
              Learn more about our mission
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          <div>
            <div className="grid gap-5 sm:grid-cols-2">
              {CARDS.map((card, index) => (
                <Reveal key={card.title} delay={index * 70}>
                  <div className="fx-card-light h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-accent/40">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#8a6f35]/10 text-[#8a6f35]">
                      <card.Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-light-ink">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-light-muted">
                      {card.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={140}>
              <p className="mt-8 border-t border-light-border pt-8 text-[15px] leading-relaxed text-light-muted lg:mt-10">
                For every member, the result is a stronger portfolio, better
                internship and job chances, and a place on a team that stands
                out.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

