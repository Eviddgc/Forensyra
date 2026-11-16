import test from "node:test";
import assert from "node:assert/strict";
import { isRoleFilled, ROLE_SEAT_CAPACITY } from "../src/lib/role-capacity.ts";

test("each role has two seats", () => {
  assert.equal(ROLE_SEAT_CAPACITY, 2);
});

for (const [count, filled] of [[0, false], [1, false], [2, true], [3, true]]) {
  test(`${count} members: role is ${filled ? "Filled" : "Open"}`, () => {
    assert.equal(isRoleFilled(count), filled);
  });
}

test("confirmed Network seats stay filled before member profiles are published", () => {
  assert.equal(isRoleFilled(0, "network-forensics-analyst"), true);
  assert.equal(isRoleFilled(1, "network-forensics-analyst"), true);
  assert.equal(isRoleFilled(0, "mobile-device-forensics-analyst"), false);
});
