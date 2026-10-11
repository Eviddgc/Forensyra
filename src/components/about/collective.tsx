import { BrandPlate } from "@/components/brand-visual";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/**
 * Section 4 — "Our collective" editorial split on dark navy.
 * Motto is highlighted on the left; a framed brand plate with a mono caption
 * sits on the right.
 */
export function Collective({
  name,
  descriptor,
  motto,
}: {
  name: string;
  descriptor: string;
  motto: string;
}) {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="fx-eyebrow text-accent">Our Collective</p>
            <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              What we are
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
              {name} is a {descriptor} for students and early-career
              professionals. We share knowledge, build projects together, and
              grow into a strong team in digital forensics, incident response,
              and evidence-led investigation.
            </p>

            <blockquote className="mt-8 border-l-2 border-accent pl-5">
              <p className="font-display text-xl italic leading-snug text-muted sm:text-2xl">
                Our motto is simple:{" "}
                <span className="font-medium text-accent-2">{motto}</span>
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={120}>
            <figure className="fx-frame group relative overflow-hidden rounded-3xl border border-border-gold bg-background">
              <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[4/5]">
                <BrandPlate className="transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-accent-2">
                Digital Evidence / Responsible Investigation
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
