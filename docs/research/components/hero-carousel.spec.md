# HeroBannerCarousel Specification

## Overview

- **Target file:** `src/components/HeroBannerCarousel.tsx`
- **Topology:** section #0, first element in `main`
- **Interaction model:** **time-driven** (auto-advancing Swiper) + **click** (prev/next arrows,
  pagination bullets)
- **Measured at:** viewport **1440** (`desktop` tier) unless noted

## Container

```
div.banner-mod-container            ← full-bleed, height 632px @1440 (793px @1920, 600px @1296)
```

Height is **not** fixed — it scales with the artwork's aspect ratio. Slide images render
`1423×632` at 1440 with `object-cover`, `w-full h-full`.

## Slides — 5, each ONE background image

Every slide contains exactly **one** `<img>`. The award badges, "FREE €44.99" gift tag and
feature pills visible in screenshots are **baked into the artwork**, not separate layers. Do not
build them as overlay elements.

| # | Eyebrow | Headline (`<br>` is literal) | Theme | Image |
|---|---|---|---|---|
| 1 | `Liberty 5 Pro Series` | `The World's First Smart Screen<br>Earbuds with Al Note-Taker.` | light | `/images/group_2147239065_1.png` |
| 2 | `eufy Lawn Mower C15` | `No Wire, No Hassle.<br>Just eufy Al Vision.` | light | `/images/c15-kvx2-en-pc-1.jpg` |
| 3 | `eufy Robot Vacuum Omni S2` | `15× Longer-Lasting Suction<br>Day-One Deep Cleaning, All Year Long` | light | `/images/pc_1.png` |
| 4 | `Anker Nano 45W Smart Display Charger` | `The World's First Smart Display, <br>Charger That Knows Your iPhone.` | **dark** | `/images/a121d_final.png` |
| 5 | `Jul. 17-19/24-26 2026` | `Ultimate Connection` | light | `/images/20260629-144002.jpg` |

### Verbatim character warnings

- Slides 1 and 2 read **`Al`** — capital A + **lowercase L (U+006C)**, not "AI" with a capital i.
  Verified by char code. This is the live site's own typo; **reproduce it exactly.**
- Slide 3 uses **`×`** (U+00D7 multiplication sign), not the letter x.
- Slide 4's headline has a **trailing space before `<br>`** — `Display, <br>Charger`. Keep it.
- Slide 1 and 4 use a typographic apostrophe `’` (U+2019) in "World's".

### Buttons

| Slide | Button 1 (secondary) | → | Button 2 (primary) | → |
|---|---|---|---|---|
| 1 | `Learn More` | `/liberty-5-pro-series` | `Liberty 5 Pro Series` | `/products/d1204` |
| 2 | `Learn More` | `/eufy-c15-robot-lawn-mower` | `Buy Now` | `/products/t280b3a2` |
| 3 | `Learn More` | `/robot-vacuum-s2` | `Buy Now` | `/products/t2081g11` |
| 4 | `Learn More` | `/a121d` | `Buy Now` | `/products/anker-nano-45w-smart-display-charger` |
| 5 | `Learn More` — **primary style, no second button** | `/tomorrowland` | — | — |

All real hrefs carry `?ref=image_hero_banner`. Include it.

## Computed styles

### Content block

```
div.hero-banner-wrap-text.laptop:max-w-[440px].desktop:max-w-[648px].lg-desktop:max-w-[824px]
```

Left offset **64px** from the slide's left edge; block starts at y≈394 within the 632px slide
(i.e. bottom-anchored, roughly 238px from the bottom).

### Eyebrow (`<p>`)

| Property | Value |
|---|---|
| font-size / weight | `14px` / `700` |
| line-height | `21px` |
| letter-spacing | `-0.28px` (−0.02em) |
| colour | `#F5F6F7` light / `#080A0F` dark |

### Headline (`<h2>`)

```
h2.text-balance.tracking-[-0.04em].desktop:text-[40px].lg-desktop:text-[48px]
```

