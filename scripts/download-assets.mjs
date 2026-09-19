// Downloads every asset the ankernordics.com homepage actually renders.
//
// Source of truth is docs/research/www.ankernordics.com/raw/assets.json, produced by the
// browser-side extraction (the SSR HTML is NOT usable — it carries ~4300 catalogue/mega-menu
// image URLs, vs the 131 the homepage actually paints).
//
// Run: node scripts/download-assets.mjs
// Writes public/images, public/videos, public/fonts, public/seo and an asset-map.json
// that maps original CDN URL -> local path, for the component specs to reference.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const RESEARCH = resolve(ROOT, 'docs/research/www.ankernordics.com');
const CONCURRENCY = 4;
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

// MontForAnker weight -> CDN path. Only the normal styles are ever loaded by the site;
// the italic faces are declared but stay `unloaded`, so we skip them.
const FONTS = {
  500: 'https://cdn.shopify.com/s/files/1/0511/6346/3874/files/MontForAnker-Book.ttf',
  600: 'https://cdn.shopify.com/s/files/1/0511/6346/3874/files/MontForAnker-Regular.ttf',
  700: 'https://cdn.shopify.com/s/files/1/0511/6346/3874/files/MontForAnker-SemiBold.ttf',
  800: 'https://cdn.shopify.com/s/files/1/0511/6346/3874/files/MontForAnker-Bold.ttf',
  900: 'https://cdn.shopify.com/s/files/1/0511/6346/3874/files/MontForAnker-Heavy.ttf',
};

const SEO = [
  'https://www.ankernordics.com/favicon.ico',
  'https://www.ankernordics.com/apple-touch-icon.png',
  'https://www.ankernordics.com/apple-touch-icon-precomposed.png',
  'https://www.ankernordics.com/site.webmanifest',
];

/** Shopify embeds a resize directive in the filename (`foo_3840x.png`). Strip it for a
 *  readable local name, and collapse the UUID prefixes Shopify prepends to uploads. */
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
  const res = await fetch(url, { headers: { 'User-Agent': UA, Referer: 'https://www.ankernordics.com/' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length === 0) throw new Error('empty body');
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return { url, dest, status: 'ok', bytes: buf.length };
}

/** Run jobs with a fixed worker pool so we never open more than CONCURRENCY sockets. */
async function pool(jobs, workers, onDone) {
  const queue = [...jobs];
  const results = [];
  await Promise.all(
    Array.from({ length: workers }, async () => {
      for (;;) {
        const job = queue.shift();
        if (!job) return;
        try {
          const r = await fetchToFile(job.url, job.dest);
          results.push(r);
          onDone(r, null, results.length, jobs.length);
        } catch (err) {
          results.push({ url: job.url, dest: job.dest, status: 'FAILED', error: err.message });
          onDone(null, { job, err }, results.length, jobs.length);
        }
      }
    })
  );
  return results;
}

// ---------------------------------------------------------------- build job list

const assets = JSON.parse(await readFile(resolve(RESEARCH, 'raw/assets.json'), 'utf8'));
const taken = new Set();
const map = {};
const jobs = [];

for (const url of assets.imagesRendered) {
  const isSvg = /\.svg$/i.test(url);
  const file = localName(url, taken);
  const rel = `images/${file}`;
  map[url] = `/${rel}`;
  jobs.push({ url, dest: resolve(ROOT, 'public', rel), kind: isSvg ? 'svg' : 'image' });
}
for (const url of assets.videos) {
  const file = localName(url, taken);
  map[url] = `/videos/${file}`;
  jobs.push({ url, dest: resolve(ROOT, 'public/videos', file), kind: 'video' });
}
for (const [weight, url] of Object.entries(FONTS)) {
  const file = `MontForAnker-${weight}.ttf`;
  map[url] = `/fonts/${file}`;
  jobs.push({ url, dest: resolve(ROOT, 'public/fonts', file), kind: 'font' });
}
for (const url of SEO) {
  const file = basename(new URL(url).pathname);
  map[url] = `/seo/${file}`;
  jobs.push({ url, dest: resolve(ROOT, 'public/seo', file), kind: 'seo' });
}

console.log(`queued ${jobs.length} assets (concurrency ${CONCURRENCY})\n`);

const results = await pool(jobs, CONCURRENCY, (ok, fail, done, total) => {
  const pad = String(done).padStart(3);
  if (ok) {
    const size = ok.bytes ? `${(ok.bytes / 1024).toFixed(0)}kb` : ok.status;
    console.log(`${pad}/${total}  ${ok.status === 'cached' ? 'skip' : 'ok  '} ${basename(ok.dest)} ${size}`);
  } else {
    console.log(`${pad}/${total}  FAIL ${fail.job.url} -> ${fail.err.message}`);
  }
});

const failed = results.filter((r) => r.status === 'FAILED');
const byKind = jobs.reduce((a, j) => ((a[j.kind] = (a[j.kind] || 0) + 1), a), {});

await writeFile(resolve(RESEARCH, 'asset-map.json'), JSON.stringify(map, null, 2));

console.log('\n--- summary ---');
console.log(Object.entries(byKind).map(([k, v]) => `${k}: ${v}`).join('  |  '));
console.log(`ok/cached: ${results.length - failed.length}   failed: ${failed.length}`);
if (failed.length) {
  console.log('\nFAILURES:');
  failed.forEach((f) => console.log(`  ${f.url}\n    ${f.error}`));
}
console.log(`\nwrote ${resolve(RESEARCH, 'asset-map.json')}`);
