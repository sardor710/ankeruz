# CompanySlogan (#2) + CategoryStrip (#5) Specification

Two adjacent sections. Separate components, one builder.

- **Target files:** `src/components/CompanySlogan.tsx`, `src/components/CategoryStrip.tsx`
- **Measured at:** viewport **1440** (`desktop` tier)

> **Root font-size is 14px** (set in our `globals.css` to match the target). Every Tailwind
> rem class below therefore resolves to 0.875× the usual — `gap-3` is 10.5px, `text-sm` is
> 12.25px, `px-16` is 56px. **Use the verbatim class names; do not hardcode pixels.**

## Shared gutter container

Both sections sit in the site-standard wrapper:

```
div.ipc_container.relative.z-10.w-full
└ div.mx-auto.size-full.px-4.tablet:px-8.laptop:px-16.desktop:px-16.lg-desktop:px-[calc(50%-832px)].lg-desktop:max-w-full
```

---

## 1. CompanySlogan (#2) — height 66px @1440

### Structure

```
div.slogan-container.laptop:flex-row.laptop:items-end.laptop:justify-between     [1311×66]
├ h1.text-balance.tracking-[-0.04em].font-bold.text-left.slogan-title            [675×66]
└ div.relative.w-full.max-w-[500px].overflow-hidden.tablet:h-[40px]              [500×39]
  └ div.flex.flex-col.transition-transform.duration-500.ease-[cubic-bezier(.4,0,.2,1)]
    └ div.laptop:justify-end.flex.w-full.flex-row.items-stretch.gap-3.overflow-hidden.tablet:h-[40px]
      ├ p  "146+ Countries and Regions"
      ├ div.slogan-feature-divider.w-px.self-stretch.bg-[#E4E5E6]
      ├ p  "200M+ Global Consumers"
      ├ div.slogan-feature-divider.w-px.self-stretch.bg-[#E4E5E6]
      └ p  "5,000+ Worldwide Employees"
```

### This is the page's real `<h1>`

Text, verbatim:

```
A Global Smart Hardware Technology Company Driven by Ultimate Innovation
```

| Property | Value |
|---|---|
| font-size | `30px` |
| weight | `700` |
| line-height | `33px` (1.1) |
| letter-spacing | `-1.2px` (−0.04em) |
| colour | `#080A0F` |
| width @1440 | `675px` |
| align | left |

There is a second, visually-hidden `<h1>` elsewhere carrying the SEO title. Only build this one.

### Stat items

| Text (verbatim) | Width @1440 |
|---|---|
| `146+ Countries and Regions` | 152px |
| `200M+ Global Consumers` | 143px |
| `5,000+ Worldwide Employees` | — |

| Property | Value |
|---|---|
| font-size / weight | `14px` / `700` |
| line-height | `19.6px` (1.4) |
| letter-spacing | `-0.28px` (−0.02em) |
| colour | `#080A0F` |
| gap | `gap-3` → 10.5px |
| justify | `flex-end` at laptop+ |
| divider | `w-px self-stretch bg-[#E4E5E6]` — 1px hairline, full height |

### The ticker that doesn't tick

The outer `div.flex.flex-col.transition-transform.duration-500` is a **vertical carousel track** —
but at desktop it holds exactly **one** child row and its transform stays `matrix(1,0,0,1,0,0)`.
Probed at rest and after scrolling the section into view; it never moves.

**Build it static at desktop.** Keep the `flex-col transition-transform duration-500
ease-[cubic-bezier(.4,0,.2,1)]` wrapper and the `overflow-hidden` + `tablet:h-[40px]` viewport so
the machinery is present, but do **not** implement rotation. The mechanism is presumably used at
mobile, where the three stats would stack — unverified, since the browser could not be driven
below 768px.

---

## 2. CategoryStrip (#5) — height 265px @1440

A horizontally-scrolling Swiper of circular product-category tiles.

### Structure (per slide)

```
div.swiper-slide.!h-[unset]                                          [316px wide]
└ div.relative.max-h-[240px].overflow-hidden
  └ div.aspect-w-[167].aspect-h-[120].tablet:aspect-w-[404]…
    └ div.absolute.inset-0.max-h-[240px].tablet:p-3.laptop:p-4.desktop:p-6
      ├ div.flex.items-center.justify-center.transition-all.duration-300
      │ └ a
      │   └ picture.block.overflow-hidden.tablet:size-[72px].laptop:size-1/2.desktop:size-[116px]
      │     └ img.w-full
      └ p.text-info-primary.lg-desktop:text-lg.lg-desktop:!leading-6      ← LABEL
```

> **The label `<p>` is a SIBLING of the anchor, not inside it.** Querying for text within the
> `<a>` returns empty — that cost me a pass.

### Label style

