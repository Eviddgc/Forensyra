/** Each public role has two seats. A partially occupied role remains open. */
export const ROLE_SEAT_CAPACITY = 2;

// Confirmed full by FORENSYRA before the new member profiles are published.
const CONFIRMED_FILLED_ROLES = new Set([
  "network-forensics-analyst",
  "mobile-device-forensics-analyst",
]);

export function isRoleFilled(memberCount: number, roleSlug?: string): boolean {
  return memberCount >= ROLE_SEAT_CAPACITY ||
    (roleSlug !== undefined && CONFIRMED_FILLED_ROLES.has(roleSlug));
}
