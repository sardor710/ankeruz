# ProductHero Specification — d1204 PDP (topology #1)

Covers **two** components. Split them at dispatch; they are in one file only because they share
the grid contract.

- `src/components/pdp/ProductGallery.tsx`
- `src/components/pdp/ProductBuyBox.tsx`

- **Source:** `https://www.ankernordics.com/products/d1204?variant=51328970817814`
- **Measured:** 2026-08-06, viewport **1920**, dpr 1
- **Route being built:** `/headphones/earbuds/liberty-5max`

---

## ⚠ BREAKPOINTS ARE INVERTED ON THIS PAGE — READ FIRST

The homepage components in this repo use the site's **min-width** tiers
(`tablet:`768 / `laptop:`1024 / `desktop:`1440 / `lg-desktop:`1920). **The PDP template does not.**
Verified by reading the actual CSS rules:

| Target class | Real media query | Meaning |
|---|---|---|
| `md:` | `@media (max-width: 767px)` | **mobile only** |
| `lg:` | `@media (min-width: 769px) and (max-width: 1024px)` | **tablet band only** |

So `md:hidden` hides on MOBILE, and `hidden md:block` means *hidden on desktop, shown on mobile* —
the opposite of the convention used elsewhere in this repo. Proof: buy-box child 2 (`md:hidden`)
measures 120px tall at 1920 while child 8 (`hidden md:block`) measures 0.

Translate to this project as:

- `md:X` → `max-[767px]:X`
- `lg:X` → `min-[769px]:max-[1024px]:X`

**Do not reuse the `min-[768px]:` / `min-[1440px]:` mapping from the homepage components here.**

---

## Grid contract (topology #1)

```
div.grid.grid-cols-10.gap-[30px].pb-[20px].w-safe
    md:w-full md:grid-flow-row md:gap-[18px] md:px-[24px]
├── ProductGallery   sticky top-0 col-span-6 mr-[30px] max-h-[600px] overflow-hidden
│                    md:aspect-h-1 md:relative md:col-span-10 md:mr-0 md:w-full md:aspect-w-[1.4]
└── ProductBuyBox    col-span-4 md:col-span-10
```

Computed @1920: 10 × 101px columns, `gap: 30px`. Gallery box **726 × 600**, buy box **494 × 977**.
The gallery is `position: sticky; top: 0` — it pins while the buy box scrolls.

---

## 1. ProductGallery

### Structure

```
div.sticky.top-0.col-span-6...                       726 x 600
└── div.flex.h-full.overflow-hidden
    │   [&_.swiper-slide-thumb-active]:opacity-100
    ├── thumb rail   swiper swiper-vertical swiper-free-mode      90 x 600, 24 slides
    └── main stage   swiper swiper-horizontal !ml-[10px] h-full  626 x 600, 24 slides
```

Target uses Swiper. **Do not add Swiper** — reproduce with the CSS scroller pattern already used by
`ProductCarousel.tsx` (`overflow-x-auto` / `overflow-y-auto` + snap + hidden scrollbar). The rail is
vertical, the stage horizontal. Active thumb is `opacity: 1`; inactive thumbs are dimmed (the
`[&_.swiper-slide-thumb-active]:opacity-100` selector implies a lower base opacity — **measure the
inactive value before building**).

### Slides — 24 total, in DOM order

Slides 0–12 are the **Black** colourway, 13–23 the **Gold** colourway. Filenames below are the
target's CDN basenames; the local path is the lowercased, `_3840x`-stripped, UUID-stripped form
produced by `scripts/download-pdp-assets.mjs` — resolve each through
`docs/research/www.ankernordics.com/asset-map-pdp-d1204.json` rather than hand-converting.

| # | Type | Asset |
|---|---|---|
| 0 | img | `1204_black.png` |
| 1 | img | `D1204Z11_Rich_image_TD07_EN_1600_2000_V1.png` |
| 2 | img | `D1203Z31_rich-image_elkjop_NOD_soundcore_03_EN_V1_f8d538e5-….png` |
| 3 | img | `D1204Z11_Rich_image_TD05_EN_1600_2000_V1.png` |
| 4 | img | `D1204Z11_Rich_image_TD09_EN_1600_2000_V1.png` |
| 5 | img | `D1204ZB1_Rich_image_TD04_EN_1600_2000_V1_02a26883-….png` |
| 6 | img | `D1204Z11_Rich_image_TD02_EN_1600_2000_V1.png` |
| 7 | img | `A3875ZQ1_Rich_image_TD03_US_V1_73e370a5-….jpg` |
| 8 | img | `D1204Z11_Rich_image_TD06_EN_1600_2000_V1.png` |
| 9 | img | `D1204ZB1_Rich_image_TD08_US_V1_fce87e00-….png` |
| 10 | **video** | HLS — see below |
| 11 | **video** | HLS |
| 12 | **video** | HLS |
| 13 | img | `1204_gold.png` |
| 14 | img | `D1204ZB1_Rich_image_TD07_EN_1600_2000_V1.png` |
| 15 | img | `D1203Z31_rich-image_elkjop_NOD_soundcore_03_EN_V1_7c2afaed-….png` |
| 16 | img | `D1204ZB1_Rich_image_TD04_EN_1600_2000_V1.png` |
| 17 | img | `D1204ZB1_Rich_image_TD05_EN_1600_2000_V1.png` |
| 18 | img | `D1204ZB1_Rich_image_TD09_EN_1600_2000_V1.png` |
| 19 | img | `D1204ZB1_Rich_image_TD02_EN_1600_2000_V1.png` |
| 20 | img | `A3875ZQ1_Rich_image_TD03_US_V1.jpg` |
| 21 | img | `D1204ZB1_Rich_image_TD06_EN_1600_2000_V1.png` |
| 22–23 | img | `D1204ZB1_Rich_image_TD08_US_V1…` + 1 more — **re-read slides 22–23, the capture truncated** |

