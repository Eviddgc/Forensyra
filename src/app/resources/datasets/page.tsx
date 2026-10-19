import type { Metadata } from "next";
import { getLearnGroup, groupToNode } from "@/lib/learn";
import { pageAlternates } from "@/lib/seo";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { HardDrive, ShieldCheck } from "lucide-react";
import { LearnTree } from "@/components/learn-tree";
import type { TreeNode } from "@/components/learn-tree";

export const metadata: Metadata = {
  title: "Practice Datasets",
  description:
    "Public, legal forensic datasets for hands-on labs — disk images, memory dumps, and packet captures.",
  alternates: pageAlternates("/resources/datasets"),
};

export default function PracticeDatasetsPage() {
  const datasets = getLearnGroup("datasets");
  const nodes: TreeNode[] = [
    ...(datasets ? [groupToNode(datasets, { defaultOpen: true })] : []),
    {
      id: "related",
      label: "Related",
      kind: "folder",
      description: "Keep exploring the Learn library",
      children: [
        {
          id: "tools",
          label: "DFIR Tools",
          kind: "link",
          href: "/resources/tools",
          description: "Curated toolkit for forensic work",
          tags: ["Tools"],
        },
        {
          id: "resources",
          label: "References & community",
          kind: "link",
          href: "/resources",
          description: "Hand-picked free resources",
          tags: ["Resources"],
        },
      ],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-background">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_20%,#122b46_0%,#0d2238_50%,#071827_100%)]" />
          <div className="fx-orb pointer-events-none right-[15%] top-[5%] h-[18rem] w-[18rem] bg-[#6aa0dc]/10" />
          <div className="fx-orb pointer-events-none left-[-5%] bottom-[-10%] h-[16rem] w-[16rem] bg-accent/8" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              background:
                "repeating-conic-gradient(from 0deg at 75% 40%, rgba(100,160,220,0.3) 0deg 2deg, transparent 2deg 16deg)",
            }}
          />
          <div className="fx-scanlines absolute inset-0 opacity-[0.14]" />
        </div>

        <Container className="relative z-10 flex min-h-[360px] items-center py-20 sm:min-h-[420px] sm:py-24">
          <Reveal>
            <div className="flex items-center gap-3">
              <HardDrive className="h-5 w-5 text-accent" />
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
                Learn
              </p>
            </div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Practice <span className="text-accent-2">Datasets</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Public, legal forensic datasets for hands-on labs — disk images, memory
              dumps, and packet captures from trusted sources.
            </p>
          </Reveal>
        </Container>

        <svg
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 block h-[46px] w-full sm:h-[70px]"
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
        >
          <path
            d="M0 30 C 260 96 470 4 720 40 C 970 76 1180 108 1440 44 L 1440 110 L 0 110 Z"
            fill="var(--color-surface)"
          />
        </svg>
      </section>

      {/* Dataset list */}
      <Container className="py-14 sm:py-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
            Available datasets
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Hands-on data sources
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            Each dataset is public or freely available for educational use. Always
            verify licensing and handle data only inside authorised lab environments.
          </p>
        </Reveal>

        <LearnTree
          title="Available datasets"
          subtitle="Public, legal forensic datasets for hands-on labs — disk images, memory dumps and packet captures from trusted sources."
          nodes={nodes}
        />
<Reveal delay={120}>
          <div className="mt-10 flex items-start gap-3 rounded-2xl border border-[#6aa0dc]/30 bg-[#122b46]/50 p-6">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <p className="text-sm leading-relaxed text-muted">
              <span className="font-medium text-foreground">Reminder:</span> These
              datasets are for legal, authorised training only. Do not use them against
              real people or organisations. If a dataset&apos;s licence is unclear, raise
              it with the Legal &amp; Digital Evidence Advisor before use.
            </p>
          </div>
        </Reveal>
      </Container>
    </>
  );
}





