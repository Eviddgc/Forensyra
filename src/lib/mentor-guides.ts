export type MentorStage = {
  t: string;
  inputs: string;
  students: string;
  mentor: string;
  output: string;
  bar: string;
};

export type MentorGuide = {
  tagline: string;
  summary: string;
  part: { t: string; d: string }[];
  stages: MentorStage[];
  review: { t: string; d: string }[];
  mistakes: string[];
  growth: { a: string; b: string }[];
  unique: { label: string; items: string };
  rhythm: { w: string; d: string }[];
  tools: { n: string; u: string }[];
  decisions: { q: string; c: string }[];
  vs: { a: string; weak: string; strong: string }[];
  loop: string[];
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
        "output": "A one-page case plan",
        "inputs": "Case brief and any earlier notes",
        "bar": "Questions are specific enough that evidence could answer them."
      },
      {
        "t": "Split the work",
        "students": "Assign tasks to roles and name who depends on whom.",
        "mentor": "Asks what happens if one analyst finishes late and the plan has no answer.",
        "output": "A task split with owners",
        "inputs": "Plan and analyst list",
        "bar": "Every task has an owner and a dependency is named."
      },
      {
        "t": "Track and reconcile",
        "students": "Collect findings and check where two analysts disagree.",
        "mentor": "Picks one conflict between findings and asks the student to resolve it with evidence, not by choosing a favourite.",
        "output": "A reconciled findings log",
        "inputs": "All analyst findings",
        "bar": "Each conflict is resolved by evidence, with the reasoning written down."
      },
      {
        "t": "Grade each finding",
        "students": "Mark every finding as confirmed, likely or unproven.",
        "mentor": "Challenges two 'confirmed' items and asks what a second source would be.",
        "output": "A confidence-graded list",
        "inputs": "Findings log",
        "bar": "No finding lacks a source or a grade."
      },
      {
        "t": "Approve the report",
        "students": "Read the full draft and decide if it can go out.",
        "mentor": "Reviews the draft cold and returns the five weakest sentences with reasons.",
        "output": "A sign-off note",
        "inputs": "Report draft",
        "bar": "A reader unfamiliar with the case can follow every claim."
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
    },
    "rhythm": [
      {
        "w": "Case start",
        "d": "One 30 minute call to test the case plan before work splits."
      },
      {
        "w": "During the case",
        "d": "A short written check each week on conflicts between findings."
      },
      {
        "w": "Before sign-off",
        "d": "One review of the final draft, usually 45 minutes of reading plus a short call."
      }
    ],
    "tools": [
      {
        "n": "Case plan template",
        "u": "One page: questions, scope, owners, order"
      },
      {
        "n": "Findings log (Google Sheets)",
        "u": "Every finding with source and confidence"
      },
      {
        "n": "Confidence scale",
        "u": "Confirmed, likely, unproven, with the test for each"
      },
      {
        "n": "Review checklist",
        "u": "Final bar before a report goes out"
      }
    ],
    "decisions": [
      {
        "q": "Do we widen scope or stop here?",
        "c": "Mentor asks what new question the extra work answers, and what it costs the team."
      },
      {
        "q": "Two analysts disagree. Who is right?",
        "c": "Mentor sends the student back to the evidence and asks for the test that would settle it."
      },
      {
        "q": "Is this finding ready to report?",
        "c": "Mentor applies the written bar: two sources or an honest 'likely'."
      }
    ],
    "vs": [
      {
        "a": "Case plan",
        "weak": "Task list with names",
        "strong": "Testable questions, boundaries and dependencies"
      },
      {
        "a": "Findings log",
        "weak": "Statements without sources",
        "strong": "Each line tied to evidence and a confidence grade"
      },
      {
        "a": "Sign-off",
        "weak": "'Looks fine'",
        "strong": "A note listing what was not examined and why"
      }
    ],
    "loop": [
      "Student posts the plan or draft in the mentor group.",
      "Mentor replies within a few days with three points: one strength, the weakest claim, one thing to test.",
      "Student revises and states what changed.",
      "Mentor confirms or asks for one more pass, then it moves on."
    ]
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
        "output": "A weekly rhythm card",
        "inputs": "Team roster and case timeline",
        "bar": "Meeting days and lengths fit the members' real time."
      },
      {
        "t": "Run a meeting",
        "students": "Take notes and capture actions with owners and dates.",
        "mentor": "Reads the notes afterwards and marks every action that has no owner.",
        "output": "Meeting notes with an action list",
        "inputs": "Agenda and attendee list",
        "bar": "Each item ends with a decision or a named owner."
      },
      {
        "t": "Follow up",
        "students": "Send reminders and check blocked work.",
        "mentor": "Rewrites one reminder to sound like help, not pressure.",
        "output": "A short follow-up message",
        "inputs": "Open actions list",
        "bar": "Every reminder is specific, polite and dated."
      },
      {
        "t": "Onboard a member",
        "students": "Give a new person their first-week path.",
        "mentor": "Asks what the new member can finish in 48 hours and how the student will know.",
        "output": "A first-week plan",
        "inputs": "New member's role and case",
        "bar": "The first task can be finished within two days."
      },
      {
        "t": "Report status",
        "students": "Summarise progress for the whole team.",
        "mentor": "Cuts the update to what changed, what is blocked, what is next.",
        "output": "A one-screen status update",
        "inputs": "All task updates",
        "bar": "Readable in under a minute, no unexplained jargon."
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
    },
    "rhythm": [
      {
        "w": "Setup week",
        "d": "One call to agree the weekly rhythm and the tracker layout."
      },
      {
        "w": "Each week",
        "d": "A quick look at the task board and last meeting's notes."
      },
      {
        "w": "Monthly",
        "d": "A short review of what slowed the team and what to cut."
      }
    ],
    "tools": [
      {
        "n": "Task board (Trello or Sheets)",
        "u": "One place for tasks, owners, dates"
      },
      {
        "n": "Meeting notes template",
        "u": "Decisions, actions, owners"
      },
      {
        "n": "WhatsApp group",
        "u": "Fast questions and reminders"
      },
      {
        "n": "Calendar",
        "u": "Fixed slots for check-ins and reviews"
      }
    ],
    "decisions": [
      {
        "q": "Is this meeting needed?",
        "c": "Mentor asks what decision it produces. No decision, no meeting."
      },
      {
        "q": "A member went quiet. Do we message or call?",
        "c": "Mentor shares signs that call for a call, and how to keep it kind."
      },
      {
        "q": "Too many tasks, not enough people. What goes?",
        "c": "Mentor teaches ordering by case impact, not by who is loudest."
      }
    ],
    "vs": [
      {
        "a": "Meeting notes",
        "weak": "Long discussion record",
        "strong": "Decisions and actions with owners and dates"
      },
      {
        "a": "Reminders",
        "weak": "'Please update ASAP'",
        "strong": "One clear ask with a date and an offer to help"
      },
      {
        "a": "Status update",
        "weak": "A list of everything",
        "strong": "What changed, what is blocked, what is next"
      }
    ],
    "loop": [
      "Student shares notes or a status update after a meeting.",
      "Mentor marks any action without an owner or date.",
      "Student fixes and sends it to the team.",
      "Mentor checks the next one for the same issue."
    ]
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
        "output": "A data and ownership list",
        "inputs": "Case brief and list of data sources",
        "bar": "Every data item has an owner or origin written down."
      },
      {
        "t": "Check consent and basis",
        "students": "Decide what permission exists for each source.",
        "mentor": "Probes one weak assumption, such as 'it was public so it is fine'.",
        "output": "A consent table",
        "inputs": "Source list and any permissions",
        "bar": "Each permission is real and covers the planned use."
      },
      {
        "t": "Draw the lines",
        "students": "Mark actions as allowed, ask first or not allowed.",
        "mentor": "Disagrees with one line on purpose and asks the student to defend it.",
        "output": "An allowed / ask / not-allowed list",
        "inputs": "Draft allowed / ask / not-allowed list",
        "bar": "An analyst can apply it without asking again."
      },
      {
        "t": "Advise during the case",
        "students": "Answer analysts' questions as they arise.",
        "mentor": "Reviews the student's answers for clarity and for overreach.",
        "output": "A short advice log",
        "inputs": "Analyst's question and the note",
        "bar": "Answer is short, clear and does not exceed what is known."
      },
      {
        "t": "Review the report",
        "students": "Check privacy and ethics before sharing.",
        "mentor": "Checks that personal data is minimised and wording does not accuse.",
        "output": "A privacy review note",
        "inputs": "Report draft",
        "bar": "No unnecessary personal data and no wording that accuses without proof."
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
    },
    "rhythm": [
      {
        "w": "Before a case",
        "d": "One call to agree what data the team will touch and the limits."
      },
      {
        "w": "During the case",
        "d": "Quick answers when an analyst asks 'can we do this?'"
      },
      {
        "w": "Before publishing",
        "d": "One review of the report for privacy and fairness."
      }
    ],
    "tools": [
      {
        "n": "Legal and privacy note template",
        "u": "Data, basis, limits, risks"
      },
      {
        "n": "Consent table",
        "u": "Source, who agreed, scope"
      },
      {
        "n": "Allowed / ask / not-allowed list",
        "u": "One page analysts can follow"
      },
      {
        "n": "Redaction tools",
        "u": "Remove personal data from shared output"
      }
    ],
    "decisions": [
      {
        "q": "Is public data free to use?",
        "c": "Mentor separates 'accessible' from 'appropriate' with two short examples."
      },
      {
        "q": "Do we continue or stop?",
        "c": "Mentor teaches a three-question test: purpose, permission, proportion."
      },
      {
        "q": "How much personal data goes in the report?",
        "c": "Mentor sets the rule: only what the finding needs."
      }
    ],
    "vs": [
      {
        "a": "Legal note",
        "weak": "Pages of caveats",
        "strong": "A clear list analysts can act on"
      },
      {
        "a": "Advice to analysts",
        "weak": "'Maybe, ask a lawyer'",
        "strong": "A decision, the reason and the safe way to proceed"
      },
      {
        "a": "Report review",
        "weak": "Checks spelling",
        "strong": "Checks what the report reveals and how it words accusations"
      }
    ],
    "loop": [
      "Student sends the note or an answer they gave to an analyst.",
      "Mentor marks where wording could mislead or overreach.",
      "Student rewrites in plain language.",
      "Mentor confirms and adds one real-world point if useful."
    ]
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
        "output": "An evidence receipt",
        "inputs": "Evidence files and handover note",
        "bar": "Receipt names source, date, handler and file details."
      },
      {
        "t": "Hash and verify",
        "students": "Calculate hashes of originals and copies.",
        "mentor": "Gives a file with a changed byte and asks the student to find out why the hash differs.",
        "output": "A hash table",
        "inputs": "Original files",
        "bar": "Hash and tool recorded before any other action."
      },
      {
        "t": "Make working copies",
        "students": "Create copies and lock the originals.",
        "mentor": "Reviews the folder layout and asks where an analyst could overwrite an original by accident.",
        "output": "A storage map",
        "inputs": "Hash table and folder plan",
        "bar": "Originals are read-only; analysts only touch copies."
      },
      {
        "t": "Log every handover",
        "students": "Record each time evidence moves or is opened.",
        "mentor": "Finds a gap between two entries and asks the student to explain it.",
        "output": "A custody log",
        "inputs": "Handover events",
        "bar": "Each move logged with who, when and why."
      },
      {
        "t": "Close the case",
        "students": "Re-verify hashes and archive.",
        "mentor": "Checks the final hashes against the first and asks what to do if one differs.",
        "output": "A closing verification",
        "inputs": "Whole case record",
        "bar": "Final hashes match first hashes, or the difference is explained."
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
    },
    "rhythm": [
      {
        "w": "At intake",
        "d": "A short call to agree the receipt and log format."
      },
      {
        "w": "During the case",
        "d": "A quick log check after each handover."
      },
      {
        "w": "At close",
        "d": "One final verification review."
      }
    ],
    "tools": [
      {
        "n": "sha256sum or HashCalc",
        "u": "Compute and compare file hashes"
      },
      {
        "n": "FTK Imager",
        "u": "Create and verify forensic images"
      },
      {
        "n": "Custody log (Sheets)",
        "u": "Time-ordered record of every handover"
      },
      {
        "n": "Read-only storage",
        "u": "Keep originals safe from change"
      }
    ],
    "decisions": [
      {
        "q": "A hash does not match. What now?",
        "c": "Mentor teaches: stop, record, find the cause, never 'fix' the log."
      },
      {
        "q": "Who should have access?",
        "c": "Mentor sets the rule: least access, every access logged."
      },
      {
        "q": "Is a working copy good enough here?",
        "c": "Mentor asks what the copy must prove and what it cannot."
      }
    ],
    "vs": [
      {
        "a": "Custody log",
        "weak": "Entries written from memory later",
        "strong": "Entries made at the time, no gaps, every name present"
      },
      {
        "a": "Hash record",
        "weak": "Hash of the copy only",
        "strong": "Original, copy, algorithm and tool all stated"
      },
      {
        "a": "Storage",
        "weak": "One shared folder",
        "strong": "Originals read-only and separate from working copies"
      }
    ],
    "loop": [
      "Student shares the log and hash table.",
      "Mentor reads line by line and marks any gap or unnamed handler.",
      "Student corrects the record and explains the gap.",
      "Mentor confirms the record would stand up to a challenge."
    ]
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
        "output": "A scoping note",
        "inputs": "Image details and case question",
        "bar": "Time window, user accounts and OS are written before analysis."
      },
      {
        "t": "Read system logs",
        "students": "Review logon events, Sysmon and service changes.",
        "mentor": "Picks one Event ID and asks what it proves and what it does not.",
        "output": "A logon and process table",
        "inputs": "Security and Sysmon logs",
        "bar": "Each Event ID used is explained in one line."
      },
      {
        "t": "Trace external devices",
        "students": "Find USB connections and their timestamps.",
        "mentor": "Compares the student's times with the registry source and explains time-zone traps.",
        "output": "A USB activity record",
        "inputs": "SYSTEM and NTUSER hives and setupapi logs",
        "bar": "Each device has serial, first and last time and the source."
      },
      {
        "t": "Follow the files",
        "students": "Look at recent files, shortcuts and browser data.",
        "mentor": "Asks which file was opened first and what proves the order.",
        "output": "A file activity list",
        "inputs": "Recent items, shortcuts, browser history",
        "bar": "File order of events is supported by two artefacts."
      },
      {
        "t": "Build the account",
        "students": "Write what the machine shows, with confidence levels.",
        "mentor": "Strikes out each sentence that states intent, not evidence.",
        "output": "An endpoint findings section",
        "inputs": "All tables",
        "bar": "No sentence states intent or motive."
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
    },
    "rhythm": [
      {
        "w": "Case start",
        "d": "A call to set the time window and the first 15 minutes of triage."
      },
      {
        "w": "Each week",
        "d": "A review of the artefact tables and one stuck item."
      },
      {
        "w": "Before report",
        "d": "A pass over the findings section for intent claims."
      }
    ],
    "tools": [
      {
        "n": "FTK Imager or Autopsy",
        "u": "Open and browse disk images"
      },
      {
        "n": "Eric Zimmerman tools (MFTECmd, RECmd, PECmd)",
        "u": "Parse MFT, registry, prefetch"
      },
      {
        "n": "Windows Event Viewer and Sysmon",
        "u": "Logon, process and service events"
      },
      {
        "n": "Plaso / log2timeline",
        "u": "Build a super-timeline from many artefacts"
      }
    ],
    "decisions": [
      {
        "q": "Which artefact first?",
        "c": "Mentor teaches an order: logs, USB history, recent files, browser."
      },
      {
        "q": "Is this activity the user or the system?",
        "c": "Mentor asks what else could create the artefact and how to test it."
      },
      {
        "q": "Can we say 'copied'?",
        "c": "Mentor shows the difference between opened, accessed and copied."
      }
    ],
    "vs": [
      {
        "a": "Findings",
        "weak": "'The user stole files'",
        "strong": "'This account opened these files at these times'"
      },
      {
        "a": "Timestamps",
        "weak": "Local and UTC mixed",
        "strong": "One clock, source of each time stated"
      },
      {
        "a": "Artefact use",
        "weak": "Runs every tool",
        "strong": "Picks the artefact that answers the question"
      }
    ],
    "loop": [
      "Student posts the artefact table and the findings paragraph.",
      "Mentor underlines every claim that goes beyond the artefact.",
      "Student adds a second source or softens the claim.",
      "Mentor re-reads only the changed lines."
    ]
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
        "output": "A capture profile",
        "inputs": "PCAP and case question",
        "bar": "Hosts, protocols and time span are written down first."
      },
      {
        "t": "Find the outliers",
        "students": "Look for rare ports, long sessions and odd DNS.",
        "mentor": "Gives a hint-free question: what is this host doing at 3 AM?",
        "output": "An outlier list",
        "inputs": "Zeek logs and conn.log",
        "bar": "At least three odd items with reasons."
      },
      {
        "t": "Follow a conversation",
        "students": "Reconstruct one session end to end.",
        "mentor": "Asks the student to explain each stage in plain words to a non-technical reader.",
        "output": "A session walk-through",
        "inputs": "One chosen session",
        "bar": "Every stage is tied to a packet or log line."
      },
      {
        "t": "Test exfiltration",
        "students": "Estimate what and how much left the network.",
        "mentor": "Checks the arithmetic and asks what could make the total wrong.",
        "output": "An exfiltration estimate",
        "inputs": "Bytes in and out per host",
        "bar": "The method and its limits are stated."
      },
      {
        "t": "Cross-check logs",
        "students": "Compare the capture with firewall and DNS logs.",
        "mentor": "Points out a mismatch and asks which source to trust.",
        "output": "A cross-source table",
        "inputs": "Capture, firewall and DNS logs",
        "bar": "Mismatches are listed and explained."
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
    },
    "rhythm": [
      {
        "w": "Case start",
        "d": "A call to agree the question and the capture scope."
      },
      {
        "w": "Each week",
        "d": "A review of the outlier list and one session."
      },
      {
        "w": "Before report",
        "d": "A check of the exfiltration estimate and its limits."
      }
    ],
    "tools": [
      {
        "n": "Wireshark and tshark",
        "u": "Packet and session analysis"
      },
      {
        "n": "Zeek",
        "u": "Turn a PCAP into readable logs"
      },
      {
        "n": "Suricata",
        "u": "Signature-based alerts on a capture"
      },
      {
        "n": "NetworkMiner",
        "u": "Extract files and hosts from a PCAP"
      }
    ],
    "decisions": [
      {
        "q": "Where do I start in 2 GB of packets?",
        "c": "Mentor teaches the funnel: hosts, protocols, conversations, packets."
      },
      {
        "q": "Is this traffic odd or just unfamiliar?",
        "c": "Mentor compares against a baseline and asks for a second view."
      },
      {
        "q": "How much data really left?",
        "c": "Mentor checks the method and what could inflate or hide the number."
      }
    ],
    "vs": [
      {
        "a": "Capture profile",
        "weak": "Raw protocol counts",
        "strong": "Top talkers, odd hosts and why they matter"
      },
      {
        "a": "Session walk-through",
        "weak": "Packet numbers only",
        "strong": "Each step explained and tied to a packet or log line"
      },
      {
        "a": "Estimate",
        "weak": "One number",
        "strong": "A range with the method and its limits"
      }
    ],
    "loop": [
      "Student posts the profile or walk-through with filters used.",
      "Mentor reruns one filter and compares the result.",
      "Student explains any difference.",
      "Mentor confirms or asks for a cross-check with a second log."
    ]
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
        "output": "A lab checklist",
        "inputs": "Safe VM, network settings, snapshot",
        "bar": "Isolation proved by a test, not assumed."
      },
      {
        "t": "Survey the memory image",
        "students": "List processes, parents and start times.",
        "mentor": "Asks the student to name two processes that look wrong and defend the choice.",
        "output": "A process tree",
        "inputs": "Memory image and image hash",
        "bar": "Two processes flagged with written reasons."
      },
      {
        "t": "Inspect connections and code",
        "students": "Check network sockets and loaded modules.",
        "mentor": "Compares the student's reading with another plugin's output.",
        "output": "A process deep-dive",
        "inputs": "Socket and module output",
        "bar": "Result compared with a second plugin."
      },
      {
        "t": "Triage a file",
        "students": "Hash, string and inspect a suspect file in the lab.",
        "mentor": "Reviews the note and removes any verdict the evidence cannot carry.",
        "output": "A triage note",
        "inputs": "Sample, hash and strings",
        "bar": "Note states confidence and what was not tested."
      },
      {
        "t": "Tie to the case",
        "students": "Connect memory findings to disk and network.",
        "mentor": "Asks how the memory finding changes the case timeline.",
        "output": "A cross-evidence summary",
        "inputs": "All findings and the case timeline",
        "bar": "Memory finding is placed on the timeline with a source."
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
    },
    "rhythm": [
      {
        "w": "Lab setup",
        "d": "A call to check isolation and snapshots before any sample."
      },
      {
        "w": "Each week",
        "d": "A review of the process tree and one deep-dive."
      },
      {
        "w": "Before report",
        "d": "A pass over the triage note for verdict wording."
      }
    ],
    "tools": [
      {
        "n": "Volatility 3",
        "u": "Read processes, sockets, modules from RAM"
      },
      {
        "n": "An isolated VM (VirtualBox or VMware)",
        "u": "Safe place to open samples"
      },
      {
        "n": "strings, FLOSS, PE-bear",
        "u": "First look at a suspect file"
      },
      {
        "n": "VirusTotal (hash only)",
        "u": "Context without uploading private files"
      }
    ],
    "decisions": [
      {
        "q": "Is this process malicious or just odd?",
        "c": "Mentor asks what evidence separates the two and what is still unknown."
      },
      {
        "q": "Can we run this sample?",
        "c": "Mentor refuses until the lab checklist is proven."
      },
      {
        "q": "What goes in the triage note?",
        "c": "Mentor limits it to what was observed and tested."
      }
    ],
    "vs": [
      {
        "a": "Process tree",
        "weak": "'This looks bad'",
        "strong": "Parent, path and timing explained for each flag"
      },
      {
        "a": "Triage note",
        "weak": "'Malware found'",
        "strong": "What was seen, how sure, what was not tested"
      },
      {
        "a": "Lab",
        "weak": "Assumed to be isolated",
        "strong": "Isolation checked and snapshot taken"
      }
    ],
    "loop": [
      "Student posts the tree or note with plugin names and versions.",
      "Mentor reruns a plugin to compare.",
      "Student explains differences and removes any verdict.",
      "Mentor signs off the wording."
    ]
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
        "output": "A research question",
        "inputs": "Case brief",
        "bar": "One answerable question with a time limit."
      },
      {
        "t": "Collect indicators",
        "students": "Gather IPs, domains, hashes and related names.",
        "mentor": "Asks which indicators the student left out and why.",
        "output": "An indicator list with sources",
        "inputs": "Case evidence",
        "bar": "Each indicator has a source and a date."
      },
      {
        "t": "Enrich and verify",
        "students": "Check each indicator across independent sources.",
        "mentor": "Marks one claim that rests on a single copied source.",
        "output": "An enrichment table",
        "inputs": "Indicators and reports",
        "bar": "Key claims have two independent sources."
      },
      {
        "t": "Map to behaviour",
        "students": "Link findings to known attacker methods.",
        "mentor": "Asks whether the mapping is evidence or hope.",
        "output": "A technique map",
        "inputs": "Enriched indicators",
        "bar": "Each mapped technique is backed by evidence."
      },
      {
        "t": "Write the brief",
        "students": "Summarise known, likely and unknown.",
        "mentor": "Cuts the brief to one page and removes any sentence without a source.",
        "output": "A one-page brief",
        "inputs": "All notes",
        "bar": "Known, likely and unknown are clearly separated."
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
    },
    "rhythm": [
      {
        "w": "Case start",
        "d": "A call to narrow the research question."
      },
      {
        "w": "Each week",
        "d": "A review of indicators, sources and gaps."
      },
      {
        "w": "Before report",
        "d": "A check of the brief for sources and tone."
      }
    ],
    "tools": [
      {
        "n": "VirusTotal and URLScan",
        "u": "Reputation and page behaviour for indicators"
      },
      {
        "n": "WHOIS and passive DNS",
        "u": "Domain history and links"
      },
      {
        "n": "MITRE ATT&CK",
        "u": "Name and map attacker techniques"
      },
      {
        "n": "Maltego CE or spreadsheets",
        "u": "Map relationships between indicators"
      }
    ],
    "decisions": [
      {
        "q": "Is this source good enough?",
        "c": "Mentor teaches three tests: who, how they know, who agrees."
      },
      {
        "q": "Can we say two things are the same actor?",
        "c": "Mentor asks for independent links and accepts 'possible' when they are missing."
      },
      {
        "q": "Is this research still fair?",
        "c": "Mentor draws the line at anything needing login, deception or contact."
      }
    ],
    "vs": [
      {
        "a": "Indicator list",
        "weak": "A list of links",
        "strong": "Each item with source, date and relevance"
      },
      {
        "a": "Claims",
        "weak": "One blog repeated",
        "strong": "Two independent sources or marked as single-source"
      },
      {
        "a": "Brief",
        "weak": "Everything found",
        "strong": "Known, likely and unknown on one page"
      }
    ],
    "loop": [
      "Student posts the indicator table and the draft brief.",
      "Mentor checks two sources chosen at random.",
      "Student fixes weak sourcing and marks single-source claims.",
      "Mentor confirms and suggests one next line of research."
    ]
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
        "output": "An input register",
        "inputs": "Findings from all roles",
        "bar": "Every input has a source and a time basis."
      },
      {
        "t": "Normalise time",
        "students": "Convert all events to one time zone and clock.",
        "mentor": "Gives a pair of conflicting times and asks the student to explain the offset.",
        "output": "A normalised timeline",
        "inputs": "Merged timeline",
        "bar": "All times in one zone with offsets noted."
      },
      {
        "t": "Draft the narrative",
        "students": "Write the sequence of events in plain language.",
        "mentor": "Marks every sentence a reader could not verify from the evidence.",
        "output": "A report draft",
        "inputs": "Timeline",
        "bar": "Each paragraph answers one question and is checked."
      },
      {
        "t": "Link evidence to claims",
        "students": "Add references from each statement to its source.",
        "mentor": "Removes one reference and asks the student if the claim still stands.",
        "output": "An evidence-linked report",
        "inputs": "Draft report",
        "bar": "Every claim links to a source."
      },
      {
        "t": "Present the case",
        "students": "Turn the report into a short deck and talk.",
        "mentor": "Runs a two-minute rehearsal and asks the three questions an audience would.",
        "output": "A short case presentation",
        "inputs": "Report",
        "bar": "Story is clear in five slides and two minutes."
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
    },
    "rhythm": [
      {
        "w": "During the case",
        "d": "A short look at the timeline once two sources are merged."
      },
      {
        "w": "Draft stage",
        "d": "A line-level edit of the first full draft."
      },
      {
        "w": "Before the review meeting",
        "d": "A two minute rehearsal of the presentation."
      }
    ],
    "tools": [
      {
        "n": "Timesketch or a spreadsheet",
        "u": "Merge and filter events on one clock"
      },
      {
        "n": "Plaso / log2timeline output",
        "u": "Source of super-timeline events"
      },
      {
        "n": "Report template",
        "u": "Fixed headings and evidence references"
      },
      {
        "n": "Slides (Google Slides or PowerPoint)",
        "u": "Short story for the review meeting"
      }
    ],
    "decisions": [
      {
        "q": "Which time is the true time?",
        "c": "Mentor teaches checking each source's clock, then converting to one zone."
      },
      {
        "q": "What goes in the report and what stays out?",
        "c": "Mentor asks if a reader needs it to follow the story."
      },
      {
        "q": "How do we show confidence?",
        "c": "Mentor teaches simple labels tied to the evidence."
      }
    ],
    "vs": [
      {
        "a": "Timeline",
        "weak": "Events listed as they came",
        "strong": "One clock, sorted, source visible on every line"
      },
      {
        "a": "Paragraph",
        "weak": "Several ideas, no source",
        "strong": "One idea, one source, one confidence label"
      },
      {
        "a": "Slides",
        "weak": "The report pasted in",
        "strong": "Five slides that tell the story"
      }
    ],
    "loop": [
      "Student posts the timeline or a section of the report.",
      "Mentor returns marked sentences with a reason for each.",
      "Student rewrites and updates the references.",
      "Mentor checks the next draft only for the marked items."
    ]
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
        "output": "An environment map",
        "inputs": "Account and service list",
        "bar": "Logs enabled and retention are written per service."
      },
      {
        "t": "Trace the identity",
        "students": "Follow one account's sign-ins and permission changes.",
        "mentor": "Gives a role change and asks who made it and from where.",
        "output": "An identity trail",
        "inputs": "Sign-in and role logs",
        "bar": "Each step names who, what, where and when."
      },
      {
        "t": "Check data access",
        "students": "Find which storage objects were read or copied.",
        "mentor": "Questions the time window and asks if reads were by the owner or an attacker.",
        "output": "A storage access list",
        "inputs": "Storage access logs",
        "bar": "Reads and writes separated and time-bound."
      },
      {
        "t": "Spot attacker paths",
        "students": "Look for new keys, roles and unusual regions.",
        "mentor": "Asks the student to name the single most suspicious event and defend it.",
        "output": "A suspicious events list",
        "inputs": "Event list",
        "bar": "The most suspicious event is defended with evidence."
      },
      {
        "t": "Plan the request",
        "students": "State what to ask the provider for.",
        "mentor": "Rewrites the request so it is precise and justified.",
        "output": "An evidence request",
        "inputs": "Findings",
        "bar": "Request names exact logs and time windows."
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
    },
    "rhythm": [
      {
        "w": "Case start",
        "d": "A call to list which logs exist and for how long."
      },
      {
        "w": "Each week",
        "d": "A review of the identity trail and queries."
      },
      {
        "w": "Before report",
        "d": "A check of limits and the provider request."
      }
    ],
    "tools": [
      {
        "n": "AWS CloudTrail / Azure Activity Log / GCP Audit Logs",
        "u": "Who did what and when"
      },
      {
        "n": "Athena or KQL",
        "u": "Query logs at scale"
      },
      {
        "n": "IAM policy viewers",
        "u": "See who could do what"
      },
      {
        "n": "A free-tier lab",
        "u": "Safe practice account"
      }
    ],
    "decisions": [
      {
        "q": "Which log would show this?",
        "c": "Mentor teaches mapping the question to the log before searching."
      },
      {
        "q": "Who really performed the action?",
        "c": "Mentor separates the key's owner from the key's user."
      },
      {
        "q": "What can we ask the provider for?",
        "c": "Mentor teaches precise, lawful, limited requests."
      }
    ],
    "vs": [
      {
        "a": "Identity trail",
        "weak": "A list of sign-ins",
        "strong": "Each step with who, what, where, when and source"
      },
      {
        "a": "Query",
        "weak": "Broad search of everything",
        "strong": "A query built from a question, with the window stated"
      },
      {
        "a": "Limits",
        "weak": "Not mentioned",
        "strong": "Retention and provider limits written into the report"
      }
    ],
    "loop": [
      "Student posts the trail and the queries used.",
      "Mentor reruns one query on the sample data.",
      "Student explains any difference and states limits.",
      "Mentor confirms the evidence request is precise."
    ]
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
        "output": "A preserved file record",
        "inputs": "Original media file",
        "bar": "Hash and copy recorded before any test."
      },
      {
        "t": "Read the metadata",
        "students": "Check camera, software and timestamps.",
        "mentor": "Asks which fields are easy to fake and which are not.",
        "output": "A metadata sheet",
        "inputs": "EXIF and file properties",
        "bar": "Each field has a reliability note."
      },
      {
        "t": "Inspect structure and compression",
        "students": "Look at recompression and container details.",
        "mentor": "Compares two files and asks why one looks edited and the other does not.",
        "output": "A technical findings table",
        "inputs": "Container and compression data",
        "bar": "At least two independent technical signs."
      },
      {
        "t": "Examine the content",
        "students": "Look for lighting, edge and audio inconsistencies.",
        "mentor": "Gives a doubtful frame and asks the student to rate it and explain.",
        "output": "A visual observations list",
        "inputs": "Frames or audio segments",
        "bar": "Observations are specific, with timestamps."
      },
      {
        "t": "State the conclusion",
        "students": "Write what can and cannot be claimed.",
        "mentor": "Rewrites 'this is fake' into a statement with a confidence level.",
        "output": "A careful conclusion",
        "inputs": "All tests",
        "bar": "Conclusion uses confidence words that match the evidence."
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
    },
    "rhythm": [
      {
        "w": "Case start",
        "d": "A call to agree which tests fit the question."
      },
      {
        "w": "Each week",
        "d": "A review of one file's findings."
      },
      {
        "w": "Before report",
        "d": "A pass over wording and confidence."
      }
    ],
    "tools": [
      {
        "n": "ExifTool",
        "u": "Read and compare metadata"
      },
      {
        "n": "FFmpeg / MediaInfo",
        "u": "Inspect container and streams"
      },
      {
        "n": "FotoForensics-style error level analysis",
        "u": "See recompression differences"
      },
      {
        "n": "Audacity spectrogram view",
        "u": "Look for edits in audio"
      }
    ],
    "decisions": [
      {
        "q": "Is this metadata trustworthy?",
        "c": "Mentor lists which fields are easy to fake and which need a second check."
      },
      {
        "q": "Is one odd detail enough?",
        "c": "Mentor insists on independent signs before a conclusion."
      },
      {
        "q": "How sure are we?",
        "c": "Mentor teaches confidence words matched to the tests."
      }
    ],
    "vs": [
      {
        "a": "Conclusion",
        "weak": "'This is fake'",
        "strong": "'Signs of editing, moderate confidence, for these reasons'"
      },
      {
        "a": "Method",
        "weak": "Tools listed",
        "strong": "Each test with tool, settings and result"
      },
      {
        "a": "Preservation",
        "weak": "File opened and re-saved",
        "strong": "Hashed copy used, original untouched"
      }
    ],
    "loop": [
      "Student posts the findings table.",
      "Mentor repeats one test and compares.",
      "Student rewords the conclusion with confidence labels.",
      "Mentor confirms the wording matches the evidence."
    ]
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
        "output": "An AI exposure map",
        "inputs": "AI tools and accounts",
        "bar": "Each tool is tied to its data and users."
      },
      {
        "t": "Collect usage records",
        "students": "Gather prompts, outputs and API logs.",
        "mentor": "Checks what is missing, such as deleted history, and what that limits.",
        "output": "A usage record set",
        "inputs": "Logs and exports",
        "bar": "Missing history is listed with its effect."
      },
      {
        "t": "Look for misuse",
        "students": "Search for injection, leakage or policy bypass.",
        "mentor": "Gives one log and asks if it shows an attack or ordinary use.",
        "output": "A misuse findings list",
        "inputs": "Prompts and responses",
        "bar": "Each misuse claim cites a log line."
      },
      {
        "t": "Assess exposure",
        "students": "Judge what information was actually revealed.",
        "mentor": "Challenges any 'everything leaked' statement.",
        "output": "An exposure assessment",
        "inputs": "Outputs and access",
        "bar": "Exposure statement matches what the logs show."
      },
      {
        "t": "Recommend controls",
        "students": "Suggest realistic fixes.",
        "mentor": "Asks which one change would reduce the most risk.",
        "output": "A short controls note",
        "inputs": "Findings",
        "bar": "Controls are practical for this setup."
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
    },
    "rhythm": [
      {
        "w": "Case start",
        "d": "A call to map the AI tools and data."
      },
      {
        "w": "Each week",
        "d": "A review of the log findings and any misuse claims."
      },
      {
        "w": "Before report",
        "d": "A check of tone and exposure statements."
      }
    ],
    "tools": [
      {
        "n": "API request logs",
        "u": "Who called which model with what"
      },
      {
        "n": "Chat export tools",
        "u": "Capture conversation history"
      },
      {
        "n": "OWASP Top 10 for LLM applications",
        "u": "Name common AI risks"
      },
      {
        "n": "Spreadsheet or SQL",
        "u": "Filter and count usage patterns"
      }
    ],
    "decisions": [
      {
        "q": "Was this prompt injection?",
        "c": "Mentor asks for the log line that shows instructions being overridden."
      },
      {
        "q": "What did the model actually reveal?",
        "c": "Mentor separates what it could access from what it output."
      },
      {
        "q": "How do we describe risk without hype?",
        "c": "Mentor edits adjectives out and keeps facts."
      }
    ],
    "vs": [
      {
        "a": "Misuse finding",
        "weak": "'AI was hacked'",
        "strong": "A log line, an account and a time, with the effect shown"
      },
      {
        "a": "Exposure",
        "weak": "'Everything leaked'",
        "strong": "Specific data, how it reached the output and who saw it"
      },
      {
        "a": "Controls",
        "weak": "Generic advice",
        "strong": "One or two changes that fit the setup"
      }
    ],
    "loop": [
      "Student posts findings with log lines.",
      "Mentor checks one claim against the raw log.",
      "Student fixes the claim or the wording.",
      "Mentor reviews the controls note."
    ]
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
        "output": "A source note",
        "inputs": "Device details and how it was acquired",
        "bar": "Source and acquisition limits are written."
      },
      {
        "t": "Parse the artefacts",
        "students": "Open calls, messages and app databases.",
        "mentor": "Compares the tool's output with the raw table and asks about any difference.",
        "output": "An artefact summary",
        "inputs": "Messages, calls and app data",
        "bar": "Tool output has a matching raw-table reference."
      },
      {
        "t": "Plot location and activity",
        "students": "Build a location and usage timeline.",
        "mentor": "Asks how accurate each location point is and why.",
        "output": "A location timeline",
        "inputs": "Location records",
        "bar": "Each point lists source and accuracy."
      },
      {
        "t": "Apply the privacy filter",
        "students": "Remove data the case does not need.",
        "mentor": "Reviews what the student kept and challenges any extra personal detail.",
        "output": "A minimised extract",
        "inputs": "Extracted data",
        "bar": "Only case-relevant records remain."
      },
      {
        "t": "Report the findings",
        "students": "Write findings with limits.",
        "mentor": "Checks every statement against the raw artefact.",
        "output": "A mobile findings section",
        "inputs": "Findings",
        "bar": "Every statement is traceable to a raw artefact."
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
    },
    "rhythm": [
      {
        "w": "Case start",
        "d": "A call to confirm source, scope and privacy limits."
      },
      {
        "w": "Each week",
        "d": "A review of one artefact table."
      },
      {
        "w": "Before report",
        "d": "A privacy check of what stays in the extract."
      }
    ],
    "tools": [
      {
        "n": "Autopsy with Android modules",
        "u": "Browse an Android image"
      },
      {
        "n": "iLEAPP and ALEAPP",
        "u": "Parse iOS and Android artefacts"
      },
      {
        "n": "DB Browser for SQLite",
        "u": "Read app databases directly"
      },
      {
        "n": "Magnet Free tools",
        "u": "Quick artefact views"
      }
    ],
    "decisions": [
      {
        "q": "Can we trust the tool's summary?",
        "c": "Mentor asks the student to find the same record in the raw table."
      },
      {
        "q": "How accurate is this location?",
        "c": "Mentor teaches the source and error radius of each point."
      },
      {
        "q": "What stays out of the report?",
        "c": "Mentor sets the rule: only what the finding needs."
      }
    ],
    "vs": [
      {
        "a": "Artefact reading",
        "weak": "Copies the tool's summary",
        "strong": "Checks the raw table and notes any difference"
      },
      {
        "a": "Location",
        "weak": "Points on a map",
        "strong": "Each point with its source and accuracy"
      },
      {
        "a": "Privacy",
        "weak": "Shows full threads",
        "strong": "Shows the few messages the finding needs"
      }
    ],
    "loop": [
      "Student posts the artefact table and raw references.",
      "Mentor spot-checks one record in the database.",
      "Student corrects and minimises extra data.",
      "Mentor confirms the extract is limited to the case."
    ]
  }
};

export const MENTOR_INTRO = "FORENSYRA adds the cases and the team members work on them. The mentor sees the same case.";

/**
 * Mentors confirmed per role slug. Filled/Open follows the Team page rule:
 * a role shows Filled only when a mentor seat is taken.
 */
export const MENTORS_BY_ROLE: Record<string, { name: string; designation: string }[]> = {};