> **`A3875ZQ1_*` is NOT covered by the download filter.** `scripts/download-pdp-assets.mjs` filters
> on `/(D1204|1204_black|1204_gold|D1203Z31_rich-image_elkjop)/i`, so slides 7 and 20 were **not
> downloaded**. Add `A3875ZQ1` to `PRODUCT_RE` and re-run before building the gallery.

### The 4 video slides — decided: no video this pass

Sources are HLS only:
`https://checkout.ankernordics.com/cdn/shop/videos/c/vp/<hash>/<hash>.m3u8`, hashes
`81eb4d4257034b36afce7a5971a0c8ee`, `5d1082c9d527466aae189632d0f579ba`,
`d1df7e123e6a44edb57f643a3ec60ac7`, `546bf67bb68742359c2b6290ee39bb1c`.

Measured on the live element: `poster` is **empty**, `controls` is true, `autoplay`/`loop`/`muted`
all false, and `readyState: 0` with `videoWidth/Height: 0` — desktop Chrome cannot decode HLS
natively, so **these slides render as empty players on the target itself**. There is no poster
frame to fall back to, no progressive MP4 (all rendition URLs 404), and no local ffmpeg.

**Build decision:** render only the 20 image slides. Keep the 4 video entries in the slide data
array, typed and flagged unavailable with their HLS URLs in a comment, so a format decision can be
applied later without restructuring. Do **not** substitute a product still for them — that would
fabricate content the target does not show.

### Still to measure before dispatch

- Inactive thumbnail opacity, thumb slide box size and gap.
- Main-stage slide `object-fit` and padding.
- Whether clicking a thumb scrolls the stage (near-certain) and any transition timing.

---

## 2. ProductBuyBox

494px wide, 977px tall @1920. **13 children**, in DOM order:

| # | Class | h | margin-top | Content |
|---|---|---|---|---|
| 0 | `text-balance tracking-[-0.04em] text-[30px] font-bold` | 72 | 0 | `<h1>` title |
| 1 | `relative mt-[16px] flex w-fit` | 21 | 16px | 5 stars + `69 reviews` |
| 2 | `md:hidden` | 120 | 0 | bullet description + `View More` toggle (**desktop copy**) |
| 3 | `mt-[20px] grid gap-[30px]` | 71 | 20px | colour label + 2 swatches |
| 4 | `mt-[18px] flex-col md:items-start` | 29 | 18px | price |
| 5 | `my-4 border border-[#F7F8FA]` | 44 | 14px | installment accordion |
| 6 | `mt-4 grid gap-4 md:gap-[16px]` | 0 | 14px | (empty at 1920) |
| 7 | `mb-[48px]` | 192 | 0 | `Choice` — 2 option cards |
| 8 | `hidden md:block` | 0 | 0 | same description, **mobile copy** (hidden at 1920) |
| 9 | `mt-[24px] bg-white` | 119 | 24px | `Order Support` — 4 badges, 4 icons |
| 10 | — | 0 | 0 | (empty) |
| 11 | `border-t border-[#E8E8E8] px-[8px] py-[16px] md:px-0` | 91 | 0 | `Payment Methods` |
| 12 | — | — | — | **not captured — re-read** |

### Measured typography

| Element | size | weight | line-height | tracking | colour |
|---|---|---|---|---|---|
| `<h1>` title | **30px** | 700 | 36px | **-1.2px** | `rgb(0,0,0)` |
| rating row | 14px | 500 | 16.8px | normal | `rgb(0,0,0)` |
| colour label | 14px | 500 | 16.8px | normal | `rgb(0,0,0)` |

### Colour swatches — click-driven

Two `<button>`s, each **40 × 40**, `border-radius: 9999px`, `border: 1px solid rgb(229,231,235)`.

- **Selected:** `outline: rgb(23, 187, 239) solid 2px` — the site's cyan `#17BBEF`
- **Unselected:** `outline: rgb(255, 255, 255) solid 2px`

Swatch images: `1204_black.png`, `1204_gold.png`.

Selecting a colour swaps the gallery to that colourway's slides (0–12 Black / 13–23 Gold) and
updates the price. **INTERACTION MODEL: click-driven, local component state.**

### Verbatim copy

- Title: `Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case`
  — the separator is **U+FF5C FULLWIDTH VERTICAL LINE**, not ASCII `|`. It appears as ASCII `|` in
  the `Choice` card label and in the `<title>` tag. Both forms are real; do not normalise either.
- Rating: `69 reviews`
- Colour label: rendered `Color: Black`; `textContent` reads `color: Black` — capitalisation comes
  from CSS. Check `text-transform` before choosing the source string.
- Price: `2 690 kr` (space is the thousands separator, U+00A0 likely — verify the code point)
- Installment: `Flexible installment payment options available.`
- `Choice` cards:
  - `Liberty 5 Pro Max | AI Recording Earbuds with Smart Case` — `2 690 kr` (selected)
  - `Liberty 5 Pro | Noise Cancelling Earbuds for Clear Calls` — `2 190 kr`
- Order Support badges: `Fast Shipping`, `30-Day Money-Back Guarantee`, `Hassle-Free Warranty`, +1

### Still to measure before dispatch

- The price element's own font size — the row wrapper reports 14px/500 but it renders far larger;
  the real value is on a child.
- Full bullet-list copy in child 2 and the `View More` toggle's collapsed height / transition.
- `Choice` card box styling (border, radius, selected state).
- Children 9, 11, 12 in detail.
- `Order Support` icon filenames.

---

## Out of scope for this pass

The colour-compare table (topology #20, 1678px) is excluded by explicit decision.
