import test from "node:test";
import assert from "node:assert/strict";
import { cn, formatDate, phaseLabel } from "../src/lib/utils.ts";

test("cn joins truthy class names", () => {
  assert.equal(cn("a", "b"), "a b");
});

test("cn skips falsy values", () => {
  assert.equal(cn("a", false, null, undefined, "b"), "a b");
});

test("cn returns an empty string when nothing is passed", () => {
  assert.equal(cn(), "");
});

test("formatDate renders a human date", () => {
  assert.equal(formatDate("2026-01-05"), "Jan 5, 2026");
});

test("formatDate returns an empty string for no input", () => {
  assert.equal(formatDate(undefined), "");
  assert.equal(formatDate(""), "");
});

test("formatDate passes through unparseable input", () => {
  assert.equal(formatDate("not a real date"), "not a real date");
});

test("phaseLabel falls back to Open", () => {
  assert.equal(phaseLabel(undefined), "Open");
  assert.equal(phaseLabel(""), "Open");
});

test("phaseLabel prefixes a bare number", () => {
  assert.equal(phaseLabel(1), "Phase 1");
  assert.equal(phaseLabel("2"), "Phase 2");
});

test("phaseLabel leaves an explicit phase label alone", () => {
  assert.equal(phaseLabel("Phase 3"), "Phase 3");
});
