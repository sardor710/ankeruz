# ExploreAllBrands Specification (topology #12)

- **Target file:** `src/components/ExploreAllBrands.tsx`
- **Measured at:** viewport **1920** (`lg-desktop`), re-verified 2026-08-06
- **Interaction model:** static + hover (image zoom). No state, no JS. Server component.

> **Root font-size is 14px** (`globals.css`). Port the site's class names verbatim; Tailwind's rem
> scale resolves at 0.875x so `text-xl` = 17.5px, `text-sm` = 12.25px, `px-16` = 56px.

> **Breakpoint substitution:** the target's named tiers are not registered in this project.
> Translate `tablet:`→`min-[768px]:`, `laptop:`→`min-[1024px]:`, `desktop:`→`min-[1440px]:`,
> `lg-desktop:`→`min-[1920px]:` — the same convention used by the already-built components.

## Overview

Section height **710px** @1920 on a `#F5F5F7` background. Structure is:

```
SectionHeading (reuse existing component)  →  panel grid
```

Heading text: `Explore All Brands during Sale`

**Reuse `SectionHeading` from `@/components/SectionHeading`** — do not re-implement it. It already
renders the 48px/700/-0.04em `#080A0F` h2 with the correct 69px section box.

## Grid

```
laptop:gap-4 grid grid-cols-12 gap-3 w-full
```

Computed @1920: 12 columns × 125.828px, `gap: 14px`.

## Panels — FOUR grid children, not two

This is the critical detail an earlier revision of this spec got wrong. Each of the two panels
exists **twice in the DOM** with a different image, toggled purely by CSS:

| Child | Class | Visible | Width @1920 |
|---|---|---|---|
| 1 | `col-span-6 laptop:block hidden` | ≥1024 only | 825px |
| 2 | `col-span-6 laptop:block hidden` | ≥1024 only | 825px |
| 3 | `col-span-12 laptop:hidden block` | <1024 only | full |
| 4 | `col-span-12 laptop:hidden block` | <1024 only | full |

Panel box @1920: **825 × 641px**, `border-radius: 0px`, `position: static`, `overflow: visible`.
The rounding/clipping lives on an inner `absolute inset-0` wrapper, not the panel.

### Content

| # | Title (h3) | Description (h4) | CTA | href |
|---|---|---|---|---|
| 1 | `Pan-Tilt-Zoom Cameras` | `See more, secure more with 360° coverage` | `Learn More` | `https://www.ankernordics.com/ptz-cam` |
| 2 | `Robot Vacuum` | *(empty — render the element anyway)* | `Learn More` | `https://www.ankernordics.com/collections/robot-vacuum` |

> The `°` in panel 1 is U+00B0. Panel 2's description is genuinely empty; the target still renders
> the `<h4>` and its box participates in the overlay's flex gap — same rule as `BrandVideoHero`.
> Do not make it optional and do not skip the element.

### Images

| Panel | Desktop image (≥1024) | Mobile image (<1024) |
|---|---|---|
| 1 | `/images/frame_241.png` | `/images/frame_2589.png` |
| 2 | `/images/frame_2499.png` | `/images/frame_2600.png` |

All four files already exist under `public/images/`. Image classes:

```
w-full h-full transition-all duration-300 object-cover group-hover:scale-105
```

`object-fit: cover`, `transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1)`.

## Computed styles

### h3 (title)
```
text-balance tracking-[-0.04em] desktop:text-[32px] text-[24px] leading-[120%] font-bold item-title
```
@1920 → `font-size: 32px`, `font-weight: 700`, `line-height: 38.4px`, `letter-spacing: -1.28px`,
`color: rgb(8, 10, 15)`.

### h4 (description)
```
text-balance tracking-[-0.04em] font-bold item-description desktop:text-[16px] lg-desktop:text-[18px] line-clamp-1 text-[14px]
```
@1920 → `font-size: 18px`, `font-weight: 700`, `line-height: 27px`, `letter-spacing: -0.72px`,
`color: rgb(8, 10, 15)`. Note `line-clamp-1`.

### CTA link
```
rounded-btn inline-flex cursor-pointer items-center justify-center font-bold focus-visible:outline-none
focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none bg-btn-primary
text-btn-primary-foreground hover:text-btn-primary-active-foreground hover:bg-gradient-brand
border-none px-5 pb-[10px] pt-[11px] text-[14px] leading-tight lg-desktop:px-7 lg-desktop:pb-[14px]
lg-desktop:pt-[15px] lg-desktop:text-[16px] link-right
```
@1920 → `font-size: 16px`, `font-weight: 700`, `line-height: 19.2px`, `color: rgb(255, 255, 255)`.

This is the **same CTA treatment `BrandVideoHero` already implements** — mirror that component's
button markup and hover classes rather than inventing new ones.

### Overlay
Text sits in an absolutely-positioned box over the image:
```
absolute inset-0 z-10          <- link overlay
absolute inset-0               <- media clip wrapper
```
Follow `BrandVideoHero`'s existing overlay structure (h3 → h4 → CTA in a flex column).

## States & Behaviors

- **Hover (panel):** image scales up via `group-hover:scale-105`,
  `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`. The panel is a `group`.
- **Hover (CTA):** `hover:bg-gradient-brand` + `hover:text-btn-primary-active-foreground`.
- No scroll-driven, click-driven, or time-driven behavior. **Not** a carousel.

## Responsive Behavior

Derived from the class contract (window resize was blocked by a maximized browser window, so the
breakpoint-prefixed classes are the authority — they encode the behavior exactly):

- **≥1024 (`laptop`):** two half-width panels side by side (`col-span-6`), gap 16px, desktop images.
- **<1024:** desktop panels `hidden`; the two `col-span-12` mobile panels stack full-width, gap 12px,
  using the mobile images.
- **≥1440 (`desktop`):** h3 32px, h4 16px.
- **≥1920 (`lg-desktop`):** h4 18px, CTA 16px with larger padding.

## Verification

`npx tsc --noEmit` must exit 0. Confirm all four `/images/*.png` paths resolve under `public/`.