| Property | Value |
|---|---|
| font-size | `40px` @desktop, `48px` @lg-desktop |
| weight | `700` |
| line-height | `40px` (1.0 — tight) |
| letter-spacing | `-1.6px` (−0.04em) |
| colour | `#F5F6F7` light / `#080A0F` dark |
| width | `648px` @1440 |

### Buttons — exact

Shared classes (verbatim):

```
rounded-btn inline-flex cursor-pointer items-center justify-center font-bold
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
disabled:pointer-events-none border-solid
px-5 pb-[10px] pt-[11px] text-[14px] leading-tight
lg-desktop:px-7 lg-desktop:pb-[14px] lg-desktop:pt-[15px] lg-desktop:text-[16px]
```

| Property | Value |
|---|---|
| height (rendered) | `38px` |
| padding | `11px 17.5px 10px` (asymmetric top/bottom — `pt-[11px] pb-[10px]`) |
| border-radius | **`0px`** — square. `rounded-btn` resolves to 0. |
| font-size / weight / line-height | `14px` / `700` / `16.8px` |

**Secondary ("Learn More") — the border is an `outline`, not a `border`:**

```
outline outline-[1.6px] outline-offset-[-1.6px]
```

| Property | Value |
|---|---|
| outline | `1.6px solid` in the theme colour |
| outline-offset | `-1.6px` (inset, so it sits inside the box) |
| `border-width` | `0px` — there is genuinely no CSS border |
| background | `transparent` |
| colour | `#F5F6F7` light / `#080A0F` dark |

Getting this wrong as a `border` shifts the layout by 1.6px per side.

**Primary ("Buy Now"):**

| Theme | background | colour |
|---|---|---|
| light | `#F5F6F7` | `rgb(30, 32, 36)` |
| dark | `#080A0F` | `#FFFFFF` |

Hover classes present: `hover:bg-btn-secondary-active hover:text-btn-secondary-active-foreground`.
Exact hover values not captured — implement a subtle transition and flag for QA.

## Pagination & arrows

```
div.swiper-pagination.swiper-pagination-dark.swiper-pagination-clickable.swiper-pagination-bullets.swiper-pagination-horizontal
```

- **5 bullets**, `position: absolute`, `bottom: 40px`, container background transparent.
- Active bullet renders as a short **pill/bar**, inactive as small dots (visible in screenshots).
- Prev/next **arrows** sit at the vertical middle, left and right edges, as chevrons.

## Behaviours

- **Auto-advance:** Swiper `loop` mode — slide DOM order is rotated at runtime
  (`swiper-slide-prev` / `-active` / `-next` classes move). Interval **not measured**;
  use a single named constant (~5000ms) so QA can tune it.
- **Slide transition:** horizontal translate. Slides are laid out side by side at
  `left = index × 1423px`.
- Arrows and bullets are click-driven; bullets are `swiper-pagination-clickable`.
- Respect `prefers-reduced-motion` — do not auto-advance when set.

## Responsive

| Tier | Hero height | Headline | Content max-width |
|---|---|---|---|
| mobile ≤767 | not measured | — | — |
| laptop 1024–1439 | 600px | — | `440px` |
| desktop 1440–1919 | **632px** | `40px` | `648px` |
| lg-desktop ≥1920 | 793px | `48px` | `824px` |

Mobile tier is **not yet measured** — the window could not be driven below 768px
(`resize_window` is inert; see `RESPONSIVE.md`). Build mobile from the class strings
(`laptop:` prefixes fall back to the unprefixed base) and mark it for QA.

## Implementation notes

- Do **not** add the `swiper` package. Build with `useState` + a transform track.
- Use `next/image` with `priority` on the first slide (it is the LCP element).
- Images are large (up to 3840px wide); rely on `next/image` sizing.
- `"use client"` required.

## Verification

`npx tsc --noEmit` must pass before finishing.
