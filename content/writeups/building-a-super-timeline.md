---
title: "Building a Super Timeline"
description: "A super timeline merges filesystem, registry, log and network events into one chronology. It is also the fastest way to drown in data."
date: 2026-10-15
status: "Published"
author: "Forensyra"
tags: ["Timeline", "Tooling", "Method"]
---
A super timeline is the closest thing forensics has to a flight recorder. Built well, it answers questions you did not know to ask. Built carelessly, it buries the answer under a million rows.

## Why one source is never enough

Every artefact has blind spots. The filesystem `$MFT` tells you when a file changed but not who looked at it. Prefetch tells you a program ran but not what it did. Event logs tell you a service started but not which file it touched. Only overlapping sources turn a set of timestamps into a narrative.

## The pipeline

1. **Acquire and verify.** Hash the image; record the values. Never parse an unverified copy.
2. **Triage before you parse.** Decide the time window and the artefacts that matter. Parsing a 20 GB disk in full is an hour you may not need to spend.
3. **Parse into a common schema.** Plaso's `log2timeline` normalises hundreds of artefact types into one timeline format.
4. **Store where you can query it.** Ingesting into Timesketch (or any indexed store) turns "scroll and squint" into a query.
5. **Corroborate across sources.** A lone timestamp is a data point; three agreeing sources is a finding.
6. **Publish with the method attached.** The timeline is evidence; the way you generated it is part of the report.

## Reducing the noise

An unfiltered super timeline for a single workstation easily exceeds a million events, most of them irrelevant.

- **Filter to the incident window** once you have one, and widen deliberately.
- **Whitelist the boring.** Antivirus scans, backup agents, Windows Update and browser churn generate enormous volumes of legitimate activity.
- **Ignore "last modified" on directories** until you have a reason to care — directory timestamps are touched by countless benign operations.
- **Keep a list of what you filtered and why.** A filtered timeline you cannot explain is a hole in your evidence.

## What a timeline is actually for

Not to be read from beginning to end. A super timeline is a **query index**: you form a hypothesis, ask the timeline a question, and let it either support or kill the hypothesis. The useful skill is not generating the timeline — tools do that — but knowing which question to ask next, and being willing to accept "no evidence" as an answer.
