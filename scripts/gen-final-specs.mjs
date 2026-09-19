// Generates the last two spec files from the raw capture.
//   docs/research/components/content-sections.spec.md  (#12, #35, #38)
//   docs/research/components/site-footer.spec.md        (footer)
// All non-ASCII is emitted as \uXXXX. The Swedish blog titles are dense with
// å/ä/ö/– and must not be normalised in transport.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const RAW = 'docs/research/www.ankernordics.com/raw/';
const fin = JSON.parse(readFileSync(RAW + 'sections-final.json', 'utf8'));
const foot = JSON.parse(readFileSync(RAW + 'footer.json', 'utf8'));
const map = JSON.parse(readFileSync('docs/research/www.ankernordics.com/asset-map.json', 'utf8'));

const byBase = {};
for (const [k, v] of Object.entries(map)) byBase[k.split('/').pop().split('?')[0]] = v;
const keys = Object.keys(byBase);
const local = (f) => {
  if (!f) return null;
  const base = f.split('/').pop();
  if (byBase[base]) return byBase[base];
  const stem = base.replace(/_\d{3,4}x(?=\.)/, '').replace(/\.[a-z]+$/i, '');
  const hit = keys.find((k) => k.startsWith(stem.slice(0, 28)));
  return hit ? byBase[hit] : null;
};
const esc = (s) =>
  String(s ?? '').replace(/[^\x20-\x7E]/g, (c) => '\\u' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0'));
const cell = (v) => (v ? '`' + esc(v).replace(/\|/g, '\\|') + '`' : '—');

const HDR = `> Generated from the raw browser capture — no string was retyped.
> **Every \`\\uXXXX\` escape is a real non-ASCII character; reproduce that exact code point.**
> Root font-size is 14px: port site class names verbatim, use arbitrary \`[Npx]\` for measured values.
> Custom breakpoints are unregistered — translate \`tablet:\`/\`laptop:\`/\`desktop:\`/\`lg-desktop:\`
> to \`min-[768px]:\`/\`min-[1024px]:\`/\`min-[1440px]:\`/\`min-[1920px]:\`.
`;

// ---------------------------------------------------------------- content sections
let missing = 0;
const rows = (arr, cols) =>
  arr
    .map((c, i) => {
      const lp = local(c.img);
      if (c.img && !lp) missing++;
      return (
        `| ${i + 1} | ` +
        cols
          .map((k) =>
            k === 'img' ? cell(lp || (c.img ? 'MISSING:' + c.img : null)) : cell(c[k])
          )
          .join(' | ') +
        ' |'
      );
    })
    .join('\n');

const cs = `# Content Sections Specification (#12, #35, #38)

${HDR}
Three independent components. Section background \`#F5F5F7\` unless noted.

---

## 1. ExploreAllBrands (#12) → \`src/components/ExploreAllBrands.tsx\`

Height **${fin.s12.h}px** @1920. Heading \`${esc('Explore All Brands during Sale')}\` — reuse the
existing \`SectionHeading\` component (48px @1920 / 40px desktop / 32px base).

Grid: \`${fin.s12.gridCls || 'grid grid-cols-12 gap-3 laptop:gap-4'}\`

**2 visible panels** (each ~825x641 @1920), same \`item-wrapper\` pattern as \`BrandVideoHero\`:
each has desktop and mobile image variants both present in the DOM, toggled by CSS.

| # | Title | Description | Image | href |
|---|---|---|---|---|
${rows(fin.s12.panels, ['t', 'd', 'img', 'href'])}

---

## 2. RecommendedBy (#35) → \`src/components/RecommendedBy.tsx\`

Height **${fin.s35.h}px** @1920. Heading \`${esc('RECOMMENDED BY')}\` — note it is **uppercase in the
source content**, not via \`text-transform\`. Reuse \`SectionHeading\`.

Press / creator quote cards, ${fin.s35.cards.length} of them, horizontally scrollable.

| # | Quote | Detail | Image | href |
|---|---|---|---|---|
${rows(fin.s35.cards, ['t', 'd', 'img', 'href'])}

---

## 3. FeaturedBlogs (#37 heading + #38 cards) → \`src/components/FeaturedBlogs.tsx\`

Heading \`${esc('Featured Blogs and News')}\` (#37, 69px tall) — reuse \`SectionHeading\`.
Cards block (#38) is **${fin.s38.h}px** tall, classes \`${fin.s38.cls.slice(0, 60)}\`.

**All copy is Swedish** — this is the Nordics storefront. Titles are dense with
\`\\u00E5\` (å), \`\\u00E4\` (ä), \`\\u00F6\` (ö) and \`\\u2013\` (en-dash). Reproduce exactly; do not
translate, transliterate, or ASCII-fold.

| # | Title | Excerpt | Image | href |
|---|---|---|---|---|
${rows(fin.s38.cards, ['t', 'd', 'img', 'href'])}

---

## Implementation notes

- Reuse \`SectionHeading\` for all three headings — do not re-implement it.
- No new dependencies; CSS \`overflow-x-auto\` + scroll snap for the scrollable rows.
- Prefer server components.

## Verification

\`npx tsc --noEmit\` must exit 0. Confirm every \`/images/...\` path exists under \`public/\`,
and that the Swedish characters survived by code point.
`;

writeFileSync('docs/research/components/content-sections.spec.md', cs);

// ---------------------------------------------------------------- footer
const colBlocks = foot.cols.filter((c) => /^(Company|Program|Support)$/.test(c.head));
const fs = `# SiteFooter Specification

${HDR}
- **Target file:** \`src/components/SiteFooter.tsx\`
- Height **${foot.h}px** @1920, background \`${foot.bg}\` (transparent — inherits the page)
- ${foot.imgs.length} images, ${foot.svgCount} inline SVGs

## Headings

${foot.heads.map((h) => `- \`${esc(h.t)}\` — ${h.tag}, ${h.fs}/${h.fw}, lh ${h.lh}`).join('\n')}

