
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/** Section 6 — why join the collective. */
const CARDS = [
  {
    title: "Hands-on Experience",
    text: "Work on realistic investigations and build your portfolio.",

  },
  {
    title: "Learn from Peers",
    text: "Collaborate with talented and motivated members.",

  },
  {
    title: "Structured Growth",
    text: "Move from beginner to contributor.",

  },
  {
    title: "Be Part of Something",
    text: "Join a community that thrives on curiosity.",

  },
];

export function Benefits() {
  return (
    <section className="py-20 text-foreground sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="fx-eyebrow text-accent-ink">Why Join</p>
            <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              What&apos;s next
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-light-muted">
              Together, we build skills, solve realistic cases, and grow into
              professionals.
            </p>
          </Reveal>

          <div className="divide-y divide-border-gold">
            {CARDS.map((card, index) => (
              <Reveal key={card.title} delay={index * 70}>
                <div className="py-4 flex items-start gap-4">
                  <span className="font-mono text-sm uppercase text-accent">{`0${index + 1}`}</span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{card.title}</h3>
                    <p className="mt-1 text-sm text-muted">{card.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
