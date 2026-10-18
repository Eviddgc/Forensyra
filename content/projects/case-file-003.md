---
title: "Case File 003 — The Quiet Exfiltration"
description: "Our third planned investigation: a long-dwell intrusion where data leaves slowly enough to look like normal business traffic."
date: 2026-10-16
updated: 2026-10-18
status: "Planning"
caseType: "Mock case"
tags: ["Mock case", "Network", "Cloud", "Timeline", "Insider risk"]
evidence: ["Perimeter packet capture", "Proxy and firewall logs", "Cloud audit logs", "Endpoint disk image", "Authentication logs"]
plan:
  - label: "Week 1 — Establish the baseline"
    detail: "Characterise what normal traffic looks like for this organisation before hunting. Without a baseline, slow exfiltration is indistinguishable from a large cloud backup."
  - label: "Week 2 — Find the thread"
    detail: "Correlate authentication, proxy, cloud audit and endpoint events to identify the accounts, hosts and destinations involved in the outbound movement."
  - label: "Week 3 — Quantify and report"
    detail: "Estimate what left, when, and to where, state the limits of that estimate honestly, and write the timeline as a narrative a non-technical reader can follow."
deliverables:
  - "A quantified exfiltration estimate with explicit confidence bounds"
  - "An entity map: accounts, hosts and destinations"
  - "A full super timeline published with its method and filters"
  - "Per-role notes and a portfolio write-up for every contributor"
links:
  - label: "Plaso documentation"
    url: "https://plaso.readthedocs.io/en/latest/"
  - label: "Timesketch — collaborative timeline analysis"
    url: "https://timesketch.org/"
---
## A note before you read on

This is a **constructed training scenario**, written by FORENSYRA. It is not a real incident and contains no victim data. It exists to practise the hardest kind of investigation to get right: one with no dramatic single event to anchor on.

## Scenario

A mid-sized logistics company runs a hybrid estate — some on-premises servers, most of the business in Microsoft 365 and a cloud file store. The trigger is not ransomware or a dramatic alert. A departing contractor is flagged by a colleague, and the security lead wants to know whether anything left the organisation.

There is no single smoking gun. If data left, it left **slowly, in small pieces, over months**, blended with the legitimate cloud traffic the business generates every day.

## What makes this case hard

- **No clear start point.** You cannot anchor a timeline on an event because there is no obvious event.
- **Baseline dependence.** "Abnormal" is only meaningful relative to normal, and normal must be established before hunting begins.
- **Volume estimation.** Saying "roughly 4 GB left" requires being able to defend the word *roughly*.
- **Insider ambiguity.** The line between a careless employee using personal storage and a deliberate exfiltration is drawn by **intent, patterns and volume**, not by a single artefact.

## Evidence

Public practice captures combined with synthetic logs we generate for the scenario:

- A perimeter packet capture covering the incident window.
- Proxy and firewall logs for the same period.
- Cloud audit logs for authentication, sharing and download events.
- An endpoint disk image from the contractor's laptop.
- Authentication logs across both the on-premises directory and cloud identity provider.

## The team

This case is network, cloud, timeline and threat-intelligence heavy. Endpoint work supports rather than leads; the legal role carries unusual weight because the scenario turns on intent.

### Network Forensics Analyst

- Builds the traffic baseline: which destinations, volumes and patterns are normal for this organisation.
- Hunts the outliers — low-and-slow outbound flows, unusual destinations, off-hours transfers.
- Supplies flow records and timestamps to the master timeline.

### Cloud Forensics Analyst

- Reconstructs cloud activity: logins, file access, sharing changes and bulk downloads from the audit logs.
- Identifies which accounts and devices touched which data, and when.
- Documents what the audit logs cannot show — client-side actions leave far less behind.

### Timeline & Forensic Reporting Analyst

- Merges network, cloud, endpoint and authentication events into a single super timeline.
- Publishes the timeline *with its filters and method* so the work is reproducible.
- Writes the narrative that turns thousands of events into a story a manager can follow.

### Threat Intelligence & OSINT Analyst

- Enriches the destinations involved: hosting providers, consumer storage services, infrastructure reputation.
- Distinguishes commercial services from staging infrastructure.
- Maintains the indicator list and the attribution caveats.

### Endpoint Forensics Analyst

- Examines the laptop: browser history, cloud sync clients, USB history and file access artefacts.
- Establishes whether data was staged locally before it left.
- Corroborates or contradicts the cloud audit trail.

### Evidence Custodian & Chain-of-Custody Lead

- Verifies every acquisition against published hashes before analysis starts.
- Maintains the custody log across a case whose evidence spans two providers and a physical disk.
- Re-hashes at close.

### Legal & Digital Evidence Advisor

- Advises on the privacy boundary: what can legitimately be examined about employee activity, and under what authority.
- Frames the intent question honestly, including what the evidence cannot establish.
- Reviews the report for anything that overstates intent.

### Lead Forensic Investigator

- Decides scope after the baseline phase — a judgement that determines whether the case takes three weeks or three months.
- Approves every published finding and every confidence statement.

### Coordinator / Operations Coordinator

- Keeps the baseline phase from expanding indefinitely, which is the main way this case runs over.
- Runs review sessions and maintains the evidence register.

### Memory & Malware Analysis Analyst

- Checks for tooling on the endpoint that could have staged or compressed data.
- Rules malware in or out as an explanation before concluding insider activity.

### Mobile Device Forensics Analyst

- Examines the contractor's phone for notification and application artefacts consistent with cloud access.
- Contributes mobile event timestamps to the timeline where available.

### Multimedia Forensics Analyst

- Examines the file types and metadata of the data believed to have left.
- Assesses whether document metadata in the audit trail is consistent with the claimed downloads.

### AI Forensics & AI Security Analyst

- Uses AI-assisted analysis to surface anomalies in the audit logs at a volume no human reads line by line.
- Documents every false positive and false negative against a manual baseline.
- Writes the method note on where AI-assisted hunting helped and where it misled.

## Plan

Three weeks. Week one builds the baseline and defines scope. Week two hunts and correlates. Week three quantifies, writes and defends. The review session is deliberately adversarial: the network and cloud roles must reconcile their accounts of the same event.

## Output

- A quantified exfiltration estimate with explicit confidence bounds
- An entity map of accounts, hosts and destinations
- A published super timeline with its method and filters
- Per-role notes and portfolio write-ups

## Scope and safety

The scenario runs on synthetic logs and public practice captures. No real employee data is examined and no live tenant is touched. Where the scenario involves monitoring a person's activity, the legal role defines the boundary before any analysis begins, and the limitation is stated in the report.
