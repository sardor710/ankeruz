# Responsive system — ankernordics.com

Derived by reading every `@media` rule out of all 19 stylesheets (all same-origin and readable,
0 blocked), ranked by how many rules each query carries. This is authoritative — it does not
depend on sampling the layout at particular viewport widths.

## Breakpoint tiers

Four real cut points. Rule counts either side confirm each is a genuine tier boundary, not incidental.

| Query | Rules | Meaning |
|---|---|---|
| `(max-width: 767px)` | 2128 | **mobile** |
| `(min-width: 768px)` | 1775 | tablet and up |
| `(max-width: 1023px)` | 1108 | mobile + tablet |
| `(min-width: 1024px)` | 1155 | **laptop** and up |
| `(max-width: 1439px)` | 142 | up to laptop |
| `(min-width: 1440px)` | 1036 | **desktop** and up |
| `(max-width: 1919px)` | 110 | up to desktop |
| `(min-width: 1920px)` | 1649 | **lg-desktop** |

Resolving to the tier names used in the markup (`laptop:`, `desktop:`, `lg-desktop:`):

| Tier | Range | Tailwind prefix on the site |
|---|---|---|
| mobile | `0 – 767` | *(unprefixed base)* |
| tablet | `768 – 1023` | `md:` / `(min-width:768px)` |
| laptop | `1024 – 1439` | `laptop:` |
| desktop | `1440 – 1919` | `desktop:` |
| lg-desktop | `≥ 1920` | `lg-desktop:` |

### Cross-check

The section spacers are classed `laptop:h-16 desktop:h-[96px] lg-desktop:h-[128px]`. Measured at
viewport 1920 they were **128px** — matching the `lg-desktop` value. The tier map is correct.

So: `h-16` (64px) at 1024–1439, `96px` at 1440–1919, `128px` at ≥1920.

## Port to our Tailwind v4 config

```css
@theme {
  --breakpoint-tablet: 768px;
  --breakpoint-laptop: 1024px;
  --breakpoint-desktop: 1440px;
  --breakpoint-lg-desktop: 1920px;
}
```

Using the same names as the target keeps ported class strings readable against the original.

## Secondary queries

A long tail of narrower bands exists, mostly from third-party widgets (Judge.me reviews, Swiper)
rather than the site's own design system:

- `(min-width: 1280px)` / `(max-width: 1279px)` — 165 / 554 rules
- `(min-width: 1025px)`, `(min-width: 992px)`, `(max-width: 640px)`, `(max-width: 768px)`

Treat these as noise unless a specific component demonstrably keys off them.

## Extraction status per tier

| Tier | Extracted? | Notes |
|---|---|---|
| lg-desktop (≥1920) | **yes** | Initial pass — topology, colors, fonts, header stack, assets. |
| laptop (1024–1439) | partial | Current window sits at 1296. |
| desktop (1440–1919) | **no** | The skill's nominal baseline. |
| tablet (768–1023) | **no** | |
| mobile (≤767) | **no** | Largest rule count of any tier — 2128. Must not be skipped. |

## Tooling constraint

`resize_window` is **inert** in this environment: it returns
`Successfully resized window ... to WxH` for every call while `outerWidth` never changes.
Verified against 1440, 1000, and 1456 targets, both maximized and restored. There is no
DevTools device-metrics override exposed through this MCP either.

Consequence: viewport changes require the user to drag the Chrome window manually. Because the
tiers are **ranges**, this needs no precision — any width inside a band produces identical CSS.
Landing anywhere in 1440–1919 is enough to capture the whole `desktop` tier.

---

# Root font-size: 14px (affects every rem-based class)

`ankernordics.com` sets `html { font-size: 14px }`. Tailwind's spacing, sizing and type scales
are rem-based, so **the entire utility scale on the target is 0.875× the default**.

Verified two ways: reading `getComputedStyle(document.documentElement).fontSize`, and injecting a
synthetic `<div class="p-4 text-base">` into the live page — it resolved to `padding: 14px`,
`font-size: 14px`, not 16px.

| Class | On target (14px root) | Default (16px root) |
|---|---|---|
| `text-sm` | **12.25px** | 14px |
| `text-base` | **14px** | 16px |
| `gap-2` | **7px** | 8px |
| `gap-3` | **10.5px** | 12px |
| `gap-4` | **14px** | 16px |
| `mt-4` / `pb-4` / `p-4` | **14px** | 16px |
| `px-5` | **17.5px** | 20px |
| `px-7` | **24.5px** | 28px |
| `px-16` | **56px** | 64px |
| `size-5` | **17.5px** | 20px |

## What we did

`src/app/globals.css` sets `html { font-size: 14px }` to match.

**Consequence for every remaining component: port the target's class names verbatim.** They now
resolve to the same pixels they do on the live site. Converting a class to a hardcoded
`px-[17.5px]` is unnecessary and makes the code harder to diff against the source.

