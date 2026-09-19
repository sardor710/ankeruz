# Behaviors — ankernordics.com (homepage)

Status: **partial.** Global/scroll behaviors captured at viewport 1920. Click, hover, and
responsive sweeps still outstanding (blocked on getting the browser window off 1920 — see
"Open items").

## Global

| Property | Finding |
|---|---|
| Smooth-scroll library | **None.** No Lenis, no Locomotive, no GSAP ScrollSmoother. Native scrolling — do **not** add a scroll library to the clone. |
| Scroll-snap | None on `html`/`body`. |
| `body` initial class | `loading` — removed after hydration. Suggests a first-paint gate. |
| CSS custom properties on `:root` | **Zero.** All colors are literal values inside Tailwind utility classes. There is no token layer to mirror — build our own token set and map to it. |
| Carousels | 11 Swiper instances (announcement bar, hero, brand strip, 3× brand carousels, deals, blogs, …). |

## Sticky header stack

Three stacked layers, measured at scroll 0 → 400 → 1500:

| Layer | Height | `top` @ scroll 0 | `top` @ scroll ≥400 | z-index |
|---|---|---|---|---|
| Brand bar (`ANKER / eufy / eufy Make / soundcore` ⟷ `ANKER Innovations`) | 30px | 0 | scrolls away | — |
| `#announcementBar` | 45px | 30 | **0** (pinned) | 55 |
| Header wrapper → `#header` | 96px | 75 | **45** (pinned) | 53 / 100 |

Behaviour: the 30px brand bar is normal flow content and scrolls off. The announcement bar and
header are `sticky` and come to rest at `top: 0` and `top: 45` respectively, so the resting
header stack is **141px** tall (45 + 96).

- Heights do **not** change on scroll (45/96 constant at 0, 400 and 1500).
- Background does **not** change: `rgba(0,0,0,0)` at both scroll 0 and 400.
- Box-shadow does **not** change: `none` at both.
- **Transition present:** `transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)` on `#header`.

> The `transform` transition with no observed transform change at 0/400/1500 strongly implies a
> **hide-on-scroll-down / reveal-on-scroll-up** header. All three probes scrolled *downward*, which
> would leave it in the same state. **Must verify** with a down-then-up probe before speccing the
> header — see Open items.

## Scroll-driven sticky media sequence (topology #32 / #33)

The single most complex behavior on the page.

- `#33` `.ipc-mediaplayersticky` carries `mt-[-200vh]` and is **3301px** tall, starting at
  y=7113 — i.e. *above* `#32`, which sits at y=8006.
- `#32` is `h-screen z-20` ("Why Shop With Anker Nordics").
- Net effect: a tall scroll track pinned behind a full-viewport panel — the media player advances
  as the user scrolls through the 3301px track.
- The three brand carousels (#15/#21/#27) and their feature banners fall inside this negative-margin
  range, so z-order here is load-bearing.

**Not yet extracted:** the pin mechanism (`position: sticky` on an inner child vs. JS scroll
listener vs. `animation-timeline`), the video-swap trigger points, and which of the 5 videos maps
to which scroll offset. This section needs its own dedicated extraction pass and is the highest
risk item in the build.

## Videos

5 unique videos, all `autoplay loop muted`, no `poster`:

```
cdn.shopify.com/videos/c/o/v/76eee370bf62410ca08c839be6382529.mp4
cdn.shopify.com/videos/c/o/v/2c94c918738f49fa839decfef3e362e0.mp4
cdn.shopify.com/videos/c/o/v/50cb951712394439be9c0ca204705deb.mp4
cdn.shopify.com/videos/c/o/v/9beb9a270b504370bac18d35c53880ed.mp4
cdn.shopify.com/videos/c/o/v/75ecf2b4c40b49fd83bd83478f0fd2e5.mp4
```

12 `<video>` elements reference these 5 sources (reuse across breakpoint-specific markup).
Per the skill's guidance: these are **real videos** — do not reconstruct them as HTML/CSS mockups.

## Mega-menu — RESOLVED: click-driven

Tested at viewport 1920 on the `Charging` trigger.

| Probe | Result |
|---|---|
| Synthetic `mouseover`/`mouseenter` via JS | **nothing** — React ignores untrusted events |
| Real mouse hover (trusted) | chevron fades in, underline grows. **No panel.** |
| Real mouse click | **panel opens** |

**Interaction model: click-driven.** Hover only drives the two affordances (chevron
`opacity-0 → 100`, underline `w-0 → w-full`). This matches the markup — all 11 nav entries are
`<button>` with no `href`.

> Worth noting for anyone re-running this: dispatching synthetic mouse events produced a
> false negative. Only the trusted-input path settled it.

### Panel

```
div.absolute.left-0.top-full.z-[999].flex.w-full.flex-col.overflow-hidden.border-t
```

- Anchored `top-full` on the header, full width, `z-index: 999`.
- **Scrim:** a separate overlay at `rgba(0, 0, 0, 0.7)` dims the whole page beneath.
- Header stays fully lit above the scrim; the hero behind is visibly darkened.

### Panel layout (from the `Charging` capture)

Two columns:

1. **Left rail** — sub-category list: `Charger`, `Power Bank`, `Cable`, `Hubs & Docks`.
   The active item (`Charger`) carries a light `#F5F5F7`-ish background.
2. **Right pane** — `<h?>` category title + a `View More ›` link, then a row of 3 product cards.
   Each card = product image, badge pills, title. Badges seen: `Hot`, `New`, `Best Seller`
   (pill-shaped, outlined).

Full DOM + computed styles saved to `raw/megamenu-charging.json`.

**Still to capture:** the other 10 triggers' panels, and whether the left-rail items swap the
right pane on hover or click.

## Open items (blocking full behavior coverage)

1. **Header down-then-up probe** — confirm/deny hide-on-scroll-down.
2. **Click sweep** — every Swiper's next/prev arrows and pagination dots; the hero carousel's
   5 slides; any tabbed content.
3. **Hover sweep** — product cards, nav items, buttons, brand logos.
4. **Responsive sweep at 1440 / 768 / 390** — currently impossible, the Chrome window is
   maximized at 1920 and `resize_window` is a no-op on a maximized window.
5. **Mega-menu** — the SSR payload carries 4328 image URLs (vs 131 rendered), which is the entire
   nav catalog. Need to open each top-level nav item and record the flyout structure.
