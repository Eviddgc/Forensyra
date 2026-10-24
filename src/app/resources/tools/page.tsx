import type { Metadata } from "next";
import { getLearnGroup, groupToNode } from "@/lib/learn";
import { pageAlternates } from "@/lib/seo";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { HeroSection } from "@/components/heroes/hero-backdrop";
import { ShieldCheck, Terminal } from "lucide-react";
import { LearnExplorer } from "@/components/learn-explorer";
import type { TreeNode } from "@/lib/learn-types";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Curated open-source tools for digital forensics and incident response — guides and references.",
  alternates: pageAlternates("/resources/tools"),
};

export default function ToolsPage() {
  const tools = getLearnGroup("tools");
  const nodes: TreeNode[] = [
    ...(tools ? [groupToNode(tools, { defaultOpen: true })] : []),
    {
      id: "related",
      label: "Related",
      kind: "folder",
      description: "Keep exploring the Learn library",
      children: [
        {
          id: "datasets",
          label: "Practice Datasets",
          kind: "link",
          href: "/resources/datasets",
          description: "Public evidence for hands-on labs",
          tags: ["Datasets"],
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
      <HeroSection variant="tools">
        <Container className="relative z-10 flex min-h-[430px] items-center py-20 sm:min-h-[480px] sm:py-24 lg:min-h-[520px]">
          <Reveal>
            <div className="flex items-center gap-3">
              <Terminal className="h-5 w-5 text-accent" />
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
                Learn
              </p>
            </div>
            <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              DFIR <span className="text-accent-2">Tools</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Curated open-source tools for digital forensics and incident response —
              the toolkit every analyst should know.
            </p>
          </Reveal>
        </Container>
      </HeroSection>

      {/* Tool list */}
      <Container className="py-14 sm:py-20 max-w-[96rem]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
            The toolkit
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Curated for DFIR work
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            Each tool is widely used in industry and academia. Practice on legal
            datasets and always document your methodology.
          </p>
        </Reveal>

        <LearnExplorer nodes={nodes} />
<Reveal delay={120}>
          <div className="mt-10 flex items-start gap-3 rounded-2xl border border-[#6aa0dc]/30 bg-[#122b46]/50 p-6">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <p className="text-sm leading-relaxed text-muted">
              <span className="font-medium text-foreground">Note:</span> These tools
              are for authorised forensic work on legal datasets only. Misuse against
              real people or organisations is prohibited and may be illegal.
            </p>
          </div>
        </Reveal>
      </Container>
    </>
  );
}





