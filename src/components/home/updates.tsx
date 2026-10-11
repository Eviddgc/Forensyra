import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { btnPrimary } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** Section 7 — recent updates. */
const UPDATES = [
  {
    title: "New Roles & Opportunities",
    text: "We're opening new positions and looking for curious, motivated members.",
    Icon: UserPlus,
  },
  {
    title: "New DFIR & CTF Learnings",
    text: "Collaborative work, new techniques, and practical lessons from our latest challenges.",
    Icon: ShieldCheck,
  },
  {
    title: "Structured Growth",
    text: "Move from beginner to contributor through guided projects and mentorship.",
    Icon: TrendingUp,
  },
  {
    title: "Community & Collaboration",
    text: "Join a community that thrives on curiosity, teamwork, and continuous learning.",
    Icon: Users,
  },
];

export function Updates({ applyUrl }: { applyUrl: string }) {
  return (
    <section className="bg-light-2 py-20 text-light-ink sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="fx-eyebrow text-accent-ink">Latest</p>
            <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Recent Updates
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-light-muted">
              Together, we build skills, share discoveries, and grow into
              collaborative digital-forensics practitioners.
            </p>
            <a
              href={applyUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(btnPrimary, "fx-shine mt-8 px-5 py-2.5 text-sm")}
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {UPDATES.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <div className="fx-card-light h-full rounded-2xl p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#1d4f8a]/10 text-[#1d4f8a]">
                    <item.Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-light-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-light-muted">
                    {item.text}
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
