---
title: "Case File 002 — The Encrypted Share"
description: "Our second planned investigation: a ransomware incident on a small file server, investigated as a live-compromise scenario."
date: 2026-10-12
updated: 2026-10-18
status: "Planning"
caseType: "Mock case"
tags: ["Mock case", "Ransomware", "Memory", "Network", "Endpoint"]
evidence: ["File server disk image", "Memory capture", "Segment packet capture", "Windows event logs", "Endpoint triage collection"]
plan:
  - label: "Week 1 — Volatile first"
    detail: "Capture and analyse memory before disk: running processes, injected code, C2 connections and any key material still resident. Establish the encryption start time from file timestamps."
  - label: "Week 2 — How they got in"
    detail: "Work the endpoint and network evidence backwards: initial access, privilege escalation and lateral movement, corroborated across event logs, Prefetch and packet capture."
  - label: "Week 3 — Impact, family and report"
    detail: "Identify the ransomware family from code and behavioural signatures, scope exactly what was encrypted, and produce a report written for a small business with no security team."
deliverables:
  - "Incident report with a defensible encryption timeline"
  - "Ransomware family identification with supporting indicators"
  - "A triage playbook other small businesses can reuse"
  - "Per-role notes and a portfolio write-up for every contributor"
links:
  - label: "NIST SP 800-61 — Incident Handling Guide"
    url: "https://csrc.nist.gov/pubs/sp/800/61/r2/final"
  - label: "The DFIR Report — real intrusion write-ups"
    url: "https://thedfirreport.com/"
---
## A note before you read on

This is a **constructed training scenario**, written by FORENSYRA. It is not a real incident and contains no victim data. The techniques are drawn from publicly documented ransomware behaviour, and practice material comes from public sources. Treat every scenario detail as a teaching device, not a case record.

## Scenario

A 25-person accountancy firm runs a single Windows file server holding six years of client records. On a Monday morning, staff arrive to `.locked` extensions on every share and a ransom note in each root folder. Nothing was detected the week before.

Your job is to answer three questions honestly:

1. **When** did encryption actually begin, to the minute?
2. **How** did the operator get in and move?
3. **What** family is this, and how confident can we be?

And one question that is easy to skip, and that a small business cares about most: what should they do differently tomorrow?

## Why this case is different from Case 001

Case 001 is a disk-and-removable-media investigation. This one is built around **time pressure and volatile evidence**:

- The answer to "when did it start" lives in a memory-resident process list and in file timestamps, which is why memory is captured before disk.
- The answer to "how did they get in" is spread across event logs, Prefetch, service creation and network traffic — no single source tells the story.
- There is a **ransomware family identification** task, which means reasoning from code and behaviour rather than trusting a filename or an extension.

## Evidence

Practice material is assembled from public, legal sources and synthetic data we generate ourselves:

- A file server disk image from a public practice set.
- A memory capture taken during the simulated encryption window.
- A packet capture of the server's network segment.
- Windows Security, System and Application event logs.
- An endpoint triage collection (Prefetch, Amcache, ShimCache, service configuration).

Every copy is hashed on receipt and recorded in the custody log before analysis begins.

## The team

All thirteen roles have a defined job. The heaviest load falls on the memory and malware, network, endpoint and timeline roles; the custody, legal and coordination roles keep the investigation defensible while the clock runs.

### Memory & Malware Analysis Analyst

- Analyses the memory capture: process list, injected regions, loaded modules and network connections.
- Identifies the ransomware binary and characterises its behaviour in an isolated lab.
- Extracts and documents indicators — hashes, mutexes, file markers — for the final report.

### Network Forensics Analyst

- Extracts C2 traffic, initial access attempts and any data movement from the packet capture.
- Distinguishes the operator's infrastructure from background noise and third-party services.
- Supplies precise connection timestamps to the master timeline.

### Endpoint Forensics Analyst

- Reconstructs the intrusion on the file server: service creation, scheduled tasks, log clearing attempts.
- Establishes the encryption start and end times from file system timestamps and Prefetch.
- Verifies which shares were affected and which were missed.

### Timeline & Forensic Reporting Analyst

- Merges memory, network, endpoint and log events into one chronology with a stated confidence level for each anchor.
- Writes the report for a reader with no security background.

### Threat Intelligence & OSINT Analyst

- Works the indicators: hashes, domains and file markers, against public reporting.
- Assesses family attribution and states the confidence level honestly.
- Tracks anti-forensic behaviour and known defensive guidance.

### Evidence Custodian & Chain-of-Custody Lead

- Verifies every acquisition against published hashes before analysis starts.
- Maintains the custody log and issues verified copies to analysts.
- Re-hashes at case close and confirms nothing was altered.

### Lead Forensic Investigator

- Sets scope and priorities under time pressure and approves every published finding.
- Makes the call on when to stop analysing and start reporting.

### Legal & Digital Evidence Advisor

- Confirms the scenario is run entirely on synthetic and public material.
- Advises on what a small business can be told, and what would require legal guidance.

### Coordinator / Operations Coordinator

- Runs the schedule: three weeks, three published checkpoints.
- Keeps the evidence register, task board and review sessions on track.

### Cloud Forensics Analyst

- Examines any cloud sync or backup artefacts referenced in the scenario.
- Documents whether off-site copies would have survived the encryption event.

### Mobile Device Forensics Analyst

- Checks whether a mobile backup or sync client contributes any relevant artefact.
- Prepares the mobile acquisition playbook for Case File 003.

### Multimedia Forensics Analyst

- Examines the recovered ransom notes and any embedded metadata for consistency.
- Assesses whether artefact timestamps support the reported encryption window.

### AI Forensics & AI Security Analyst

- Tests AI-assisted triage of the event logs against a manual baseline and documents the misses.
- Writes the AI-in-forensics note for the published report, including the failure cases.

## Plan

Three weeks. Week one is volatile-first acquisition and analysis. Week two works backwards from the encryption to initial access. Week three is identification, impact scoping and reporting, closing with a review where each role defends its findings against the others.

## Output

- An incident report with a defensible encryption timeline
- A ransomware family assessment with stated confidence
- A reusable triage playbook for organisations without a security team
- Per-role notes and portfolio write-ups

## Scope and safety

All analysis runs on synthetic and public practice material in isolated lab environments. Malware is never executed outside a segregated, snapshot-backed VM with no network access. No real victim data, no live systems, and no unauthorised investigation.
