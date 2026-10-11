import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Crown } from "@/components/crown";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { btnOutlineDarkLg, btnPrimaryLg } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** Section 3 — cinematic hero. */
const STATS: Array<{
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}> = [
  { value: 13, label: "Specialized Roles" },
  { value: 2, label: "Active Projects" },
  { value: 1, label: "Flagship Case" },
  { value: 2, prefix: "~", suffix: "h", label: "Per Week" },
];

export function Hero({ name, applyUrl }: { name: string; applyUrl: string }) {
  const head = name.length > 4 ? name.slice(0, name.length - 4) : name;
  const tail = name.length > 4 ? name.slice(-4) : "";

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[600px] items-center overflow-hidden bg-background lg:min-h-[680px]"
    >
      <Image
        src="/images/hero-forensics.jpg"
        alt="A dark digital-forensics workstation with evidence under examination"
        fill
        preload
        sizes="100vw"
        className="object-cover object-[72%_center] opacity-65"
      />
      {/* Dark navy gradient + stronger overlay behind the text */}
      <div className="fx-cinematic pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_110%_at_12%_45%,rgba(7,24,39,0.92),rgba(7,24,39,0.35)_45%,transparent_70%)]" />
      <div className="fx-scanlines pointer-events-none absolute inset-0 opacity-[0.28]" />

      <Container className="relative z-10 py-16 sm:py-20 lg:py-20">
        <div className="max-w-2xl">
          <Reveal>
            <Crown className="h-10 w-12 drop-shadow-[0_0_18px] drop-shadow-accent/60" />
          </Reveal>

          <Reveal delay={80}>
            <p className="fx-eyebrow mt-6 text-accent">
              Digital Evidence × Deeper Truth
            </p>
          </Reveal>

          <Reveal delay={140}>
            <h1 className="font-display mt-4 text-[clamp(3.25rem,10.5vw,7rem)] font-bold leading-[0.95] tracking-[-0.02em] text-foreground">
              {head}
              {tail ? (
                <span className="text-gradient-anim">{tail}</span>
              ) : null}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="font-display mt-5 text-[clamp(1.4rem,3.4vw,2.25rem)] font-medium italic leading-snug text-foreground/95">
              Where Digital Truth Takes Form.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
              {name} is a collective for students and early-career professionals
              in digital forensics, incident response, and cybersecurity. We
              come together, practise on real-world problems, and build public
              portfolios — turning curiosity into impact.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={applyUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(btnPrimaryLg, "fx-shine")}
              >
                Apply to Join
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/projects" className={btnOutlineDarkLg}>
                Explore the Case Board
              </Link>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-y-8 sm:grid-cols-4">
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    "px-1 sm:px-5",
                    index > 0 && "sm:border-l sm:border-border-gold",
                  )}
                >
                  <dt className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                    <Counter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </dt>
                  <dd className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
