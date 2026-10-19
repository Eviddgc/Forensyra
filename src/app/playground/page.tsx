import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { TerminalPlayground } from "@/components/terminal-playground";
import { JsonLd } from "@/components/json-ld";
import { pageAlternates } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Terminal Playground",
  description:
    "A simulated DFIR shell. Explore the collective by typing — and compute a real SHA-256 in your browser.",
  alternates: pageAlternates("/playground"),
};

const HIGHLIGHTS = [
  {
    title: "It's honest",
    body: "Nothing here connects to a system. Every answer comes from the same public content the rest of the site is built on.",
  },
  {
    title: "The hashing is real",
    body: "`hash <text>` computes a genuine SHA-256 with the Web Crypto API, locally in your browser.",
  },
  {
    title: "A way to wander",
    body: "`open case001`, `roles`, `ethics` — learn the vocabulary and find the parts of the site you'd otherwise miss.",
  },
];

export default function PlaygroundPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terminal playground", path: "/playground" },
        ])}
      />

      <section className="relative isolate overflow-hidden bg-background">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_20%,#122b46_0%,#0d2238_50%,#071827_100%)]" />
          <div className="fx-orb pointer-events-none right-[12%] top-[10%] h-[18rem] w-[18rem] bg-accent/8" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        <Container className="relative py-20 sm:py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              Playground
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Talk to the collective
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
              A simulated shell for the curious. Type <code>help</code> to see
              what it knows, or try one of the suggestions below.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container className="pb-20 sm:pb-28">
        <Reveal>
          <TerminalPlayground />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {HIGHLIGHTS.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <div className="h-full rounded-2xl border border-border bg-surface/40 p-5">
                <p className="font-display text-base font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
