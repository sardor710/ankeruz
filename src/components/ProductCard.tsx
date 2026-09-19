// Section #7 — product card for "Today's Best Deal".
// Spec: docs/research/components/todays-best-deal.spec.md
// Raw measurements: docs/research/www.ankernordics.com/raw/sec-7-styles.json
//
// NOTE — BREAKPOINT SUBSTITUTION: the target uses named Tailwind tiers that are
// NOT registered in this project's globals.css: desktop:(1440) lg-desktop:(1920).
// They are written here as Tailwind v4 arbitrary variants with the same pixel
// values: min-[1440px]:, min-[1920px]:. Swap them for the named tiers once the
// breakpoints are registered in globals.css.
//
// NOTE — 14px ROOT: globals.css sets `html { font-size: 14px }` to match the
// target, so Tailwind's rem scale resolves at 0.875x. Classes lifted verbatim
// from the target (e.g. `text-balance`, `font-bold`, `leading-[120%]`) are used
// AS-IS because they already land on the measured pixels. Anything the spec
// states as a MEASUREMENT is written as an arbitrary `[Npx]` value instead —
// writing a measured 64px as `pl-16` would silently render 56px here.
//
// NOTE — rounded-2xl IS 14px ON THE TARGET, not Tailwind's 16px. The card
// therefore uses the measured `rounded-[14px]`, not `rounded-2xl`.
//
// NOTE — PILL OUTLINE, NOT BORDER: the target draws the pill ring with an inset
// `outline: 1px solid #080A0F; outline-offset: -1.6px; border-width: 0`.
// Reimplementing it as a border would add 1px to the box on every side and shift
// the layout. The `[length:...]` / `[color:...]` hints keep tailwind-merge from
// collapsing the two `outline-*` arbitrary values into one.
//
// NOTE — PRICES ARE VERBATIM SWEDISH-LOCALE STRINGS. They are never derived from
// numbers, never reformatted, and never currency-converted. The separators are
// NON-BREAKING spaces (U+00A0) on the target — both the thousands separator and
// the gap before `kr` — confirmed by code-point dump of
// raw/sec-7-bestseller.json ("2 690,00 kr" = 32 a0 36 39 30 2c 30 30
// a0 6b 72) and stated in the spec prose ("non-breaking space as thousands
// separator"). The spec's markdown TABLES show a plain ASCII space because
// markdown transport flattened the NBSP; the source of truth does not. They are
// built from a single `NBSP` constant in TodaysBestDeal.tsx, declared with an
// explicit \u00A0 escape, so the character is auditable in the diff rather
// than being an invisible byte an editor can normalise away.

import Image from "next/image";
import { formatSom } from "@/lib/currency";

/** One card in either "Today's Best Deal" tab. */
export type Product = {
  /** Stable key. Titles repeat across tabs, so the key is tab-scoped. */
  readonly id: string;
  /**
   * Verbatim from the target. Two titles carry an ASCII `|`; one carries a
   * FULLWIDTH `｜` (U+FF5C) — neither is normalised to the other.
   */
  readonly title: string;
  /**
   * Second line under the title. OPTIONAL and omitted by every section-#7
   * caller, so "Today's Best Deal" renders byte-identically to before. Only the
   * "What's New" carousel cards carry one — the target marks it up as an `h4`.
   * See docs/research/components/product-carousels.spec.md.
   */
  readonly subtitle?: string;
  /** Badge pills, in DOM order. Empty for cards that carry none. */
  readonly pills: readonly string[];
  /** Current price, verbatim Swedish-locale string (NBSP separators). */
  readonly price: string;
  /** Pre-discount price, struck through. Absent on full-price cards. */
  readonly wasPrice?: string;
  /** Local asset under public/ — all 25 verified present. */
  readonly image: string;
};

/** Measured product-image box: 124 x 124 (`img.w`/`img.h` @1920). */
const IMAGE_PX = 124;

