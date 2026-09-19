# SiteHeader Specification

## Overview

- **Target file:** `src/components/SiteHeader.tsx`
- **Interaction model:** scroll-driven (sticky + probable hide-on-scroll) + hover (nav underline)
  + click (mega-menu triggers).
- **Scope of THIS spec:** the header shell — both width variants, logo, action icons, nav
  triggers, hover underline. **The mega-menu flyout panels are explicitly out of scope** and
  specced separately (see "Deferred" at the bottom).

## Two variants, both present in the DOM simultaneously

CSS toggles them; neither is conditionally rendered.

| Variant | Class string (verbatim) | Visible |
|---|---|---|
| Full | `h-[96px] desktop:block hidden !bg-white ipc_container relative z-10 w-full` | ≥1440 |
| Compact | `h-[52px] desktop:hidden block !bg-white ipc_container relative z-10 w-full` | ≤1439 |

Both are `!bg-white`. Heights are hard: **96px** and **52px**.

## Outer wrapper

```
div.sticky.top-[45px].z-[53]                          ← rests below the 45px announcement bar
└ header#header.sticky.top-0.z-[100].transition-transform.duration-500.ease-in-out
  └ div.hover:bg-white.hover:text-black.text-black.!bg-white.transition-all.duration-500.ease-in-out.!text-black
    ├ (full variant)
    └ (compact variant)
```

Gutter container inside each variant is the site standard:

```
div.mx-auto.size-full.px-4.tablet:px-8.laptop:px-16.desktop:px-16.lg-desktop:px-[calc(50%-832px)].lg-desktop:max-w-full
```

## Full variant (≥1440) — structure

```
div.flex.h-full.flex-col.justify-end.gap-4          ← logo row on top, nav row beneath
├ div.flex.items-center.justify-between
│ ├ a[aria-label="Home"][href="/"].hover:text-brand-0.[&>svg]:w-full
│ │ └ <AnkerHeaderLockup />                          ← 512×20 intrinsic
│ └ div.desktop:gap-6.flex.items-center.gap-4
│   ├ button[aria-label="Search"].relative.cursor-pointer.border-0.bg-transparent.p-0
│   │ └ span.size-5 > <SearchIcon />
│   ├ button[aria-label="Shopping cart"] … > <CartIcon />
│   └ button[aria-label="User profile"] … > <UserProfileIcon />
└ nav[aria-label="Primary navigation"].flex.justify-between
  ├ div.flex.gap-3      ← 7 category triggers
  └ div.flex.gap-3      ← 4 utility triggers
```

Each nav entry (all 11 identical in structure):

```
div.group
└ div.relative
  ├ button[aria-label="{label}"].flex.cursor-pointer.items-center.gap-1.border-0.bg-transparent.pb-4
  │ ├ span.text-pretty.tracking-[-0.02em].tracking.text-sm.font-bold.leading-[1.4]   → {label}
  │ └ <ChevronDownIcon />        (14×14, class `size-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100`)
  └ div.absolute.bottom-0.left-0.h-[2px].w-0.transition-all.duration-500.bg-[#080A0F]
```

### Nav items (verbatim, in order)

Left group (`flex gap-3`), all `<button>`:

`Security Cameras` · `Robot Vaccums` · `Charging` · `Headphones` · `Speakers` · `Projectors` · `Baby`

Right group (`flex gap-3`), all `<button>`:

`Deals` · `New Release` · `About Anker Nordics` · `Help and Support`

> **`Robot Vaccums` is misspelled on the live site** (should be "Vacuums"). Reproduce the typo
> verbatim — this is a 1:1 clone and the string is real content. Do not silently correct it.

All eleven are `<button>`, **not** `<a>` — every one opens a mega-menu flyout. None has an `href`.

## Compact variant (≤1439) — structure

```
div.flex.h-full.items-center.justify-between.gap-4
├ a[aria-label="Home"].hover:text-brand-0.[&>svg]:w-full > <AnkerHeaderLockup />
└ div.desktop:gap-6.flex.items-center.gap-4
  ├ div.desktop:gap-6.flex.items-center.gap-4
  │ ├ button[aria-label="Search"] > <SearchIcon />
  │ └ button[aria-label="Shopping cart"] > <CartIcon />
  └ button[aria-label="Open menu"] > <MenuIcon />
```

Differences from the full variant, all deliberate:
- **No nav row at all.**
- **No "User profile" button** — only Search and Cart.
- Adds a hamburger (`MenuIcon`, 3 `<rect>`s).
- Single row, `items-center`, vs the full variant's two-row `flex-col justify-end`.