## Why this mattered

Caught only because a builder noticed the spec's *verbatim class list* and its *measured computed
values* disagreed — `px-5` alongside a measured `17.5px`. Without the root-size fix, every
component would have rendered ~14% too loose in all spacing, sizing and small type, while each
individual value still looked defensible in isolation. It would have read as "slightly off"
across the whole page with no single obvious culprit.

Any value in a spec written before this discovery that was *derived from a class name* rather
than measured is suspect. Measured values (from `getComputedStyle`) were always correct.

## The rule that follows from this

Dropping our root to 14px fixed every *verbatim ported class*, but it also silently shrank any
**measured pixel value that had been expressed as a Tailwind scale step**. Those were correct at a
16px root and became 12.5% too small the moment the root changed.

| Class | Intended (measured) | After the root change | Correct form |
|---|---|---|---|
| `pl-16` | 64px content inset | 56px | `pl-[64px]` |
| `bottom-10` | 40px pagination offset | 35px | `bottom-[40px]` |
| `h-5` | 20px wordmark height | 17.5px | `h-[20px]` |
| `size-5` | 20px announcement icon | 17.5px | `size-[20px]` |

**Rule: arbitrary `[Npx]` for anything measured; scale steps only when porting a class name
verbatim from the target.**

The distinction is the *provenance* of the number, not its value:

- `gap-3` copied from the target's markup → **keep it**. It resolves to 10.5px here exactly as it
  does there.
- `gap-3` chosen by us to express a measured 12px gap → **wrong**. Write `gap-[12px]`.

All four instances above were found and fixed. Audited `TopBrandBar`, `AnnouncementBar`,
`SiteHeader` and `HeroBannerCarousel`; every remaining scale step in them is a verbatim port.

---

# Spec tables lose invisible characters — always cite the raw JSON

The section-7 prices render as `2 690,00 kr`. Both spaces are **U+00A0**, confirmed against the
raw extraction: `32 a0 36 39 30 2c 30 30 a0 6b 72`. My markdown spec table normalised them to
ASCII `0x20` in transport, and the prose note ("non-breaking space as thousands separator")
contradicted the table sitting right above it.

A builder caught the contradiction, went back to
`docs/research/www.ankernordics.com/raw/sec-7-bestseller.json`, and used U+00A0 — correct.
Had it trusted the table, prices would have been byte-wrong and able to wrap mid-number.

## Rule

**The raw JSON under `raw/` is ground truth for strings. Spec tables are a readable summary and
may lose characters.** Every spec that quotes user-visible text must point the builder at the
raw file and require a programmatic character check on anything suspicious.

I caught the *visible* oddities by eye (the `Al` typo, `×`, en-dashes, curly apostrophes) but
missed the *invisible* one entirely. Eyeballing does not find NBSP.

## Special characters present in the raw extractions

| Character | Appears in |
|---|---|
| U+00A0 NBSP | section-7 prices |
| U+FF5C fullwidth `｜` | product titles ("Liberty 5 Pro Max｜AI…") |
| U+00D7 `×` | hero ("15× Longer-Lasting Suction") |
| U+2019 curly apostrophe | announcement bar, hero, product titles |
| U+2013 en-dash | announcement bar slides |
| U+2014 em-dash | product copy |
| U+2122 `™` | product titles ("HomeBase™ S380", "HydroJet™") |

Verified present in the shipped components: all six checked strings pass
(`AnnouncementBar` en-dash + apostrophe, `HeroBannerCarousel` `×` / `Al` / apostrophe,
`TodaysBestDeal` U+FF5C).

**Sections not yet built that carry these:** `section-content.json` holds `™`, curly apostrophes,
en-dashes and `×` for What's New, Explore All Brands, the brand carousels, RecommendedBy and the
Swedish blog titles. Check each against raw before shipping.

## NBSP bit twice — the second time it hid whole UI elements

After fixing the prices, the *same* U+00A0 silently dropped every discount badge on the page.
My extraction filter was `/^(Hot|New|Best Seller|\d+ %)$/` with an ASCII space, so `29 %`
(`32 39 a0 25`) never matched and 16 badges vanished from the captured data.

The builder was right not to invent them from the price pairs — but the result was a spec that
looked complete and was missing a visible UI element on 16 of 25 cards.

Re-extracted with `\d+\s?%` (JS `\s` does match U+00A0) and patched back in.

**Two rules from this:**

1. When matching site text in an extraction filter, use `\s`, never a literal space.
2. When back-filling data into an already-built component, match **by index** against the raw
   capture, not by title prefix. A first attempt used prefix matching and applied 18 pills where
   only 15 existed — inventing data is worse than missing it. Index matching is safe because the
   raw JSON and the component arrays derive from the same DOM order; it is verifiable by
   comparing counts on both sides, which prefix matching is not.

Final state verified: 25/25 pill arrays byte-match the raw capture, 16 percentage pills.
