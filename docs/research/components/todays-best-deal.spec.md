# TodaysBestDeal (#7) Specification

- **Target files:** `src/components/ProductCard.tsx`, `src/components/TodaysBestDeal.tsx`
- **Interaction model:** **click-driven tabs** + horizontal carousel
- **Measured at:** viewport **1920** (`lg-desktop`). Base/desktop values come from the class
  strings, which encode every tier.

> **Root font-size is 14px** (matched in our `globals.css`). Tailwind rem classes resolve to
> 0.875x — `p-1` is 3.5px, `text-sm` is 12.25px. **Port class names verbatim; use arbitrary
> `[Npx]` only for values I measured.**

## Interaction model — verified with real input

Synthetic `.click()` on the tab button **did nothing** — the card set stayed identical. A real
mouse click swapped the entire product set. This site ignores untrusted events; the same was true
of the mega-menu hover.

Consequence for QA: **verify tab switching with real clicks**, not scripted ones.

## Section shell

```
h2.text-balance.tracking-[-0.04em].text-[32px].desktop:text-[40px].lg-desktop:text-[48px].leading-[100%].font-bold
   → "Today's Best Deal"
```

| Property | Value @1920 |
|---|---|
| font-size | `48px` (base `32px`, desktop `40px`) |
| weight / line-height | `700` / `48px` (`leading-[100%]`) |
| letter-spacing | `-1.92px` (−0.04em) |
| colour | `#080A0F` |

Section height 531px @1440. Content column 1664px @1920.

## Tab bar

```
div.bg-tabs-list-bg.flex.w-fit.max-w-full.overflow-x-auto.p-1.rounded-tabs.justify-left
├ button "Best Seller"
└ button "Today's Deal"
```

| Property | Value |
|---|---|
| container background | `#EAEAEC` |
| container padding | `3.5px` (`p-1` at 14px root) |
| container display | `flex`, `w-fit`, `overflow-x-auto` |
| container border-radius | `0px` (computed — `rounded-tabs` resolves to 0) |
| tab size | active `130x50`, idle `147x50` |
| tab padding | `15px 28px 14px` |
| tab font | `14px` / `700`, line-height `21px` |
| tab colour | `#080A0F` (both states) |
| **active** background | `#FFFFFF` |
| **idle** background | `transparent` |
| tab border-radius | `0px` |

Only the background changes between states — the text colour does not.

## Product card

```
div.swiper-slide.!flex.!h-[unset]                              [316 x 384]
└ div.box-border.w-full.cursor-pointer.overflow-hidden.duration-300.rounded-2xl   [316 x 384]
```

