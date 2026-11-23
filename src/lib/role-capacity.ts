/** Each public role has two seats. A partially occupied role remains open. */
export const ROLE_SEAT_CAPACITY = 2;

// Confirmed full by FORENSYRA before the new member profiles are published.
// Phase 1 is fully filled (2026-11-23): all public roles stay Filled until Phase 2.
const CONFIRMED_FILLED_ROLES = new Set([
  "network-forensics-analyst",
  "mobile-device-forensics-analyst",
  "timeline-forensic-reporting-analyst",
  "memory-malware-analysis-analyst",
  "cloud-forensics-analyst",
  "coordinator-operations",
  "legal-digital-evidence-advisor",
  "multimedia-forensics-analyst",
]);

export function isRoleFilled(memberCount: number, roleSlug?: string): boolean {
  return memberCount >= ROLE_SEAT_CAPACITY ||
    (roleSlug !== undefined && CONFIRMED_FILLED_ROLES.has(roleSlug));
}
