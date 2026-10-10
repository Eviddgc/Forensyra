import type { Metadata } from "next";
import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { btnPrimary, cardClass } from "@/lib/ui";
import { getSite } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with FORENSYRA.",
};

export default function ContactPage() {
  const site = getSite();

  const channels = [
    {
      icon: Mail,
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      note: "Best for general questions and applications.",
    },
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
      <PageHeader
        eyebrow="Say hello"
        title="Contact us"
        description="Questions about a role, a case, or collaborating with the collective? Reach out."
      />

      <Container className="py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={cn(cardClass, "group p-6")}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                <channel.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">
                {channel.label}
              </p>
              <p className="mt-2 text-base font-medium text-foreground group-hover:text-accent">
                {channel.value}
              </p>
              <p className="mt-1 text-sm text-muted">{channel.note}</p>
            </a>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-surface p-8">
          <h2 className="text-xl font-semibold text-foreground">
            Looking to join?
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            Applications are handled through our short online form. It takes
            about three minutes and tells us which role suits you.
          </p>
          <a
            href={site.applyUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(btnPrimary, "mt-6")}
          >
            Apply to join
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </>
  );
}
