---
title: "Writing Findings That Hold Up"
description: "A finding nobody can act on is not a finding. How we structure investigation reports so they survive review, repetition and a courtroom."
date: 2026-10-11
status: "Published"
author: "Forensyra"
tags: ["Reporting", "Method"]
---
Technical work that cannot be understood is technical work that cannot be used. Writing is the last step of the investigation, not a chore after it.

## Lead with the answer

Every finding opens with the conclusion, in one sentence, in plain language. The evidence follows. A reader who stops after the first line should still understand what you found and how confident you are.

## Separate observation from interpretation

These are two different things and they carry different weight:

- **Observation.** "The Prefetch file `RANSOMWARE.EXE-1A2B3C4D.pf` records a last run time of 2026-10-13 02:41:07 UTC and a run count of 1."
- **Interpretation.** "This indicates the executable ran once on the file server in the early hours of 13 October, consistent with the encryption event."

Mixing them lets a reader challenge your conclusion by attacking a fact, or accept your fact while rejecting your conclusion — and you will never know which happened. Keep them in separate paragraphs, ideally with the observation in a table or block quote.

## Make every claim traceable

Each finding carries three things:

1. **The artefact and its exact source** — file path, registry key, log and event ID, packet number.
2. **The tool and version** used to parse it, so someone else can reproduce the result.
3. **A hash or record identifier** wherever the artefact is a file.

If a reviewer cannot go from your sentence to the underlying bytes, the finding is an opinion.

## Write for three readers at once

- **The decision-maker.** Wants the conclusion, the impact and the recommended action. Will read the first paragraph and the summary table.
- **The analyst.** Wants method, tool versions, filters applied and what you ruled out. Will read everything and try to break it.
- **The lawyer.** Wants to know what the evidence does *not* prove, and whether the handling was sound. Will read the limitations section first.

Structure the report so all three find what they need without reading past each other: executive summary, timeline, findings (observation, then interpretation), limitations, and an appendix with the technical detail and the chain of custody.

## Say what you do not know

The strongest sentence in a forensic report is often "we found no evidence of X". Overclaiming is the fastest way to lose credibility, and stating the limits of your evidence is not weakness — it is the boundary that makes the rest of your work trustworthy.
