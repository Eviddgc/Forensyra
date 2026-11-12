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
