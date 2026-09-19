# Page Topology — ankernordics.com (homepage)

Captured at viewport 1920x893, dpr 1. Total page height **12231px**.

## Platform / stack (measured)

| Aspect | Finding |
|---|---|
| Frontend | **Next.js** (`__NEXT_DATA__` present, `/_next/static/chunks/*`) |
| Commerce backend | **Shopify** (headless — `window.Shopify` true, assets on `cdn.shopify.com`) |
| CSS | **Tailwind** — arbitrary-value classes in DOM (`z-[55]`, `top-[45px]`, `mt-[-200vh]`, `w-safe`) |
| CSS custom properties on `:root` | **none** (0 vars) — colors are literal in utility classes |
| Carousels | **Swiper** — 11 `.swiper` instances on the page |
| Smooth scroll lib | **none** (no Lenis / Locomotive / GSAP) — native scrolling |
| Page builder | Anker in-house `ipc_*` template system (`ipc_template`, `ipc_container`, `ipc_spacer`) |
| Styling artifacts | `jsx-<hash>` classes → styled-jsx alongside Tailwind |

## Fonts

Primary family everywhere: `MontForAnker, "Helvetica Neue", Helvetica, Arial, sans-serif`.
Only the **normal** styles actually load; italics stay `unloaded`.

| Weight | Style | File (on `cdn.shopify.com/s/files/...`) | Loaded |
|---|---|---|---|
| 500 | normal | `1/0511/6346/3874/files/MontForAnker-Book.ttf` | yes |
| 600 | normal | `1/0511/6346/3874/files/MontForAnker-Regular.ttf` | yes |
| 700 | normal | `1/0511/6346/3874/files/MontForAnker-SemiBold.ttf` | yes |
| 800 | normal | `1/0511/6346/3874/files/MontForAnker-Bold.ttf` | yes |
| 900 | normal | `1/0511/6346/3874/files/MontForAnker-Heavy.ttf` | yes |
| 500–900 | italic | `1/0501/7678/6607/files/Mont-*Italic.otf` | unloaded |

A second `Avenir Next` face group is declared (Shopify CDN `.woff2`, `font-display: swap`) but is
not the family in use on the homepage. `JudgemeStar` / `JudgemeIcons` (reviews widget),
`swiper-icons`, and `slick` icon fonts are also declared and unloaded.

> **Licensing note:** MontForAnker is a rebadge of *Mont* (Fontfabric), a commercial typeface, and
> the files are Anker's licensed copies. Fine to pull locally for pixel-matching; must be swapped
> or licensed before any public deployment.

## Type scale (measured via getComputedStyle)

| Element | size | weight | line-height | letter-spacing | color |
|---|---|---|---|---|---|
| `body` | 14px | — | 21px | — | `rgb(0,0,0)` |
| `h1` (SEO, visually hidden) | 14px | 500 | 21px | normal | `rgb(0,0,0)` |
| `h2` (hero) | 48px | 700 | 48px | **-1.92px** | `rgb(245,246,247)` |
| `h3` (card title) | 24px | 700 | 28.8px | **-0.96px** | `rgb(8,10,15)` |
| `h4` | 18px | 700 | 27px | **-0.72px** | — |

Letter-spacing is consistently **-0.04em** (‑1.92/48, ‑0.96/24, ‑0.72/18). Line-height is
1.0 on the hero h2 and 1.2 / 1.5 elsewhere.

## Fixed / sticky overlay layers

| Element | Position | z-index | Offset | Height |
|---|---|---|---|---|
| `#announcementBar` | sticky | **55** | `top-0` | 45px |
| sticky header wrapper | sticky | **53** | `top-[45px]` | 96px |
| `#header` (inner) | sticky | **100** | `top-0` | 96px |

The announcement bar is itself a Swiper (rotating promo messages). The header wrapper sticks
*below* the 45px bar, so the two stack rather than overlap.

## Flow sections

`main` → single wrapper (`ipc_template`) → **40 children**, alternating `ipc_spacer` dividers
with `ipc_container` content blocks. Spacers are responsive (`laptop:h-16 desktop:h-[96px]
lg-desktop:h-[128px]`) — 128px at this viewport, with a few 15px/30px variants.

Heights below are given at **both** tiers measured so far, because they differ substantially:
`lg-desktop` (viewport 1920) and `laptop` (viewport 1296). See `RESPONSIVE.md`.

