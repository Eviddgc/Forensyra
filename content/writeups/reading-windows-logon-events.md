---
title: "Reading Windows Logon Events"
description: "Event IDs 4624, 4625 and 4648 are the backbone of Windows authentication analysis. Here is what each field actually tells you."
date: 2026-10-16
status: "Published"
author: "Forensyra"
tags: ["Windows", "Event logs", "Artefacts"]
---
The Security log is the noisiest and most useful artefact on a Windows host. Authentication events are where most timelines begin.

## The IDs that matter most

- **4624** — an account was successfully logged on.
- **4625** — an account failed to log on.
- **4634 / 4647** — logoff initiated by the system / by the user.
- **4648** — a logon was attempted using explicit credentials, such as `runas` or `net use`.

A 4624 on its own is close to meaningless — there are thousands per day. The context is in the logon type and the source.

## Logon types

- **Type 2 — Interactive.** Someone at the keyboard.
- **Type 3 — Network.** A share or service connection from another host.
- **Type 4 — Batch.** A scheduled task.
- **Type 5 — Service.** A service account starting.
- **Type 7 — Unlock.** A locked workstation was unlocked.
- **Type 8 — Network cleartext.** Credentials sent unencrypted.
- **Type 9 — New credentials.** `runas /netonly`.
- **Type 10 — RemoteInteractive.** RDP or Terminal Services.
- **Type 11 — CachedInteractive.** Logon using cached credentials, no domain controller reachable.

A 4624 with logon type 10 on an ordinary workstation at 03:00 is a story. Type 3 is background noise from every file-share connection on the network.

## The fields that carry the weight

- **Subject vs New Logon.** The subject is who *caused* the event; the new logon is who was *authenticated*. They differ during impersonation.
- **Logon GUID.** Ties a 4624 to the 4672 (special privileges assigned) that follows it.
- **Source Network Address.** The originating IP for remote logons. An internal address still matters — it points at another host.
- **Logon Process and Authentication Package.** `Kerberos`, `NTLM`, `Negotiate`, `Advapi`. Kerberos on a workstation is normal; NTLM to a server in 2026 is worth a look.
- **Workstation Name.** Useful, but it is self-reported and can be spoofed.

## Common traps

**Treating type 3 as suspicious.** It is the default for almost everything. Filter it out before you start, then go back deliberately.

**Reading "4625" as a brute-force attack.** A handful of failures before a success is a typo. Thousands from one source across many accounts is an attack. Context decides.

**Ignoring the clock.** Windows logs in UTC in the XML but the Event Viewer displays local time. Establish the host's time zone and whether it was synchronised before you anchor a timeline to a single entry.

**Forgetting retention.** Domain controllers overwrite the Security log quickly under load. If the logs were not archived, the evidence may simply not exist — and saying so is part of an honest report.
