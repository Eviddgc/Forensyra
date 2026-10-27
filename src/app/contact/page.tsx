import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Mail,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/container";
import { ContactHero } from "@/components/contact-hero";
import { Reveal } from "@/components/reveal";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { pageMetadata } from "@/lib/seo";
import { getSite } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/contact", "Contact", "Contact FORENSYRA about membership, mock cases, mentoring, or collaboration.");

export default function ContactPage() {
  const site = getSite();

  const channels = [
    site.social.github
      ? {
          icon: GitHubIcon,
          label: "GitHub",
          value: "@Eviddgc",
          href: site.social.github,
          note: "All of our public work lives here.",
        }
      : null,
    site.social.linkedin
      ? {
          icon: LinkedInIcon,
          label: "LinkedIn",
          value: "Forensyra",
          href: site.social.linkedin,
          note: "Recruiting posts and updates.",
        }
      : null,
  ].filter(Boolean) as Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    href: string;
    note: string;
  }>;

  return (
    <>
      <ContactHero description="Questions about a role, a case, or collaborating with the collective? Reach out — we reply to every message." />

      {/* Direct line */}
      <Container variant="wide" className="py-14 sm:py-20">
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl border border-[#d4af5f]/30 bg-[#0c1119] p-8 sm:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#d4af5f]/15 blur-3xl" />
            <div className="fx-scanlines absolute inset-0 opacity-[0.12]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  Direct line
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Email us directly
                </h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
                  Best for general questions, collaboration ideas, mentoring
                  offers, and anything that doesn&apos;t fit the application form.
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-6 inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-ink transition hover:bg-accent-2 hover:shadow-[0_18px_40px_-14px] hover:shadow-accent/70"
                >
                  <Mail className="h-4 w-4" />
                  {site.email}
                </a>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 rounded-2xl border border-[#d4af5f]/25 bg-[#151922]/60 p-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Reply within 48 hours
                    </p>
                    <p className="text-xs text-muted">
                      Usually faster on weekdays.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-[#d4af5f]/25 bg-[#151922]/60 p-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Mentors welcome
                    </p>
                    <p className="text-xs text-muted">
                      Experienced practitioners can join as advisors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Channels */}
        {channels.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {channels.map((channel, index) => (
              <Reveal key={channel.label} delay={index * 60}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-[#d4af5f]/25 bg-[#151922]/50 p-6 transition-colors duration-300 hover:border-accent/40"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <channel.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">
                    {channel.label}
                  </p>
                  <p className="mt-2 text-base font-medium text-foreground transition group-hover:text-accent-2">
                    {channel.value}
                  </p>
                  <p className="mt-1 text-sm text-muted">{channel.note}</p>
                </a>
              </Reveal>
            ))}
          </div>
        ) : null}

        {/* When to use which */}
        <Reveal delay={120}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#d4af5f]/25 bg-[#151922]/50 p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <MessageSquare className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  Email us when…
                </h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>• You have a general question or idea.</li>
                <li>• You want to mentor or collaborate.</li>
                <li>• You need help choosing a role.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#d4af5f]/25 bg-[#151922]/50 p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  Apply when…
                </h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>• You want to join the founding team.</li>
                <li>• You want to mentor or advise.</li>
                <li>• You have picked a specialisation.</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-2 transition hover:text-accent"
                >
                  Team application
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/apply/mentor"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-2 transition hover:text-accent"
                >
                  Mentor / advisor
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
