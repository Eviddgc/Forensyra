export type MentorGuide = {
  does: string[];
  guides: string[];
  learn: string[];
};

/** Mentor work per role, keyed by role slug. Content authored for the Mentors page. */
export const MENTOR_GUIDES: Record<string, MentorGuide> = {
  "lead-forensic-investigator": {
    does: ["Reviews how a case is scoped and split across the roles", "Challenges the case plan: is each task tied to evidence and a question?", "Checks that conclusions are supported before the report is approved"],
    guides: ["Reviews the student's case plan and task split", "Gives tips on validating findings and handling disagreement", "Short call before a final report is approved"],
    learn: ["Scoping a case from a vague brief", "Validating findings before they are called facts", "Guiding a team without taking over the work"],
  },
  "coordinator-operations": {
    does: ["Shares how real forensic teams track cases, owners and deadlines", "Reviews the team's task board and meeting notes", "Advises on keeping a volunteer team on schedule"],
    guides: ["Reviews the tracker and meeting format", "Tips on simple status updates and follow-ups", "Calls kept short and on the mentor's free time"],
    learn: ["Running a case calendar and task board", "Writing clear meeting notes and action lists", "Keeping people on track with low pressure"],
  },
  "legal-digital-evidence-advisor": {
    does: ["Explains how law and ethics shape digital evidence in practice", "Reviews the student's legal and privacy notes on each case", "Flags where the team must stop or ask before going further"],
    guides: ["Reads the student's draft legal notes and clarifies doubts", "Tips on consent, privacy and admissibility basics", "Short call when a case raises a legal question"],
    learn: ["Consent, privacy and lawful handling of evidence", "How evidence is presented and challenged", "Writing a legal note a non-lawyer can follow"],
  },
  "evidence-custodian-chain-of-custody": {
    does: ["Shows how evidence is acquired, hashed, logged and stored", "Reviews the student's custody log and hash records", "Points out gaps that would weaken evidence in court"],
    guides: ["Reviews custody forms and hash logs from the student's drafts", "Tips on naming, storage and working copies", "Short call to walk through a custody log"],
    learn: ["Hashing and integrity checks", "Writing a chain-of-custody record", "Handling originals vs working copies"],
  },
  "endpoint-forensics-analyst": {
    does: ["Shares how an examiner approaches a Windows or Linux machine", "Reviews the student's findings on logs, files, browser data and USB use", "Suggests which artefacts to check next and which tools to practise"],
    guides: ["Reads the student's draft findings and clarifies what is missing", "Tips on tools such as Event Logs, Sysmon and timeline tools", "Short call to talk through a stuck artefact"],
    learn: ["Windows Event Logs, registry and USB artefacts", "Reading browser and file-system evidence", "Separating what the evidence shows from guesses"],
  },
  "network-forensics-analyst": {
    does: ["Shows how to read a capture from the top: hosts, protocols, outliers", "Reviews the student's PCAP findings and filters", "Helps decide what is suspicious and what is normal noise"],
    guides: ["Reviews the student's draft write-up and Wireshark notes", "Tips on filters, flows and log sources", "Short call when a capture doesn't make sense"],
    learn: ["Wireshark and flow analysis", "Spotting exfiltration and command traffic", "Explaining network findings in plain words"],
  },
  "memory-malware-analysis-analyst": {
    does: ["Walks through a memory image: processes, network, injected code", "Reviews the student's analysis notes", "Advises on safe handling of suspicious files"],
    guides: ["Reviews the student's draft and clarifies the reasoning", "Tips on Volatility workflow and safe lab setup", "Short call when a process or sample is unclear"],
    learn: ["Memory forensics workflow", "Safe, basic malware triage", "Linking memory findings to the wider case"],
  },
  "threat-intelligence-osint-analyst": {
    does: ["Shows how to enrich an indicator and judge source quality", "Reviews the student's OSINT notes and source list", "Warns about legal and ethical limits of open-source research"],
    guides: ["Reads the student's draft and clarifies the sourcing", "Tips on enrichment tools and note-keeping", "Short call to check an investigation lead"],
    learn: ["Enriching IPs, domains and hashes", "Judging and citing sources", "Staying ethical in open-source research"],
  },
  "timeline-forensic-reporting-analyst": {
    does: ["Reviews how the student builds a timeline from many sources", "Reviews report drafts for clarity, structure and evidence links", "Coaches on explaining findings to non-technical readers"],
    guides: ["Reads the report draft and gives line-level tips", "Tips on timeline tools and report structure", "Short call before a final report is shared"],
    learn: ["Building a clean, sourced timeline", "Writing a forensic report that stands up", "Presenting findings clearly"],
  },
  "cloud-forensics-analyst": {
    does: ["Shows what evidence cloud platforms keep and where to find it", "Reviews the student's log analysis and findings", "Explains limits of cloud evidence and provider dependence"],
    guides: ["Reviews the student's draft and clarifies the log reading", "Tips on practice labs and free-tier setups", "Short call when a log trail goes cold"],
    learn: ["Cloud logs and identity activity", "Tracing account and storage access", "Cloud evidence limits and requests"],
  },
  "multimedia-forensics-analyst": {
    does: ["Shows how to check metadata, compression and editing traces", "Reviews the student's findings and confidence statements", "Advises on what can and cannot be claimed from media"],
    guides: ["Reads the student's draft and clarifies the claims", "Tips on metadata and image-analysis tools", "Short call to look at a tricky file together"],
    learn: ["Metadata and integrity checks", "Spotting edits and synthetic media", "Stating uncertainty honestly"],
  },
  "ai-forensics-ai-security-analyst": {
    does: ["Explains how AI-related incidents leave evidence", "Reviews the student's log and prompt analysis", "Helps frame risks without overclaiming"],
    guides: ["Reviews the student's draft and clarifies the reasoning", "Tips on what AI logs and API records show", "Short call on new AI threats the team meets"],
    learn: ["Prompt injection and misuse patterns", "Reading AI API and usage logs", "Reporting AI incidents carefully"],
  },
  "mobile-device-forensics-analyst": {
    does: ["Shows how mobile evidence is acquired and what each backup holds", "Reviews the student's artefact findings", "Advises on privacy care with personal phone data"],
    guides: ["Reads the student's draft and clarifies the artefact reading", "Tips on tools and sample images to practise on", "Short call when an app database is unclear"],
    learn: ["Android and iOS artefacts", "Messages, location and app data", "Handling personal data with care"],
  },
};

export const MENTOR_FLOW = [
  { title: "Cases from FORENSYRA", text: "FORENSYRA adds the cases and the team members work on them. Mentors see the same case." },
  { title: "Drafts", text: "Students share drafts. The mentor reviews and clarifies them." },
  { title: "Tips and review", text: "Practical tips, and a review of the work when it is needed." },
  { title: "Short call", text: "A short call, booked around the mentor's free time." },
  { title: "Student issues", text: "Help when a student is stuck or has an issue." },
];

/**
 * Mentors confirmed per role slug. Filled/Open follows the Team page rule:
 * a role shows Filled only when a mentor seat is taken.
 */
export const MENTORS_BY_ROLE: Record<string, { name: string; designation: string }[]> = {};
