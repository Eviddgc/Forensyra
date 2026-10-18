# Security policy

FORENSYRA is a digital forensics and incident response collective. We take
security seriously — in our own systems and in the way we handle everything
people share with us.

## Reporting a vulnerability

**Please do not open a public issue for a security problem.**

Report privately using either channel:

- GitHub private advisory:
  <https://github.com/Eviddgc/Forensyra/security/advisories/new>
- Email: **forensyra@outlook.in** — put `SECURITY` at the start of the subject.

Please include:

- what the issue is and where it lives (URL, route, file or commit),
- steps to reproduce, or a proof-of-concept,
- the impact you believe it has,
- how you would like to be credited (or say "anonymous").

## What to expect

| Stage | Target |
| --- | --- |
| Acknowledgement of your report | within 3 working days |
| Initial assessment and severity | within 7 working days |
| Fix or mitigation plan | within 30 days for high/critical |

We are a volunteer collective, so these are best-effort targets rather than a
contractual guarantee. We will keep you updated and tell you honestly if
something is going to take longer.

## Scope

In scope:

- `forensyra.com` and its subdomains, and this repository,
- the contact, application and mentor forms and their API routes,
- anything that leaks private data, bypasses validation, or lets one visitor
  affect another.

Out of scope:

- denial-of-service and volumetric attacks,
- social engineering of members,
- vulnerabilities in third-party services (report those upstream),
- findings that require a compromised device, browser extension or account.

## Our commitments

- We will not pursue or support legal action against researchers who act in
  good faith, stay within scope, avoid privacy violations and data destruction,
  and give us reasonable time to fix the issue before disclosure.
- We will not offer payment — we have no bug bounty budget. We will credit you
  in the fix, if you would like.

## Handling data

Never include real case material, personal data, credentials or evidence in a
report. If a proof-of-concept needs data, use synthetic values.

Thank you for helping keep FORENSYRA and its members safe.
