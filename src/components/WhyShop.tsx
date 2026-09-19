// Sections #32 + #33 — "WhyShop". Spec: docs/research/components/why-shop.spec.md
//
// NOTE — ONE COMPONENT, TWO SECTIONS: #32 (pinned heading panel) and #33 (the
// scroll track) are structurally interlocked — #33 carries `mt-[-200vh]` and is
// pulled back up behind #32 — so they cannot be composed independently. Keeping
// them in one component keeps the negative margin adjacent to the element it
// overlaps.
//
// NOTE — THE PIN IS PURE CSS: exactly ONE `position: sticky` element exists on
// the whole target page (verified by scanning every descendant of both
// sections) — the `sticky top-0` wrapper below. There is NO IntersectionObserver,
// NO scroll listener and NO `animation-timeline`. The two `h-screen` spacer divs
// inside #33 supply the scroll distance while the cover image stays pinned and
// the benefit cards scroll over it. This is deliberately a SERVER component: no
// state, no effects, no "use client".
//
// NOTE — THE OVERLAP IS LOAD-BEARING: #33's `mt-[-200vh]` measured -1786px
// (= -2 x 893px viewport height) and #33 runs 3301px tall at z-index 1; #32 is
// `h-screen` at z-index 20 and paints ABOVE it. Flattening these into sequential
// sections destroys the effect entirely.
//
// NOTE — BREAKPOINT SUBSTITUTION: the target uses named Tailwind tiers that are
// NOT registered in this project's globals.css: tablet:(768) laptop:(1024)
// desktop:(1440) lg-desktop:(1920). They are written here as Tailwind v4
// arbitrary variants with the same pixel values: min-[768px]:, min-[1024px]:,
// min-[1440px]:, min-[1920px]:. Swap them for the named tiers once the
// breakpoints are registered in globals.css.
//
// NOTE — 14px ROOT: globals.css sets `html { font-size: 14px }` to match the
// target, so Tailwind's whole rem scale resolves at 0.875x and the site's own
// class names land on the measured pixels (gap-3 -> 10.5px, gap-4 -> 14px,
// px-16 -> 56px, h-16 -> 56px). Utilities lifted from the target are used
// VERBATIM; arbitrary `[Npx]` values appear only where the spec marks a
// measurement.
//
// NOTE — SITE CSS CLASS NAMES KEPT: `ipc-mediaplayersticky`, `ipc_container`,
// `ipc_spacer`, `media-content`, `media-cover`, `sticky-cover` and `aiui-dark`
// are the target's own stylesheet hooks. They are reproduced
// verbatim for provenance but define nothing in this project, so every property
// they carried that was measurable is restated as a Tailwind utility. The one
// that matters: `.ipc-mediaplayersticky` supplied `z-index: 1`, so `z-1` is
// added explicitly — without it #32 would not paint above the track.
//
// NOTE — `.sticky-cover` HAS NO BACKGROUND: measured `backgroundColor
// rgba(0,0,0,0)` / `backgroundImage: none`. It is a bare positioning layer.
// No scrim, tint or gradient has been invented to "help" the text.
//
// NOTE — VERBATIM COPY: "Fast Deliver" is spelled that way on the live site and
// is NOT corrected to "Fast Delivery". "Over €100 Ships Free" carries a real
// U+20AC EURO SIGN, written below as an escape via the EURO constant so the code
// point is reviewable rather than an invisible byte.

import Image from "next/image";

/** U+20AC EURO SIGN. Escaped, not pasted, so the code point is reviewable in diff. */
const EURO = "\u20AC";

/** Pinned cover image behind the whole track. Measured `object-position: 82% 50%`. */
const COVER_IMAGE = "/images/group_1288114499.png";
const COVER_ALT = "Anker with blue stripes for modern style";

