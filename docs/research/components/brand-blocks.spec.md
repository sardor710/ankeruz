# SectionHeading + BrandVideoHero Specification

- **Target files:** `src/components/SectionHeading.tsx`, `src/components/BrandVideoHero.tsx`
- **Measured at:** viewport **1920** (`lg-desktop`)
- **Interaction model:** static + autoplaying video + hover

> **Root font-size 14px** — matched in `globals.css`. Port the site's class names verbatim;
> use arbitrary `[Npx]` only for values marked *measured* below.

> **Strings:** ground truth is `docs/research/www.ankernordics.com/raw/`. Copy exactly.

> ### CORRECTION — apostrophes
>
> An earlier revision of this spec claimed `The world's No. 1…` used a curly apostrophe U+2019.
> **That was wrong**, asserted without checking the capture. Verified byte dumps:
>
> | String | Apostrophe |
> |---|---|
> | `The world's No. 1 mobile charging brand` | **ASCII U+0027** |
> | `What's New` | **ASCII U+0027** |
> | `Don't Miss Out` (announcement bar) | U+2019 |
> | `Father's Day` (RecommendedBy) | U+2019 |
>
> **The site genuinely mixes both.** The capture pipeline preserves the distinction — U+2019
> survives intact in `topbars.json` and `section-content.json` — so this is real source data,
> not a normalisation artefact.
>
> Never infer which apostrophe a string uses. Dump the code points from `raw/`.

---

## 1. SectionHeading — used 4x (topology #9, #14, #20, #26)

One shared component. Every instance is 69px tall on a `#F5F5F7` background, inside the standard
gutter container.

```
h2.text-balance.tracking-[-0.04em].text-[32px].desktop:text-[40px].lg-desktop:text-[48px]
  .leading-[100%].font-bold.text-[#080A0F]
```

| Property | Value @1920 |
|---|---|
| font-size | `48px` (base `32px`, desktop `40px`) |
| weight / line-height | `700` / `48px` (`leading-[100%]`) |
| letter-spacing | `-1.92px` (−0.04em) |
| colour | `#080A0F` |
| section height | `69px` |
| section background | `#F5F5F7` |

### The four instances

| Topology # | Text (verbatim) |
|---|---|
| 9 | `What's New` |
| 14 | `Anker` |
| 20 | `eufy` |
| 26 | `soundcore` |

`What's New` uses a **curly apostrophe U+2019** — check the raw file, not this table.
Brand names are lowercase exactly as shown (`eufy`, `soundcore`) — do not title-case them.

Also used by section #12 (`Explore All Brands during Sale`) and #7 (`Today's Best Deal`),
which are already built — no need to retrofit those.

**Props:** just the text. Server component.

---

## 2. BrandVideoHero — used 3x (topology #15, #21, #27)

Full-width video panel with a text overlay and a CTA. One parameterised component, three
instances.

### Structure

```
div.ipc_container.relative.z-10.w-full
└ div.mx-auto.size-full.px-4.tablet:px-8.laptop:px-16.desktop:px-16.lg-desktop:px-[calc(50%-832px)]
  └ section.multiLayoutGraphicBlock.text-info-primary
    └ div.grid.grid-cols-12.gap-3.laptop:gap-4
      ├ div.col-span-12.laptop:block.hidden        ← DESKTOP variant
      │ └ div.item-wrapper.cursor-pointer.group.relative.box-border.w-full.overflow-hidden
      └ div.col-span-12.laptop:hidden.block        ← MOBILE variant
        └ div.item-wrapper …
```

**Both variants are always in the DOM**; CSS toggles them. They reference *different video files*
(see table). Do not conditionally render with JS.

Inside each `item-wrapper`:

```
<video autoplay loop muted playsinline class="object-cover" />   ← 1664 x 640, object-fit: cover
<a href="/se">                                                    ← full-panel click target
  h3.item-title
  h4.item-description
  a "Learn More"                                                  ← 141 x 48
</a>
```

### Section geometry

| Property | Value |
|---|---|
| section height | `640px` @1920 |
| video box | `1664 x 640`, `object-fit: cover` |
| grid | `grid-cols-12`, `gap-3` (→10.5px), `laptop:gap-4` (→14px) |
| panel | `col-span-12` (full width) |

### Title (`h3.item-title`)

```
h3.text-balance.tracking-[-0.04em].text-[24px].desktop:text-[32px].leading-[120%].font-bold.item-title
```

| Property | Value @1920 |
|---|---|
| font-size | `32px` (base `24px`) |
| weight / line-height | `700` / `38.4px` (120%) |
| letter-spacing | `-1.28px` (−0.04em) |
| colour | `#F5F6F7` (light — sits on video) |

### Description (`h4.item-description`)

```
h4.text-balance.tracking-[-0.04em].font-bold.item-description.desktop:text-[16px].lg-desktop:text-[18px].line-clamp-*
```

Colour `#F5F6F7`. Only instance #15 has description text; #21 and #27 render it empty.

### CTA

`Learn More`, `141 x 48`. Same button treatment as elsewhere on the site — square corners,
`font-bold`. It is an `<a>` nested inside the panel's outer `<a>`; keep that nesting only if it
does not trip React/HTML validation — otherwise make the outer wrapper a non-anchor click target
and keep the CTA as the sole `<a>`. **Nested anchors are invalid HTML**; prefer the latter and
note the deviation.

### The three instances

| # | Title (`<br>` is a real break) | Description | CTA href | Desktop video | Mobile video |
|---|---|---|---|---|---|
| 15 | `Live Charged.` | `The world's No. 1 mobile charging brand` | `/anker` | `/videos/76eee370bf62410ca08c839be6382529.mp4` | `/videos/2c94c918738f49fa839decfef3e362e0.mp4` |
| 21 | `Built with Care` | *(empty)* | `/eufy` | `/videos/50cb951712394439be9c0ca204705deb.mp4` | `/videos/50cb951712394439be9c0ca204705deb.mp4` |
| 27 | `Top 3 Global<br>Wireless Headphone Brand` | *(empty)* | `/soundcore` | `/videos/9beb9a270b504370bac18d35c53880ed.mp4` | `/videos/75ecf2b4c40b49fd83bd83478f0fd2e5.mp4` |

All five video files are downloaded and present under `public/videos/`.
Instance 21 uses the **same file** for both variants — that is correct, not a copy/paste error.

`Top 3 Global<br>Wireless Headphone Brand` contains a real `<br>` — render as JSX `<br />`,
not escaped text.

### Video attributes

`autoplay loop muted` — all three, no `poster`. Add `playsInline` so iOS does not fullscreen.
These are **real videos**; do not substitute images or CSS animations.

At capture time all four `<video>` elements reported `paused: true` because the section was
off-screen — the browser defers autoplay until visible. That is native behaviour, not a bug to
reproduce; just set the attributes.

### Hover

`item-wrapper` carries `cursor-pointer group`, so a `group-hover:` effect exists on the target.
The exact delta was **not captured**. Add a restrained transition and mark
`// TODO: hover delta unverified`.

## Responsive

| Tier | Behaviour |
|---|---|
| ≤1023 | mobile variant visible (`laptop:hidden block`), desktop hidden |
| ≥1024 | desktop variant visible (`laptop:block hidden`), mobile hidden |
| title | `24px` base → `32px` at `desktop` (1440) |
| description | `16px` at desktop → `18px` at lg-desktop |

Mobile tier (≤767) not separately measured — the browser could not be driven below 768px.

## Verification

`npx tsc --noEmit` must pass. Confirm the U+2019 in `world's` and the `<br>` in instance 27
survive, programmatically.
