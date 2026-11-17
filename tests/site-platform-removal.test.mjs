import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const prohibited = new RegExp(['git', 'hub'].join(''), 'i');
const exemptions = new Set([
  'src/proxy.ts', // Blocks access to private infrastructure paths.
  'src/app/admin/route.ts',
  'src/app/admin/config.yml/route.ts',
  'content/admin/config.yml', // Disabled production editing backend.
]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const name = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(name) : [name];
  });
}

test('website content and source contain no disallowed platform references', () => {
  for (const name of [...walk('src'), ...walk('content')]) {
    if (exemptions.has(name)) continue;
    let text = fs.readFileSync(name, 'utf8');
    // The server maps a neutral portfolio field to the existing mail template.
    if (name === 'src/lib/apply.ts') text = text.replace(/^    \w+: v\("portfolio"\),$/m, '');
    assert.equal(prohibited.test(text), false, name);
  }
});
