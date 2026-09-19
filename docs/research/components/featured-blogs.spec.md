# FeaturedBlogs Specification (topology #37 heading + #38 cards)

- **Target file:** `src/components/FeaturedBlogs.tsx`
- **Measured at:** viewport **1920** (`lg-desktop`), re-verified 2026-08-06
- **Interaction model:** horizontally scrollable card row. Static otherwise.

> **Root font-size is 14px.** `text-xl` = 21px… no: `text-xl` = 17.5px, `text-2xl` = 21px,
> `text-sm` = 12.25px. Port class names verbatim.

> **Breakpoint substitution:** `tablet:`→`min-[768px]:`, `laptop:`→`min-[1024px]:`,
> `desktop:`→`min-[1440px]:`, `lg-desktop:`→`min-[1920px]:`.

## Overview

```
SectionHeading ("Featured Blogs and News")   <- #37, 69px tall
card row                                     <- #38, 501px tall
```

Reuse `SectionHeading` from `@/components/SectionHeading`.

## Card row

Target uses Swiper (`.swiper-wrapper`, flex, 8 slides). **Do not add Swiper.** Mirror the CSS
carousel approach already used by `ProductCarousel` in this repo.

**Each slide is 824 × 480px** and is a *horizontal* card: image on the left, white text panel on
the right. Roughly two slides are visible at 1920.

## Card structure

```
article / a   (824x480, flex row)
├── img          404x480, object-cover
└── div.panel    420x480, white
    ├── h3       title
    ├── p        excerpt (line-clamp-6)
    └── span     "Learn More"
```

### Text panel
```
laptop:gap-[60px] lg-desktop:p-8 tablet:p-6 bg-container-secondary-1 flex min-h-[200px] flex-1
flex-col gap-4 overflow-hidden p-4
```
Computed @1920: width **420px**, height 480px, `padding: 28px`, `gap: 60px`,
`background-color: rgb(255, 255, 255)`.

### h3 (title)
```
lg-desktop:text-[18px] desktop:text-[16px] text-info-primary mb-2 text-[14px] font-bold
leading-[1.2] tracking-[-0.02em]
```
@1920 → `font-size: 18px`, `font-weight: 700`, `line-height: 21.6px`, `color: rgb(8, 10, 15)`.

### p (excerpt)
```
lg-desktop:text-2xl lg-desktop:leading-[1.2] text-info-primary desktop:max-h-[186px] line-clamp-6
max-h-[144px] min-h-[100px] text-xl font-bold leading-[1.2] tracking-[-0.04em]
```
@1920 → `font-size: 21px`, `font-weight: 700`, `line-height: 25.2px`, `color: rgb(8, 10, 15)`,
**`-webkit-line-clamp: 6`**, `overflow: hidden`, `max-height: 186px`, rendered width 364px.

### span ("Learn More")
```
text-pretty tracking-[-0.02em] tracking font-bold lg-desktop:text-[18px] …
```
@1920 → `font-size: 18px`, `font-weight: 700`, `line-height: 17.5px`, `color: rgb(8, 10, 15)`.

### img
`404 × 480`, `object-fit: cover`, `border-radius: 0`.

## Content (verbatim — 8 cards, in order)

**All copy is Swedish** (Nordics storefront). Reproduce `å` (U+00E5), `ä` (U+00E4), `ö` (U+00F6),
`–` (U+2013 en-dash) and the typographic quotes `”` (U+201D) exactly. Do **not** translate,
transliterate, or ASCII-fold.

> **Excerpts are clamped to 6 lines** (~240 visible characters at 1920). The strings below are
> captured well past the clamp, so they render identically to the target; trailing text beyond the
> clamp is never painted.

| # | Title | Image | href |
|---|---|---|---|
| 1 | `Projektor utomhus till VM 2026: Välj rätt modell för din trädgård, balkong eller sommarstuga` | `/images/image1.jpg` | `/blogs/se/projectors/outdoor-cinema-projector-for-world-cup` |
| 2 | `Projektor bäst i test 2026 – Topp 5 för VM och hemmabio` | `/images/image1.png` | `/blogs/se/projectors/projector-best-in-test-world-cup` |
| 3 | `Bästa mini projektorn för VM 2026: Topp 5 att titta på fotboll med` | `/images/1ec53e0e-4f69-4972-a945-fcdc0d9cbca8.__cr0_0_2196_900_pt0_sx1464_v1.jpg` | `/blogs/se/projectors/best-mini-projector-world-cup` |
| 4 | `Golvet luktar illa efter moppning: Fem orsaker och lösningar` | `/images/frame_4_1_-1.png` | `/blogs/se/robot-vacuum/floor-smells-after-mopping` |
| 5 | `Så här ansluter du din telefon till TV:n med en USB-C till HDMI-adapter` | `/images/frame_10.png` | `/blogs/se/chargers/connect-phone-to-tv-using-usb-c-to-hdmi-solution` |
| 6 | `45W vs 65W laddare för telefon: Vilken bör du välja?` | `/images/frame_12_3.png` | `/blogs/se/chargers/45w-vs-65w-charger-for-phone-comparison` |
| 7 | `45W vs 30W laddningshastighet: Hur mycket tid sparar du egentligen?` | `/images/frame_13-3.png` | `/blogs/se/chargers/45w-vs-30w-charging-speed-iphone` |
| 8 | `Är en 45W-laddare bättre för daglig laddning av iPhone? Hastighet och batterihälsa` | `/images/frame_14-2.png` | `/blogs/se/chargers/45w-charger-for-daily-iphone-charging` |

