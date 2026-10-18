import test from "node:test";
import assert from "node:assert/strict";
import { searchDocs } from "../src/lib/search-core.ts";

const docs = [
  {
    title: "Case File 001",
    description: "A USB drive and a stolen laptop.",
    href: "/projects/case-file-001",
    kind: "Case file",
    tags: ["disk", "usb"],
  },
  {
    title: "Memory forensics basics",
    description: "Processes, handles and injected code.",
    href: "/writeups/memory-forensics-basics",
    kind: "Write-up",
    tags: ["memory"],
  },
  {
    title: "Volatility 3",
    description: "Memory forensics framework.",
    href: "https://github.com/volatilityfoundation/volatility3",
    kind: "Resource",
    tags: ["memory", "tools"],
  },
];

test("an empty query returns the first N docs", () => {
  assert.equal(searchDocs(docs, "", 2).length, 2);
  assert.equal(searchDocs(docs, "").length, 3);
});

test("an exact title match ranks first", () => {
  const [top] = searchDocs(docs, "volatility 3");
  assert.equal(top.href, "https://github.com/volatilityfoundation/volatility3");
});

test("matching is case-insensitive and matches tags", () => {
  const results = searchDocs(docs, "USB");
  assert.equal(results.length, 1);
  assert.equal(results[0].kind, "Case file");
});

test("description matches are found", () => {
  const results = searchDocs(docs, "injected");
  assert.equal(results.length, 1);
  assert.equal(results[0].title, "Memory forensics basics");
});

test("no match returns nothing", () => {
  assert.deepEqual(searchDocs(docs, "zzzzz"), []);
});

test("the result limit is respected", () => {
  assert.equal(searchDocs(docs, "memory", 1).length, 1);
});
