---
title: "Prefetch, Amcache and ShimCache Compared"
description: "Three Windows artefacts that all seem to answer 'did this program run?' — and each one answers a slightly different question."
date: 2026-10-14
status: "Published"
author: "Forensyra"
tags: ["Windows", "Artefacts", "Execution"]
---
These three artefacts are the most commonly confused trio in Windows forensics. They overlap enough to be dangerous, and differ enough that using only one is a mistake.

## Prefetch — execution, with evidence of use

Windows writes a `.pf` file in `%SystemRoot%\Prefetch` the first time an executable runs.

- **Proves the program executed**, provided Prefetch was enabled at the time.
- Records the **last run time** and a **run count** (Windows 7 tracks up to 8 run times; Windows 8 and later keep 1024 on disk, though the Windows API only exposes 8).
- Lists the **files and DLLs the process loaded**, which is often more revealing than the timestamp.
- Tells you the **volume and path** the image was loaded from, using a volume serial number plus a device path.

Caveats: it is disabled by default on Windows Server, can be disabled on workstations, and many applications are excluded by the system's own tuner.

## Amcache — what it was, and where it came from

`Amcache.hve` in `%SystemRoot%\AppCompat\Programs` records executables the system has seen, with useful detail:

- A **SHA-1 hash of the executable**, which is the single most valuable field — it lets you pivot to reputation services, VirusTotal and your own hash sets.
- The **full path** the file was executed from.
- **Install and first-execution timestamps**, whose exact meaning has been debated and revised over the years.

Caveats: the timestamps should be treated as indicative rather than authoritative, and Amcache records programs that were installed or scanned, not strictly every execution.

## ShimCache — what existed

The Application Compatibility Cache lives in the `SYSTEM` registry hive and records compatibility shims applied to executables.

- Records the **full path** and, on modern Windows, the **last modified time of the file** (not the time of execution).
- The widely quoted "executed" flag is **not reliable** on its own and has been misread in real reports. It reflects whether the entry was inserted into the shim cache in a way associated with execution, and there are documented cases where simply browsing a directory produced an entry.

## Using them together

Each one answers a different question:

- **Did it run?** Prefetch is the strongest single indicator — if it is enabled and the artefact survives.
- **What was it?** Amcache gives you a hash to pivot on.
- **Did it exist on this system?** ShimCache records presence.

A credible finding states which artefact supports it, what the artefact actually records, and what it does not. "ShimCache proves execution" is the sentence that turns a solid investigation into a bad cross-examination.
