// Downloads the images the d1204 PDP (Liberty 5 Pro Max) actually renders.
//
// Why this exists separately from download-assets.mjs: that script is driven by
// raw/assets.json, a browser-side capture of the homepage. For the PDP the SSR
// HTML carries 3798 image URLs (the whole catalogue + mega-menu) against the 129
// the page paints, so it cannot be used wholesale either.
//
// The filter below is the compromise that avoids piping 129 long CDN URLs back
// through the extraction tool: every asset this PDP paints is named for the
// product (D1204Z11 = black, D1204ZB1 = gold, plus the 1204_black/1204_gold
// swatches and one shared soundcore banner). That yields 227 candidates — a
// superset of the 129 painted, which is fine: extra files are inert, and the
// component specs reference exact filenames.
//
// Run: node scripts/download-pdp-assets.mjs
// Writes public/images/ and merges into docs/research/.../asset-map-pdp-d1204.json
//
// NOTE — VIDEOS ARE NOT HANDLED HERE. The 4 gallery videos are served as HLS
// (.m3u8) from checkout.ankernordics.com with no progressive MP4 rendition
// (probed .HD-1080p/.HD-720p/.SD-480p/.mp4 — all 404) and no ffmpeg is available
// locally to remux. See the PDP topology doc for the open decision.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const RESEARCH = resolve(ROOT, 'docs/research/www.ankernordics.com');
const IMAGES = resolve(ROOT, 'public/images');
const CONCURRENCY = 4;
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

/** Assets this PDP paints are all product-scoped by filename.
 *
 *  `A3875ZQ1` is NOT a d1204 file — it is a cross-sell still that the gallery uses for slides 7
 *  and 20. It was missed by the first version of this filter and only surfaced when the gallery
 *  slide list was read back from the DOM. Any future section that pulls in another product's
 *  artwork needs the same treatment: check the rendered filenames, don't assume the product code. */
const PRODUCT_RE =
  /(D1204|1204_black|1204_gold|D1203Z31_rich-image_elkjop|A3875ZQ1|(^|\/)1203_)/i;

/** Same convention as download-assets.mjs so local names stay consistent. */
function localName(url, taken) {
  let name = decodeURIComponent(basename(new URL(url).pathname));
  const ext = extname(name) || '.bin';
  name = name.slice(0, -ext.length);
  name = name.replace(/_\d{3,4}x$/, '');
  name = name.replace(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}_/i, '');
  name = name.replace(/_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i, '');
  name = name.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  if (!name) name = 'asset';
  name = name.slice(0, 70).toLowerCase();

  let candidate = name + ext;
  let n = 2;
  while (taken.has(candidate)) candidate = `${name}-${n++}${ext}`;
  taken.add(candidate);
  return candidate;
}

async function fetchToFile(url, dest) {
  if (existsSync(dest)) return { url, dest, status: 'cached' };
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) return { url, dest, status: `HTTP ${res.status}` };
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return { url, dest, status: 'ok', bytes: buf.length };
}

async function pool(items, worker) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await worker(items[idx]);
      }
    }),
  );
  return out;
}

const manifest = JSON.parse(
  // Renamed from the generic asset-manifest.json that discover-assets.mjs writes, so the
  // homepage manifest and this PDP one can coexist. Regenerate with:
  //   node scripts/discover-assets.mjs "https://www.ankernordics.com/products/d1204?variant=51328970817814"
  //   mv docs/research/.../asset-manifest.json docs/research/.../asset-manifest-pdp-d1204.json
  await readFile(resolve(RESEARCH, 'asset-manifest-pdp-d1204.json'), 'utf8'),
);

const urls = [
  ...new Set(
    manifest.images
      .filter((u) => PRODUCT_RE.test(u))
      .map((u) => (u.startsWith('http') ? u : `https://${u}`)),
  ),
];

await mkdir(IMAGES, { recursive: true });

// IDEMPOTENCY: seed `taken` EMPTY, not from disk.
//
// Seeding it from the existing directory looked safer but made the script
// non-repeatable: on a second run every name it had already written was "taken",
// so all 231 assets were re-downloaded as `<name>-2.<ext>` duplicates and the
// asset map silently repointed at the copies. Names must be a pure function of
// the URL list, so a re-run reproduces the same names and `fetchToFile` skips
// them as cached.
//
// A name here can in principle collide with a homepage asset. That is fine:
// both come from the same CDN with the same basename, so it is the same image.
const taken = new Set();

const map = {};
const jobs = urls.map((url) => {
  const file = localName(url, taken);
  map[url] = `/images/${file}`;
  return { url, dest: resolve(IMAGES, file) };
});

console.log(`d1204 PDP: ${jobs.length} product-scoped images`);

const results = await pool(jobs, ({ url, dest }) => fetchToFile(url, dest));

let ok = 0;
let cached = 0;
const failed = [];
for (const r of results) {
  if (r.status === 'ok') ok++;
  else if (r.status === 'cached') cached++;
  else failed.push(`${r.status}  ${r.url}`);
}

await writeFile(
  resolve(RESEARCH, 'asset-map-pdp-d1204.json'),
  JSON.stringify(map, null, 2),
);

console.log(`downloaded ${ok}, cached ${cached}, failed ${failed.length}`);
if (failed.length) console.log(failed.slice(0, 10).join('\n'));
console.log('wrote docs/research/www.ankernordics.com/asset-map-pdp-d1204.json');
