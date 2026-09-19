# FooterNewsletter Specification (`#footer-marketing-conversion`)

- **Target file:** `src/components/FooterNewsletter.tsx`
- **Measured at:** viewport **1920** (`lg-desktop`), captured 2026-08-06
- **Interaction model:** static form UI. **No submission** — see Scope below.
- **Rendered inside:** `SiteFooter` (built separately). Export `FooterNewsletter` with no props.

> **Root font-size is 14px.** `text-sm` = 12.25px, `text-base` = 14px.
> **Breakpoints:** `tablet:`→`min-[768px]:`, `laptop:`→`min-[1024px]:`,
> `desktop:`→`min-[1440px]:`, `lg-desktop:`→`min-[1920px]:`.

## Scope — do not wire this up

This clone has no backend. Render correct markup and styling, but add **no** fetch, no `action`, no
third-party endpoint, no analytics. Give the `<form>` an `onSubmit` that calls `preventDefault()`
and nothing else. The checkboxes may hold local state for the checked look, or stay uncontrolled —
either is fine, but nothing leaves the page.

## Container

```
desktop:py-16 desktop:gap-16 laptop:px-8 desktop:flex-row rounded-btn flex flex-col gap-8
bg-[#1E2024] px-4 py-8
```

Computed @1920: `background-color: rgb(30, 32, 36)`, `padding: 56px 28px`, `gap: 56px`,
`display: flex`, `flex-direction: row`, width 1664px, height **317px**.

## Inner wrapper

```
subscribe-component laptop:flex-row laptop:gap-4 desktop:flex-col desktop:gap-8 flex flex-col
```
Computed @1920: `display: flex`, `flex-direction: column`, `align-items: center`, `gap: 28px`,
width 1608px, height 205px.

## Copy block

### Eyebrow `<p>`
Text: `Subscribe now to get a gift with your first order!`
```
text-pretty tracking-[-0.02em] tracking desktop:text-base text-sm font-bold
```
@1920 → `font-size: 14px`, `font-weight: 700`, `line-height: 21px`, `letter-spacing: -0.28px`,
`color: rgb(255, 255, 255)`.

### Headline `<p>`
Text: `Get an Exclusive 15% Off Your First Purchase`
```
text-pretty tracking-[-0.02em] tracking desktop:mt-2 desktop:text-[32px] mt-1
```
@1920 → `font-size: 32px`, `font-weight: 700`, `line-height: 38.4px`, `letter-spacing: -0.64px`,
`color: rgb(255, 255, 255)`.

Both are centered (`align-items: center` on the wrapper), each 670px wide at 1920.

## Form

`<form class="laptop:flex-1">` — `method="get"`, **no action**.

### Input row
```
desktop:h-[48px] flex h-[38px] items-center
```
Computed @1920: `display: flex`, width 454px, height 48px. Input and button sit flush — **no gap**.

### Email input
```html
<input type="text" name="email" placeholder="Email">
```
Computed @1920: `background: transparent`, `color: rgb(255, 255, 255)`,
`padding: 0 14px`, `border: 1px solid rgb(182, 182, 186)`, `border-radius: 0`,
width **353px**, height **48px**, `font-size: 14px`.

### Sign Up button
Label: `Sign Up`
```
rounded-btn inline-flex cursor-pointer items-center justify-center …
```
Computed @1920: `background-color: rgb(255, 255, 255)`, `color: rgb(0, 0, 0)`,
`font-size: 16px`, `font-weight: 700`, `padding: 15px 24.5px 14px`, `border-radius: 0`,
width **101px**, height **48px**.

### Checkbox group
Wrapper: `mt-4 flex flex-col gap-2` → computed `gap: 7px`.

Each row: `laptop:items-center flex items-start gap-2` → computed `gap: 7px`,
`align-items: flex-start` (<1024) → `center` (≥1024).

Each row contains **three** elements, in this order:

1. `<button role="checkbox" data-state="unchecked">` — the visible control.
   Computed: **14 × 14px**, `border: 1px solid rgb(182, 182, 186)`, `border-radius: 1.75px`,
   `background: transparent`. Classes include `peer shrink-0 rounded-sm border`.
   This is a Radix-style checkbox; this project already ships `@base-ui/react` — use its Checkbox
   if it maps cleanly, otherwise a plain styled `<button role="checkbox">` is acceptable.
2. `<input type="checkbox" name="terms">` / `name="news"` — the hidden native input carrying form
   semantics. Keep it (visually hidden), keep the `name` values.
3. `<label>` wrapping a `<p>` that holds the text.

> **Colour gotcha:** the `<label>` itself computes to `rgb(0, 0, 0)`. The visible colour comes from
> the `<p>` **inside** it: `color: rgb(182, 182, 186)`. Put the colour on the inner `<p>`, not the
> label, or the text will render black-on-near-black.

Label `<p>` computed: `font-size: 14px`, `font-weight: 500`, `line-height: 21px`,
`color: rgb(182, 182, 186)`.

| name | Text (verbatim) | Inline links |
|---|---|---|
| `terms` | `I agree to the Terms of Use and Privacy Policy.` | `Terms of Use` → `/policies/terms-of-service`, `Privacy Policy` → `/policies/privacy-policy` |
| `news` | `Send me news and special offers. I can unsubscribe at any time` | none |

Inline links: `color: rgb(182, 182, 186)`, `text-decoration-line: underline`.
Note the second string has **no trailing period** — reproduce exactly.

## States & Behaviors

- **Checkbox:** `data-state="unchecked"` by default. Checked styling is not captured on the live
  site (no interaction was performed); a filled box using the same `#B6B6BA` border colour is
  acceptable.
- No scroll-driven or time-driven behavior.

## Responsive Behavior

From the class contract:

- **≥1440 (`desktop`):** container `flex-row`, `padding: 56px 28px` vertical 64px→ computed 56px,
  `gap: 56px`; inner wrapper `flex-col` with `gap: 32px`(computed 28px); headline 32px; eyebrow
  `text-base` (14px); input row 48px tall.
- **1024–1439 (`laptop`):** inner wrapper `flex-row` with `gap: 16px`; container `px-8`;
  form takes `flex-1`; checkbox rows center-aligned.
- **<1024:** container `flex-col`, `px-4 py-8`, `gap: 32px`; input row **38px** tall;
  eyebrow `text-sm` (12.25px); checkbox rows top-aligned.

## Verification

`npx tsc --noEmit` must exit 0. Confirm no network call, no `action`, and no analytics were added.
