---
title: "Order of Volatility, in Practice"
description: "RFC 3227 gives us a priority order for collecting evidence. Here is what it really says, and the mistakes we still see in lab exercises."
date: 2026-10-18
status: "Published"
author: "Forensyra"
tags: ["Fundamentals", "Evidence handling", "Method"]
---
Every analyst learns the order of volatility early. It is also the rule people quote most often and apply least carefully.

## What the order actually says

RFC 3227 lists the evidence classes in the order they disappear, not the order they matter:

1. CPU registers and cache
2. Routing tables, ARP cache, process table, kernel statistics, memory
3. Temporary filesystems and swap space
4. Disk (the physical medium)
5. Remote logging and monitoring data
6. Network topology and configuration
7. Archival media

The logic is simple: capture what you lose first. RAM is gone the moment the machine loses power. A disk image will still be there tomorrow.

## Where people get it wrong

**Imaging the disk first because it feels like the evidence.** The disk is the most familiar artefact and the easiest to hand over, so it becomes the first thing a nervous analyst reaches for. By the time the image is complete, the memory has been overwritten by the imaging tool's own process.

**Treating the order as a ranking of importance.** It is not. The order tells you what to capture first, not what deserves the most analysis. A single event log entry can decide a case that a memory dump never touches.

**Ignoring the exceptions.** If the machine is already powered off, the order is moot — the volatile data is gone and the disk is the priority. If you believe encryption is about to be triggered on a live host, capturing the key material in memory outweighs almost everything else. Both are legitimate deviations.

## A workable capture checklist

- Photograph and document the scene before touching anything.
- Decide and write down: live acquisition, or pull the plug?
- Capture memory first, then volatile network state, then the disk.
- Hash memory and disk images at acquisition and record the values.
- Record the system clock and time zone before you trust any timestamp.
- Note every decision in the case log as you make it, not afterwards.

## Recording the decision

The order of volatility is a default, not a legal requirement. What matters in the report is that you can explain why you did what you did, in what order, and what the alternative would have cost you. A one-line entry — "memory captured before disk because the host was live and encryption was a risk" — is worth more than a page of theory.
