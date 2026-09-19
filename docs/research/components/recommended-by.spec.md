# RecommendedBy Specification (topology #35)

- **Target file:** `src/components/RecommendedBy.tsx`
- **Measured at:** viewport **1920** (`lg-desktop`), re-verified 2026-08-06
- **Interaction model:** horizontally scrollable card row + hover zoom. No tabs, no autoplay.

> **Root font-size is 14px.** Port class names verbatim; `text-xl` = 17.5px, `text-2xl` = 21px.

> **Breakpoint substitution:** `tablet:`→`min-[768px]:`, `laptop:`→`min-[1024px]:`,
> `desktop:`→`min-[1440px]:`, `lg-desktop:`→`min-[1920px]:`.

## Overview

Section height **549px** @1920, background `#F5F5F7`.

```
SectionHeading ("RECOMMENDED BY")  →  8-card horizontal row
```

Heading copy is **`RECOMMENDED BY` — uppercase in the source string itself**, not via
`text-transform`. Reuse `SectionHeading` from `@/components/SectionHeading`; pass the literal
uppercase text.

## Card row

The target drives this with Swiper (`.swiper-wrapper`, `display: flex`, 8 slides). **Do not add a
Swiper dependency.** The existing `ProductCarousel` in this repo already reproduces the target's
carousels with CSS (`overflow-x-auto` + scroll snap) — mirror that approach so this section behaves
and looks consistent with the rest of the page.

Slide box @1920: **404 × 480px**. Row is `display: flex`, no gap on the wrapper itself (spacing
comes from slide margin in Swiper — use a `gap-4` equivalent consistent with `ProductCarousel`).

## Card structure

```
article (group, relative, 404x480)
├── div.absolute.inset-0.rounded-xl.overflow-hidden.laptop:rounded-2xl   <- media clip
│   └── img  w-full h-full object-cover tablet:hover:scale-110 transition-all duration-300
├── span.sr-only                                                        <- accessible title copy
└── div.laptop:p-6.absolute.bottom-0.z-[1].box-border.flex.w-full.flex-col.p-4   <- overlay
    └── h3
```

- Media clip radius: `rounded-xl` (<1024) → `laptop:rounded-2xl` (≥1024).
- Overlay padding: `p-4` (<1024) → `laptop:p-6` (≥1024). Anchored `bottom-0`, full width.
- `span.sr-only` repeats the card title for screen readers — keep it.

### h3 (overlay title)
```
descTitle lg-desktop:text-[32px] desktop:mt-2 desktop:text-[24px] text-lines-2 mt-1 line-clamp-3
flex-1 text-[24px] font-bold leading-[1.2] graphic-description-item
```
@1920 → `font-size: 32px`, `font-weight: 700`, `line-height: 38.4px`,
**`color: rgb(255, 255, 255)`** (white, sitting over the image), `line-clamp: 3`.

### img
```
w-full h-full object-cover tablet:hover:scale-110 transition-all duration-300
```
`object-fit: cover`, `transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1)`.

## Content (verbatim — 8 cards, in order)

Apostrophes matter: cards 2 and 4 use **U+2019** (`’`); card 5 uses **ASCII U+0027** (`'`).
Reproduce exactly as written below.

| # | Title (h3 + sr-only) | Image | href |
|---|---|---|---|
| 1 | `Anker providing powerful energy to keep the journey going.` | `/images/mask_group-5.png` | `https://www.youtube.com/watch` |
| 2 | `Happy Father’s Day from eufy to the heroes who always know` | `/images/frame_2121235191.png` | *(none — render as a non-link)* |
| 3 | `If you want portable power proven under the harshest conditions, Anker delivers.` | `/images/mask_group-7.png` | `https://www.youtube.com/watch` |
| 4 | `Celebrating Dads with eufy this Father’s Day.` | `/images/frame_2121235189-3.png` | `https://www.youtube.com/watch` |
| 5 | `soundcore Liberty 4: You've Gotta Hear Them For Yourself!` | `/images/endorse-2-mobile.webp` | `https://www.youtube.com/watch` |
| 6 | `This Robot Lawn Mower Just Changed Everything!` | `/images/frame_2121235741.png` | `https://www.youtube.com/watch` |
| 7 | `The Longest Lasting Headphones!` | `/images/endorse-1-mobile.webp` | `https://www.youtube.com/shorts/hE6wAfGDhK8` |
| 8 | `Still picking up hair every day? Give the eufy E28 a try.` | `/images/frame_2121235739.png` | *(none — render as a non-link)* |

All 8 image files already exist under `public/images/`.

Cards 2 and 8 have **no href** on the live site. Render those as a plain container (not an `<a>`)
rather than inventing a link target.

## States & Behaviors

- **Hover (≥768 only):** image scales to 110% — `tablet:hover:scale-110`, transition
  `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`. Deliberately disabled below 768.
- No autoplay, no pagination dots, no tab switching.

## Responsive Behavior

Derived from the class contract (window resize was blocked; the breakpoint-prefixed classes are the
authority):

- **≥1920:** h3 32px, slides 404px wide.
- **1440–1919 (`desktop`):** h3 24px, `mt-2` above it.
- **<1440:** h3 24px, `mt-1`.
- **≥1024 (`laptop`):** card radius `rounded-2xl`, overlay padding `p-6`.
- **<1024:** radius `rounded-xl`, overlay padding `p-4`.
- **<768:** hover zoom disabled.
- Row scrolls horizontally at every width.

## Verification

`npx tsc --noEmit` must exit 0. Confirm all 8 `/images/...` paths resolve under `public/`, and that
the U+2019 vs U+0027 apostrophes survived by code point.
