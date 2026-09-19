# SiteFooter Specification

- **Target file:** `src/components/SiteFooter.tsx`
- **Measured at:** viewport **1920** (`lg-desktop`), **re-captured 2026-08-06**
- **Interaction model:** static + link hover. Server component.

> ### This spec was rewritten. The previous revision was wrong.
>
> The earlier capture (`raw/footer.json`) used a selector that matched nested elements. It produced
> an empty `heads: []`, a duplicated **"Company"** column, and garbage headings like
> `"CompanyCompany ProfilePress Ro"`. It also described the footer as transparent.
>
> Verified against the live DOM and a screenshot: the footer is **black with light-grey text**, and
> the four columns are **Company / Program / Support / Contact Us**. Build from this file only.

> **Root font-size is 14px.** `text-xs` = 10.5px, `text-sm` = 12.25px, `text-base` = 14px,
> `text-xl` = 17.5px.
> **Breakpoints:** `tablet:`→`min-[768px]:`, `laptop:`→`min-[1024px]:`,
> `desktop:`→`min-[1440px]:`, `lg-desktop:`→`min-[1920px]:`.

## Root structure

```
footer                                        h = 1207px @1920
└── div.global_footer_layer                   background rgb(245,245,247) — fully covered
    └── div  (gutter container)               background rgb(0,0,0)  ← the footer reads BLACK
        ├── span            legal disclaimers      y=56   h=158
        ├── FooterNewsletter                       y=270  h=317   ← separate component
        ├── nav#footer-main-services               y=643  h=366
        └── div#footer-brand                       y=1065 h=86
```

Gutter container classes (identical to the shared container used by `TopBrandBar`):
```
lg-desktop:max-w-full mx-auto size-full tablet:px-8 laptop:px-16 desktop:px-16
lg-desktop:px-[calc(50%-832px)] px-4
```
Computed @1920: `padding: 56px 119.5px`, `display: flex`, `flex-direction: column`, `gap: 56px`,
`background-color: rgb(0, 0, 0)`, content column 1664px.

## Import contract

```ts
import { FooterNewsletter } from "@/components/FooterNewsletter";
```
Takes no props. Render it as the second child. **Do not build the newsletter panel yourself** —
another builder owns that file.

## 1. Legal disclaimers `<span>`

```
text-pretty tracking-[-0.02em] tracking desktop:text-sm text-xs font-bold text-[#6D6D6F]
```
Computed @1920: `font-size: 12.25px`, `font-weight: 700`, `line-height: 17.5px`,
`letter-spacing: -0.245px`, `color: rgb(109, 109, 111)`.

Four text nodes separated by **two `<br>` each**. Verbatim:

1. `*Anker is the world's No. 1 mobile charging brand based on retail sales value for five consecutive years: 2020 to 2024.`
2. `Data source: Euromonitor International (Shanghai) Co., Ltd., measured in terms of retail value sales in 2020 through 2024, based on research completed in June 2025. Mobile charging brands are defined as those with over 75% of retail sales from mobile phone charging products, including chargers, wireless chargers, power banks, and charging cables. These products may also be used with other consumer electronic devices.`
3. `*soundcore ranks among the global top 3 audio brands by wireless headphone shipment volume.`
4. `Source: Euromonitor International (Shanghai) Co., Ltd., based on global wireless headphone shipment volume in 2024. Audio brands are defined as brands with more than 75% of revenue from audio equipment, including headphones and speakers. Wireless headphones are defined as headphones that connect to electronic devices such as mobile phones and computers via wireless technologies (e.g., Bluetooth). Research completed in March 2025.`

> `world's` uses **ASCII U+0027**, matching the same string in `BrandVideoHero`.

## 2. `nav#footer-main-services`

`display: flex`, `flex-direction: column`, `gap: 28px`. Three children:

### 2a. Store services row

Heading `<span>`: `Buy on the Anker Store`
```
text-pretty tracking-[-0.02em] tracking text-xl font-bold leading-[1.2] text-white
```
→ `font-size: 17.5px`, `font-weight: 700`, `color: rgb(255, 255, 255)`.

Badge row: `laptop:flex-row desktop:gap-4 laptop:flex-wrap mt-4 flex flex-col gap-2`
→ computed `gap: 14px`.

