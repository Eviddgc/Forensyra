import type { Metadata } from "next";
import { getLearnGroup, groupToNode } from "@/lib/learn";
import { pageAlternates } from "@/lib/seo";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { HeroSection } from "@/components/heroes/hero-backdrop";
import { HardDrive, ShieldCheck } from "lucide-react";
import { LearnExplorer } from "@/components/learn-explorer";
import type { TreeNode } from "@/lib/learn-types";

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
      <HeroSection variant="datasets">
        <Container variant="dense" className="relative z-10 flex min-h-[360px] items-center py-16 sm:min-h-[400px] sm:py-20 lg:min-h-[440px] lg:py-20">
          <Reveal>
            <div className="flex items-center gap-3">
              <HardDrive className="h-5 w-5 text-accent" />
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
                Learn
              </p>
            </div>
            <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Practice <span className="text-accent-2">Datasets</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Public, legal forensic datasets for hands-on labs — disk images, memory
              dumps, and packet captures from trusted sources.
            </p>
          </Reveal>
        </Container>
      </HeroSection>

      {/* Dataset list */}
      <Container variant="dense" className="py-14 sm:py-20">
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

        <LearnExplorer nodes={nodes} />
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





