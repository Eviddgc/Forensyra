/** Each public role has two seats. A partially occupied role remains open. */
export const ROLE_SEAT_CAPACITY = 2;

export function isRoleFilled(memberCount: number): boolean {
  return memberCount >= ROLE_SEAT_CAPACITY;
}