## Newsletter form

Inputs present:

${foot.inputs.map((i) => `- \`<input type="${i.type}"${i.name ? ` name="${i.name}"` : ''}${i.ph ? ` placeholder="${esc(i.ph)}"` : ''}>\``).join('\n')}

Submit button: \`Sign Up\`.

> **Scope:** this clone has no backend. Render the form with correct markup and styling but
> **do not wire up submission** — no fetch, no action, no third-party endpoint. Give the
> \`<form>\` an \`onSubmit\` that calls \`preventDefault()\` and nothing else, or omit the handler.
> Do not add tracking, analytics, or a mail provider.

## Link columns

${colBlocks
  .map(
    (c) =>
      `### ${esc(c.head)}\n\n| Label | href |\n|---|---|\n` +
      c.links.map((l) => `| ${cell(l.t)} | ${cell(l.href)} |`).join('\n')
  )
  .join('\n\n')}

## Country selector

Button labelled \`Sweden\`. Uses the \`GlobeIcon\` from \`src/components/icons.tsx\`.
Render as a static button — **do not build a working locale switcher**, there are no other
locales in scope.

## Brand marks

Use these already-extracted icon components from \`@/components/icons\`:
\`AnkerNordicsFooterLogo\` (98x36), \`AnkerFooterWordmark\` (87x36), \`EufyFooterWordmark\` (68x36),
\`EufyMakeFooterWordmark\` (140x36), \`SoundcoreFooterWordmark\` (138x36).

Social icons are downloaded PNGs under \`public/images/\` (\`icon_instagram.png\`,
\`icon_tiktok-2.png\`, \`icon_linkedin.png\`, \`icon_youtube-2.png\`, plus support/email/voice icons).

## Bottom bar

${foot.bottomText.map((t) => `- \`${esc(t)}\``).join('\n')}

## Verification

\`npx tsc --noEmit\` must exit 0. Confirm no network call or form action was added.
`;

writeFileSync('docs/research/components/site-footer.spec.md', fs);

const allImgs = [...fin.s12.panels, ...fin.s35.cards, ...fin.s38.cards].map((c) => local(c.img)).filter(Boolean);
console.log(`content sections — cards: ${fin.s12.panels.length + fin.s35.cards.length + fin.s38.cards.length}`);
console.log(`  images resolved: ${allImgs.length}, on disk: ${allImgs.filter((p) => existsSync('public' + p)).length}`);
console.log(`  unresolved: ${missing}`);
console.log(`footer — link columns: ${colBlocks.length}, inputs: ${foot.inputs.length}`);
console.log(`non-ASCII escaped: content ${(cs.match(/\\u[0-9A-F]{4}/g) || []).length}, footer ${(fs.match(/\\u[0-9A-F]{4}/g) || []).length}`);
