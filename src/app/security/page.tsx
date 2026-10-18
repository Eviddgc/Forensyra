import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  Clock,
  FileText,
  Lock,
  ShieldCheck,
  Target,
} from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";
import { getSite } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security Policy",
  description:
    "How to report a vulnerability to FORENSYRA, what we promise in return, and what is in scope.",
  alternates: { canonical: "/security" },
};

const CHANNELS = [
  {
    label: "GitHub private advisory",
    value: "github.com/Eviddgc/Forensyra/security/advisories/new",
    href: "https://github.com/Eviddgc/Forensyra/security/advisories/new",
    external: true,
  },
  {
    label: "Email",
    value: "forensyra@outlook.in",
    href: "mailto:forensyra@outlook.in",
    external: false,
  },
];

const TIMELINE = [
  { stage: "We acknowledge your report", target: "within 3 working days" },
  { stage: "Initial assessment and severity", target: "within 7 working days" },
  { stage: "Fix or mitigation plan", target: "within 30 days for high/critical" },
];

const SCOPE_IN = [
  "forensyra.com and its subdomains, and this repository",
  "The contact, application and mentor forms and their API routes",
  "Anything that leaks private data or bypasses validation",
  "Anything that lets one visitor affect another",
];

const SCOPE_OUT = [
  "Denial-of-service and volumetric attacks",
  "Social engineering of members",
  "Vulnerabilities in third-party services — report those upstream",
  "Findings that require a compromised device, browser extension or account",
];

export default function SecurityPage() {
  const site = getSite();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Security", path: "/security" },
        ])}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-background">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_20%,#122b46_0%,#0d2238_50%,#071827_100%)]" />
          <div className="fx-orb pointer-events-none right-[12%] top-[8%] h-[18rem] w-[18rem] bg-accent/8" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        <Container className="relative py-20 sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              Responsible disclosure
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Security policy
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
              We hold ourselves to the same standard we bring to evidence work:
              careful, honest and documented. If you find a problem in
              {site.name}, tell us privately — we will treat it seriously and
              tell you exactly where it stands.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="space-y-12">
            {/* Reporting */}
            <Reveal>
              <section aria-labelledby="reporting">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent-2">
                    <AlertTriangle className="h-4 w-4" />
                  </span>
                  <h2
                    id="reporting"
                    className="font-display text-2xl font-semibold tracking-tight text-foreground"
                  >
                    Report a vulnerability
                  </h2>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  Please do not open a public issue for a security problem. Use
                  one of these private channels:
                </p>
                <ul className="mt-5 space-y-3">
                  {CHANNELS.map((channel) => (
                    <li key={channel.label}>
                      <a
                        href={channel.href}
                        {...(channel.external
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface/50 px-5 py-4 transition hover:border-accent/50"
                      >
                        <span>
                          <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                            {channel.label}
                          </span>
                          <span className="mt-1 block break-all text-sm font-medium text-foreground transition group-hover:text-accent-2">
                            {channel.value}
                          </span>
                        </span>
                        <ShieldCheck className="h-4 w-4 shrink-0 text-accent" />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[15px] leading-relaxed text-muted">
                  Include what the issue is and where it lives, steps to
                  reproduce or a proof-of-concept, the impact you believe it has,
                  and how you would like to be credited.
                </p>
              </section>
            </Reveal>

            {/* What to expect */}
            <Reveal>
              <section aria-labelledby="expect">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent-2">
                    <Clock className="h-4 w-4" />
                  </span>
                  <h2
                    id="expect"
                    className="font-display text-2xl font-semibold tracking-tight text-foreground"
                  >
                    What to expect
                  </h2>
                </div>
                <div className="mt-5 overflow-hidden rounded-2xl border border-border">
                  <table className="w-full text-left text-sm">
                    <caption className="sr-only">
                      Response targets for security reports
                    </caption>
                    <thead className="bg-surface-2/60">
                      <tr>
                        <th scope="col" className="px-5 py-3 font-medium text-foreground">
                          Stage
                        </th>
                        <th scope="col" className="px-5 py-3 font-medium text-foreground">
                          Target
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {TIMELINE.map((row) => (
                        <tr key={row.stage} className="border-t border-border/70">
                          <td className="px-5 py-3 text-muted">{row.stage}</td>
                          <td className="px-5 py-3 font-medium text-foreground">
                            {row.target}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-muted">
                  We are a volunteer collective, so these are best-effort targets
                  rather than a contractual guarantee. We will not go quiet on
                  you — if something will take longer, we will say so.
                </p>
              </section>
            </Reveal>

            {/* Scope */}
            <Reveal>
              <section aria-labelledby="scope">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent-2">
                    <Target className="h-4 w-4" />
                  </span>
                  <h2
                    id="scope"
                    className="font-display text-2xl font-semibold tracking-tight text-foreground"
                  >
                    Scope
                  </h2>
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-2xl border border-success/30 bg-success/[0.06] p-5">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-success">
                      In scope
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-muted">
                      {SCOPE_IN.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden="true" className="text-success">
                            →
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-border bg-surface/50 p-5">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      Out of scope
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-muted">
                      {SCOPE_OUT.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden="true" className="text-muted/60">
                            →
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* Commitments */}
            <Reveal>
              <section aria-labelledby="commitments">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent-2">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <h2
                    id="commitments"
                    className="font-display text-2xl font-semibold tracking-tight text-foreground"
                  >
                    Our commitments
                  </h2>
                </div>
                <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted">
                  <li className="rounded-2xl border border-border bg-surface/40 p-5">
                    We will not pursue or support legal action against
                    researchers who act in good faith, stay within scope, avoid
                    privacy violations and data destruction, and give us
                    reasonable time to fix the issue before disclosure.
                  </li>
                  <li className="rounded-2xl border border-border bg-surface/40 p-5">
                    We will not offer payment — we have no bug bounty budget. We
                    will credit you in the fix, if you would like.
                  </li>
                  <li className="rounded-2xl border border-border bg-surface/40 p-5">
                    Never include real case material, personal data, credentials
                    or evidence in a report. If a proof-of-concept needs data,
                    use synthetic values.
                  </li>
                </ul>
              </section>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div className="rounded-2xl border border-border-gold/40 bg-surface/60 p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent-2">
                  <Lock className="h-4 w-4" />
                </span>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  Machine-readable
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  An RFC 9116 <code>.well-known/security.txt</code> is published
                  for automated scanners.
                </p>
                <a
                  href="/.well-known/security.txt"
                  className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-accent-2 transition hover:text-accent"
                >
                  /.well-known/security.txt
                </a>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-2xl border border-border bg-surface/40 p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2/60 text-muted">
                  <FileText className="h-4 w-4" />
                </span>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  The full policy also lives in the repository as{" "}
                  <code>SECURITY.md</code>, alongside our{" "}
                  <Link
                    href="/ethics"
                    className="text-accent-2 underline decoration-accent/40 underline-offset-4 transition hover:text-accent"
                  >
                    ethics
                  </Link>{" "}
                  and code of conduct.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </Container>
    </>
  );
}