Each badge: `desktop:min-w-[288px] flex flex-1 shrink-0 items-center gap-2` → `gap: 7px`, 406px wide.
Icon **18 × 18px**; text `font-size: 14px`, `font-weight: 700`, `color: rgb(182, 182, 186)`.

| Text | Icon |
|---|---|
| `Fast Shipping` | `/images/vector_2.png` |
| `30-Day Money-Back Guarantee` | `/images/union-3.png` |
| `Hassle-Free Warranty` | `/images/icon_support-2.png` |
| `Sweden: +46 20 012 33 22 (Mon-Fri, 9am-6pm)` | `/images/union_1.png` |

### 2b. Divider
`desktop:block hidden h-px bg-[#3D3E3F]` — 1px, visible **only ≥1440**.

### 2c. Link grid

```
desktop:grid grid-cols-4 gap-4
```
Computed @1920: `display: grid`, 4 × 405.5px, `gap: 14px`, height 252px.

Each column wrapper: `desktop:py-0 desktop:border-none border-t border-[#3D3E3F] py-4`
(below 1440 the columns stack as bordered rows).

Column heading `<span>`: same classes as 2a — 17.5px / 700 / `rgb(255,255,255)`.

Link list: `mt-4 flex flex-col gap-2` → `gap: 7px`.
Link inner `<span>`:
```
text-pretty tracking-[-0.02em] tracking desktop:text-base text-sm font-bold leading-[1.2]
```
→ `font-size: 14px`, `font-weight: 700`, `line-height: 21px`, **`color: rgb(182, 182, 186)`**.

> **Colour gotcha:** the `<a>` itself computes to `rgb(8, 10, 15)`. The visible colour lives on the
> inner `<span>`. Put the colour on the span, or every link renders near-black on black.

#### Column 1 — `Company`
| Label | href |
|---|---|
| `Company Profile` | `https://www.ankernordics.com/about` |
| `Press Room` | `https://via.tt.se/pressrum/3237203/anker-innovations` |
| `Authorized Sellers` | `https://www.ankernordics.com/wheretobuy` |
| `Get support` | `https://www.ankernordics.com/contact-us` |
| `Terms of Use` | `https://www.ankernordics.com/policies/terms-of-service` |
| `Blogs` | `https://www.ankernordics.com/blogs/se` |

#### Column 2 — `Program`
| Label | href |
|---|---|
| `Become An Affiliate` | `https://www.ankernordics.com/become-an-affiliate` |
| `Cooperate Purchase` | `https://www.ankernordics.com/corporate-purchase` |
| `New Membership` | `https://www.ankernordics.com/newcustomer` |
| `AnkernordicCredits Program` | `https://www.ankernordics.com/ankernordiccredits-program` |
| `Refurbished Products` | `https://www.ankernordics.com/collections/refurbished` |

> `Cooperate Purchase` is the target's own typo (href says `corporate`). Keep the label as-is.

#### Column 3 — `Support`
| Label | href |
|---|---|
| `Order Tracking` | `https://service.anker.com/eu/logistics` |
| `Order Cancel` | `https://passport.ankernordics.com/search-orders` |
| `Support Center` | `https://www.ankernordics.com/support` |
| `Process a Warranty` | `https://www.ankernordics.com/exchange` |
| `Returns & Refunds` | `https://www.ankernordics.com/policies/refund-policy` |
| `Shipping Policy` | `https://www.ankernordics.com/policies/shipping-policy` |
| `Privacy Policy` | `https://www.ankernordics.com/policies/privacy-policy` |
| `Product Recall` | `https://www.ankernordics.com/rc2506` |

#### Column 4 — `Contact Us`

Not a link list. Six stacked rows:

1. Heading row: `desktop:pb-0 flex items-center justify-between pb-4` → `Contact Us`
2. Contact block: `desktop:mt-4 desktop:mb-0 mb-4 flex flex-col gap-2`, text `rgb(182,182,186)` 14px/700
   - `/images/icon_voice-2.png` (18×18) + `Sweden: +46 20 012 33 22 (Mon-Fri, 9am-6pm)`
   - `/images/icon_email-2.png` (18×18) + three lines:
     `Anker: support@anker.com` / `Soundcore: service@soundcore.com` / `Eufy: support@eufy.com`
