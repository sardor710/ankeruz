# PDP Core Components — measured values (d1204 / Liberty 5 Pro Max)

Companion to `pdp-product-hero.spec.md`, which holds the grid contract and the 24-slide gallery
list. This file carries the values measured in the build pass. Everything here is from
`getComputedStyle()` at **viewport 1920**.

## ⚠ BREAKPOINTS ARE INVERTED — read before writing any class

Verified against the real CSS rules on this page:

| Target class | Real media query | Translate to |
|---|---|---|
| `md:` | `@media (max-width: 767px)` — **mobile only** | `max-[767px]:` |
| `lg:` | `(min-width: 769px) and (max-width: 1024px)` — **tablet band** | `min-[769px]:max-[1024px]:` |

`md:hidden` hides on MOBILE. This is the opposite of every homepage component in this repo.
Do **not** reuse the `min-[768px]:` / `min-[1440px]:` mapping here.

Root font-size is 14px (`globals.css`), so `text-xl` = 17.5px etc. Values below are the measured
pixels — prefer arbitrary `[Npx]` where the measurement is explicit.

---

## 1. PdpBreadcrumb — topology #0

Text: `Home / Earbuds / Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case`

- 14px / 500 / line-height 16.8px, colour `rgb(0,0,0)`
- Links are `rgb(23,187,239)` (`#17BBEF`):
  - `Home` → `/`
  - `Earbuds` → `https://www.ankernordics.com/collections/true-wireless-earbuds`
- The trailing product name is plain text, not a link
- Separator is a literal `/`
- Height 17px, sits at the top of the content wrapper

> The title separator is **U+FF5C FULLWIDTH VERTICAL LINE** (`｜`), not ASCII `|`.

---

## 2. PdpBuyBox — topology #1, right column (494 × 977)

13 children. Measured values for the ones that render at 1920:

### 0 — `<h1>` title
`text-balance tracking-[-0.04em] text-[30px] font-bold`
→ **30px / 700 / 36px / -1.2px**, `rgb(0,0,0)`, 72px tall.
Text: `Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case`

### 1 — rating row
`relative mt-[16px] flex w-fit` — 14px / 500 / 16.8px, 21px tall, 166px wide.
5 filled stars + text `69 reviews`.

### 2 — description (DESKTOP copy; class is `md:hidden`, i.e. hidden on mobile)
14px / 500 / 16.8px. Collapsed box is **120px** tall with a `View More` toggle beneath.
**7 `<li>` bullets**, each opening with a bold lead-in:

1. **AI Note-Taker & Subscription** — `Record OFFLINE meetings and easily transcribe them on demand to generate AI summaries with action items. Manage workflows on the go via the soundcore app (iOS/Android), or use the Web portal with the "Ask Anka" AI assistant for efficient desktop management. Standard subscription plans include Pro plan offers 1,200 minutes per month ($15.99/mo, $69.99/6-mo, or $99.99/yr) and Unlimited supports 24-hour all day transcription needs ($239.99/yr). You can also purchase additional minutes as needed. Liberty 5 Pro Max comes with a free Starter Plan 120 minutes of complimentary AI transcription per month for 24 months.`
2. **STRICT BUSINESS-GRADE PRIVACY:** `The trusted audio choice for professionals handling confidential information. Your conversations are secured with local AES-256 encryption. Without cloud sync enabled, temporary cloud files will be immediately deleted once you receive the audio transcription results, ensuring no audio and transcription content is retained. Built to the security standards with ISO 27001/27701, SOC 2 Type 1, HIPAA, EN 18031, EN 303645, and NIST IR 8425 compliance, the soundcore app and Liberty 5 Pro Max deliver uncompromising data privacy and peace of mind.`
3. **Effortless Screen Control:** `Features a large 1.78" AMOLED display that lets you access the AI Voice Recorder, adjust ANC, and manage earbud settings—all from the screen. Add custom wallpapers to make your charging case truly yours.`
4. **Whisper-Clear Calls:** `Equipped with 10 sensors and the Thus™ AI Chip, enjoy crystal-clear calls in 100 dB+ noisy environments or even quiet rooms. Whisper, speak, or shout—your voice is always heard, anywhere you go.`
5. **Instant Pure Silence:** `100% more effective noise cancellation than our previous flagship model. Powered by 8 sensors and the Thus™ AI Chip, the earbuds process 384K+ noise signals per second, blocking subway, office, or street chaos for instant silence.`
6. **Your Signature Sound:** `HearID 5.0 with personalized EQ and an AI Audio Enhancer deliver sound precisely tuned to your ears. No more compromises with generic, standard audio.`
7. **Lag-Free Voice Control:** `With 20 built-in commands, you can skip songs, take calls, and adjust the volume—offline processing ensures zero delay.`

