// Repairs the discount pills in TodaysBestDeal.
//
// Background: the original extraction regex looked for an ASCII space before '%', but the
// site uses U+00A0 there (as it does in prices), so every percentage pill was dropped.
//
// This script rewrites the `pills:` array of every card from the re-extracted ground truth,
// matched BY INDEX. Index matching is safe because the raw JSON and the component arrays
// were both built from the same DOM order. An earlier version matched on title prefixes and
// over-applied (18 patches for 15 real pills) — never guess at the mapping.
//
// Percentages are never derived from the price pair; only strings the site renders are used.
import { readFileSync, writeFileSync } from 'node:fs';

const RAW = 'docs/research/www.ankernordics.com/raw/';
const FILE = 'src/components/TodaysBestDeal.tsx';

const best = JSON.parse(readFileSync(RAW + 'sec-7-pills-fixed.json', 'utf8')).pills;
const deal = JSON.parse(readFileSync(RAW + 'sec-7-pills-deal.json', 'utf8')).pills;

const lit = (p) => (p.includes(' ') ? '`' + p.replace(/ /g, '${NBSP}') + '`' : `"${p}"`);

let src = readFileSync(FILE, 'utf8');

/** Rewrite the pills arrays inside one `const NAME: readonly Product[] = [ ... ];` block. */
function patchBlock(name, truth) {
  const start = src.indexOf(`const ${name}`);
  if (start < 0) throw new Error(`block ${name} not found`);
  const end = src.indexOf('\n];', start);
  let block = src.slice(start, end);

  let i = 0;
  let count = 0;
  block = block.replace(/pills:\s*\[[^\]]*\]/g, () => {
    const row = truth[i++];
    if (!row) return 'pills: []';
    count++;
    return `pills: [${row.pills.map(lit).join(', ')}]`;
  });

  src = src.slice(0, start) + block + src.slice(end);
  return { cards: i, rewritten: count, truth: truth.length };
}

const a = patchBlock('BEST_SELLER', best);
const b = patchBlock('TODAYS_DEAL', deal);

writeFileSync(FILE, src);

const pctInTruth = [...best, ...deal].filter((r) => r.pills.some((p) => /%/.test(p))).length;
const pctInFile = (src.match(/\$\{NBSP\}%/g) || []).length;

console.log(`BEST_SELLER  cards in file: ${a.cards}  truth rows: ${a.truth}`);
console.log(`TODAYS_DEAL  cards in file: ${b.cards}  truth rows: ${b.truth}`);
console.log(`percentage pills — truth: ${pctInTruth}  in file: ${pctInFile}`);
if (a.cards !== a.truth || b.cards !== b.truth) console.log('!! card count mismatch — inspect before trusting');
if (pctInTruth !== pctInFile) console.log('!! percentage count mismatch');
