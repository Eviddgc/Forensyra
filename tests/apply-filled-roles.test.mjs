import test from "node:test";
import assert from "node:assert/strict";
import { APPLY_FIELDS, FILLED_ROLE_MESSAGE, validateApply } from "../src/lib/apply.ts";

const roleField = APPLY_FIELDS.find((field) => field.name === "roleFirst");
const filledRoles = roleField.options.filter((option) => option.filled).map((option) => option.value);
const openRoles = roleField.options.filter((option) => !option.filled).map((option) => option.value);

test("the four filled roles are locked in the form schema", () => {
  assert.deepEqual(filledRoles.sort(), [
    "AI Forensics & AI Security Analyst",
    "Endpoint Forensics Analyst",
    "Evidence Custodian & Chain-of-Custody Lead",
    "Threat Intelligence & OSINT Analyst",
  ]);
});

test("a filled role is rejected with the Phase 2 notice", () => {
  for (const role of filledRoles) {
    const { errors } = validateApply({ roleFirst: role });
    assert.equal(errors.roleFirst, FILLED_ROLE_MESSAGE);
  }
});

test("open roles and the unsure option still pass validation", () => {
  for (const role of openRoles) {
    const { errors } = validateApply({ roleFirst: role });
    assert.equal(errors.roleFirst, undefined);
  }
});
