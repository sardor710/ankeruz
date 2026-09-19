// Probe: does the SSR HTML of the target page contain the CDN asset URLs?
// Run: node scripts/discover-assets.mjs [url]
const url = process.argv[2] || 'https://www.ankernordics.com/';

const res = await fetch(url, {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
  },
});
const html = await res.text();

// URLs appear both plain and JSON-escaped (\/) inside the Next.js flight payload.
const raw = html.match(/cdn\.shopify\.com(?:\\?\/[^"'\\\s)]+)+/g) || [];
const cleaned = [
  ...new Set(raw.map((u) => u.replace(/\\\//g, '/').split('?')[0].replace(/\\u002F/gi, '/'))),
];

const byExt = (re) => cleaned.filter((u) => re.test(u));
const images = byExt(/\.(png|jpe?g|webp|avif|gif)$/i);
const svgs = byExt(/\.svg$/i);
const videos = byExt(/\.(mp4|webm|mov)$/i);
const fonts = byExt(/\.(ttf|otf|woff2?)$/i);

console.log(`status      ${res.status}`);
console.log(`html bytes  ${html.length.toLocaleString()}`);
console.log(`cdn refs    ${cleaned.length}`);
console.log(`  images    ${images.length}`);
console.log(`  svg       ${svgs.length}`);
console.log(`  videos    ${videos.length}`);
console.log(`  fonts     ${fonts.length}`);
console.log('\nsample images:');
console.log(images.slice(0, 5).map((u) => '  ' + u).join('\n'));
console.log('\nvideos:');
console.log(videos.map((u) => '  ' + u).join('\n'));
console.log('\nfonts:');
console.log(fonts.map((u) => '  ' + u).join('\n'));

await import('node:fs/promises').then((fs) =>
  fs.writeFile(
    new URL('../docs/research/www.ankernordics.com/asset-manifest.json', import.meta.url),
    JSON.stringify({ images, svgs, videos, fonts }, null, 2)
  )
);
console.log('\nwrote docs/research/www.ankernordics.com/asset-manifest.json');