export function ProductCard({ product }: { readonly product: Product }) {
  return (
    // Measured card box 316 x 384. The target reaches that height via the legacy
    // aspect-ratio plugin (`rounded-2xl lg-desktop:aspect-w-[404] …`, computed
    // padding-bottom 383.688px) with absolutely positioned content; a fixed
    // height reproduces the same box without the plugin. `box-border`,
    // `w-full`, `cursor-pointer`, `overflow-hidden` and `duration-300` are the
    // target's own classes on this element.
    <article className="box-border flex h-[384px] w-[316px] shrink-0 cursor-pointer flex-col items-center gap-[14px] overflow-hidden rounded-[14px] bg-[#EAEAEC] p-[21px] duration-300">
      {/* Stands in for the target's <picture> + <source> art-direction set;
          those entries are the same asset at different widths. */}
      <span className="block size-[124px] shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          width={IMAGE_PX}
          height={IMAGE_PX}
          className="w-full"
        />
      </span>

      {/* Pills sit BEFORE the title in the target's DOM — the card's text dump
          reads "HotNew" + title + … + price + "Shop Now". The row is always
          rendered (min-height = the measured 28px pill height) so cards with no
          pills keep the same vertical rhythm as cards that have them. */}
      <div className="flex min-h-[28px] w-full flex-wrap items-center justify-center gap-[7px]">
        {product.pills.map((pill) => (
          <span
            key={pill}
            className="inline-flex items-center justify-center rounded-[16px] border-0 pt-[5px] pr-[8px] pb-[4px] pl-[8px] text-[16px] leading-[19.2px] font-bold whitespace-nowrap text-[#080A0F] outline outline-[length:1px] outline-offset-[-1.6px] outline-[color:#080A0F]"
          >
            {pill}
          </span>
        ))}
      </div>

      {/* `text-balance`, `tracking-[-0.04em]`, `text-[20px]`,
          `lg-desktop:text-[24px]`, `leading-[120%]` and `font-bold` are the
          target's own classes, ported verbatim. Measured box 274 x 58, i.e.
          exactly two lines of 28.8px — hence the fixed height + 2-line clamp,
          which also keeps every card's button on the same baseline. */}
      <h3 className="line-clamp-2 h-[58px] w-full text-center text-[20px] leading-[120%] font-bold text-balance tracking-[-0.04em] text-[#080A0F] min-[1920px]:text-[24px]">
        {product.title}
      </h3>

      {/* NOT MEASURED. The carousel spec records the "What's New" h4's copy but
          no box, size or weight for it. 16px is the card's own recurring type
          size (the pills and the Shop Now button both measure 16px) and the
          tracking/leading are the title's, so the subtitle reads as part of the
          same block; the weight is dropped to 400 to sit under the bold title.
          Replace all four values once the h4 is measured. `line-clamp-2` bounds
          its contribution to the fixed 384px card — see the WHAT'S NEW BOX note
          in ProductCarousel.tsx, which this element does not fully solve. */}
      {product.subtitle ? (
        <h4 className="line-clamp-2 w-full text-center text-[16px] leading-[120%] font-normal text-balance tracking-[-0.04em] text-[#080A0F]">
          {product.subtitle}
        </h4>
      ) : null}

      {/* Measured 17.5px / 700 / 24.5px line-height. Discounted cards render the
          current price first, then the struck-through original — the order in
          the target's text dump ("993,29 kr" then "1 399,00 kr"). The spec gives
          a single price colour (#080A0F) and does not record a separate muted
          colour for the struck value, so both use it. */}
      <p className="flex w-full items-center justify-center gap-[7px] text-[17.5px] leading-[24.5px] font-bold text-[#080A0F]">
        <span>{formatSom(product.price)}</span>
        {product.wasPrice ? (
          <span className="line-through">{formatSom(product.wasPrice)}</span>
        ) : null}
      </p>

      {/* Measured 130 x 48, padding 15px 24.5px 14px, 16px / 700 / 19.2px,
          #080A0F on #FFFFFF, border-radius 0 — square, deliberately. Width and
          height are left to the measured padding + type metrics rather than
          being pinned, which is how the target arrives at 130 x 48.
          `inline-flex cursor-pointer items-center justify-center font-bold` are
          the target's own classes. The spec records no product href, so this is
          a button rather than a link; give it a per-product accessible name so a
          screen-reader user hears more than 25 identical "Shop Now"s. */}
      <button
        type="button"
        aria-label={`Shop Now: ${product.title}`}
        className="mt-auto inline-flex cursor-pointer items-center justify-center rounded-none bg-[#080A0F] pt-[15px] pr-[24.5px] pb-[14px] pl-[24.5px] text-[16px] leading-[19.2px] font-bold whitespace-nowrap text-[#FFFFFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#080A0F]"
      >
        Shop Now
      </button>
    </article>
  );
}
