import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { cn } from "@/lib/utils";

/** Homepage hero: text left, emblem in a glass frame right, stat band below. */
const STATS: Array<{
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}> = [
  { value: 15, label: "Specialised Roles" },
  { value: 2, label: "Active Projects" },
  { value: 1, label: "Flagship Case" },
  { value: 2, prefix: "~", suffix: "h", label: "Per Week" },
];

export function Hero({ name, applyUrl }: { name: string; applyUrl: string }) {
  const split = Math.ceil(name.length * 0.5);
  const head = name.slice(0, split);
  const tail = name.slice(split);

  return (
    <section id="top" className="relative isolate">
      <Container
        variant="wide"
        className="grid items-center gap-12 pb-10 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-12 lg:pt-24"
      >
        <div className="max-w-2xl">
          <Reveal>
            <p className="fx-eyebrow flex items-center gap-4 text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
              Digital Evidence × Deeper Truth
            </p>
          </Reveal>

          <Reveal delay={30}>
            <h1 className="font-display mt-8 text-[clamp(2.75rem,9.5vw,6.6rem)] font-medium leading-[0.95] tracking-[-0.01em]">
              <span className="sr-only">{name} — Digital Evidence &amp; DFIR Collective</span>
              <span aria-hidden="true">
                <span className="text-foreground">{head}</span>
                <span className="text-accent">{tail}</span>
              </span>
            </h1>
            <div aria-hidden="true" className="mt-5 h-px w-[min(34rem,90%)] bg-gradient-to-r from-accent/40 via-foreground/10 to-transparent" />
          </Reveal>

          <Reveal delay={60}>
            <p className="font-display mt-8 text-[clamp(1.4rem,3vw,2rem)] font-normal leading-snug text-foreground/95">
              Where Digital Truth Takes Form.
            </p>
          </Reveal>

          <Reveal delay={90}>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-muted sm:text-base">
              {name} is a collective for students and early-career professionals
              in digital forensics, incident response, and cybersecurity. We
              come together, practise on realistic problems, and build public
              portfolios — turning curiosity into impact.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={applyUrl}
                className="fx-gold-btn inline-flex items-center justify-center gap-3 rounded-xl px-6 py-3.5 text-[14.5px] font-semibold transition hover:brightness-110"
              >
                Apply to Join
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/projects"
                className="fx-glass inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-[14.5px] font-medium text-foreground transition hover:border-accent/50 hover:text-accent-2"
              >
                Explore the Case Board
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80} className="lg:justify-self-end">
          <div className="fx-glass relative mx-auto aspect-[1/1.08] w-full max-w-[26rem] rounded-[28px] p-4 lg:max-w-[28rem]">
            <div className="absolute inset-3 rounded-[22px] border border-accent/15" aria-hidden="true" />
            <p className="absolute left-7 top-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.26em] text-accent">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Digital Evidence &amp; DFIR Collective
            </p>
            <div className="relative flex h-full items-center justify-center">
              <svg
                aria-hidden="true"
                viewBox="0 0 400 400"
                className="absolute inset-0 m-auto h-[88%] w-[88%] text-accent"
              >
                <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeOpacity="0.22" />
                <circle cx="200" cy="200" r="178" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeDasharray="2 7" />
                <path d="M200 8v34M200 358v34M8 200h34M358 200h34" stroke="currentColor" strokeOpacity="0.5" />
              </svg>
              <Image
                src="/brand-mark.png"
                alt="FORENSYRA brand emblem"
                width={768}
                height={768}
                preload
                sizes="(max-width: 1024px) 70vw, 340px"
                className="relative h-[68%] w-auto drop-shadow-[0_0_38px_rgba(40,140,255,0.35)]"
              />
            </div>
            <p className="absolute inset-x-0 bottom-4 flex justify-center gap-6 font-mono text-[10px] tracking-[0.18em] text-accent/80">
              <span>#disk</span>
              <span>#usb</span>
              <span>#cd</span>
            </p>
          </div>
        </Reveal>
      </Container>

      <Container variant="wide" className="pb-6">
        <Reveal delay={150}>
          <dl className="fx-glass grid grid-cols-2 gap-y-6 rounded-2xl px-6 py-6 sm:grid-cols-4 sm:py-7">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "flex items-center justify-center gap-4 px-2",
                  index > 0 && "sm:border-l sm:border-accent/20",
                )}
              >
                <dt className="font-display text-4xl font-medium text-accent-2 sm:text-[2.6rem]">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </dt>
                <dd className="max-w-[6rem] font-mono text-[10px] uppercase leading-snug tracking-[0.2em] text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
