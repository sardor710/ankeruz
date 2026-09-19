# TopBrandBar + AnnouncementBar Specification

Two thin strips that sit above the header. Both simple; one builder handles both.

## Overview

- **Target files:** `src/components/TopBrandBar.tsx`, `src/components/AnnouncementBar.tsx`
- **Interaction model:** TopBrandBar = static (hover only). AnnouncementBar = **time-driven** (auto-cycling Swiper).
- **Source viewport for measurements:** 1296 (`laptop` tier). Class strings below are copied
  verbatim from the live DOM and already encode every other tier.

## Shared container pattern

Both use the site's standard 3-level container. Reproduce it exactly:

```
<outer>                                     ← height + z-index only, transparent
  <div class="h-full ipc_container relative z-10 w-full">          ← background colour
    <div class="mx-auto size-full px-4 tablet:px-8 laptop:px-16 desktop:px-16
                lg-desktop:px-[calc(50%-832px)] lg-desktop:max-w-full">  ← gutters
```

`lg-desktop:px-[calc(50%-832px)]` caps the content column at 1664px centred from 1920 up.

---

## 1. TopBrandBar

### DOM structure

```
div.relative.z-[46].box-border.h-[30px]              bg: transparent
└ div.h-full.ipc_container.relative.z-10.w-full      bg: #F5F5F7  (fully covered by child)
  └ div.mx-auto.size-full.px-4...                    bg: #080A0F  ← the visible black
    ├ div.flex.h-full.items-center.gap-2.py-[5px]           (left group)
    │ └ a × 4
    └ div.flex.h-full.items-center.justify-end.gap-2.py-[5px]  (right group)
      └ a × 1
```

> The black is on the **inner padded** div, not the outer wrapper. Getting this wrong puts the
> black inside the gutters instead of full-bleed.

### Left group — 4 brand wordmarks

Each is:

```html
<a href="{href}" class="tracking font-bold underline transition-colors text-info-primary hover:text-brand-0">
  <div class="hidden laptop:block h-fit transition-all duration-200 [&_svg]:h-full [&_svg]:w-auto">
    {Icon}
  </div>
</a>
```

| Icon component | href | Intrinsic |
|---|---|---|
| `AnkerWordmark` | `/anker?ref=header` | 52×20 |
| `EufyWordmark` | `/eufy?ref=header` | 38×20 |
| `EufyMakeWordmark` | `/eufymake?ref=header` | 89×20 |
| `SoundcoreWordmark` | `/soundcore?ref=header` | 84×20 |

All four import from `@/components/icons`. The wordmark SVGs carry their own hardcoded fills
(`#F5F6F7` light, `#75787F` grey) — do **not** override them with `currentColor`.

**Note the `hidden laptop:block`** — the wordmarks are invisible below 1024px. The bar itself
still occupies 30px at every width.

### Right group

```html
<a href="https://www.anker-in.com?ref=header" class="tracking font-bold underline transition-colors text-info-primary hover:text-brand-0">
  <div class="board-right-icon h-fit [&_svg]:h-full [&_svg]:w-auto">
    <AnkerInnovationsWordmark />
  </div>
</a>
```

Intrinsic 148×10. No `hidden laptop:block` — visible at all widths.

### Computed styles

| Property | Value |
|---|---|
| wrapper height | `30px` (fixed, all tiers) |
| wrapper z-index | `46` |
| inner background | `#080A0F` |
| link colour | `rgb(8, 10, 15)` |
| link font-size / weight | `14px` / `700` |
| link text-decoration | `underline` |
| inner vertical padding | `5px` (`py-[5px]`) |
| gap between wordmarks | `8px` (`gap-2`) |

### Behaviours

- **Hover:** `transition-colors` on the anchor + `transition-all duration-200` on the inner div.
  Target class is `hover:text-brand-0`. Since the SVG fills are hardcoded, the visible hover
  effect is on the underline colour only.
- **Not sticky.** This bar is normal flow content and scrolls away. Only the two strips
  below it pin.

---

## 2. AnnouncementBar

### DOM structure

```
div#announcementBar.sticky.top-0.z-[55].flex.h-[45px].items-center
└ div.h-full.w-safe
  └ div.swiper.swiper-initialized.swiper-horizontal.h-full.swiper-backface-hidden
    └ div.swiper-wrapper
      └ div.swiper-slide × 3
        └ a.flex.h-[45px].items-center.justify-center.text-brand
```

`w-safe` resolves to `max-width: 1280px` centred (measured 1168px wide with 55.5px gutters at
viewport 1296).

### Background — animated GIF, not a CSS gradient

```css
background-image: url('/images/gradient-banner-1920x40.gif');
```

Downloaded to `public/images/gradient-banner-1920x40.gif` (697KB). This is an **animated**
blue→purple gradient. It is a CSS `background-image` on `#announcementBar`, so it was absent from
the `<img>` sweep — do not substitute a static CSS gradient, the motion is visible.

Element's own `background-color` is `rgba(0,0,0,0)`.

### Slides (verbatim, in DOM order)

| # | Text | href |
|---|---|---|
| 1 | `New Arrivals Unveiled – Don't Miss Out` | `/collections/new-releases` |
| 2 | `Premium Refurbished - Save More, Waste Less` | `/collections/refurbished` |
| 3 | `New Week, New Deals – Shop and Save.` | `/deals` |

Note the typographic apostrophe (U+2019) in slide 1 and the en-dashes in 1 and 3. Copy exactly.

Slide 3 carries a leading `DealsIcon` (20×20, from `icons.tsx`) before the text.

### Computed styles

| Property | Value |
|---|---|
| height | `45px` (fixed, all tiers) |
| position / top / z-index | `sticky` / `0` / `55` |
| link colour | `rgb(23, 187, 239)` — cyan |
| font-size / weight / line-height | `14px` / `500` / `21px` |
| content max-width | `1280px`, centred |

### Behaviours

- **Auto-cycling.** Swiper with 3 slides, horizontal, loops. Exact interval not yet measured —
  implement a reasonable auto-advance (~4s) with a crossfade/slide and leave the duration as a
  single named constant so it can be tuned in QA.
- **Sticky:** rests at `top: 0` once the 30px brand bar scrolls past. Confirmed at scroll 400
  and 1500 — `top` goes 30 → 0 and stays.

### Implementation note

Do **not** add the `swiper` package. Build the rotation with a small `useEffect` + index state
and a CSS transform track. The site uses Swiper, but a 3-slide auto-rotator does not justify the
dependency, and no Swiper-specific behaviour (drag, free-mode, breakpoints) is in play here.

---

## Responsive summary

| Tier | TopBrandBar | AnnouncementBar |
|---|---|---|
| mobile ≤767 | 30px, wordmarks hidden, `px-4` | 45px, full width |
| tablet 768–1023 | 30px, wordmarks hidden, `px-8` | 45px |
| laptop 1024–1439 | 30px, **wordmarks visible**, `px-16` | 45px |
| desktop 1440–1919 | same, `px-16` | 45px, column caps at 1280px |
| lg-desktop ≥1920 | `px-[calc(50%-832px)]` | 45px |

## Verification

`npx tsc --noEmit` must pass before finishing.
