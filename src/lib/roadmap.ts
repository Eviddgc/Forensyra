/**
 * Roadmap milestones — typed data structure.
 * Kept separate from the CMS so the timeline layout can be designed around
 * a fixed set of milestones with rich metadata (icons, tags, imagery).
 */

export type MilestoneStatus = "Active" | "Planned" | "Upcoming";

export interface Milestone {
  id: string;
  number: string;
  title: string;
  status: MilestoneStatus;
  date: string;
  description: string;
  details: string;
  tags: string[];
  /** Brand-artwork variant used as the card's contextual visual. */
  visual: "workstation" | "evidence" | "terminal" | "network";
}

export const MILESTONES: Milestone[] = [
  {
    id: "core-team",
    number: "01",
    title: "Found the core team",
    status: "Active",
    date: "Oct 10, 2026",
    description:
      "Recruit and onboard the founding analysts who will run the first mock case: evidence custody, endpoint, network, memory, timeline, and legal review.",
    details:
      "Open applications and assemble the founding team. The Lead covers coordination at first, and the Legal & Digital Evidence Advisor can begin as a mentor.",
    tags: ["Recruiting", "Team"],
    visual: "workstation",
  },
  {
    id: "first-case",
    number: "02",
    title: "Run the first mock case",
    status: "Planned",
    date: "Nov 1, 2026",
    description:
      "Analyse public disk images, USB drive images and CD evidence as a team and publish one complete investigation report.",
    details:
      "Execute Case File 001 end to end and release the report and supporting write-ups on GitHub.",
    tags: ["Mock case", "Report"],
    visual: "evidence",
  },
  {
    id: "grow-collective",
    number: "03",
    title: "Phase 2 — Grow the collective",
    status: "Upcoming",
    date: "Jan 1, 2027",
    description:
      "Add the remaining roles: operations, threat intel and OSINT, mobile, multimedia, cloud, and AI forensics, plus the two roles still to be revealed (Reverse Engineering and Dark Web & Underground Intelligence).",
    details:
      "Build stronger workflows, publish more cases, and expand the team's public footprint.",
    tags: ["Growth", "Teams"],
    visual: "terminal",
  },
  {
    id: "expand-publish",
    number: "04",
    title: "Expand & publish",
    status: "Upcoming",
    date: "Q2 2027+",
    description:
      "More investigations, research projects, and public resources. Strengthen partnerships and grow the community.",
    details: "",
    tags: ["Research", "Community"],
    visual: "network",
  },
];
