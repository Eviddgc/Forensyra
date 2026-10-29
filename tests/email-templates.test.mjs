/**
 * Drift guard: every {{placeholder}} in the EmailJS template docs must be a
 * key the form handlers actually send in template_params.
 *
 * Why this exists: on 2026-10-29 a real mentor application email arrived with
 * only name/email/location/LinkedIn filled — the EmailJS dashboard copy of
 * the template used variable names the server never sends, so EmailJS
 * rendered them blank. The site code was correct; the dashboard was stale.
 * This test keeps the repo's template docs and the code in lockstep so a
 * re-paste of these files into the dashboard always works.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const PLACEHOLDER_RE = /\{\{(\w+)\}\}/g;

function templatePlaceholders(path) {
  const html = readFileSync(path, "utf8");
  return new Set([...html.matchAll(PLACEHOLDER_RE)].map((m) => m[1]));
}

/**
 * Extract the keys of the object literal returned by a builder function.
 * The builders (buildApplyEmailParams / buildMentorEmailParams) return a
 * single object literal with one `key: ...` entry per line at 4-space
 * indent; comments are stripped first so commented-out keys don't count.
 */
function builderParamKeys(sourcePath, builderName) {
  const src = readFileSync(sourcePath, "utf8").replace(/\/\/.*$/gm, "");
  const start = src.indexOf(`function ${builderName}`);
  assert.notEqual(start, -1, `${builderName} not found in ${sourcePath}`);
  const returnIdx = src.indexOf("return {", start);
  assert.notEqual(returnIdx, -1, `${builderName} has no return object`);
  // Match balanced braces from the return object.
  let depth = 0;
  let end = -1;
  for (let i = src.indexOf("{", returnIdx); i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  assert.notEqual(end, -1, `${builderName} return object never closes`);
  const body = src.slice(returnIdx, end);
  return new Set([...body.matchAll(/^\s{4}(\w+):/gm)].map((m) => m[1]));
}

const cases = [
  {
    name: "team application",
    template: "docs/email-templates/team-application.html",
    source: "src/lib/apply.ts",
    builder: "buildApplyEmailParams",
  },
  {
    name: "mentor application",
    template: "docs/email-templates/mentor-application.html",
    source: "src/lib/mentor.ts",
    builder: "buildMentorEmailParams",
  },
];

for (const { name, template, source, builder } of cases) {
  test(`${name}: every template placeholder is sent by ${builder}`, () => {
    const placeholders = templatePlaceholders(template);
    const sent = builderParamKeys(source, builder);
    const missing = [...placeholders].filter((p) => !sent.has(p));
    assert.deepEqual(
      missing,
      [],
      `${template} references {{${missing.join("}}, {{")}}} but ${builder} never sends them — EmailJS would render those fields blank`,
    );
  });
}
