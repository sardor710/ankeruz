# Content Sections Specification (#12, #35, #38)

> Generated from the raw browser capture — no string was retyped.
> **Every `\uXXXX` escape is a real non-ASCII character; reproduce that exact code point.**
> Root font-size is 14px: port site class names verbatim, use arbitrary `[Npx]` for measured values.
> Custom breakpoints are unregistered — translate `tablet:`/`laptop:`/`desktop:`/`lg-desktop:`
> to `min-[768px]:`/`min-[1024px]:`/`min-[1440px]:`/`min-[1920px]:`.

Three independent components. Section background `#F5F5F7` unless noted.

---

## 1. ExploreAllBrands (#12) → `src/components/ExploreAllBrands.tsx`

Height **710px** @1920. Heading `Explore All Brands during Sale` — reuse the
existing `SectionHeading` component (48px @1920 / 40px desktop / 32px base).

Grid: `laptop:gap-4 grid grid-cols-12 gap-3 w-full`

**2 visible panels** (each ~825x641 @1920), same `item-wrapper` pattern as `BrandVideoHero`:
each has desktop and mobile image variants both present in the DOM, toggled by CSS.

| # | Title | Description | Image | href |
|---|---|---|---|---|
| 1 | `Pan-Tilt-Zoom Cameras` | — | `/images/frame_241.png` | `https://www.ankernordics.com/ptz-cam` |
| 2 | `Robot Vacuum` | — | `/images/frame_2499.png` | `https://www.ankernordics.com/collections/robot-vacuum` |

---

## 2. RecommendedBy (#35) → `src/components/RecommendedBy.tsx`

Height **549px** @1920. Heading `RECOMMENDED BY` — note it is **uppercase in the
source content**, not via `text-transform`. Reuse `SectionHeading`.

Press / creator quote cards, 8 of them, horizontally scrollable.

| # | Quote | Detail | Image | href |
|---|---|---|---|---|
| 1 | `Anker providing powerful energy to keep the journey going.` | `Anker providing powerful energy to keep the journey going.` | `/images/mask_group-5.png` | `https://www.youtube.com/watch` |
| 2 | `Happy Father\u2019s Day from eufy to the heroes who always know` | — | `/images/frame_2121235191.png` | — |
| 3 | `If you want portable power proven under the harshest conditions, Anker delivers.` | `If you want portable power proven under the harshest conditions, Anker delivers.` | `/images/mask_group-7.png` | `https://www.youtube.com/watch` |
| 4 | `Celebrating Dads with eufy this Father\u2019s Day.` | `Celebrating Dads with eufy this Father\u2019s Day.` | `/images/frame_2121235189-3.png` | `https://www.youtube.com/watch` |
| 5 | `soundcore Liberty 4: You've Gotta Hear Them For Yourself!` | `soundcore Liberty 4: You've Gotta Hear Them For Yourself!` | `/images/endorse-2-mobile.webp` | `https://www.youtube.com/watch` |
| 6 | `This Robot Lawn Mower Just Changed Everything!` | `This Robot Lawn Mower Just Changed Everything!` | `/images/frame_2121235741.png` | `https://www.youtube.com/watch` |
| 7 | `The Longest Lasting Headphones!` | `The Longest Lasting Headphones!` | `/images/endorse-1-mobile.webp` | `https://www.youtube.com/shorts/hE6wAfGDhK8` |
| 8 | `Still picking up hair every day? Give the eufy E28 a try.` | — | `/images/frame_2121235739.png` | — |

---

## 3. FeaturedBlogs (#37 heading + #38 cards) → `src/components/FeaturedBlogs.tsx`

Heading `Featured Blogs and News` (#37, 69px tall) — reuse `SectionHeading`.
Cards block (#38) is **501px** tall, classes `block-style_2sam9qb`.

**All copy is Swedish** — this is the Nordics storefront. Titles are dense with
`\u00E5` (å), `\u00E4` (ä), `\u00F6` (ö) and `\u2013` (en-dash). Reproduce exactly; do not
translate, transliterate, or ASCII-fold.

| # | Title | Excerpt | Image | href |
|---|---|---|---|---|
| 1 | `Projektor utomhus till VM 2026: V\u00E4lj r\u00E4tt modell f\u00F6r din tr\u00E4dg\u00E5rd, balkong eller sommarstuga` | `Learn More` | `/images/image1.jpg` | `https://www.ankernordics.com/blogs/se/projectors/outdoor-cinema-projector-for-world-cup` |
| 2 | `Projektor b\u00E4st i test 2026 \u2013 Topp 5 f\u00F6r VM och hemmabio` | `Learn More` | `/images/image1.png` | `https://www.ankernordics.com/blogs/se/projectors/projector-best-in-test-world-cup` |
| 3 | `B\u00E4sta mini projektorn f\u00F6r VM 2026: Topp 5 att titta p\u00E5 fotboll med` | `Learn More` | `/images/1ec53e0e-4f69-4972-a945-fcdc0d9cbca8.__cr0_0_2196_900_pt0_sx1464_v1.jpg` | `https://www.ankernordics.com/blogs/se/projectors/best-mini-projector-world-cup` |
| 4 | `Golvet luktar illa efter moppning: Fem orsaker och l\u00F6sningar` | `Learn More` | `/images/frame_4_1_-1.png` | `https://www.ankernordics.com/blogs/se/robot-vacuum/floor-smells-after-mopping` |
| 5 | `S\u00E5 h\u00E4r ansluter du din telefon till TV:n med en USB-C till HDMI-adapter` | `Learn More` | `/images/frame_10.png` | `https://www.ankernordics.com/blogs/se/chargers/connect-phone-to-tv-using-usb-c-to-hdmi-solution` |
| 6 | `45W vs 65W laddare f\u00F6r telefon: Vilken b\u00F6r du v\u00E4lja?` | `Learn More` | `/images/frame_12_3.png` | `https://www.ankernordics.com/blogs/se/chargers/45w-vs-65w-charger-for-phone-comparison` |
| 7 | `45W vs 30W laddningshastighet: Hur mycket tid sparar du egentligen?` | `Learn More` | `/images/frame_13-3.png` | `https://www.ankernordics.com/blogs/se/chargers/45w-vs-30w-charging-speed-iphone` |
| 8 | `\u00C4r en 45W-laddare b\u00E4ttre f\u00F6r daglig laddning av iPhone? Hastighet och batterih\u00E4lsa` | `Learn More` | `/images/frame_14-2.png` | `https://www.ankernordics.com/blogs/se/chargers/45w-charger-for-daily-iphone-charging` |

---

## Implementation notes

- Reuse `SectionHeading` for all three headings — do not re-implement it.
- No new dependencies; CSS `overflow-x-auto` + scroll snap for the scrollable rows.
- Prefer server components.

## Verification

`npx tsc --noEmit` must exit 0. Confirm every `/images/...` path exists under `public/`,
and that the Swedish characters survived by code point.
