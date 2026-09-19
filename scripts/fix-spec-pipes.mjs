// Two product titles contain a raw ASCII '|', which splits their markdown table row into
// extra columns and misaligns title/pills/price for those products. Escape it.
// (A third title uses the fullwidth '｜' U+FF5C, which is safe and must NOT be touched.)
import { readFileSync, writeFileSync } from 'node:fs';

const path = 'docs/research/components/todays-best-deal.spec.md';
let spec = readFileSync(path, 'utf8');

// Only inside backticked cells of numbered table rows.
spec = spec.replace(/^(\| \d+ \| `)([^`]*)(`)/gm, (_m, head, title, tail) => head + title.replace(/\|/g, '\\|') + tail);

writeFileSync(path, spec);

const rows = [...spec.matchAll(/^\| \d+ \| `([^`]*)`/gm)].map((m) => m[1]);
const unescaped = rows.filter((t) => /(?<!\\)\|/.test(t));
console.log(`table rows: ${rows.length}`);
console.log(`titles with unescaped ASCII pipe: ${unescaped.length}`);
unescaped.forEach((t) => console.log('  ' + t));
console.log(`titles containing fullwidth U+FF5C (left as-is): ${rows.filter((t) => t.includes('｜')).length}`);