## Computed styles

| Property | Value |
|---|---|
| `#header` position / top / z-index | `sticky` / `0` / `100` |
| outer wrapper position / top / z-index | `sticky` / `45px` / `53` |
| `#header` transition | `transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)` |
| background | `#FFFFFF` (`!bg-white`) |
| header height | `96px` (≥1440) / `52px` (≤1439) |
| nav label font-size / weight / line-height | **`12.25px`** (`text-sm`) / `700` / `1.4` |
| nav label letter-spacing | `-0.02em` |
| icon button size | **`17.5px`** (`size-5`) |
| gap between action icons | **`14px`** (`gap-4`), **`21px`** (`gap-6`) ≥1440 |
| gap between nav items | **`10.5px`** (`gap-3`) |
| nav button padding-bottom | **`14px`** (`pb-4`) |
| side gutter | **`56px`** (`px-16`) |

> **Corrected.** An earlier revision of this table listed these as 14px / 20px / 16px / 12px /
> 16px — the standard 16px-root values. The target sets `html { font-size: 14px }`, so its whole
> rem scale is **0.875×**. The values above are the real computed ones.
>
> Our `globals.css` now also sets a 14px root, so **using the verbatim class names is correct and
> preferred** — `text-sm` will resolve to 12.25px on its own. Do not hardcode these pixels.
| underline | `2px`, `#080A0F`, `width 0`, `transition-all 500ms` |

Measured at scroll 0 / 400 / 1500: height, background and box-shadow are **unchanged**
(96/96/96, transparent→ same, `none`→`none`). The header does not shrink or gain a shadow.

## Behaviours

### Sticky stack
The 30px brand bar is flow content and scrolls away. Then:
- announcement bar pins at `top: 0` (z 55)
- header pins at `top: 45px` (z 53 outer / 100 inner)

Resting stack height = **141px**.

### Nav hover underline
- **Trigger:** hover on the wrapping `div.group`.
- **State A:** `w-0`  →  **State B:** full width of the trigger.
- **Transition:** `transition-all duration-500`.
- Colour `#080A0F`, height `2px`, anchored `absolute bottom-0 left-0`.
- Implement as `w-0 group-hover:w-full`.

### Chevron reveal
`ChevronDownIcon` sits at `opacity-0` and animates to `opacity-100` on
`group-hover`, `transition-opacity duration-500`. It is invisible at rest.

### Hide-on-scroll — UNVERIFIED, implement as sticky-only
`#header` carries `transition-transform duration-500 ease-in-out`, which strongly implies a
hide-on-scroll-down / reveal-on-scroll-up translate. Probes at scroll 0 → 400 → 1500 were all
**downward**, so they could not distinguish it from a plain sticky header, and no `transform`
change was observed.

**Do not implement a hide-on-scroll behaviour on guesswork.** Build it as a plain sticky header
and keep the `transition-transform duration-500 ease-in-out` classes in place so the behaviour
can be layered on once a down-then-up probe confirms it.

## Assets

All from `@/components/icons`:
`AnkerHeaderLockup` (512×20) · `SearchIcon` (20×20) · `CartIcon` (20×20) ·
`UserProfileIcon` (20×20) · `ChevronDownIcon` (14×14) · `MenuIcon`

## Responsive summary

| Tier | Height | Layout |
|---|---|---|
| mobile ≤767 | 52px | logo + search + cart + hamburger, `px-4` |
| tablet 768–1023 | 52px | same, `px-8` |
| laptop 1024–1439 | 52px | same, `px-16` |
| desktop 1440–1919 | 96px | two rows: logo+3 icons / 11 nav triggers, `px-16` |
| lg-desktop ≥1920 | 96px | same, `px-[calc(50%-832px)]` |

## Deferred — mega-menu flyouts

Each of the 11 triggers opens a flyout. **Not yet extracted**, because the full nav only exists
at ≥1440 and the browser window could not be moved into that tier (`resize_window` is inert in
this environment; see `RESPONSIVE.md`).

Still unknown and required before building the flyouts:
1. Trigger — hover or click? (buttons suggest click, but `group-hover` styling suggests hover)
2. Panel geometry, background, shadow, enter/exit animation
3. Per-item content — the SSR payload carries ~4300 catalogue image URLs, so these panels are
   image-rich and large

Build the triggers as inert buttons for now; wire the panels in a later pass.

## Verification

`npx tsc --noEmit` must pass before finishing.
