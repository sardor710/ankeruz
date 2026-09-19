// Local sink for browser-side extraction payloads.
//
// Tool output is truncated at ~1-2KB, which makes it impossible to move full
// computed-style trees or asset manifests out of the page. Instead the page
// POSTs them straight to disk here.
//
// Chrome treats http://localhost as a potentially-trustworthy origin, so an
// HTTPS page is allowed to fetch it without mixed-content blocking.
//
// Run: node scripts/extract-server.mjs
// From page: await fetch('http://localhost:7777/save?name=foo', {method:'POST', body: JSON.stringify(x)})

import { createServer } from 'node:http';
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT_DIR = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../docs/research/www.ankernordics.com/raw'
);
const PORT = 7777;

await mkdir(OUT_DIR, { recursive: true });

const server = createServer(async (req, res) => {
  // Permissive CORS: this server is bound to loopback and lives only for the
  // duration of an extraction run.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204).end();
    return;
  }
  if (req.method !== 'POST') {
    res.writeHead(405).end('POST only');
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const raw = url.searchParams.get('name') || 'payload';
  // Keep the filename inside OUT_DIR no matter what the page sends.
  const safe = raw.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120);
  const target = resolve(OUT_DIR, safe.endsWith('.json') ? safe : `${safe}.json`);
  if (!normalize(target).startsWith(OUT_DIR)) {
    res.writeHead(400).end('bad name');
    return;
  }

  const chunks = [];
  for await (const c of req) chunks.push(c);
  const body = Buffer.concat(chunks);

  await writeFile(target, body);
  const msg = `saved ${safe} (${body.length.toLocaleString()} bytes)`;
  console.log(msg);
  res.writeHead(200, { 'Content-Type': 'text/plain' }).end(msg);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`extract-server listening on http://localhost:${PORT}`);
  console.log(`writing to ${OUT_DIR}`);
});