3. Country row: `desktop:py-0 desktop:border-none border-t py-4 desktop:hidden border-b border-[#3D3E3F]`
   → `Sweden`. **Hidden ≥1440** (the desktop country selector lives in `#footer-brand`).
4. Spacer: `desktop:hidden mt-8`
5. Social row: `mt-8 flex items-center gap-2`, icons **28 × 28px**

| Icon | href |
|---|---|
| `/images/icon_instagram.png` | `https://www.instagram.com/anker_nordics/` |
| `/images/icon_tiktok-2.png` | `https://www.tiktok.com/@eufy.nordics` |
| `/images/icon_linkedin.png` | `https://www.linkedin.com/company/anker-nordics/` |
| `/images/icon_youtube-2.png` | `https://www.youtube.com/channel/UCPcOcLs7ZF0JCDg69CUvzdw` |

6. Payment row: `mt-4 flex flex-wrap gap-2`, icons **44 × 28px**, no links

| Order | File | Mark |
|---|---|---|
| 1 | `/images/05f313d1-eb29-4f6e-8b7c-50128a62215b_l-1.png` | Visa |
| 2 | `/images/999d3679-949b-4542-bb86-d998a72bfd87_h-1.png` | Mastercard |
| 3 | `/images/d98b9143-de4d-4b43-852b-31690469fd5e_b-1.png` | Amex |
| 4 | `/images/eb54d220-728b-4219-acc8-595ffcba11a6_i-1.png` | PayPal |
| 5 | `/images/20260408-194805.png` | Klarna |

## 3. `div#footer-brand`

`display: flex`, `flex-direction: column`, `gap: 14px`. Three children:

### 3a. Brand row
`desktop:items-center desktop:flex desktop:gap-4` → `gap: 14px`. Two children:

- Wordmarks: `laptop:flex-row laptop:items-center desktop:flex-[980] flex flex-col items-start`,
  `gap: 14px`, 1248px wide. Five SVGs, all `color: rgb(182, 182, 186)`, import from
  `@/components/icons`:

| Component | Size |
|---|---|
| `AnkerNordicsFooterLogo` | 98 × 36 |
| `AnkerFooterWordmark` | 87 × 36 |
| `EufyFooterWordmark` | 68 × 36 |
| `EufyMakeFooterWordmark` | 140 × 36 |
| `SoundcoreFooterWordmark` | 138 × 36 |

- Country selector: `desktop:py-0 desktop:border-none border-t border-[#3D3E3F] py-4`, 402px wide.
  `GlobeIcon` (20 × 20) + label `Sweden`. Render as a **static button** — there is no other locale
  in scope, so do not build a working switcher.

### 3b. Divider
`h-px bg-[#3D3E3F]` — always visible (unlike 2b).

### 3c. Copyright row
`laptop:flex-row desktop:gap-4 desktop:items-center flex flex-col items-start gap-1`

Text: `© Fantasia Trading LLC 2025 200923810277`
→ `font-size: 14px`, `font-weight: 700`, `line-height: 21px`, `color: rgb(109, 109, 111)`.
The `©` is **U+00A9**.

## States & Behaviors

- **Link hover:** the target sets `transition-colors` on link spans; no captured end colour.
  A subtle lightening toward `#FFFFFF` is acceptable and consistent with `TopBrandBar`'s pattern.
- No scroll-driven, click-driven, or time-driven behavior anywhere in the footer.

## Responsive Behavior

From the class contract (window resize was blocked by a maximized browser window, so the
breakpoint-prefixed classes are the authority):

- **≥1440 (`desktop`):** link columns become a 4-up grid; both dividers show; columns lose their
  top borders and vertical padding; the mobile `Sweden` row in column 4 is hidden; brand row is a
  horizontal centered flex; link text `text-base` (14px).
- **1024–1439 (`laptop`):** columns stack as bordered rows (`border-t`, `py-4`); service badges go
  `flex-row` + `flex-wrap`; wordmarks go `flex-row`; grid divider hidden.
- **768–1023 (`tablet`):** container `px-8`; badges stack vertically (`flex-col`, gap 8px).
- **<768:** container `px-4`; everything single-column; link text `text-sm` (12.25px).

## Verification

`npx tsc --noEmit` must exit 0. Confirm every `/images/...` path resolves under `public/`, every
icon import exists in `src/components/icons.tsx`, and that no form/network code was added.