/** One of the six benefit cards in the scrolling block. */
type Benefit = {
  readonly id: string;
  /** Verbatim from the live DOM — including the site's own typos. */
  readonly title: string;
  /** Two of the six cards genuinely have no body copy on the target. */
  readonly description: string | null;
  /** Local asset under public/images — all six verified present. */
  readonly icon: string;
  /** Empty string where the target ships a decorative (alt="") icon. */
  readonly iconAlt: string;
  /** Measured intrinsic icon box: 36px for cards 1-5, 32px for card 6. */
  readonly iconSize: number;
};

const BENEFITS: readonly Benefit[] = [
  {
    id: "ankercredits",
    title: "AnkerCredits Rewards",
    description: "Buy more, save more, and earn more.",
    icon: "/images/icon_bag-4.png",
    iconAlt: "Shopping bag icon with handle for Anker",
    iconSize: 36,
  },
  {
    id: "free-shipping",
    // U+20AC via the EURO constant — see the verbatim-copy note above.
    title: `Over ${EURO}100 Ships Free`,
    description: null,
    icon: "/images/icon_delivered.png",
    iconAlt: "Anker truck with checkmark for fast delivery",
    iconSize: 36,
  },
  {
    id: "fast-deliver",
    // "Deliver", not "Delivery" — the target's own spelling. Do not correct.
    title: "Fast Deliver",
    description: "Fast shipping in 2-8 days",
    icon: "/images/icon_in_transit-4.png",
    iconAlt: "",
    iconSize: 36,
  },
  {
    id: "warranty",
    title: "Hassle-Free Warranty",
    description: "Comprehensive warranty protection on all purchases.",
    icon: "/images/icon_security-2.png",
    iconAlt: "Anker with shield and check for secure protection",
    iconSize: 36,
  },
  {
    id: "returns",
    title: "Up to 30-Day Returns",
    description: null,
    icon: "/images/icon_30_day_warranty.png",
    iconAlt: "Anker security badge with 30-day protection for peace",
    iconSize: 36,
  },
  {
    id: "support",
    title: "We are Here to Help",
    description:
      "Contact our expert team via email or live chat for assistance.",
    icon: "/images/ee5edd6de20a7af2f30f2fa976d779c9-2.png",
    iconAlt: "Anker man with beige sweater, smiling, professional scene",
    iconSize: 32,
  },
];

/**
 * The site-standard gutter container, reproduced from the capture of both
 * `ipc_container` instances in these two sections. Identical to the one in
 * CompanySlogan / CategoryStrip.
 */
const GUTTER =
  "mx-auto size-full px-4 min-[768px]:px-8 min-[1024px]:px-16 min-[1440px]:px-16 min-[1920px]:max-w-full min-[1920px]:px-[calc(50%-832px)]";

