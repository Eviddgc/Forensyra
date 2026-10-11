import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

interface Founder {
  name: string;
  role: string;
  description: string;
}

interface GlanceItem {
  label: string;
  value: string;
  accent?: boolean;
}

const FOCUS = [
  "Digital forensics",
  "Incident response",
  "Evidence handling",
  "Reporting",
];

/**
 * Section 7 — leadership on the left, collective facts and focus areas on the
 * right. Both columns live on a light background; the panels themselves stay
 * dark navy for contrast.
 */
export function Leadership({
  founder,
  name,
  descriptor,
  tagline,
  motto,
}: {
  founder: Founder;
  name: string;
  descriptor: string;
  tagline: string;
  motto: string;
}) {
  const glance: GlanceItem[] = [
    { label: "Name", value: name },
    { label: "Description", value: descriptor },
    { label: "Tagline", value: tagline },
    { label: "Motto", value: motto, accent: true },
  ];

  return (
    <section className="bg-light-2 py-20 text-light-ink sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Leadership */}
          <Reveal>
            <p className="fx-eyebrow text-accent-ink">Our Leadership</p>
            <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              The people behind the mission
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-light-muted">
              {name} is founded and led by {founder.name}, our {founder.role},
              who sets the direction of each case and approves the published
              reports.
            </p>

            <div className="relative mt-8 overflow-hidden rounded-3xl border border-border-gold bg-surface p-7 text-foreground">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-display text-2xl font-semibold leading-tight">
                    {founder.name}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                    {founder.role}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="fx-arrow-btn hidden h-10 w-10 shrink-0 sm:inline-flex"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <p className="mt-5 border-t border-border pt-5 text-sm leading-relaxed text-muted">
                {founder.description}
              </p>
            </div>
          </Reveal>

          {/* At a glance + focus */}
          <Reveal delay={120}>
            <p className="fx-eyebrow text-accent-ink">{name}, at a glance</p>

            <dl className="mt-4 space-y-5 rounded-3xl border border-border-gold bg-surface p-7 text-foreground">
              {glance.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
                    {item.label}
                  </dt>
                  <dd
                    className={
                      item.accent
                        ? "mt-1.5 font-display text-lg italic text-accent-2"
                        : "mt-1.5 text-[15px] font-medium text-foreground"
                    }
                  >
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 rounded-3xl border border-light-border bg-light-card p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-light-muted">
                What we explore
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {FOCUS.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center rounded-full border border-light-border bg-light px-3 py-1 text-[13px] font-medium text-light-ink transition hover:border-accent-deep"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
