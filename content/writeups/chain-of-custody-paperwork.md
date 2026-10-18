---
title: "Chain of Custody: The Paperwork That Saves a Case"
description: "The most technically brilliant investigation fails if you cannot show who touched the evidence. Here is the minimum a custody log must contain."
date: 2026-10-13
status: "Published"
author: "Forensyra"
tags: ["Evidence handling", "Process", "Legal"]
---
You can recover a deleted file from a mangled NTFS volume and still lose the case — because you cannot prove that the file you analysed is the file that was seized.

## What a custody log must record

For every item, and for every transfer:

- **What it is.** A stable identifier, not a description: `EVID-004`, not "the USB stick".
- **Where it came from.** Device, location, and the person or system it was taken from.
- **Who handled it.** Name and role at each step. "The team" is not a name.
- **When.** Timestamped entries, in a time zone you state.
- **Why.** Purpose of each access — verification, imaging, analysis, review.
- **Hash on receipt and on release.** SHA-256 both times.
- **Where it lives.** Physical or logical storage, and who can reach it.

## The four ACPO principles

Widely referenced and worth knowing by heart:

1. No action taken by law enforcement or their agents should change data which may subsequently be relied upon in court.
2. Where a person finds it necessary to access original data, that person must be competent to do so and be able to explain what they did.
3. An audit trail of all processes applied to digital evidence should be created and preserved. An independent third party should be able to examine those processes and achieve the same result.
4. The person in charge of the investigation has overall responsibility for ensuring that the law and these principles are adhered to.

Principle 3 is the one that catches volunteer teams: **an independent third party must be able to reproduce your work.** If your process lives in one person's head, it does not exist.

## Failure modes we have seen

- **Hashes recorded nowhere but the filename.** Renaming the file destroys the audit trail.
- **Working on the original** "just to check something quickly".
- **Shared folders with no version control**, so nobody can say which copy was analysed.
- **A single untracked transfer** — "I copied it to my laptop to work from home".
- **Backdating entries.** The log is written when the action happens, not when the report is due.

## Doing it properly on a small team

You do not need expensive case-management software. You need a hash-log convention and the discipline to follow it:

1. A single `custody.md` per case, committed to the repository.
2. An append-only table: item, action, actor, timestamp, hash.
3. Original evidence stored read-only; all analysis on working copies.
4. A second person verifies the hash before the case closes.

This is unglamorous work. It is also the work that makes everything else admissible.
