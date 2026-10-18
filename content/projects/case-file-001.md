---
title: "Case File 001 — The Data Leakage Investigation"
description: "Our flagship project: a complete insider-threat investigation built on public evidence from NIST's CFReDS project."
date: 2026-10-10
updated: 2026-10-18
status: "Planning"
caseType: "Mock case"
pinned: true
tags: ["Mock case", "Disk", "USB", "CD", "Insider threat"]
evidence: ["Disk image", "USB artifacts", "CD image", "System logs", "Cloud sync records"]
plan:
  - label: "Week 1 — Acquisition & endpoint"
    detail: "Acquire the published images, verify every copy against its hash, then analyse the Windows 7 disk: filesystem, registry, event logs and browser history."
  - label: "Week 2 — Cross-artefact correlation"
    detail: "Correlate USB connection and removal artefacts, CD-burning activity, email and cloud-sync records across the endpoint and removable media."
  - label: "Week 3 — Timeline, report & review"
    detail: "Build the master incident timeline, write the report, and close with a 60-minute review where each role defends its findings."
deliverables:
  - "One final investigation report, planned for public release on GitHub"
  - "Per-role analysis notes and artefacts"
  - "A reconstructed incident timeline"
  - "A short portfolio write-up for every member"
links:
  - label: "NIST CFReDS — reference datasets"
    url: "https://www.cfreds.nist.gov/"
---
## Intro

Our flagship project: a complete insider-threat investigation built on public evidence from NIST's CFReDS project.

Every role in the collective has a defined job in this case, and the findings come together in a single final report.

## Scenario

A manager at a technology company secretly accepts money from a rival to leak confidential research. He plans it carefully: he discusses the deal over email, sends sample files through his personal cloud storage, and copies the rest onto USB drives and a CD. To cover his tracks he renames files to look harmless and runs secure-deletion tools.

At the company security checkpoint his devices are seized and sent to the forensic lab. Our job is to find the evidence of the leak and reconstruct exactly what he did, step by step.

## Evidence

Around 6 GB of public, legal practice images from the NIST CFReDS Data Leakage Case, free to download and documented with published hash values.

- A Windows 7 PC disk image (20 GB drive, about 5 GB compressed)
- Two USB drive images (4 GB each)
- A CD image (700 MB CD-R)
- Seed files and reference hash lists to verify every copy

The case ships in DD and EnCase formats, and NIST publishes a reference solution, so we can check our findings against the ground truth. Source: NIST CFReDS Data Leakage Case.

## The team

All 13 roles have a defined job in this case. The evidence is disk and removable media, so the leadership, custody, endpoint, timeline, intelligence, legal and coordination roles drive the investigation. Where an artefact touches another speciality, such as cloud sync records or disguised media files, that role takes the thread. The remaining roles support with method review, tooling notes and quality checks on the final report.

### Lead Forensic Investigator

- Sets the case direction, assigns work and validates every finding before publication.
- Reviews and approves the final investigation report.
- Holds decision authority on scope, timelines and deliverables.

### Evidence Custodian & Chain-of-Custody Lead

- Acquires the NIST CFReDS images and verifies them against the published hash values.
- Hashes every artefact and working copy (SHA-256) and records them in a custody log.
- Maintains the evidence register and protects working copies from modification.
- Issues verified copies to analysts on request.

### Endpoint Forensics Analyst

- Analyses the Windows 7 disk image: filesystem, registry, event logs and browser history.
- Identifies USB connection and removal artefacts and CD-burning activity.
- Recovers deleted files and traces the anti-forensic tools used to hide the leak.
- Documents all findings with timestamps and source artefacts.

### Timeline & Forensic Reporting Analyst

- Builds the master incident timeline from endpoint, USB, email and cloud events.
- Correlates artefacts across roles into a single chronological narrative.
- Converts validated findings into the final report, slides and case documentation.

### Threat Intelligence & OSINT Analyst

- Enriches suspicious domains, URLs, hashes and filenames found in the evidence.
- Researches the attacker tooling and methods referenced in the artefacts.
- Maintains the indicator list and attribution notes.

### Legal & Digital Evidence Advisor

- Reviews the case for legal and ethical soundness, consent and privacy.
- Advises on admissibility concepts and evidence-handling standards.
- Confirms that only public, legal sample evidence is used throughout.

### Coordinator / Operations Coordinator

- Runs meetings, tracks tasks, onboards members and sends announcements.
- Maintains the case board and keeps the team on schedule.
- Coordinates the final review session.

### Network Forensics Analyst

Supporting in this case

- Extracts the network artefacts stored on the disk: browser history, webmail and cloud sync records.
- Maps the exfiltration channels the suspect used or researched.
- Supplies network-related events to the master timeline.

### Memory & Malware Analysis Analyst

Supporting in this case

- Examines the executables recovered from the disk, including the secure-deletion and cleaning tools.
- Documents how each tool behaves and what traces it leaves behind.
- Shares tool hashes and behaviour notes with the Evidence Custodian.

### Cloud Forensics Analyst

Supporting in this case

- Investigates the cloud-storage artefacts on the disk: sync databases, cached sessions and upload records.
- Reconstructs how personal cloud storage was used to move the sample files.
- Contributes cloud events to the master timeline.

### Mobile Device Forensics Analyst

Supporting in this case

- No phone is in scope for this case, so this role backs artefact correlation and documentation.
- Prepares the mobile acquisition and analysis playbook for a future case.

### Multimedia Forensics Analyst

Supporting in this case

- Examines the media files in the evidence for metadata, integrity and editing signs.
- Assesses the disguised files: confidential documents renamed as images and audio.
- Documents media findings for the final report.

### AI Forensics & AI Security Analyst

Supporting in this case

- Tests where AI-assisted triage can speed up keyword, timeline and artefact review.
- Documents the limits and risks of AI assistance inside a forensic workflow.
- Provides the AI-in-forensics write-up for the published report.

## Plan

A three-week pilot. Week one: acquisition, hashing and endpoint analysis. Week two: cross-artefact correlation across USB, CD, email and cloud evidence. Week three: timeline, reporting and review. The case closes with a 60-minute final review where each role defends its findings.

## Output

- One final investigation report, planned for public release on GitHub
- Per-role analysis notes and artefacts
- A reconstructed incident timeline
- A short portfolio write-up for every member

## Scope and safety

This case uses only public, legal practice material from NIST CFReDS. No real victim data, no live systems and no unauthorised investigation. We handle every artefact under chain-of-custody rules as if it were real evidence.

## What changed and why

1. Scenario corrected to the real NIST case: an insider recruited by a rival, using email, cloud storage, USB and a CD, caught at a security checkpoint. The old text mentioned only USB drives and CDs.
2. Evidence list fixed: it is a 20 GB Windows 7 PC image plus two USB images, a CD image, seed files and hash lists, about 6 GB in total. The old text said USB artifacts and supporting logs, which understates it.
3. Supporting roles rewritten to match the evidence: this case has no network capture, RAM dump or phone, so those roles now have honest jobs tied to artefacts that actually exist.
4. Tense fixed to planning language: the investigation has not run yet, so analysed and published became planned wording.
5. Team size softened to all 13 roles until recruitment is confirmed.
6. Added the source link, the NIST reference solution and the anti-forensic angle, which is the most interesting part of this case for a visitor.

Case facts checked against NIST CFReDS on 18 Oct 2026. The schedule and the GitHub release are plans, not commitments.