export function WhyShop() {
  return (
    <>
      {/* ── Section #32 — pinned heading panel ────────────────────────────────
          `relative z-20 h-screen w-full aiui-dark`. Background measured
          rgba(0,0,0,0): the cover image of #33 shows through from behind. z-20
          is what makes this paint above the z-1 track. */}
      <div className="relative z-20 h-screen w-full aiui-dark">
        {/* Vertically + horizontally centred via translate, exactly as measured
            (top 446.5px of an 893px panel). */}
        <div className="media-content absolute top-1/2 left-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 antialiased">
          <div className="ipc_container relative z-10 w-full bg-transparent!">
            <div className={GUTTER}>
              <div className="grid grid-cols-12 gap-3 min-[1024px]:gap-4">
                {/* `slogan-title` is site CSS carrying the type ramp; the
                    measurable parts are restated here. Measured @1920:
                    64px / 700 / 70.4px line-height (1.1) / -2.56px (-0.04em)
                    tracking / #F5F6F7 (= text-on-dark) / left aligned.
                    The element is content-sized on the target (883px for one
                    line at 1920), so col-span-12 renders identically.
                    TODO: sub-1024px size is unmeasured — the 40px laptop value
                    stands in as the base rather than inventing a number. */}
                <h2 className="col-span-12 text-left text-[40px] leading-[1.1] font-bold tracking-[-0.04em] text-balance text-on-dark min-[1024px]:text-[40px] min-[1440px]:text-[48px] min-[1920px]:text-[64px]">
                  Why Shop With Anker Nordics
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section #33 — the scroll track ────────────────────────────────────
          Measured height 3301px, margin-top -1786px (= -200vh @893px), z-index 1
          (supplied by `.ipc-mediaplayersticky` on the target, restated as z-1). */}
      <div className="ipc-mediaplayersticky relative z-1 mt-[-200vh]">
        {/* THE PIN. The only `position: sticky` element on the page. */}
        <div className="sticky top-0">
          <div className="media-cover relative h-screen w-full">
            {/* `fill` reproduces the target's `absolute left-0 top-0 size-full`;
                those utilities are kept alongside for provenance. The cover is
                deep in the page, so it is deliberately NOT preloaded. */}
            <Image
              src={COVER_IMAGE}
              alt={COVER_ALT}
              fill
              sizes="100vw"
              className="absolute top-0 left-0 z-1 size-full object-cover object-[82%]"
            />
            {/* Bare positioning layer — measured with NO background colour and
                NO gradient. Nothing is painted here on purpose. */}
            <div
              aria-hidden="true"
              className="sticky-cover absolute top-0 left-0 z-10 size-full"
            />
          </div>
        </div>

        {/* Scroll spacer #1 — 893px (100vh). Supplies pin distance, no content. */}
        <div aria-hidden="true" className="relative h-screen w-full" />

        {/* Benefit cards block — measured 494px tall, followed by a 128px spacer. */}
        <div className="relative z-10">
          <div className="relative z-20 bg-transparent">
            <div className="ipc_container relative z-10 w-full bg-transparent!">
              <div className={GUTTER}>
                <div className="grid grid-cols-12 gap-3 min-[1024px]:gap-4">
                  {/* LAYOUT CAVEAT — the only measurement available for this
                      block is its 494px height at 1920 and the fact that each
                      title is content-sized (194/177/102/191/185/174px = natural
                      text widths, so no fixed column). 494 / 6 = 82.3px per
                      card, which is consistent with ONE stacked column of six
                      rows and not with a 3x2 or 2x3 grid. A stacked column is
                      therefore used, `justify-between` inside the measured
                      minimum height. TODO: verify the column placement and the
                      per-card internal spacing against a real screenshot. */}
                  <ul className="col-span-12 flex list-none flex-col justify-between gap-6 min-[1920px]:min-h-[494px]">
                    {BENEFITS.map((benefit) => (
                      <li key={benefit.id} className="flex items-start gap-3">
                        <Image
                          src={benefit.icon}
                          alt={benefit.iconAlt}
                          width={benefit.iconSize}
                          height={benefit.iconSize}
                          className="shrink-0"
                        />
                        <div className="flex flex-col items-start gap-1">
                          {/* Measured @1920: 18px / 700 / 21.6px (1.2) /
                              -0.36px (-0.02em) / rgb(8,10,15) = text-ink.
                              `text-info-primary` is the target's own token for
                              that same colour. */}
                          <h3 className="text-[14px] leading-[1.2] font-bold tracking-[-0.02em] text-ink min-[1440px]:text-[16px] min-[1920px]:text-[18px]">
                            {benefit.title}
                          </h3>
                          {/* TODO: the body copy's size, weight and colour were
                              not captured. The site's body default stands in. */}
                          {benefit.description === null ? null : (
                            <p className="text-[14px] leading-[1.4] tracking-[-0.02em] text-ink-soft">
                              {benefit.description}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Measured spacer: 56px up to laptop, 96px @1440, 128px @1920. */}
          <div
            aria-hidden="true"
            className="ipc_spacer h-16 min-[768px]:h-16 min-[1024px]:h-16 min-[1440px]:h-[96px] min-[1920px]:h-[128px]"
          />
        </div>

        {/* Scroll spacer #2 — 893px (100vh). Closes out the pin. */}
        <div aria-hidden="true" className="relative h-screen w-full" />
      </div>
    </>
  );
}
