# Page Topology — d1204 PDP (Liberty 5 Pro Max)

- **Source:** `https://www.ankernordics.com/products/d1204?variant=51328970817814`
- **Target route:** `/headphones/earbuds/liberty-5max`
- **Captured:** 2026-08-06, viewport 1920, dpr 1
- **Page title:** `Liberty 5 Pro Max | AI Note-Taker Earbuds & Smart Case`
- **Total height:** **22 019px** (content wrapper 20 641px)
- **Counts:** 129 `<img>` (all lazy-loaded ones forced in), 8 `<video>`, 4 unique video sources

Same stack as the homepage: headless Shopify + Next.js + Tailwind with the site's
`tablet/laptop/desktop/lg-desktop` tiers and the 14px root. The existing `SiteHeader`,
`TopBrandBar`, `AnnouncementBar` and `SiteFooter` components apply unchanged.

> **No Shopify AJAX API.** `/products/d1204.js` returns the Next.js 404 shell (14MB), so
> variant/price data must come from the DOM, not `product.js`.

## Top-level blocks

The content wrapper (`main > div.pb-[100px]`) has **24 children**. Blocks under 15px are omitted.

| # | y | h | Working name | Media | Interaction |
|---|---|---|---|---|---|
| 0 | 171 | 17 | **Breadcrumb** — `Home / Earbuds / Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case` | — | static |
| 1 | 200 | 997 | **ProductHero** — 10-col grid, `gap-[30px]` | 50 img, 8 video | see below |
| 2 | 1196 | 317 | **YouMayAlsoLike** — "You may also like", 4 product cards | 8 img | scroll row |
| 11 | — | 76 | **StickyBuyBar** — `fixed bottom-0 z-20 w-full bg-white py-[16px]` | — | always-on overlay |
| 12 | 1514 | 649 | **SeeItInAction** — creator quotes ("Mike O'Brien｜These earbuds are aim…") | 4 img | static |
| 13 | 2163 | 1278 | **FeatureNav + Overview** — `Overview / Instant Pure Silence / Whisper-Clear Call…` | 7 img | **sub-nav, model TBD** |
| 14 | 3440 | 1056 | **SmartScreenFeature** — "The World's First Smart Screen Earbuds with AI…" | 2 img | static |
| 15 | 4495 | 1056 | (unnamed feature panel) | 2 img | static |
| 16 | 5551 | 872 | **ThusChip** — "ANKER Thus™ AI Chip / 150x Power" | 2 img | static |
| 17 | 6423 | 872 | **ClearestCalls** — "World's Clearest Earbuds for Calls" | 2 img | static |
| 18 | 7294 | **9452** | **SensorsMegaSection** — "10 Sensors + ANKER Thus™ Make Your Voice Clear…" | 17 img | **largest block — must be split** |
| 19 | 16746 | 872 | **ProductInformation** — "Seamless Triple-Device Connection…" | 4 img | static |
| 20 | 17617 | 1678 | **CompareTable** — "Compare Color: / AI Note-Taker / Drivers / Playtime / Sound…" | 16 img | click (colour compare) |
| 21 | 19296 | 71 | (spacer//divider) | — | — |

Blocks 3–10 are zero/near-zero height (portals, modals, and the sticky-bar host).
Block 11 is a fixed overlay, so its `y` is viewport-relative, not document-relative.

## ProductHero (#1) — the PDP core

```
div.grid.grid-cols-10.gap-[30px]           (md: grid-flow-row, gap-18, px-24)
├── div.sticky.top-0.col-span-6.mr-[30px].max-h-[600px].overflow-hidden   726 x 600
│     gallery — 40 img + 8 video, vertical thumbnail rail + main stage
└── div.col-span-4.md:col-span-10                                         494 x 977
      buy box — 10 img
```

Grid computes to 10 × 101px columns with a 30px gap at 1920.

Buy box contents, top to bottom (from the reference screenshot):

1. `<h1>` — `Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case`
   (note the **fullwidth vertical bar U+FF5C**, not an ASCII `|`)
2. Rating — 5 filled stars + `69 reviews`
3. Bulleted description, clamped, with a `View More ⌄` toggle
4. `Color: Black` + 2 round swatches (Black, Gold) — **click-driven, swaps gallery + price**
5. Price — `2 690 kr`
6. Collapsible — `Flexible installment payment options available.`
7. `Choice` — 2 selectable product cards:
   - `Liberty 5 Pro Max | AI Recording Earbuds with Smart Case` — `2 690 kr` (selected)
   - `Liberty 5 Pro | Noise Cancelling Earbuds for Clear Calls` — `2 190 kr`

`StickyBuyBar` (#11) mirrors the title + price and adds `Add to Cart` / `Buy Now`.

## Assets

- **Images:** 227 product-scoped files downloaded to `public/images/` by
  `scripts/download-pdp-assets.mjs`; map in `asset-map-pdp-d1204.json`. This is a superset of
  the 129 the page paints (it includes both colourways: `D1204Z11_*` = black, `D1204ZB1_*` = gold).
- **Fonts:** unchanged — MontForAnker, already local.

### OPEN ISSUE — gallery video format

The 4 gallery videos are **HLS only**:

```
https://checkout.ankernordics.com/cdn/shop/videos/c/vp/<hash>/<hash>.m3u8
```

The master playlist offers 1080p / 720p / 480p, all `.hls.<id>_.m3u8` renditions. Probed for a
progressive MP4 at `<hash>.HD-1080p.2.5Mbps.mp4`, `.HD-720p.1.6Mbps.mp4`, `.SD-480p.0.9Mbps.mp4`
and `<hash>.mp4` — **all 404**. `ffmpeg` is not installed locally, so the segments cannot be
remuxed here.

Three ways forward, none chosen yet:

1. **Add `hls.js`** and stream from local `.ts` segments (faithful playback, one new dependency).
2. **Poster stills** — render the video slides as their poster images (no dependency, not faithful:
   the slides are motion on the target).
3. **Install ffmpeg** and transcode HLS → MP4 once, keeping everything local and dependency-free.

Until this is decided the gallery should be built to accept both image and video slides so the
video source can be swapped in without restructuring.

## Still to extract

Per-section computed styles and verbatim copy for #12–#20 have **not** been captured yet. Only the
topology, asset set, and the ProductHero shape are established. Note that #18 is 9 452px on its own
and must be split into several components before any builder is dispatched.
