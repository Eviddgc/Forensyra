export type MentorPoint = { t: string; d: string };

export type MentorGuide = {
  summary: string;
  does: MentorPoint[];
  steps: MentorPoint[];
  gain: MentorPoint[];
  tasks: string[];
  tools: string[];
};

/** Mentor work per role, keyed by role slug. Content authored for the Mentors page. */
export const MENTOR_GUIDES: Record<string, MentorGuide> = {
  "lead-forensic-investigator": {
    "summary": "The mentor helps students run an investigation as a whole: how a case is scoped, how work is split across roles, and when a finding is solid enough to report.",
    "does": [
      {
        "t": "Shape the case plan",
        "d": "Reviews how the student frames the question, the scope and the order of work, and points out what is missing."
      },
      {
        "t": "Test the reasoning",
        "d": "Asks the hard questions: what does this evidence prove, what else could explain it, what would change the conclusion."
      },
      {
        "t": "Review the final report",
        "d": "Reads the report draft for logic, gaps and overclaiming before it is approved."
      },
      {
        "t": "Coach team coordination",
        "d": "Shares how real teams divide work, settle disagreements and keep quality steady."
      }
    ],
    "steps": [
      {
        "t": "Brief",
        "d": "Mentor reads the case and the student's first plan."
      },
      {
        "t": "Plan review",
        "d": "Feedback on scope, task split and priorities."
      },
      {
        "t": "Draft review",
        "d": "Mentor reviews the findings draft and clarifies weak points."
      },
      {
        "t": "Short call",
        "d": "A short call booked around the mentor's free time to talk through the hard decisions."
      },
      {
        "t": "Student issues",
        "d": "Help when the team is stuck or disagrees."
      }
    ],
    "gain": [
      {
        "t": "Scoping from a vague brief",
        "d": "Turn a loose case description into clear questions and tasks."
      },
      {
        "t": "Evidence-based conclusions",
        "d": "Separate facts, inferences and guesses in a report."
      },
      {
        "t": "Review habits",
        "d": "Check other people's work fairly and give useful feedback."
      },
      {
        "t": "Team judgement",
        "d": "Decide what to do next when the evidence is incomplete."
      }
    ],
    "tasks": [
      "Write a one-page plan for the Data Leakage case: questions, roles, order of work",
      "Review three team findings and mark each as confirmed, likely or unproven",
      "Prepare the sign-off checklist for a final report"
    ],
    "tools": [
      "Case plan template",
      "Findings log",
      "Report review checklist"
    ]
  },
  "coordinator-operations": {
    "summary": "The mentor shows how a forensic team stays organised: who owns what, when things are due and how everyone stays informed without pressure.",
    "does": [
      {
        "t": "Set up a simple rhythm",
        "d": "Helps the student design a light weekly routine for meetings, check-ins and updates."
      },
      {
        "t": "Review task tracking",
        "d": "Looks at the task board and meeting notes and suggests clearer owners and deadlines."
      },
      {
        "t": "Coach onboarding",
        "d": "Shares how to welcome new members so they know what to do in the first week."
      },
      {
        "t": "Advise on communication",
        "d": "Guides the tone and timing of announcements and reminders."
      }
    ],
    "steps": [
      {
        "t": "Brief",
        "d": "Mentor sees the team's current tracker and meeting format."
      },
      {
        "t": "Draft review",
        "d": "Feedback on the student's meeting notes and action lists."
      },
      {
        "t": "Tips",
        "d": "Practical fixes for missed deadlines or quiet members."
      },
      {
        "t": "Short call",
        "d": "A short call in the mentor's free time to adjust the routine."
      },
      {
        "t": "Student issues",
        "d": "Help with scheduling clashes or low activity."
      }
    ],
    "gain": [
      {
        "t": "Running a case calendar",
        "d": "Plan milestones for a multi-week case."
      },
      {
        "t": "Clear meeting notes",
        "d": "Write notes that people actually act on."
      },
      {
        "t": "Tracking without nagging",
        "d": "Keep people on track with low pressure."
      },
      {
        "t": "Onboarding",
        "d": "Bring new members up to speed fast."
      }
    ],
    "tasks": [
      "Draft the first-week plan for a new member",
      "Turn one meeting into a short action list with owners and dates",
      "Build a simple status update for the whole team"
    ],
    "tools": [
      "Task board",
      "Meeting notes template",
      "Status update template"
    ]
  },
  "legal-digital-evidence-advisor": {
    "summary": "The mentor explains how law, ethics and privacy shape digital evidence, and checks that every case is handled in a lawful and careful way.",
    "does": [
      {
        "t": "Explain the basics",
        "d": "Walks through consent, privacy, lawful access and why they matter in practice."
      },
      {
        "t": "Review legal notes",
        "d": "Reads the student's legal and ethical notes for each case and fills in gaps."
      },
      {
        "t": "Flag stop points",
        "d": "Shows when the team must pause or ask before going further."
      },
      {
        "t": "Connect to real practice",
        "d": "Shares how evidence is presented, questioned and challenged."
      }
    ],
    "steps": [
      {
        "t": "Brief",
        "d": "Mentor reads the case and the student's first legal questions."
      },
      {
        "t": "Draft review",
        "d": "Feedback on the draft legal and privacy note."
      },
      {
        "t": "Tips",
        "d": "Plain-language guidance on consent and handling personal data."
      },
      {
        "t": "Short call",
        "d": "A short call booked around the mentor's free time for tricky questions."
      },
      {
        "t": "Student issues",
        "d": "Quick help when a case raises a legal doubt."
      }
    ],
    "gain": [
      {
        "t": "Consent and privacy",
        "d": "Judge what can be examined and what cannot."
      },
      {
        "t": "Lawful handling",
        "d": "Keep evidence usable and fair."
      },
      {
        "t": "Plain legal writing",
        "d": "Write a note the whole team understands."
      },
      {
        "t": "Ethical judgement",
        "d": "Know when to stop and ask."
      }
    ],
    "tasks": [
      "Write a legal and privacy note for a case using a personal laptop image",
      "List what consent is needed before analysing a shared drive",
      "Mark three actions as allowed, ask first or not allowed"
    ],
    "tools": [
      "Legal note template",
      "Consent checklist",
      "Ethics code"
    ]
  },
  "evidence-custodian-chain-of-custody": {
    "summary": "The mentor teaches how evidence is acquired, hashed, logged and stored, so that every file can be trusted and traced from start to finish.",
    "does": [
      {
        "t": "Show correct acquisition",
        "d": "Explains how originals are copied, verified and kept untouched."
      },
      {
        "t": "Review custody records",
        "d": "Checks the student's chain-of-custody log and hash records line by line."
      },
      {
        "t": "Spot weak points",
        "d": "Points out gaps that would weaken evidence in a real case."
      },
      {
        "t": "Set storage habits",
        "d": "Advises on naming, access control and working copies."
      }
    ],
    "steps": [
      {
        "t": "Brief",
        "d": "Mentor sees the evidence list and the student's first log."
      },
      {
        "t": "Draft review",
        "d": "Feedback on the custody form and hash table."
      },
      {
        "t": "Tips",
        "d": "Practical rules for storage and handover."
      },
      {
        "t": "Short call",
        "d": "A short call in the mentor's free time to walk through the log together."
      },
      {
        "t": "Student issues",
        "d": "Help when a hash does not match or a file goes missing."
      }
    ],
    "gain": [
      {
        "t": "Hashing and integrity",
        "d": "Verify that a file has not changed."
      },
      {
        "t": "Custody records",
        "d": "Write a log that stands up to questions."
      },
      {
        "t": "Originals vs copies",
        "d": "Work safely without damaging evidence."
      },
      {
        "t": "Careful habits",
        "d": "Build routines that prevent mistakes."
      }
    ],
    "tasks": [
      "Hash the case image and record SHA-256 in the log",
      "Fix a custody log that has a missing handover",
      "Create the evidence register for all files in a case"
    ],
    "tools": [
      "Hash tools",
      "Custody form",
      "Evidence register"
    ]
  },
  "endpoint-forensics-analyst": {
    "summary": "The mentor shows how an examiner approaches a Windows or Linux computer: which artefacts to read first, how to connect them and what they really prove.",
    "does": [
      {
        "t": "Guide the examination",
        "d": "Shows where to start on a machine: logs, registry, files, browser data and USB use."
      },
      {
        "t": "Review findings",
        "d": "Reads the student's findings and checks that each one is backed by an artefact."
      },
      {
        "t": "Suggest next steps",
        "d": "Points to artefacts and tools to check next."
      },
      {
        "t": "Check the reasoning",
        "d": "Helps separate what the evidence shows from guesses about user intent."
      }
    ],
    "steps": [
      {
        "t": "Brief",
        "d": "Mentor reads the case and the student's artefact list."
      },
      {
        "t": "Draft review",
        "d": "Feedback on the findings draft and what is missing."
      },
      {
        "t": "Tips",
        "d": "Advice on Event Logs, Sysmon and timeline tools."
      },
      {
        "t": "Short call",
        "d": "A short call booked around the mentor's free time for a stuck artefact."
      },
      {
        "t": "Student issues",
        "d": "Help when a tool fails or an artefact is unclear."
      }
    ],
    "gain": [
      {
        "t": "Windows artefacts",
        "d": "Event Logs, registry, prefetch and USB traces."
      },
      {
        "t": "Reading user activity",
        "d": "Browser, file system and recent items."
      },
      {
        "t": "Tool practice",
        "d": "Hands-on use of common endpoint tools."
      },
      {
        "t": "Careful claims",
        "d": "Say only what the evidence supports."
      }
    ],
    "tasks": [
      "Find which USB device was connected and when in the Data Leakage case",
      "Build a short list of files opened before a copy event",
      "Explain one suspicious Event Log entry in plain words"
    ],
    "tools": [
      "Windows Event Logs",
      "Sysmon",
      "Registry viewer",
      "Timeline tools"
    ]
  },
  "network-forensics-analyst": {
    "summary": "The mentor shows how to read network evidence from the top down: who talked to whom, over what, and what looks wrong.",
    "does": [
      {
        "t": "Teach a method",
        "d": "Walks through a capture by hosts, protocols and outliers before details."
      },
      {
        "t": "Review the findings",
        "d": "Checks the student's filters, flows and conclusions."
      },
      {
        "t": "Separate noise from signal",
        "d": "Helps decide what is normal traffic and what is suspicious."
      },
      {
        "t": "Explain exfiltration and C2",
        "d": "Shows how data leaving a network or attacker contact looks in practice."
      }
    ],
    "steps": [
      {
        "t": "Brief",
        "d": "Mentor reads the case and the student's first filters."
      },
      {
        "t": "Draft review",
        "d": "Feedback on the PCAP write-up and Wireshark notes."
      },
      {
        "t": "Tips",
        "d": "Advice on filters, flows and log sources."
      },
      {
        "t": "Short call",
        "d": "A short call in the mentor's free time when a capture makes no sense."
      },
      {
        "t": "Student issues",
        "d": "Help when a tool crashes or a protocol is unfamiliar."
      }
    ],
    "gain": [
      {
        "t": "Wireshark and flows",
        "d": "Read captures quickly and accurately."
      },
      {
        "t": "Spotting exfiltration",
        "d": "Find data leaving the network."
      },
      {
        "t": "Log sources",
        "d": "Combine PCAPs with firewall and DNS logs."
      },
      {
        "t": "Plain explanations",
        "d": "Describe network findings simply."
      }
    ],
    "tasks": [
      "List the top talkers in a capture and mark the odd ones",
      "Find a DNS pattern that suggests beaconing",
      "Write a three-line summary of how data left the network"
    ],
    "tools": [
      "Wireshark",
      "Zeek or Suricata logs",
      "DNS and firewall logs"
    ]
  },
  "memory-malware-analysis-analyst": {
    "summary": "The mentor walks through memory images and suspicious files, and teaches safe, careful triage.",
    "does": [
      {
        "t": "Walk through a memory image",
        "d": "Shows how to read processes, network connections and injected code."
      },
      {
        "t": "Review the analysis",
        "d": "Checks the student's notes and the logic linking each finding."
      },
      {
        "t": "Teach safe handling",
        "d": "Explains how to work with suspicious files without risk."
      },
      {
        "t": "Connect to the case",
        "d": "Helps tie memory findings to the wider timeline."
      }
    ],
    "steps": [
      {
        "t": "Brief",
        "d": "Mentor reads the case and the student's first plugin output."
      },
      {
        "t": "Draft review",
        "d": "Feedback on the notes and what each result means."
      },
      {
        "t": "Tips",
        "d": "Advice on Volatility workflow and a safe lab."
      },
      {
        "t": "Short call",
        "d": "A short call booked around the mentor's free time for an unclear process."
      },
      {
        "t": "Student issues",
        "d": "Help when a plugin fails or a sample is confusing."
      }
    ],
    "gain": [
      {
        "t": "Memory workflow",
        "d": "Choose plugins and read the results."
      },
      {
        "t": "Basic triage",
        "d": "Judge a sample safely and simply."
      },
      {
        "t": "Persistence ideas",
        "d": "Know where malware tends to hide."
      },
      {
        "t": "Linking evidence",
        "d": "Join memory findings to disk and network."
      }
    ],
    "tasks": [
      "List processes in a memory image and flag two that look wrong",
      "Check network connections of a suspect process",
      "Write a short triage note for one suspicious file"
    ],
    "tools": [
      "Volatility",
      "Safe VM lab",
      "Hash and string tools"
    ]
  },
  "threat-intelligence-osint-analyst": {
    "summary": "The mentor shows how to research an indicator, judge a source and write up what is known, with care for legal and ethical limits.",
    "does": [
      {
        "t": "Teach enrichment",
        "d": "Shows how to take an IP, domain or hash and build context from open sources."
      },
      {
        "t": "Review sources",
        "d": "Checks the quality and citation of each source in the student's notes."
      },
      {
        "t": "Set ethical limits",
        "d": "Explains what open-source research is fair and what is not."
      },
      {
        "t": "Turn data into findings",
        "d": "Helps move from raw data to a clear, supported statement."
      }
    ],
    "steps": [
      {
        "t": "Brief",
        "d": "Mentor reads the case and the student's indicator list."
      },
      {
        "t": "Draft review",
        "d": "Feedback on the OSINT notes and source list."
      },
      {
        "t": "Tips",
        "d": "Advice on tools and note-keeping."
      },
      {
        "t": "Short call",
        "d": "A short call in the mentor's free time to check a research direction."
      },
      {
        "t": "Student issues",
        "d": "Help when a trail goes cold."
      }
    ],
    "gain": [
      {
        "t": "Indicator enrichment",
        "d": "Research IPs, domains, URLs and hashes."
      },
      {
        "t": "Source judgement",
        "d": "Tell strong sources from weak ones."
      },
      {
        "t": "Clear write-ups",
        "d": "State what is known and what is not."
      },
      {
        "t": "Ethical research",
        "d": "Stay inside legal and fair limits."
      }
    ],
    "tasks": [
      "Enrich three IPs from a case and record sources",
      "Compare two reports about the same attacker method",
      "Write a short brief on one suspicious domain"
    ],
    "tools": [
      "VirusTotal",
      "WHOIS and passive DNS",
      "MITRE ATT&CK"
    ]
  },
  "timeline-forensic-reporting-analyst": {
    "summary": "The mentor helps students turn many findings into one clear timeline and a report that a reader can trust.",
    "does": [
      {
        "t": "Review the timeline",
        "d": "Checks how events from different sources are ordered and linked."
      },
      {
        "t": "Review report drafts",
        "d": "Reads for structure, clarity and evidence references."
      },
      {
        "t": "Coach the writing",
        "d": "Gives line-level tips so non-technical readers can follow."
      },
      {
        "t": "Prepare the presentation",
        "d": "Helps shape slides for the case review meeting."
      }
    ],
    "steps": [
      {
        "t": "Brief",
        "d": "Mentor sees the findings from all roles."
      },
      {
        "t": "Draft review",
        "d": "Feedback on the timeline and report draft."
      },
      {
        "t": "Tips",
        "d": "Advice on structure, tables and wording."
      },
      {
        "t": "Short call",
        "d": "A short call booked around the mentor's free time before the final version."
      },
      {
        "t": "Student issues",
        "d": "Help when sources disagree on time."
      }
    ],
    "gain": [
      {
        "t": "Clean timelines",
        "d": "Merge logs, files and network events."
      },
      {
        "t": "Forensic reports",
        "d": "Write a report that stands up to questions."
      },
      {
        "t": "Clear presenting",
        "d": "Explain findings simply."
      },
      {
        "t": "Evidence links",
        "d": "Tie every statement to its source."
      }
    ],
    "tasks": [
      "Merge three artefact lists into one timeline",
      "Rewrite a findings paragraph so a non-technical reader understands",
      "Build a five-slide summary of a case"
    ],
    "tools": [
      "Timeline tools",
      "Report template",
      "Slide template"
    ]
  },
  "cloud-forensics-analyst": {
    "summary": "The mentor shows what evidence cloud platforms keep, where to find it and how far it can be trusted.",
    "does": [
      {
        "t": "Map the evidence",
        "d": "Explains which logs exist for identity, storage, API and network activity."
      },
      {
        "t": "Review log analysis",
        "d": "Checks the student's queries and conclusions."
      },
      {
        "t": "Teach cloud limits",
        "d": "Shows where provider rules limit what can be collected."
      },
      {
        "t": "Guide safe practice",
        "d": "Suggests free-tier labs for hands-on work."
      }
    ],
    "steps": [
      {
        "t": "Brief",
        "d": "Mentor reads the case and the student's log list."
      },
      {
        "t": "Draft review",
        "d": "Feedback on the log reading and findings."
      },
      {
        "t": "Tips",
        "d": "Advice on labs and common attack paths."
      },
      {
        "t": "Short call",
        "d": "A short call in the mentor's free time when a trail goes cold."
      },
      {
        "t": "Student issues",
        "d": "Help with access or log format problems."
      }
    ],
    "gain": [
      {
        "t": "Cloud logs",
        "d": "Read identity, storage and API events."
      },
      {
        "t": "Account activity",
        "d": "Trace who did what and when."
      },
      {
        "t": "Evidence limits",
        "d": "Know what the provider can and cannot give."
      },
      {
        "t": "Lab skills",
        "d": "Practise safely at low cost."
      }
    ],
    "tasks": [
      "Trace a suspicious sign-in in sample audit logs",
      "Find which storage objects were read in a time window",
      "List what evidence to request from a provider"
    ],
    "tools": [
      "CloudTrail or audit logs",
      "Log query tools",
      "Free-tier lab"
    ]
  },
  "multimedia-forensics-analyst": {
    "summary": "The mentor shows how to examine images, video and audio for signs of editing, and how to state what can and cannot be claimed.",
    "does": [
      {
        "t": "Teach the checks",
        "d": "Shows metadata, compression and edit traces step by step."
      },
      {
        "t": "Review findings",
        "d": "Checks the student's claims and confidence statements."
      },
      {
        "t": "Explain deepfake risks",
        "d": "Describes how synthetic media is made and what clues it leaves."
      },
      {
        "t": "Guard against overclaiming",
        "d": "Helps write honest, careful conclusions."
      }
    ],
    "steps": [
      {
        "t": "Brief",
        "d": "Mentor reads the case and the student's file list."
      },
      {
        "t": "Draft review",
        "d": "Feedback on the findings and wording."
      },
      {
        "t": "Tips",
        "d": "Advice on tools for metadata and image analysis."
      },
      {
        "t": "Short call",
        "d": "A short call booked around the mentor's free time to look at a tricky file."
      },
      {
        "t": "Student issues",
        "d": "Help when a tool gives a confusing result."
      }
    ],
    "gain": [
      {
        "t": "Metadata checks",
        "d": "Read and question file metadata."
      },
      {
        "t": "Edit traces",
        "d": "Spot signs of change in media."
      },
      {
        "t": "Synthetic media",
        "d": "Know the basic deepfake clues."
      },
      {
        "t": "Honest uncertainty",
        "d": "State confidence clearly."
      }
    ],
    "tasks": [
      "Compare the metadata of two images and note differences",
      "Check a photo for signs of editing and rate your confidence",
      "Write a careful statement about a suspicious video"
    ],
    "tools": [
      "ExifTool",
      "Image analysis tools",
      "Audio spectrogram viewer"
    ]
  },
  "ai-forensics-ai-security-analyst": {
    "summary": "The mentor explains how AI-related incidents leave evidence, and helps students analyse them without overclaiming.",
    "does": [
      {
        "t": "Explain the evidence",
        "d": "Shows what AI logs, prompts and API records can reveal."
      },
      {
        "t": "Review the analysis",
        "d": "Checks the student's log and prompt reading."
      },
      {
        "t": "Frame the risk",
        "d": "Helps describe risks such as prompt injection and data exposure clearly."
      },
      {
        "t": "Keep it grounded",
        "d": "Separates real findings from hype."
      }
    ],
    "steps": [
      {
        "t": "Brief",
        "d": "Mentor reads the case and the student's log sample."
      },
      {
        "t": "Draft review",
        "d": "Feedback on the analysis and reasoning."
      },
      {
        "t": "Tips",
        "d": "Advice on what AI usage records show."
      },
      {
        "t": "Short call",
        "d": "A short call in the mentor's free time on new AI threats the team meets."
      },
      {
        "t": "Student issues",
        "d": "Help when logs are incomplete."
      }
    ],
    "gain": [
      {
        "t": "Prompt injection",
        "d": "Recognise and describe it."
      },
      {
        "t": "AI logs",
        "d": "Read API and usage records."
      },
      {
        "t": "Data exposure",
        "d": "Find where information leaked through AI tools."
      },
      {
        "t": "Careful reporting",
        "d": "Describe AI incidents without hype."
      }
    ],
    "tasks": [
      "Review a sample chat log for signs of prompt injection",
      "List what an API usage log tells you about a user",
      "Write a short risk note on an AI tool that stores prompts"
    ],
    "tools": [
      "API log samples",
      "Prompt test cases",
      "Risk note template"
    ]
  },
  "mobile-device-forensics-analyst": {
    "summary": "The mentor shows how mobile evidence is collected and read, and how to handle personal data with care.",
    "does": [
      {
        "t": "Explain acquisition",
        "d": "Shows what a backup or image holds on Android and iOS."
      },
      {
        "t": "Review findings",
        "d": "Checks the student's artefact reading."
      },
      {
        "t": "Guide tool use",
        "d": "Suggests tools and sample images to practise on."
      },
      {
        "t": "Protect privacy",
        "d": "Teaches careful handling of calls, messages and location data."
      }
    ],
    "steps": [
      {
        "t": "Brief",
        "d": "Mentor reads the case and the student's artefact list."
      },
      {
        "t": "Draft review",
        "d": "Feedback on the findings and wording."
      },
      {
        "t": "Tips",
        "d": "Advice on tools and app databases."
      },
      {
        "t": "Short call",
        "d": "A short call booked around the mentor's free time when an app database is unclear."
      },
      {
        "t": "Student issues",
        "d": "Help when an image will not parse."
      }
    ],
    "gain": [
      {
        "t": "Mobile artefacts",
        "d": "Calls, messages, app data and media."
      },
      {
        "t": "Location and timeline",
        "d": "Read location and activity traces."
      },
      {
        "t": "App databases",
        "d": "Open and understand SQLite data."
      },
      {
        "t": "Privacy care",
        "d": "Handle personal data responsibly."
      }
    ],
    "tasks": [
      "Read messages and call logs from a sample phone image",
      "Plot location points on a timeline",
      "Explain what an app database table stores"
    ],
    "tools": [
      "Sample phone images",
      "SQLite browser",
      "Mobile forensic tools"
    ]
  }
};

/** First step of every role's guidance flow. */
export const MENTOR_FIRST_STEP: MentorPoint = {
  t: "Case arrives",
  d: "FORENSYRA adds the cases and the team members work on them. The mentor sees the same case.",
};

/**
 * Mentors confirmed per role slug. Filled/Open follows the Team page rule:
 * a role shows Filled only when a mentor seat is taken.
 */
export const MENTORS_BY_ROLE: Record<string, { name: string; designation: string }[]> = {};