Note the characters: `"` U+201C/U+201D around Ask Anka, `—` em dashes, `™` on Thus, `1.78"` uses a
straight double-quote as an inch mark.

**INTERACTION MODEL: click-driven.** `View More` expands the clamped list. Collapsed height 120px.

### 3 — colour selector
`mt-[20px] grid gap-[30px]`, 71px tall. Label 14px / 500 / 16.8px.

**CONFIRMED:** the source string is lowercase `color: ` and the element carries
`text-transform: capitalize`, which is what renders `Color:`. Reproduce it the same way —
lowercase source plus `capitalize` — rather than hardcoding `Color:`, so the selected value
("black" → "Black") capitalises through the same rule the target uses.

Two swatch `<button>`s, **40 × 40**, `border-radius: 9999px`, `border: 1px solid rgb(229,231,235)`:

- **selected:** `outline: rgb(23,187,239) solid 2px`
- **unselected:** `outline: rgb(255,255,255) solid 2px`

Images `/images/1204_black.png`, `/images/1204_gold.png`.
Selecting swaps the gallery colourway (slides 0–12 Black, 13–23 Gold). **Click-driven, local state.**

### 4 — price
`text-[24px] font-bold md:text-[20px]` → **24px / 700 / 28.8px**, `rgb(0,0,0)`.
Text `2 690 kr` — **CONFIRMED: both spaces are U+00A0 NO-BREAK SPACE**, not U+0020.
Code points: `0032 00a0 0036 0039 0030 00a0 006b 0072`. Write it as `2 690 kr` so the
price never wraps and an editor cannot silently swap in a normal space.

### 5 — installment accordion
`my-4 border border-[#F7F8FA]`, 44px tall, one icon + one toggle button.
Text: `Flexible installment payment options available.`

### 7 — `Choice`
Label `Choice` at **18px**. Grid: **2 × 241.75px, gap 10.5px**. Cards **242 × 156**, radius **8px**:

| Card | Border | Image | Copy | Price |
|---|---|---|---|---|
| selected | `2px rgb(51,51,51)` | `/images/1204_black.png` | `Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case` | `2 690 kr` |
| unselected | `1px rgb(216,216,216)` | `/images/1203.png` | `Liberty 5 Pro \| Noise Cancelling Earbuds for Clear Calls` | `2 190 kr` |

> Card 1's title uses the **fullwidth** `｜`; card 2's uses an **ASCII** `|`. Both are real.

### 9 / 11 — Order Support, Payment Methods
`mt-[24px] bg-white` (119px, 4 icons) and `border-t border-[#E8E8E8] px-[8px] py-[16px]` (91px).
**Not measured in detail** — render the headings (`Order Support`, `Payment Methods`) and the four
badge labels (`Fast Shipping`, `30-Day Money-Back Guarantee`, `Hassle-Free Warranty`, +1) or omit
these two blocks for now and leave a TODO. Do not invent icon artwork.

---

## 3. PdpStickyBuyBar — topology #11

`fixed bottom-0 z-20 w-full bg-white py-[16px] shadow-2xl md:py-[8px]` — **76px** tall,
background `rgb(255,255,255)`, padding `16px 0`, `z-index: 20`.

Inner: `mx-auto flex h-full w-auto max-w-base items-center justify-between`, **1280px** wide.

| Element | Style |
|---|---|
| title `<p>` | 20px / 700, `rgb(0,0,0)`, 581px wide |
| price `<p>` | 24px / 700, `rgb(0,0,0)` |
| `Add to Cart` | 147 × 44, bg `#FFFFFF`, text `rgb(0,0,0)`, `border: 2px solid rgb(0,0,0)`, radius **70px**, 16px/700 |
| `Buy Now` | 118 × 44, bg `rgb(23,187,239)`, text `#FFFFFF`, radius **70px**, 16px/700 |

**Scope:** no cart backend. Buttons render and are focusable but must not submit, fetch, or
navigate to a checkout. Give them `type="button"` and no handler.

---

## Assets — all local

Resolve CDN names through `docs/research/www.ankernordics.com/asset-map-pdp-d1204.json`.
234 files downloaded by `scripts/download-pdp-assets.mjs` (idempotent — re-runs cache).

Key ones: `/images/1204_black.png`, `/images/1204_gold.png`, `/images/1203.png`,
`/images/a3875zq1_rich_image_td03_us_v1.jpg` and `…-2.jpg` (gallery slides 7 and 20).

## Gallery videos — excluded by decision

4 slides are HLS-only with no poster, no MP4 rendition, and no local ffmpeg; they render as empty
players on the target itself in desktop Chrome. Build the **20 image slides**; keep the 4 video
entries in the data array flagged unavailable. Do not substitute a still.
