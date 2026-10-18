import { Briefcase, Star, TrendingUp, Users } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/** Section 6 — why join the collective. */
const CARDS = [
  {
    title: "Hands-on Experience",
    text: "Work on real investigations and build your portfolio.",
    Icon: Briefcase,
  },
  {
    title: "Learn from Peers",
    text: "Collaborate with talented and motivated members.",
    Icon: Users,
  },
  {
    title: "Structured Growth",
    text: "Move from beginner to contributor.",
    Icon: TrendingUp,
  },
  {
    title: "Be Part of Something",
    text: "Join a community that thrives on curiosity.",
    Icon: Star,
  },
];

export function Benefits() {
  return (
    <section className="bg-light py-20 text-light-ink sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="fx-eyebrow text-accent-ink">Why Join</p>
            <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              What&apos;s next
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-light-muted">
              Together, we build skills, solve real cases, and grow into
              professionals.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {CARDS.map((card, index) => (
              <Reveal key={card.title} delay={index * 70}>
                <div className="fx-card-light h-full rounded-2xl p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#1d4f8a]/10 text-[#1d4f8a]">
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
        </div>
      </Container>
    </section>
  );
}