All hrefs are absolute on the live site (`https://www.ankernordics.com/blogs/se/...`); site-relative
is fine here and matches how the other built components store their links.

### Excerpts

1. `VM 2026 går av stapeln den 11 juni till den 19 juli, mitt under svensk högsommar. Att se matcherna på en projektor utomhus ger dig en skärm på 120 tum eller mer mot husväggen, utan att du behöver flytta in någon tung utrustning. Den här guiden hjälper dig att välja rätt projektor för din situation och planera vilket match som passar bäst för en kväll i trädgården.`
2. `VM 2026 är det största fotbollsmästerskapet hittills: 48 lag, 104 matcher, och Sverige är med. Att följa turneringen på en storbildsskärm gör skillnad för hela känslan i rummet. En projektor bäst i test ger dig 100–120 tum för en bråkdel av vad en TV i samma storlek kostar, och du kan dessutom flytta den efter behov.`
3. `VM 2026 är nära och det är dags att tänka på hur du vill uppleva matcherna. En miniprojektor gör det möjligt att följa fotbollen på en storduk hemma i vardagsrummet, ute på balkongen eller i trädgården – utan att behöva investera i en fast hemmabio.`
4. `Din mopp ska göra rummet fräscht, inte ofräscht. Om ditt golv luktar illa efter att du har moppat kan rester av rengöringsmedel, kvardröjande fukt eller osynliga mikrober vara bove i dramat. Innan du slänger rengöringsmedlet eller skyller på moppen, stanna upp och titta på vad som händer på ytan och i små springor.`
5. `Det finns tillfällen då det är mycket praktiskt att kunna ansluta sin smartphone till andra enheter. Oavsett om du vill titta på film, visa bilder, spela spel eller använda mobilen för arbete hemifrån, behöver du först veta hur du ansluter en mobil enhet till en TV.`
6. `Hundar är underbara, men ibland händer det olyckor. Trots bra träning kan det hända att din hund råkar kissa på dina trägolv. Om detta händer, få inte panik. Problemet med hur man får bort hundkisslukt från golvet går att lösa, och det är faktiskt inte så svårt!`
7. `Som djurägare känner vi alla till den där ”karaktäristiska husdjursdoften” som bara vägrar lämna mattan. Dessa envisa lukter kan sprida sig genom hela huset och påverka atmosfären. Men frukta inte! Innan du överväger att kasta ut mattan, låt oss fräscha upp den på ett enkelt sätt.`
8. `Under många år definierades den "vanliga" laddningsupplevelsen för iPhone av den lilla klassiska 5 W-kuben.`

> ### Target-site content bug — reproduce it, do not "fix" it
>
> On the live site, **cards 6 and 7 pair a charger title with a pet-odour excerpt** (verified
> directly against the DOM: card 6 = "45W vs 65W laddare…" + dog-urine excerpt; card 7 =
> "45W vs 30W laddningshastighet…" + carpet pet-smell excerpt). Their CMS is emitting the wrong
> excerpt for those two cards. This is the target's data, so the clone reproduces it verbatim.
> Do not swap, rewrite, or "correct" these pairings.

## States & Behaviors

- No hover zoom on these cards (unlike #12 and #35).
- No autoplay, no pagination, no tabs.
- Row scrolls horizontally.

## Responsive Behavior

Derived from the class contract (window resize was blocked; the breakpoint-prefixed classes are the
authority):

- **≥1920 (`lg-desktop`):** panel padding 32px (`p-8`), title 18px, excerpt `text-2xl` (21px),
  excerpt max-height 186px.
- **1440–1919 (`desktop`):** title 16px, excerpt max-height 186px.
- **≥1024 (`laptop`):** panel gap 60px.
- **≥768 (`tablet`):** panel padding 24px (`p-6`).
- **<768:** panel padding 16px (`p-4`), title 14px, excerpt `text-xl` (17.5px), max-height 144px.
- Excerpt stays `line-clamp-6` at every width; `min-h-[100px]` floors the box.

## Verification

`npx tsc --noEmit` must exit 0. Confirm all 8 `/images/...` paths resolve under `public/`, and that
the Swedish characters and `”` quotes survived by code point.