| Property | Value |
|---|---|
| card size | `316 x 384` |
| inner background | `#EAEAEC` |
| inner border-radius | **`14px`** (their `rounded-2xl` = 14px, **not** Tailwind's default 16px — use `rounded-[14px]`) |
| transition | `duration-300` |
| product image | `124 x 124`, `w-full` |

### Title

```
h3.text-balance.tracking-[-0.04em].text-[20px].lg-desktop:text-[24px].leading-[120%].font-bold
```

| Property | Value @1920 |
|---|---|
| font-size | `24px` (base `20px`) |
| weight / line-height | `700` / `28.8px` (120%) |
| letter-spacing | `-0.96px` |
| colour | `#080A0F` |
| box | `274 x 58` — clamps to 2 lines |

### Badge pills

```
span.inline-flex.items-center.justify-center.whitespace-nowrap.rounded-[16px].border-none.font-bold
     .text-brand-0.outline-brand-0
```

| Property | Value |
|---|---|
| border-radius | `16px` |
| padding | `5px 8px 4px` |
| font-size / weight | `16px` / `700` |
| colour | `#080A0F` |
| background | `transparent` |
| **outline** | `1px solid #080A0F`, `outline-offset: -1.6px` |
| size (e.g. "Hot") | `44 x 28` |

Same inset-outline trick as the hero's secondary button — **not** a border. Values seen:
`Hot`, `New`, `Best Seller`, and a discount pill like `29 %` (note the space before `%`).

### Price

| Property | Value |
|---|---|
| font-size / weight | `17.5px` / `700` |
| line-height | `24.5px` |
| colour | `#080A0F` |

Discounted cards show the original struck through beside the current price
(`text-decoration: line-through`).

**Prices are Swedish-locale formatted**: `2 690,00 kr` — non-breaking space as thousands
separator, comma as decimal, ` kr` suffix. Copy the strings verbatim; do not reformat or
re-derive them from numbers.

### Shop Now button

| Property | Value |
|---|---|
| size | `130 x 48` |
| background / colour | `#080A0F` / `#FFFFFF` |
| font-size / weight | `16px` / `700`, line-height `19.2px` |
| padding | `15px 24.5px 14px` |
| border-radius | `0px` — square |

## Carousel

Horizontal, slide width `316px`. 12 cards in "Best Seller", 13 in "Today's Deal".
No pagination bullets. Cards overflow to the right and scroll.

## Per-state content

Both states captured with real clicks. Full data in
`docs/research/www.ankernordics.com/raw/sec-7-bestseller.json` and `sec-7-todaysdeal.json`.


### State: `Best Seller` — 12 cards

| # | Title | Pills | Price | Was | Local image |
|---|---|---|---|---|---|
| 1 | `Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case` | Hot, New | `2 690,00 kr` | — | `/images/d1204_black_new_logo1.png` |
| 2 | `eufy Robot Vacuum Omni E25 (Black)` | Best Seller, Hot | `11 990,00 kr` | — | `/images/frame_2121236678.png` |
| 3 | `eufyCam S4 (4K Bullet + 2K PTZ)` | New | `4 490,00 kr` | — | `/images/background.png` |
| 4 | `Anker Laptop Power Bank (25K, 165W, Built-In and Retractable Cables)` | Best Seller | `993,29 kr` | `1 399,00 kr` | `/images/a1654_no_7.png` |
| 5 | `eufyCam S3 Pro 4-Cam Kit` | Hot | `10 499,00 kr` | — | `/images/t8894.png` |
| 6 | `eufy X10 Pro Omni (Black)` | Hot | `4 495,50 kr` | `9 990,00 kr` | `/images/frame_2147226845_1.png` |
| 7 | `soundcore Sleep A30 \| The World's First Smart ANC Sleep Earbuds` | — | `2 990,00 kr` | — | `/images/group2147226706.png` |
| 8 | `eufyCam S330 (eufyCam 3) 4-Cam Kit` | Hot | `8 490,00 kr` | — | `/images/s330eufycam_eufycam3_4-camkit.png` |
| 9 | `Anker Laptop Charger (140W, 4-Port, PD 3.1) with USB-C Cable` | Best Seller | `1 299,00 kr` | — | `/images/b26973z1.png` |
| 10 | `Anker Prime Charger (250W, 6 Ports, GaNPrime)` | Best Seller | `2 299,00 kr` | — | `/images/a1654_no_9.png` |
| 11 | `Anker Prime Charger (200W, 6 Ports, GaN)` | Hot | `993,30 kr` | `1 290,00 kr` | `/images/a2683141_td01_v1-removebg-preview.png` |
| 12 | `Video Doorbell E340` | Best Seller, New | `1 890,00 kr` | — | `/images/1060_1060.png` |

### State: `Today's Deal` — 13 cards

| # | Title | Pills | Price | Was | Local image |
|---|---|---|---|---|---|
| 1 | `eufyCam S330 (eufyCam 3) 4-Cam Kit + 1 TB Hard Drive` | Best Seller | `5 483,90 kr` | `8 990,00 kr` | `/images/1tb_1.png` |
| 2 | `eufyCam S4 + eufy HomeBase™ S380` | New | `4 717,50 kr` | `6 290,00 kr` | `/images/frame214722685111_1.png` |
| 3 | `eufyCam C37 2K (4 Pack) + Homebase Mini + Solar Panel*4` | New | `4 672,80 kr` | `6 490,00 kr` | `/images/e814x3261.png` |
| 4 | `eufyCam S3 Pro 4-Cam Kit + Video Doorbell S220 Add-on` | — | `8 022,70 kr` | `10 990,00 kr` | `/images/t8894_us_td01_4_1.png` |
| 5 | `Anker Prime Power Bank (26K, 300W)` | Best Seller | `1 992,00 kr` | `2 490,00 kr` | `/images/frame_2121237348.png` |
| 6 | `Anker Prime Charger (160W, 3 Ports, Smart Display)` | Best Seller | `1 284,40 kr` | `1 690,00 kr` | `/images/frame_20000.png` |
| 7 | `Anker Nano 45W Smart Display Charger (2-Pack)` | New | `844,61 kr` | `949,00 kr` | `/images/bundle-a121d311-2_rich_image_td01_en_v2.png` |
| 8 | `eufyCam C35 4-Cam Kit` | New | `3 003,00 kr` | `4 290,00 kr` | `/images/frame_371.png` |
| 9 | `Anker Laptop Power Bank (25K, 165W, Built-In and Retractable Cables)` | Best Seller | `993,29 kr` | `1 399,00 kr` | `/images/a1654_no_8_f50a2351-3931-4a6d-a9b9-d73db1fed721.png` |
| 10 | `soundcore Space One \| Active Noise Cancelling Headphones` | — | `890,10 kr` | `1 290,00 kr` | `/images/frame_2121237312.png` |
| 11 | `eufy X10 Pro Omni (Black) + Replacement Parts Kit` | Hot | `4 615,80 kr` | `10 990,00 kr` | `/images/frame_21212366702.png` |
| 12 | `soundcore Work \| The World's First Coin-Sized AI Voice Recorder` | Hot | `1 284,40 kr` | `1 690,00 kr` | `/images/d3200z11_listing_image_07_us_v11.png` |
| 13 | `Nebula X1 \| 4K Triple Laser Projector with Dolby Audio` | Hot | `19 944,30 kr` | `34 990,00 kr` | `/images/image_1.png` |

## Verification

`npx tsc --noEmit` must pass before finishing.
