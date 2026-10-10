import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Markdown } from "@/components/markdown";
import { getEntry } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ethics & Legal",
  description:
    "How FORENSYRA works legally, ethically, and responsibly with digital evidence.",
};

export default async function EthicsPage() {
  const page = await getEntry("pages", "ethics");
  if (!page) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Our standard"
        title={page.title}
        description={page.description}
      />

      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_0.9fr]">
          <Markdown html={page.content} />

          <aside className="space-y-4">
            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-accent">
                Non-negotiable
              </p>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li>Legal, authorised practice cases only</li>
                <li>Public sample evidence only</li>
                <li>No real victim data — ever</li>
                <li>Privacy, consent, and integrity respected</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 text-sm text-muted">
              Questions about a case? Raise them with the Legal &amp; Digital
              Evidence Advisor before any work begins.{" "}
              <Link href="/contact" className="text-accent hover:underline">
                Contact us
              </Link>
              .
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