| Property | Value |
|---|---|
| font-size | `12.25px` (`text-sm` at 14px root) |
| weight | `700` |
| line-height | `14px` |
| colour | `#080A0F` |
| text-align | `center` |
| `lg-desktop` | `text-lg`, `leading-6` (important) |

### Image

`<picture>` with 5 `<source>` entries (responsive art direction) + `<img class="w-full">`.
Rendered size steps by tier: `tablet:size-[72px]` → `laptop:size-1/2` → `desktop:size-[116px]`.

For the clone, a single `next/image` per tile at the local path is sufficient — the sources are
the same asset at different widths.

### Hover

`div.flex.items-center.justify-center.transition-all.duration-300` wraps the image — a 300ms
transition is armed on it. The exact hover delta was **not captured**. Implement a restrained
scale (e.g. `hover:scale-105`) and mark `// TODO: hover delta unverified`.

### Carousel

- **32 slides in the DOM = 24 unique + 8 loop duplicates.** Build the 24 unique ones and let the
  carousel handle looping; do not hardcode 32.
- Slide width `316px` @1440.
- Free horizontal scroll / drag. No pagination bullets visible on this strip.

### The 24 categories

Verbatim labels, local image paths (all downloaded), and hrefs:

| Label | Local image | href |
|---|---|---|
| `Outdoor Cameras` | `/images/outdoor_cameras_-_eufycam_s4_-_t8172.png` | `/collections/outdoor-cameras` |
| `Robot Vacuum` | `/images/frame_2121236702-1.png` | `/collections/robot-vacuum` |
| `Lawn Mowers` | `/images/lawn_mowers_-_eufy_robot_mower_e15_-_t2880_1.png` | `/collections/lawn-mower` |
| `Sleep Earbuds` | `/images/image_2_5_1.png` | `/collections/sleep-earbuds` |
| `Power Banks` | `/images/power_banks_-_a110a_1.png` | `/collections/power-banks` |
| `Chargers` | `/images/chargers_-_a2687.png` | `/collections/chargers` |
| `Cables` | `/images/cables_-_a88e2_1.png` | `/collections/cables` |
| `Hubs and Docks` | `/images/hubs_and_docks_-_a83b3.png` | `/collections/hubs-and-docks` |
| `Wireless Chargers` | `/images/wireless_chargers_-_a25x7.png` | `/collections/wireless-chargers` |
| `AC Power` | `/images/ac_power_-_a91b2.png` | `/collections/ac-power` |
| `Car Chargers` | `/images/car_chargers_-_a2933.png` | `/collections/car-chargers` |
| `Smart Lights` | `/images/smart_lights_-_permanent_outdoor_light_s4.png` | `/collections/outdoor-light` |
| `Breast Pumps` | `/images/breast_pumps_-_wearable_breast_pump_s1_pro.png` | `/collections/baby-1` |
| `eufy Cleaning Accessories` | `/images/frame_21212367011.png` | `/collections/ap-accessory` |
| `HomeBase` | `/images/homebase_-_homebase_s380_homebase_3_-_t8030.png` | `/collections/homebase` |
| `Smart Displays` | `/images/smart_displays_-_smart_display_e10_-_t87a0.png` | `/collections/smart-display` |
| `PoE Cameras` | `/images/poe_cameras_-_nvr_security_system_s4_max_8_channels_nvr_with_4_poe_bul.png` | `/collections/poe-cameras` |
| `Indoor Cameras` | `/images/indoor_cameras_-_indoor_cam_s350_-_t8416_1.png` | `/collections/Indoor-cameras` |
| `Voice Recorders` | `/images/voice_recorders_-_soundcore_work_ai_recorder_-_d3200.png` | `/products/d3200` |
| `Truly Wireless Earbuds` | `/images/true_wireless_earbuds_-_liberty_5_-_a3957_1.png` | `/collections/true-wireless-earbuds` |
| `Open-Ear Earbuds` | `/images/open-ear_earbuds_-_aerofit_pro_2_-_a3875_1.png` | `/collections/open-ear-headphones` |
| `Open-Ear Headphones` | `/images/image_3_-1.png` | `/collections/headphones` |
| `Speakers` | `/images/speakers_-_rave_3s_-_a31a3_1.png` | `/collections/speakers` |
| `Projectors` | `/images/smart_projectors_-_x1_-_d2351_1.png` | `/collections/projectors` |

All 24 images are already downloaded to `public/images/`. The hrefs are same-origin paths — use them as given.

## Implementation notes

- Do NOT add the `swiper` package. A horizontally scrollable flex row with `overflow-x-auto`, snap points, and hidden scrollbar reproduces this closely enough; add drag only if trivial.
- `CompanySlogan` is static → server component, no `"use client"`.
- `CategoryStrip` needs `"use client"` only if you implement drag/scroll state; prefer CSS-only scrolling and keep it a server component if possible.
- Drive tiles from a typed array.

## Verification

`npx tsc --noEmit` must pass before finishing.
