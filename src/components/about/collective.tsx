import Image from "next/image";
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
    <section className="py-10 sm:py-14">
      <Container>
        <div className="fx-glass-strong grid gap-10 rounded-[28px] p-7 sm:p-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch lg:gap-0 lg:p-12">
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

            <blockquote className="mt-8 border-t border-accent/20 pt-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
                Our motto is simple
              </p>
              <p className="font-display mt-3 text-2xl leading-snug text-foreground sm:text-[1.7rem]">
                {motto.split(". ")[0]}.{" "}
                <span className="text-accent">{motto.split(". ").slice(1).join(". ")}</span>
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={120} className="lg:border-l lg:border-accent/20 lg:pl-10">
            <figure className="flex h-full flex-col items-center justify-center gap-5 py-4">
              <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-accent/20 sm:h-64 sm:w-64">
                <div aria-hidden="true" className="absolute inset-3 rounded-full border border-accent/10" />
                <Image
                  src="/brand-mark.png"
                  alt="FORENSYRA emblem"
                  width={768}
                  height={768}
                  sizes="220px"
                  className="relative h-[78%] w-auto drop-shadow-[0_0_30px_rgba(40,140,255,0.3)]"
                />
              </div>
              <figcaption className="max-w-[16rem] text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.28em] text-accent">
                Digital Evidence / Responsible Investigation
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

