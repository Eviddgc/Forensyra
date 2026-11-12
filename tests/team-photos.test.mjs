import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const expected = {
  'k-akshay-shibu': 'K Akshay Shibu',
  'rashmika-chakravarthy': 'Rashmika Chakravarthy',
  'ravindra-cherakapu': 'Ravindra ch',
  'dokala-sreeja': 'DOKALA SREEJA',
  'gauri-bhasme': 'Gauri B.',
  'tejaswini-mukkamalla': 'Tejaswini Mukkamalla',
  'perumalla-anusha': 'Perumalla Anusha',
  'lasya-sree-reddy': 'B. Lasya Sree Reddy',
  'vani-rayala': 'Vani Rayala',
};
test('requested members have exact display names and local photo assets', () => {
  for (const [slug, name] of Object.entries(expected)) {
    const text = readFileSync(`content/team/${slug}.md`, 'utf8');
    assert.ok(text.includes(`title: "${name}"`), slug);
    const cover = text.match(/^cover: "([^"]+)"$/m)?.[1];
    assert.ok(cover && existsSync(`public${cover}`), slug);
  }
});
test('privacy artwork is shared by the three supplied placeholder files', () => {
  for (const slug of ['gauri-bhasme', 'dokala-sreeja', 'perumalla-anusha']) {
    assert.match(readFileSync(`content/team/${slug}.md`, 'utf8'), /cover: "\/uploads\/team\/member-private.webp"/);
  }
});
test('team roster blocks casual copying and uses protected background photos', () => {
  const roster = readFileSync('src/components/team-roster.tsx', 'utf8');
  const guard = readFileSync('src/components/protected-area.tsx', 'utf8');
  assert.ok(roster.includes('<ProtectedArea>'));
  assert.ok(!roster.includes('<img'));
  for (const handler of ['onContextMenu', 'onDragStart', 'onCopy', 'onCut', 'select-none']) {
    assert.ok(guard.includes(handler), handler);
  }
});
