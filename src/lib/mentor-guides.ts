export type MentorStage = { t: string; students: string; mentor: string; output: string };

export type MentorGuide = {
  tagline: string;
  summary: string;
  part: { t: string; d: string }[];
  stages: MentorStage[];
  review: { t: string; d: string }[];
  mistakes: string[];
  growth: { a: string; b: string }[];
  unique: { label: string; items: string };
};

/** Mentor work per role, keyed by role slug. Written specifically for each role. */
export const MENTOR_GUIDES: Record<string, MentorGuide> = {
  "lead-forensic-investigator": {
    "tagline": "The mentor for the person who owns the whole investigation.",
    "summary": "This role decides what the case is really asking, who works on which part, and when the team is allowed to say a finding is true. The mentor acts as a senior reviewer: tough on reasoning, kind to the person.",
    "part": [
      {
        "t": "Challenge the framing",
        "d": "Before work starts, the mentor tests the questions the student wrote down. Is the case about who did it, what was taken, or how it happened? Each needs different evidence."
      },
      {
        "t": "Watch the hand-offs",
        "d": "The mentor looks at how work is split across roles and where findings from two analysts must meet, and asks who checks that they agree."
      },
      {
        "t": "Hold the sign-off bar",
        "d": "The mentor reads the final report as an outsider would and marks every claim that rests on a single source."
      }
    ],
    "stages": [
      {
        "t": "Scope the case",
        "students": "Write the case questions, the scope and what is out of bounds.",
        "mentor": "Reads the scope and rewrites one vague question with the student, so they see what a testable question looks like.",
        "output": "A one-page case plan"
      },
      {
        "t": "Split the work",
        "students": "Assign tasks to roles and name who depends on whom.",
        "mentor": "Asks what happens if one analyst finishes late and the plan has no answer.",
        "output": "A task split with owners"
      },
      {
        "t": "Track and reconcile",
        "students": "Collect findings and check where two analysts disagree.",
        "mentor": "Picks one conflict between findings and asks the student to resolve it with evidence, not by choosing a favourite.",
        "output": "A reconciled findings log"
      },
      {
        "t": "Grade each finding",
        "students": "Mark every finding as confirmed, likely or unproven.",
        "mentor": "Challenges two 'confirmed' items and asks what a second source would be.",
        "output": "A confidence-graded list"
      },
      {
        "t": "Approve the report",
        "students": "Read the full draft and decide if it can go out.",
        "mentor": "Reviews the draft cold and returns the five weakest sentences with reasons.",
        "output": "A sign-off note"
      }
    ],
    "review": [
      {
        "t": "Case plan",
        "d": "Are the questions testable, and is the scope honest?"
      },
      {
        "t": "Findings log",
        "d": "Is each entry tied to evidence and graded for confidence?"
      },
      {
        "t": "Sign-off note",
        "d": "Does it say what was not examined and why?"
      }
    ],
    "mistakes": [
      "Calling a finding confirmed after one source",
      "Splitting work by tool instead of by question",
      "Rewriting analysts' findings instead of asking them to fix them"
    ],
    "growth": [
      {
        "a": "Starts by listing tasks",
        "b": "Starts by listing questions"
      },
      {
        "a": "Accepts the first story",
        "b": "Tests the second explanation"
      },
      {
        "a": "Approves when tired",
        "b": "Approves against a written bar"
      }
    ],
    "unique": {
      "label": "Decisions the mentor trains",
      "items": "When to widen scope, when to stop, and when to say we do not know yet."
    }
  },
  "coordinator-operations": {
    "tagline": "The mentor for the person who keeps the team moving.",
    "summary": "Cases fail on small things: a missed handover, a silent member, a meeting with no outcome. This role builds the routine that prevents that, and the mentor helps keep it light enough that volunteers stay.",
    "part": [
      {
        "t": "Design the rhythm",
        "d": "The mentor helps pick a weekly pattern: one check-in, one working block and one review, and trims anything that adds noise."
      },
      {
        "t": "Read the board",
        "d": "The mentor looks at the task board and finds tasks with no owner, no date or no next step."
      },
      {
        "t": "Coach the human side",
        "d": "The mentor shares how to follow up with a quiet member without making them feel watched."
      }
    ],
    "stages": [
      {
        "t": "Set the cadence",
        "students": "Choose meeting days, lengths and a standing agenda.",
        "mentor": "Cuts the agenda to three items and asks what decision each meeting must produce.",
        "output": "A weekly rhythm card"
      },
      {
        "t": "Run a meeting",
        "students": "Take notes and capture actions with owners and dates.",
        "mentor": "Reads the notes afterwards and marks every action that has no owner.",
        "output": "Meeting notes with an action list"
      },
      {
        "t": "Follow up",
        "students": "Send reminders and check blocked work.",
        "mentor": "Rewrites one reminder to sound like help, not pressure.",
        "output": "A short follow-up message"
      },
      {
        "t": "Onboard a member",
        "students": "Give a new person their first-week path.",
        "mentor": "Asks what the new member can finish in 48 hours and how the student will know.",
        "output": "A first-week plan"
      },
      {
        "t": "Report status",
        "students": "Summarise progress for the whole team.",
        "mentor": "Cuts the update to what changed, what is blocked, what is next.",
        "output": "A one-screen status update"
      }
    ],
    "review": [
      {
        "t": "Action list",
        "d": "Every line has an owner, a date and a clear done-state."
      },
      {
        "t": "Status update",
        "d": "Can a reader grasp the situation in under a minute?"
      },
      {
        "t": "First-week plan",
        "d": "Is the first task small enough to win?"
      }
    ],
    "mistakes": [
      "Meetings with discussion but no decision",
      "Tracking tasks in three places",
      "Chasing the same person in public"
    ],
    "growth": [
      {
        "a": "Reminds everyone the same way",
        "b": "Adjusts follow-up to the person"
      },
      {
        "a": "Long notes nobody reads",
        "b": "Short notes people act on"
      },
      {
        "a": "Reacts to missed dates",
        "b": "Spots risk a week earlier"
      }
    ],
    "unique": {
      "label": "Decisions the mentor trains",
      "items": "What to drop from the routine, and when a quiet member needs a call instead of a message."
    }
  },
  "legal-digital-evidence-advisor": {
    "tagline": "The mentor for the person who asks 'are we allowed to do this?'",
    "summary": "Every case touches consent, privacy and lawful handling. This role writes the legal and ethical note before analysis begins. The mentor teaches how to reason about it in plain language, not recite law.",
    "part": [
      {
        "t": "Teach the reasoning",
        "d": "The mentor walks through why consent, purpose and proportionality matter, using small examples a student can repeat."
      },
      {
        "t": "Set the stop points",
        "d": "The mentor helps the student decide in advance what the team must not do, and who they ask when unsure."
      },
      {
        "t": "Read the note as a reader",
        "d": "The mentor checks that the legal note can be followed by an analyst with no legal background."
      }
    ],
    "stages": [
      {
        "t": "Read the case",
        "students": "List the data involved and whose it is.",
        "mentor": "Asks whose data is on the image and whether they agreed to its use.",
        "output": "A data and ownership list"
      },
      {
        "t": "Check consent and basis",
        "students": "Decide what permission exists for each source.",
        "mentor": "Probes one weak assumption, such as 'it was public so it is fine'.",
        "output": "A consent table"
      },
      {
        "t": "Draw the lines",
        "students": "Mark actions as allowed, ask first or not allowed.",
        "mentor": "Disagrees with one line on purpose and asks the student to defend it.",
        "output": "An allowed / ask / not-allowed list"
      },
      {
        "t": "Advise during the case",
        "students": "Answer analysts' questions as they arise.",
        "mentor": "Reviews the student's answers for clarity and for overreach.",
        "output": "A short advice log"
      },
      {
        "t": "Review the report",
        "students": "Check privacy and ethics before sharing.",
        "mentor": "Checks that personal data is minimised and wording does not accuse.",
        "output": "A privacy review note"
      }
    ],
    "review": [
      {
        "t": "Consent table",
        "d": "Is each permission real, recorded and in scope?"
      },
      {
        "t": "Allowed / ask / not-allowed list",
        "d": "Could an analyst apply it without asking again?"
      },
      {
        "t": "Privacy review note",
        "d": "Does the report reveal more than the case needs?"
      }
    ],
    "mistakes": [
      "Treating 'public' as 'permitted'",
      "Writing in legal jargon that analysts skip",
      "Giving a firm legal opinion beyond what the student can support"
    ],
    "growth": [
      {
        "a": "Memorises rules",
        "b": "Reasons from purpose and proportion"
      },
      {
        "a": "Writes long caveats",
        "b": "Writes clear instructions"
      },
      {
        "a": "Blocks work",
        "b": "Finds a safe way to proceed"
      }
    ],
    "unique": {
      "label": "Decisions the mentor trains",
      "items": "When to stop a task, when to ask someone qualified, and how to say it without alarm."
    }
  },
  "evidence-custodian-chain-of-custody": {
    "tagline": "The mentor for the person who protects the trail itself.",
    "summary": "If the evidence cannot be trusted, nothing built on it can be. This role acquires, hashes, logs and guards every file. The mentor teaches the habits that make a record stand up when someone tries to break it.",
    "part": [
      {
        "t": "Show the right acquisition",
        "d": "The mentor explains why originals stay untouched and how a verified copy is made, step by step."
      },
      {
        "t": "Audit the log",
        "d": "The mentor reads the custody log line by line and asks what each entry would prove to an outsider."
      },
      {
        "t": "Build safe habits",
        "d": "The mentor shares naming, storage and access rules that prevent mistakes before they happen."
      }
    ],
    "stages": [
      {
        "t": "Receive the evidence",
        "students": "Record source, date, who handed it over and file details.",
        "mentor": "Asks what is missing from the receipt and how a stranger could verify it.",
        "output": "An evidence receipt"
      },
      {
        "t": "Hash and verify",
        "students": "Calculate hashes of originals and copies.",
        "mentor": "Gives a file with a changed byte and asks the student to find out why the hash differs.",
        "output": "A hash table"
      },
      {
        "t": "Make working copies",
        "students": "Create copies and lock the originals.",
        "mentor": "Reviews the folder layout and asks where an analyst could overwrite an original by accident.",
        "output": "A storage map"
      },
      {
        "t": "Log every handover",
        "students": "Record each time evidence moves or is opened.",
        "mentor": "Finds a gap between two entries and asks the student to explain it.",
        "output": "A custody log"
      },
      {
        "t": "Close the case",
        "students": "Re-verify hashes and archive.",
        "mentor": "Checks the final hashes against the first and asks what to do if one differs.",
        "output": "A closing verification"
      }
    ],
    "review": [
      {
        "t": "Custody log",
        "d": "No gaps in time, no unnamed handlers."
      },
      {
        "t": "Hash table",
        "d": "Original, copy and algorithm are clearly stated."
      },
      {
        "t": "Storage map",
        "d": "Originals are read-only and separate from working copies."
      }
    ],
    "mistakes": [
      "Hashing the copy and forgetting the original",
      "Logging after the fact from memory",
      "Letting analysts work directly on originals"
    ],
    "growth": [
      {
        "a": "Copies files freely",
        "b": "Preserves integrity first"
      },
      {
        "a": "Notes things down later",
        "b": "Logs as it happens"
      },
      {
        "a": "Trusts a file by its name",
        "b": "Trusts it by its hash"
      }
    ],
    "unique": {
      "label": "Decisions the mentor trains",
      "items": "What to do when a hash does not match, and how to record an error honestly."
    }
  },
  "endpoint-forensics-analyst": {
    "tagline": "The mentor for the person who reads the story a computer left behind.",
    "summary": "A Windows or Linux machine records what people did, often without them knowing. This role turns logs, registry keys, files and USB traces into a clear account. The mentor teaches where to look first and how far a trace can be pushed.",
    "part": [
      {
        "t": "Teach the order of attack",
        "d": "The mentor shows which artefacts to read first so the student does not drown in data: logs, USB history, recent files, browser."
      },
      {
        "t": "Question every trace",
        "d": "For each finding the mentor asks what else could create the same artefact, so the student learns not to jump to intent."
      },
      {
        "t": "Link artefacts",
        "d": "The mentor helps connect a USB entry, a file open and an Event Log record into one sequence."
      }
    ],
    "stages": [
      {
        "t": "Triage the image",
        "students": "Identify the OS, user accounts and the time window of interest.",
        "mentor": "Asks what the student will look at in the first 15 minutes and why.",
        "output": "A scoping note"
      },
      {
        "t": "Read system logs",
        "students": "Review logon events, Sysmon and service changes.",
        "mentor": "Picks one Event ID and asks what it proves and what it does not.",
        "output": "A logon and process table"
      },
      {
        "t": "Trace external devices",
        "students": "Find USB connections and their timestamps.",
        "mentor": "Compares the student's times with the registry source and explains time-zone traps.",
        "output": "A USB activity record"
      },
      {
        "t": "Follow the files",
        "students": "Look at recent files, shortcuts and browser data.",
        "mentor": "Asks which file was opened first and what proves the order.",
        "output": "A file activity list"
      },
      {
        "t": "Build the account",
        "students": "Write what the machine shows, with confidence levels.",
        "mentor": "Strikes out each sentence that states intent, not evidence.",
        "output": "An endpoint findings section"
      }
    ],
    "review": [
      {
        "t": "USB activity record",
        "d": "Each device has serial, first and last times and a source."
      },
      {
        "t": "Logon and process table",
        "d": "Event IDs are explained, not just listed."
      },
      {
        "t": "Findings section",
        "d": "Statements match the artefacts, with no guessed motive."
      }
    ],
    "mistakes": [
      "Reading local time as UTC",
      "Calling a file 'copied' when it was only opened",
      "Trusting one artefact without a second source"
    ],
    "growth": [
      {
        "a": "Lists artefacts",
        "b": "Connects artefacts into a sequence"
      },
      {
        "a": "Says 'he did it'",
        "b": "Says 'this account did this at this time'"
      },
      {
        "a": "Runs every tool",
        "b": "Chooses the right artefact first"
      }
    ],
    "unique": {
      "label": "Artefacts the mentor knows best",
      "items": "Event Logs, Sysmon, registry hives, USB history, prefetch, browser data, shortcut files."
    }
  },
  "network-forensics-analyst": {
    "tagline": "The mentor for the person who follows data across the wire.",
    "summary": "Network evidence shows who talked to whom and when, even when the machines are gone. This role reads captures and logs to find odd traffic and data leaving. The mentor teaches a method so that a large capture stays manageable.",
    "part": [
      {
        "t": "Teach the funnel",
        "d": "The mentor shows how to go from hosts, to protocols, to conversations, to packets, so the student never starts at packet one."
      },
      {
        "t": "Separate normal from odd",
        "d": "The mentor trains the eye for baseline traffic, so an unusual DNS pattern stands out."
      },
      {
        "t": "Check the claim",
        "d": "For each finding the mentor asks what in the capture proves it, and what a defender would say in reply."
      }
    ],
    "stages": [
      {
        "t": "Profile the capture",
        "students": "List hosts, protocols and top talkers.",
        "mentor": "Asks which three hosts matter and why the student ignored the rest.",
        "output": "A capture profile"
      },
      {
        "t": "Find the outliers",
        "students": "Look for rare ports, long sessions and odd DNS.",
        "mentor": "Gives a hint-free question: what is this host doing at 3 AM?",
        "output": "An outlier list"
      },
      {
        "t": "Follow a conversation",
        "students": "Reconstruct one session end to end.",
        "mentor": "Asks the student to explain each stage in plain words to a non-technical reader.",
        "output": "A session walk-through"
      },
      {
        "t": "Test exfiltration",
        "students": "Estimate what and how much left the network.",
        "mentor": "Checks the arithmetic and asks what could make the total wrong.",
        "output": "An exfiltration estimate"
      },
      {
        "t": "Cross-check logs",
        "students": "Compare the capture with firewall and DNS logs.",
        "mentor": "Points out a mismatch and asks which source to trust.",
        "output": "A cross-source table"
      }
    ],
    "review": [
      {
        "t": "Capture profile",
        "d": "Does it show scale and shape before detail?"
      },
      {
        "t": "Session walk-through",
        "d": "Is each step backed by a packet or log line?"
      },
      {
        "t": "Exfiltration estimate",
        "d": "Are the method and its limits stated?"
      }
    ],
    "mistakes": [
      "Starting at the first packet and getting lost",
      "Calling encrypted traffic malicious by default",
      "Ignoring timestamps and time zones between sources"
    ],
    "growth": [
      {
        "a": "Applies filters at random",
        "b": "Follows a method"
      },
      {
        "a": "Sees traffic",
        "b": "Sees behaviour"
      },
      {
        "a": "Reports packets",
        "b": "Reports what happened"
      }
    ],
    "unique": {
      "label": "Artefacts the mentor knows best",
      "items": "PCAPs, flow records, DNS and firewall logs, TLS metadata, Zeek and Suricata output."
    }
  },
  "memory-malware-analysis-analyst": {
    "tagline": "The mentor for the person who examines what was running, not just what was stored.",
    "summary": "Memory holds processes, connections and code that never touched disk. This role reads a RAM image and triages suspicious files safely. The mentor teaches both the technique and the safety habits that keep a lab from becoming a risk.",
    "part": [
      {
        "t": "Make the lab safe first",
        "d": "The mentor insists on an isolated setup and checks it before any sample is opened."
      },
      {
        "t": "Read processes like a story",
        "d": "The mentor shows how to spot a wrong parent, a strange path or injected memory and explain why it is odd."
      },
      {
        "t": "Keep claims small",
        "d": "The mentor teaches that a triage note says what was seen, not that something is definitely malware."
      }
    ],
    "stages": [
      {
        "t": "Prepare the lab",
        "students": "Set up an isolated VM and snapshot it.",
        "mentor": "Checks network settings and asks what would happen if the sample phoned home.",
        "output": "A lab checklist"
      },
      {
        "t": "Survey the memory image",
        "students": "List processes, parents and start times.",
        "mentor": "Asks the student to name two processes that look wrong and defend the choice.",
        "output": "A process tree"
      },
      {
        "t": "Inspect connections and code",
        "students": "Check network sockets and loaded modules.",
        "mentor": "Compares the student's reading with another plugin's output.",
        "output": "A process deep-dive"
      },
      {
        "t": "Triage a file",
        "students": "Hash, string and inspect a suspect file in the lab.",
        "mentor": "Reviews the note and removes any verdict the evidence cannot carry.",
        "output": "A triage note"
      },
      {
        "t": "Tie to the case",
        "students": "Connect memory findings to disk and network.",
        "mentor": "Asks how the memory finding changes the case timeline.",
        "output": "A cross-evidence summary"
      }
    ],
    "review": [
      {
        "t": "Process tree",
        "d": "Odd entries are flagged with a reason, not a feeling."
      },
      {
        "t": "Triage note",
        "d": "States confidence and what was not tested."
      },
      {
        "t": "Lab checklist",
        "d": "Isolation is proved, not assumed."
      }
    ],
    "mistakes": [
      "Opening a sample on a connected machine",
      "Calling anything unusual malware",
      "Forgetting to record the image's hash and plugin versions"
    ],
    "growth": [
      {
        "a": "Runs plugins",
        "b": "Chooses plugins for a question"
      },
      {
        "a": "Hunts for 'bad'",
        "b": "Explains 'unusual' with evidence"
      },
      {
        "a": "Works fast",
        "b": "Works safely"
      }
    ],
    "unique": {
      "label": "Artefacts the mentor knows best",
      "items": "RAM images, process trees, network sockets, injected memory regions, suspicious executables."
    }
  },
  "threat-intelligence-osint-analyst": {
    "tagline": "The mentor for the person who researches who, what and how from open sources.",
    "summary": "This role takes an IP, domain, hash or technique and builds context from public sources. The mentor teaches source judgement and ethical limits, because anyone can collect links but few can say how much to trust them.",
    "part": [
      {
        "t": "Grade the source",
        "d": "The mentor teaches how to ask who published a claim, how they know it and whether another source agrees."
      },
      {
        "t": "Set the boundary",
        "d": "The mentor draws the line between fair open-source research and intrusion, and helps the student keep to it."
      },
      {
        "t": "Turn data into a brief",
        "d": "The mentor trains the student to finish with a clear statement of what is known, likely and unknown."
      }
    ],
    "stages": [
      {
        "t": "Define the question",
        "students": "Decide exactly what the case needs to know.",
        "mentor": "Narrows a broad question into something answerable in an hour.",
        "output": "A research question"
      },
      {
        "t": "Collect indicators",
        "students": "Gather IPs, domains, hashes and related names.",
        "mentor": "Asks which indicators the student left out and why.",
        "output": "An indicator list with sources"
      },
      {
        "t": "Enrich and verify",
        "students": "Check each indicator across independent sources.",
        "mentor": "Marks one claim that rests on a single copied source.",
        "output": "An enrichment table"
      },
      {
        "t": "Map to behaviour",
        "students": "Link findings to known attacker methods.",
        "mentor": "Asks whether the mapping is evidence or hope.",
        "output": "A technique map"
      },
      {
        "t": "Write the brief",
        "students": "Summarise known, likely and unknown.",
        "mentor": "Cuts the brief to one page and removes any sentence without a source.",
        "output": "A one-page brief"
      }
    ],
    "review": [
      {
        "t": "Indicator list",
        "d": "Every item has a source and a date."
      },
      {
        "t": "Enrichment table",
        "d": "At least two independent sources for key claims."
      },
      {
        "t": "One-page brief",
        "d": "Clear split between known, likely and unknown."
      }
    ],
    "mistakes": [
      "Citing a blog that copied another blog",
      "Treating a shared IP as proof of one actor",
      "Crossing into logging in, scraping private data or contacting suspects"
    ],
    "growth": [
      {
        "a": "Collects links",
        "b": "Weighs sources"
      },
      {
        "a": "Reports everything",
        "b": "Reports what matters"
      },
      {
        "a": "Searches freely",
        "b": "Searches within ethical limits"
      }
    ],
    "unique": {
      "label": "Artefacts the mentor knows best",
      "items": "WHOIS and passive DNS, reputation services, malware reports, ATT&CK mappings, social and public records within limits."
    }
  },
  "timeline-forensic-reporting-analyst": {
    "tagline": "The mentor for the person who turns findings into a story a reader can trust.",
    "summary": "All the analysis in the world is wasted if the report is unclear. This role merges evidence into one timeline and writes the report and the case presentation. The mentor reads as the audience and coaches the writing line by line.",
    "part": [
      {
        "t": "Merge the sources",
        "d": "The mentor shows how to bring logs, files and network events onto one clock and flag time-zone problems."
      },
      {
        "t": "Edit like a reader",
        "d": "The mentor returns drafts with the sentences that lose or mislead a reader marked."
      },
      {
        "t": "Prepare the room",
        "d": "The mentor helps shape the slides and the order of the story for the case review meeting."
      }
    ],
    "stages": [
      {
        "t": "Collect the inputs",
        "students": "Gather findings from every role with their sources.",
        "mentor": "Checks that every input has a source and a timestamp basis.",
        "output": "An input register"
      },
      {
        "t": "Normalise time",
        "students": "Convert all events to one time zone and clock.",
        "mentor": "Gives a pair of conflicting times and asks the student to explain the offset.",
        "output": "A normalised timeline"
      },
      {
        "t": "Draft the narrative",
        "students": "Write the sequence of events in plain language.",
        "mentor": "Marks every sentence a reader could not verify from the evidence.",
        "output": "A report draft"
      },
      {
        "t": "Link evidence to claims",
        "students": "Add references from each statement to its source.",
        "mentor": "Removes one reference and asks the student if the claim still stands.",
        "output": "An evidence-linked report"
      },
      {
        "t": "Present the case",
        "students": "Turn the report into a short deck and talk.",
        "mentor": "Runs a two-minute rehearsal and asks the three questions an audience would.",
        "output": "A short case presentation"
      }
    ],
    "review": [
      {
        "t": "Normalised timeline",
        "d": "One time zone, consistent format, sources visible."
      },
      {
        "t": "Report draft",
        "d": "Each paragraph answers one question and is checked against evidence."
      },
      {
        "t": "Case presentation",
        "d": "The story is clear in five slides."
      }
    ],
    "mistakes": [
      "Mixing local time and UTC in one table",
      "Writing conclusions before the evidence",
      "Slides that repeat the report instead of telling the story"
    ],
    "growth": [
      {
        "a": "Writes a log of events",
        "b": "Writes a story with proof"
      },
      {
        "a": "Sentences are long",
        "b": "Sentences are plain"
      },
      {
        "a": "Reports facts",
        "b": "Reports facts and their limits"
      }
    ],
    "unique": {
      "label": "Artefacts the mentor knows best",
      "items": "Timelines, super-timelines, report templates, evidence indexes, slide decks."
    }
  },
  "cloud-forensics-analyst": {
    "tagline": "The mentor for the person who investigates systems nobody can touch.",
    "summary": "In the cloud there is no disk to image. Evidence lives in provider logs and APIs. This role reads identity, storage and activity records and knows what to request from a provider. The mentor teaches both the logs and the limits.",
    "part": [
      {
        "t": "Map where evidence lives",
        "d": "The mentor lays out which logs exist for sign-ins, permissions, storage and network, and how long they are kept."
      },
      {
        "t": "Follow the identity",
        "d": "The mentor shows how to trace one account across changes, roles and keys."
      },
      {
        "t": "Be honest about limits",
        "d": "The mentor trains the student to say what the provider can and cannot supply."
      }
    ],
    "stages": [
      {
        "t": "Scope the environment",
        "students": "List accounts, services and the logs enabled.",
        "mentor": "Asks which logs would be missing if logging was off and what that means.",
        "output": "An environment map"
      },
      {
        "t": "Trace the identity",
        "students": "Follow one account's sign-ins and permission changes.",
        "mentor": "Gives a role change and asks who made it and from where.",
        "output": "An identity trail"
      },
      {
        "t": "Check data access",
        "students": "Find which storage objects were read or copied.",
        "mentor": "Questions the time window and asks if reads were by the owner or an attacker.",
        "output": "A storage access list"
      },
      {
        "t": "Spot attacker paths",
        "students": "Look for new keys, roles and unusual regions.",
        "mentor": "Asks the student to name the single most suspicious event and defend it.",
        "output": "A suspicious events list"
      },
      {
        "t": "Plan the request",
        "students": "State what to ask the provider for.",
        "mentor": "Rewrites the request so it is precise and justified.",
        "output": "An evidence request"
      }
    ],
    "review": [
      {
        "t": "Identity trail",
        "d": "Every step names who, what, where and when."
      },
      {
        "t": "Storage access list",
        "d": "Reads and writes are separated and sourced."
      },
      {
        "t": "Evidence request",
        "d": "Specific, lawful and limited to what the case needs."
      }
    ],
    "mistakes": [
      "Assuming logs exist because the service exists",
      "Mixing up the user who owns a key and the one who used it",
      "Forgetting retention periods"
    ],
    "growth": [
      {
        "a": "Reads logs",
        "b": "Reads identity and intent in logs"
      },
      {
        "a": "Searches broadly",
        "b": "Queries with a question"
      },
      {
        "a": "Assumes access",
        "b": "Plans what to request"
      }
    ],
    "unique": {
      "label": "Artefacts the mentor knows best",
      "items": "CloudTrail or audit logs, IAM policies, access keys, storage access logs, flow logs."
    }
  },
  "multimedia-forensics-analyst": {
    "tagline": "The mentor for the person who checks whether a picture, video or recording can be believed.",
    "summary": "Media can be edited, re-saved or generated. This role examines files for signs of change and states how sure it is. The mentor teaches the checks and, above all, how to word a careful conclusion.",
    "part": [
      {
        "t": "Teach the checks in order",
        "d": "The mentor walks through metadata, container structure, compression and visual traces, in that order."
      },
      {
        "t": "Guard the wording",
        "d": "The mentor reviews every conclusion and removes anything that sounds more certain than the test allows."
      },
      {
        "t": "Explain synthetic media",
        "d": "The mentor shows how generated content is made and what clues it often leaves."
      }
    ],
    "stages": [
      {
        "t": "Preserve the file",
        "students": "Hash and copy the file before testing.",
        "mentor": "Checks that the original was not re-saved by the viewer.",
        "output": "A preserved file record"
      },
      {
        "t": "Read the metadata",
        "students": "Check camera, software and timestamps.",
        "mentor": "Asks which fields are easy to fake and which are not.",
        "output": "A metadata sheet"
      },
      {
        "t": "Inspect structure and compression",
        "students": "Look at recompression and container details.",
        "mentor": "Compares two files and asks why one looks edited and the other does not.",
        "output": "A technical findings table"
      },
      {
        "t": "Examine the content",
        "students": "Look for lighting, edge and audio inconsistencies.",
        "mentor": "Gives a doubtful frame and asks the student to rate it and explain.",
        "output": "A visual observations list"
      },
      {
        "t": "State the conclusion",
        "students": "Write what can and cannot be claimed.",
        "mentor": "Rewrites 'this is fake' into a statement with a confidence level.",
        "output": "A careful conclusion"
      }
    ],
    "review": [
      {
        "t": "Metadata sheet",
        "d": "Fields are listed with how reliable each is."
      },
      {
        "t": "Technical findings table",
        "d": "Every test names the tool and the result."
      },
      {
        "t": "Conclusion",
        "d": "Uses confidence words that match the evidence."
      }
    ],
    "mistakes": [
      "Saying 'fake' from a single odd detail",
      "Re-saving the original while viewing",
      "Trusting metadata that anyone can edit"
    ],
    "growth": [
      {
        "a": "Looks for tricks",
        "b": "Runs a method"
      },
      {
        "a": "Says real or fake",
        "b": "Says how likely and why"
      },
      {
        "a": "Trusts tools",
        "b": "Understands their limits"
      }
    ],
    "unique": {
      "label": "Artefacts the mentor knows best",
      "items": "Image and video files, EXIF data, compression traces, audio spectrograms, generated-media artefacts."
    }
  },
  "ai-forensics-ai-security-analyst": {
    "tagline": "The mentor for the person who investigates incidents involving AI systems.",
    "summary": "AI tools leave a new kind of trail: prompts, outputs, API calls and stored data. This role examines misuse and exposure without hype. The mentor connects classic forensic discipline to this newer ground.",
    "part": [
      {
        "t": "Show what the trail contains",
        "d": "The mentor explains what chat logs, API records and stored prompts can and cannot prove."
      },
      {
        "t": "Test the risk story",
        "d": "The mentor asks whether a described attack, such as prompt injection, actually happened in the logs."
      },
      {
        "t": "Keep the tone grounded",
        "d": "The mentor trains the student to describe incidents in plain, measured words."
      }
    ],
    "stages": [
      {
        "t": "Identify the AI surface",
        "students": "List the AI tools, accounts and data they touch.",
        "mentor": "Asks what data could leave through each tool.",
        "output": "An AI exposure map"
      },
      {
        "t": "Collect usage records",
        "students": "Gather prompts, outputs and API logs.",
        "mentor": "Checks what is missing, such as deleted history, and what that limits.",
        "output": "A usage record set"
      },
      {
        "t": "Look for misuse",
        "students": "Search for injection, leakage or policy bypass.",
        "mentor": "Gives one log and asks if it shows an attack or ordinary use.",
        "output": "A misuse findings list"
      },
      {
        "t": "Assess exposure",
        "students": "Judge what information was actually revealed.",
        "mentor": "Challenges any 'everything leaked' statement.",
        "output": "An exposure assessment"
      },
      {
        "t": "Recommend controls",
        "students": "Suggest realistic fixes.",
        "mentor": "Asks which one change would reduce the most risk.",
        "output": "A short controls note"
      }
    ],
    "review": [
      {
        "t": "AI exposure map",
        "d": "Each tool is tied to its data and accounts."
      },
      {
        "t": "Misuse findings list",
        "d": "Each item cites a log line."
      },
      {
        "t": "Controls note",
        "d": "Recommendations are practical and proportionate."
      }
    ],
    "mistakes": [
      "Calling any odd output an attack",
      "Assuming the model's answer is proof of what it was given",
      "Skipping classic basics such as time and account attribution"
    ],
    "growth": [
      {
        "a": "Repeats headlines",
        "b": "Reads logs"
      },
      {
        "a": "Says 'AI was hacked'",
        "b": "Says what the logs show"
      },
      {
        "a": "Alarms",
        "b": "Advises"
      }
    ],
    "unique": {
      "label": "Artefacts the mentor knows best",
      "items": "Chat transcripts, API request logs, prompt histories, retrieval and plugin logs, stored uploads."
    }
  },
  "mobile-device-forensics-analyst": {
    "tagline": "The mentor for the person who reads a life stored in a phone.",
    "summary": "A phone holds messages, locations and app data that are deeply personal. This role reads backups and images to answer the case's questions, and nothing more. The mentor teaches the artefacts and the care they demand.",
    "part": [
      {
        "t": "Explain what each source holds",
        "d": "The mentor shows what an Android image, an iOS backup and an app database each contain."
      },
      {
        "t": "Read app data properly",
        "d": "The mentor helps the student open SQLite files and understand tables instead of relying on a tool's summary."
      },
      {
        "t": "Model privacy care",
        "d": "The mentor sets a rule to look only at what the case needs and to keep the rest out of the report."
      }
    ],
    "stages": [
      {
        "t": "Identify the source",
        "students": "Confirm device, OS and how the data was acquired.",
        "mentor": "Asks what the acquisition method leaves out.",
        "output": "A source note"
      },
      {
        "t": "Parse the artefacts",
        "students": "Open calls, messages and app databases.",
        "mentor": "Compares the tool's output with the raw table and asks about any difference.",
        "output": "An artefact summary"
      },
      {
        "t": "Plot location and activity",
        "students": "Build a location and usage timeline.",
        "mentor": "Asks how accurate each location point is and why.",
        "output": "A location timeline"
      },
      {
        "t": "Apply the privacy filter",
        "students": "Remove data the case does not need.",
        "mentor": "Reviews what the student kept and challenges any extra personal detail.",
        "output": "A minimised extract"
      },
      {
        "t": "Report the findings",
        "students": "Write findings with limits.",
        "mentor": "Checks every statement against the raw artefact.",
        "output": "A mobile findings section"
      }
    ],
    "review": [
      {
        "t": "Artefact summary",
        "d": "Raw sources are cited next to tool output."
      },
      {
        "t": "Location timeline",
        "d": "Accuracy is stated for each source."
      },
      {
        "t": "Minimised extract",
        "d": "Only case-relevant data remains."
      }
    ],
    "mistakes": [
      "Trusting a tool's summary without checking the raw table",
      "Treating a location point as exact",
      "Including private messages the case does not need"
    ],
    "growth": [
      {
        "a": "Runs a tool",
        "b": "Understands the database"
      },
      {
        "a": "Shows everything",
        "b": "Shows what is needed"
      },
      {
        "a": "Plots points",
        "b": "Explains their accuracy"
      }
    ],
    "unique": {
      "label": "Artefacts the mentor knows best",
      "items": "Android and iOS images and backups, SQLite app databases, call and message records, location history."
    }
  }
};

export const MENTOR_INTRO = "FORENSYRA adds the cases and the team members work on them. The mentor sees the same case.";

/**
 * Mentors confirmed per role slug. Filled/Open follows the Team page rule:
 * a role shows Filled only when a mentor seat is taken.
 */
export const MENTORS_BY_ROLE: Record<string, { name: string; designation: string }[]> = {};