| # | y@1920 | h@1920 | h@1296 | Working name | Media |
|---|---|---|---|---|---|
| 0 | 171 | 793 | 600 | **HeroBannerCarousel** — `banner-mod-container`, full-bleed Swiper, 5 slides, award-badge row, dot pagination | 7 img |
| 2 | 1092 | 66 | 99 | **CompanyStats** — "146+ Countries and Regions", "200M+ Global Consumers", "5,000+ Worldwide Employees" | — |
| 5 | 1188 | 265 | 215 | **CategoryStrip** — Swiper of category tiles (Outdoor Cameras, Robot Vacuum, Lawn Mowers, Sleep Earbuds, Power Banks, Chargers, Cables) | 48 img |
| 7 | 1580 | 627 | 591 | **TodaysBestDeal** — tabbed: "Best Seller" / "Today's Deal", Hot/New pills | 12 img |
| 9 | 2335 | 69 | 53 | SectionHeading — "What's New" | — |
| 10 | 2404 | 640 | 504 | **WhatsNewCarousel** — product cards w/ h3 title + h4 tagline | 16 img |
| 12 | 3172 | 710 | 556 | **ExploreAllBrands** — "Explore All Brands during Sale" | 8 img |
| 14 | 4010 | 69 | 53 | SectionHeading — "Anker" | — |
| 15 | 4079 | 640 | 500 | **AnkerBrandHero** — "Live Charged." / "The world's No. 1 mobile charging brand" | **4 video** |
| 18 | 4734 | 480 | 473 | **AnkerProductCarousel** — cards w/ % discount badges | 10 img |
| 20 | 5342 | 69 | 53 | SectionHeading — "eufy" | — |
| 21 | 5411 | 640 | 500 | **EufyBrandHero** — "Built with Care" | **4 video** |
| 24 | 6066 | 480 | 473 | **EufyProductCarousel** | 9 img |
| 26 | 6674 | 69 | 53 | SectionHeading — "soundcore" | — |
| 27 | 6743 | 640 | 500 | **SoundcoreBrandHero** | **4 video** |
| 30 | 7398 | 480 | 473 | **SoundcoreProductCarousel** | 8 img |
| 32 | 8006 | 893 | 758 | **WhyShopHeadingPanel** — `h-screen z-20 aiui-dark`, text "Why Shop With Anker Nordics" | — |
| 33 | 7113 | 3301 | 2728 | **WhyShopBenefits** — `ipc-mediaplayersticky mt-[-200vh]`, 6 benefit cards | 11 img |
| 35 | 9649 | 549 | 526 | **RecommendedBy** — press/creator quote cards | 8 img |
| 37 | 10326 | 69 | 53 | SectionHeading — "Featured Blogs and News" | — |
| 38 | 10395 | 501 | 381 | **FeaturedBlogs** — 8 cards, `block-style_2sam9qb` | 16 img |

### Corrections to an earlier reading of this page

Two mistakes worth recording so they aren't repeated:

1. **#15/#21/#27 are video heroes, not product carousels.** Each contains **4 `<video>` and 0
   `<img>`**. Per the skill's rule, these must use the real video files — do not rebuild them as
   HTML/CSS mockups. The product grids are #18/#24/#30 (the ones carrying `20 %`, `24 %`,
   `28 %`… discount badges).
2. **#2 is a stats bar, not a tagline**, and **#5 is a category tile strip** (48 images), not a
   brand-logo strip.

### Content language

Product and UI copy is English. The **blog cards in #38 are Swedish** — e.g. *"Projektor utomhus
till VM 2026: Välj rätt modell för din trädgård, balkong eller sommarstuga"*. This is a Nordics
storefront; use the Swedish strings verbatim.

### #32 / #33 resolved

Not a video scrubber. **#32** is a pinned full-viewport dark panel (`aiui-dark`) holding only the
heading *"Why Shop With Anker Nordics"*. **#33** is pulled up over it by `mt-[-200vh]` and scrolls
six benefit cards past that pinned heading:

| Card | Body |
|---|---|
| AnkerCredits Rewards | Buy more, save more, and earn more. |
| Over €100 Ships Free | — |
| Fast Deliver | Fast shipping in 2-8 days |
| Hassle-Free Warranty | Comprehensive warranty protection on all purchases. |
| Up to 30-Day Returns | — |
| We are Here to Help | Contact our expert team via email or live chat for assistance. |

Interaction model is therefore **scroll-driven pin**, not click-driven and not a media player,
despite the `ipc-mediaplayersticky` class name.

Plus a site **Footer** below the final spacer (outside this `main` child list — to be mapped).

### The overlap worth noting (#32 / #33)

These two are **not** sequential. #33 starts at y=7113 — *above* #32's y=8006 — because it carries
`mt-[-200vh]`, pulling itself back up two viewport heights, and runs 3301px tall. #32 is
`h-screen z-20`. This is a **scroll-driven sticky media sequence**: the tall `ipc-mediaplayersticky`
block scrolls behind/through the pinned `h-screen` panel. The three brand carousels (#15/#21/#27)
and their feature banners sit inside that negative-margin range, so the stacking here must be
reproduced exactly or the whole mid-page collapses. Verify z-order and pin behavior before building.

## Repeating structural pattern

The mid-page is a clean 3× repetition — one per brand:

```
SectionHeading (h=69)  →  BrandCarousel (h=640)  →  [15px spacer]  →  FeatureBanner (h=480)
   "Anker"      #14         #15                         #17              #18
   "eufy"       #20         #21                         #23              #24
   "soundcore"  #26         #27                         #29              #30
```

Build these as **two parameterised components** (`BrandCarousel`, `FeatureBanner`) driven by a
per-brand data object, not as six separate components.
