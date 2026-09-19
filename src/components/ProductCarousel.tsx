// Sections #9 / #14 / #20 / #26 — the four homepage product carousels
// ("What's New", "Anker", "eufy", "soundcore"). ONE component, FOUR data
// arrays; the heading above each row is the already-built `SectionHeading`.
//
// Spec: docs/research/components/product-carousels.spec.md
// Card internals: docs/research/components/todays-best-deal.spec.md
//
// NOTE — BREAKPOINT SUBSTITUTION: the target uses named Tailwind tiers that are
// NOT registered in this project's globals.css: tablet:(768) laptop:(1024)
// desktop:(1440) lg-desktop:(1920). They are written here as Tailwind v4
// arbitrary variants with the same pixel values: min-[768px]:, min-[1024px]:,
// min-[1440px]:, min-[1920px]:. Swap them for the named tiers once the
// breakpoints are registered in globals.css.
//
// NOTE — 14px ROOT: globals.css sets `html { font-size: 14px }`, so Tailwind's
// rem scale resolves at 0.875x. Class names lifted from the target are used
// verbatim; every value the spec states as a MEASUREMENT is written as an
// arbitrary `[Npx]` instead — writing a measured 64px as `pl-16` would silently
// render 56px here.
//
// NOTE — DATA IS GENERATED, NOT TYPED. Every string below was extracted
// mechanically from the spec's tables (which the spec generator itself produced
// from the raw browser capture), so no title, price, pill or path was retyped by
// hand. The spec writes non-ASCII as `\uXXXX`; that is preserved here — U+00A0
// via the shared `NBSP` constant, everything else as an inline `\uXXXX` escape —
// so no invisible byte sits in the source where a formatter could normalise it.
// Code points present: 122 x U+00A0 (NBSP), 3 x U+00D7 (MULTIPLICATION SIGN),
// 1 x U+2122 (TRADE MARK SIGN), 1 x U+FF5C (FULLWIDTH VERTICAL LINE) = 127,
// matching the spec exactly. Every apostrophe in this data is ASCII U+0027; the
// spec contains no U+2019.
//
// NOTE — DISCOUNT PILLS ARE COPIED, NEVER COMPUTED. The percentage strings are
// exactly the ones the spec lists. They are not derived from the price pair, and
// a card the spec gives no pill for renders no pill.
//
// NOTE — NO SWIPER: the target's rows are Swiper instances. They are reproduced
// with a CSS `overflow-x-auto` scroller + scroll snapping and a hidden
// scrollbar, so no new dependency is added — the same approach as
// TodaysBestDeal.tsx.
//
// NOTE — CARD LINK OVERLAY: the target's cards navigate; `ProductCard` renders a
// non-link `<button>` because the section-#7 spec recorded no href. Wrapping the
// card in an `<a>` would nest a button inside a link, which is invalid HTML, so
// the href is applied as a stretched link layered over the card instead. Cost:
// each card is two tab stops (the overlay link, then the covered Shop Now
// button). TODO: collapse to one once `ProductCard` accepts an `href`.
//
// NOTE — WHAT'S NEW BOX IS UNRESOLVED. The spec measures section #9 at 640px and
// says its cards are the standard 316x384 product card, but 69px (SectionHeading)
// + 384px (card) = 453px, leaving 187px unaccounted for. Three independent hints
// say the What's New slides are really full-width banners, not product cards:
// the section height equals the 640px in the first asset's own filename
// (`d1205_pc_1664x640_2.png`), the spec counts 16 images for 8 slides (an
// art-directed <picture> pair per slide), and these are the only cards with a
// subtitle and no price. Built to the spec as product cards; see the report note
// — this needs a re-measure before it is pixel-correct. Concretely: with a
// subtitle the card's intrinsic content exceeds the fixed `h-[384px]
// overflow-hidden` box, so the bottom of the Shop Now button is clipped on
// What's New cards only.

import Link from "next/link";
import { ProductCard, type Product } from "./ProductCard";
import { SECTION_HEADINGS, SectionHeading } from "./SectionHeading";

// Prices and percentage pills are VERBATIM Swedish-locale strings — never
// derived from numbers, reformatted, or currency-converted. Their separators are
// non-breaking spaces (U+00A0), both as the thousands separator and before `kr`,
// and the percentage pills carry one before `%`. Factored into this constant
// with an explicit \u escape, exactly as TodaysBestDeal.tsx does, so the
// character stays visible in review — a raw U+00A0 in source looks exactly like
// a plain space.
const NBSP = "\u00A0";

/** A `ProductCard` product plus the destination the carousel card links to. */
export type CarouselProduct = Product & {
  /** Verbatim from the target: site-relative `/se/...` or absolute. */
  readonly href: string;
};

/** One carousel instance: a `SectionHeading` plus its row of cards. */
export interface ProductCarouselInstance {
  /** Stable key; also seeds the heading's DOM id. */
  readonly id: string;
  /** Heading copy, taken from the already-built `SECTION_HEADINGS`. */
  readonly heading: string;
  readonly products: readonly CarouselProduct[];
}

/**
 * Topology #9 — "What's New". 8 slides. These are the only cards that carry a
 * subtitle and the only ones with no price or pills; `price` is the empty string
 * because `ProductCard.Product` requires the field and the spec records none.
 */
export const WHATS_NEW: readonly CarouselProduct[] = [
  {
    id: "wn-1",
    title: "soundcore P42i",
    subtitle: "Quiet The Noise, Focus on What Matters Most",
    pills: [],
    price: "",
    image: "/images/d1205_pc_1664x640_2.png",
    href: "https://www.ankernordics.com/products/d1205",
  },
  {
    id: "wn-2",
    title: "Anker Nano USB-C Hub (8-in-1, Dual Display)",
    subtitle: "Your Workflow, with Full Energy",
    pills: [],
    price: "",
    image: "/images/frame_2147238604.png",
    href: "https://www.ankernordics.com/products/a210b",
  },
  {
    id: "wn-3",
    title: "25W Max Palm-Sized 3-in-1",
    subtitle: "Wireless Charger with Active Cooling",
    pills: [],
    price: "",
    image: "/images/frame_2147238602.png",
    href: "https://www.ankernordics.com/products/b25n1",
  },
  {
    id: "wn-4",
    title: "eufy Baby Bottle Washer S1 Pro",
    // ASCII apostrophe U+0027 in "World's", as captured — not U+2019.
    subtitle: "World's First Bottle Washer with Water Softener",
    pills: [],
    price: "",
    image: "/images/frame_2147238600.png",
    href: "https://www.ankernordics.com/eufy-bottle-washer-s1",
  },
  {
    id: "wn-5",
    title: "eufy Wearable Breast Pump S2 Pro",
    subtitle: "Feel the Heated Massage, Own Your Flow",
    pills: [],
    price: "",
    image: "/images/frame_2147238573_1.png",
    href: "https://www.ankernordics.com/products/t600p082",
  },
  {
    id: "wn-6",
    // TRADE MARK SIGN U+2122 and MULTIPLICATION SIGN U+00D7. The trailing `*` is
    // the target's own footnote marker, not markdown emphasis.
    title: "ANKER Thus\u2122 150\u00D7 Computing Power*",
    pills: [],
    price: "",
    image: "/images/d1203z21_rich-image_elkjop_nod_soundcore_03_en_v1.png",
    href: "https://www.ankernordics.com/anker-thus-ai-chip",
  },
  {
    id: "wn-7",
    title: "eufyCam C37",
    subtitle: "Total Coverage. Zero Hassle.",
    pills: [],
    price: "",
    image: "/images/t814x_banner_listing_image_01_no_copy_1060x1060px_3.png",
    href: "https://www.ankernordics.com/products/t814x321",
  },
  {
    id: "wn-8",
    title: "eufy Wired Cam C31",
    subtitle: "Auto Tracking, Indoors or Outdoors",
    pills: [],
    price: "",
    image: "/images/frame_2147226853-1.png",
    href: "https://www.ankernordics.com/products/t817l420",
  },
];

/** Topology #14 — "Anker". 10 slides. */
export const ANKER_PRODUCTS: readonly CarouselProduct[] = [
  {
    id: "anker-1",
    title: "Anker Prime Power Bank (26K, 300W)",
    pills: [`20${NBSP}%`, "Best Seller"],
    price: `1${NBSP}992,00${NBSP}kr`,
    wasPrice: `2${NBSP}490,00${NBSP}kr`,
    image: "/images/frame_2121237348.png",
    href: "/se/products/a110ah11",
  },
  {
    id: "anker-2",
    title: "Anker Prime Charger (160W, 3 Ports, Smart Display)",
    pills: [`24${NBSP}%`, "Best Seller"],
    price: `1${NBSP}284,40${NBSP}kr`,
    wasPrice: `1${NBSP}690,00${NBSP}kr`,
    image: "/images/frame_20000.png",
    href: "/se/products/a2687-anker-prime-charger-160w-3-ports-gan",
  },
  {
    id: "anker-3",
    title: "Anker Nano 45W Smart Display Charger (2-Pack)",
    pills: [`11${NBSP}%`, "New"],
    price: `844,61${NBSP}kr`,
    wasPrice: `949,00${NBSP}kr`,
    image: "/images/bundle-a121d311-2_rich_image_td01_en_v2.png",
    href: "/se/products/a121d-45w-usb-c-fast-charger-2-pack",
  },
  {
    id: "anker-4",
    title:
      "Anker Nano USB-C Hub (8-in-1, Dual Display), 10 Gbps Speed, 85W Max Fast Laptop Charging",
    pills: [`29${NBSP}%`],
    price: `496,29${NBSP}kr`,
    wasPrice: `699,00${NBSP}kr`,
    image: "/images/a210b.png",
    href: "/se/products/a210b",
  },
  {
    id: "anker-5",
    title:
      "Anker Laptop Charger (140W, 4-Port, PD 3.1) with USB-C Cable + Anker Laptop Power Bank (25K, 165W, Built-In and Retractable Cables)",
    pills: [`32${NBSP}%`],
    price: `1${NBSP}693,20${NBSP}kr`,
    wasPrice: `2${NBSP}490,00${NBSP}kr`,
    image: "/images/frame_1_3_1.png",
    href: "/se/products/bundle-b26973z1-1-a1695h11-1",
  },
  {
    id: "anker-6",
    title: "Anker 735 Charger (Nano II 65W) (2-Pack)",
    pills: [`45${NBSP}%`],
    price: `604,45${NBSP}kr`,
    wasPrice: `1${NBSP}099,00${NBSP}kr`,
    image: "/images/frame_212.png",
    href: "/se/products/bundle-a2667314-2",
  },
  {
    id: "anker-7",
    title:
      "Anker Laptop Power Bank (25K, 165W, Built-In and Retractable Cables)",
    pills: [`29${NBSP}%`, "Best Seller"],
    price: `993,29${NBSP}kr`,
    wasPrice: `1${NBSP}399,00${NBSP}kr`,
    image: "/images/a1654_no_7.png",
    href: "/se/products/a1695-anker-power-bank-25000mah-165w",
  },
  {
    id: "anker-8",
    title:
      "Anker Prime Power Bank (20K, 220W) + Anker USB-C to USB-C Cable (240W, Upcycled-Braided)",
    pills: [`29${NBSP}%`],
    price: `1${NBSP}589,69${NBSP}kr`,
    wasPrice: `2${NBSP}239,00${NBSP}kr`,
    image: "/images/frame2121237302.png",
    href: "/se/products/bundle-a110bh11-1-a82e2011-1",
  },
  {
    id: "anker-9",
    title: "Anker Nano Power Bank (5K, MagGo, Slim)",
    pills: [`25${NBSP}%`, "Hot"],
    price: `449,25${NBSP}kr`,
    wasPrice: `599,00${NBSP}kr`,
    image: "/images/a1665h11_richimage_td01_us_v2.png",
    href: "/se/products/a1665-anker-nano-powerbank-5000mah",
  },
  {
    id: "anker-10",
    title: "Anker Prime Charger (100W, 3 Ports, GaN)",
    pills: [`52${NBSP}%`],
    price: `551,52${NBSP}kr`,
    wasPrice: `1${NBSP}149,00${NBSP}kr`,
    image: "/images/rich_image_us_5000x6258px_1.png",
    href: "/se/products/a2688-anker-prime-charger-100w-3-ports-gan",
  },
];

/** Topology #20 — "eufy". 9 slides. */
export const EUFY_PRODUCTS: readonly CarouselProduct[] = [
  {
    id: "eufy-1",
    title: "eufyCam S4 4-Cam + Kit HomeBase S380",
    pills: [`28${NBSP}%`, "New"],
    price: `12${NBSP}952,80${NBSP}kr`,
    wasPrice: `17${NBSP}990,00${NBSP}kr`,
    image: "/images/frame214722684911_1.png",
    href: "/se/products/bundle-t81723w1-4-t80303d1-1",
  },
  {
    id: "eufy-2",
    title: "eufy Robot Vacuum Omni S2",
    pills: [`25${NBSP}%`, "New"],
    price: `14${NBSP}992,50${NBSP}kr`,
    wasPrice: `19${NBSP}990,00${NBSP}kr`,
    image: "/images/group4.png",
    href: "/se/products/t2081g11",
  },
  {
    id: "eufy-3",
    // Two MULTIPLICATION SIGNs U+00D7 — not the ASCII letter `x`.
    title:
      "eufy PoE NVR Security System S4 with 2\u00D7 Bullet-PTZ-Cameras and 2\u00D7 Bullet-Cameras",
    pills: [`45${NBSP}%`, "New"],
    price: `7${NBSP}694,50${NBSP}kr`,
    wasPrice: `13${NBSP}990,00${NBSP}kr`,
    image: "/images/1200_1200-2.png",
    href: "/se/products/e8e00122",
  },
  {
    id: "eufy-4",
    title: "eufyCam S330 (eufyCam 3) 4-Cam Kit + 1 TB Hard Drive",
    pills: [`39${NBSP}%`, "Best Seller"],
    price: `5${NBSP}483,90${NBSP}kr`,
    wasPrice: `8${NBSP}990,00${NBSP}kr`,
    image: "/images/1tb_1.png",
    href: "/se/products/bundle-t88733w1-1-t80301d1-81-1",
  },
  {
    id: "eufy-5",
    title: "eufyCam S3 Pro 4-Cam Kit + Video Doorbell S220 Add-on",
    pills: [`27${NBSP}%`],
    price: `8${NBSP}022,70${NBSP}kr`,
    wasPrice: `10${NBSP}990,00${NBSP}kr`,
    image: "/images/t8894_us_td01_4_1.png",
    href: "/se/products/bundle-t88943w1-1-t82101w1-1",
  },
  {
    id: "eufy-6",
    title: "eufyCam C37 2K (4 Pack) + Homebase Mini + Solar Panel*4",
    pills: [`28${NBSP}%`, "New"],
    price: `4${NBSP}672,80${NBSP}kr`,
    wasPrice: `6${NBSP}490,00${NBSP}kr`,
    image: "/images/e814x3261.png",
    href: "/se/products/eufycam-c37-2k-4-pack-homebase-mini-solar-panel-4",
  },
  {
    id: "eufy-7",
    title: "SoloCam S340 (4 pack)",
    pills: [`44${NBSP}%`, "Best Seller"],
    price: `4${NBSP}754,40${NBSP}kr`,
    wasPrice: `8${NBSP}490,00${NBSP}kr`,
    image: "/images/t8170_4.png",
    href: "/se/products/bundle-t81703w1-4",
  },
  {
    id: "eufy-8",
    title: "eufy 4G LTE Cam S330",
    pills: [`38${NBSP}%`, "Best Seller"],
    price: `1${NBSP}977,80${NBSP}kr`,
    wasPrice: `3${NBSP}190,00${NBSP}kr`,
    image: "/images/1.png",
    href: "/se/products/t86p2321",
  },
  {
    id: "eufy-9",
    title: "eufy Robot Lawn Mower E18",
    pills: [`31${NBSP}%`],
    price: `11${NBSP}033,10${NBSP}kr`,
    wasPrice: `15${NBSP}990,00${NBSP}kr`,
    image: "/images/group2147239025.png",
    href: "/se/products/t2801ga1",
  },
];

/** Topology #26 — "soundcore". 8 slides. */
export const SOUNDCORE_PRODUCTS: readonly CarouselProduct[] = [
  {
    id: "sc-1",
    // FULLWIDTH VERTICAL LINE U+FF5C — not the ASCII `|` used by sc-2..sc-8.
    // Do not normalise the two into each other.
    title: "Liberty 5 Pro Max\uFF5CAI Recording Earbuds with Smart Case",
    pills: ["Hot", "New"],
    price: `2${NBSP}690,00${NBSP}kr`,
    image: "/images/d1204_black_new_logo1.png",
    href: "/se/products/d1204",
  },
  {
    id: "sc-2",
    // Plain ASCII `|` (the spec's markdown escapes it as `\|`).
    title: "soundcore Work | The World's First Coin-Sized AI Voice Recorder",
    pills: [`24${NBSP}%`, "Hot"],
    price: `1${NBSP}284,40${NBSP}kr`,
    wasPrice: `1${NBSP}690,00${NBSP}kr`,
    image: "/images/d3200z11_listing_image_07_us_v11.png",
    href: "/se/products/d3200",
  },
  {
    id: "sc-3",
    title: "soundcore Space One | Active Noise Cancelling Headphones",
    pills: [`31${NBSP}%`],
    price: `890,10${NBSP}kr`,
    wasPrice: `1${NBSP}290,00${NBSP}kr`,
    image: "/images/frame_2121237312.png",
    href: "/se/products/space-one-a3035011",
  },
  {
    id: "sc-4",
    title: "Nebula X1 | 4K Triple Laser Projector with Dolby Audio",
    pills: [`43${NBSP}%`, "Hot"],
    price: `19${NBSP}944,30${NBSP}kr`,
    wasPrice: `34${NBSP}990,00${NBSP}kr`,
    image: "/images/image_1.png",
    href: "/se/products/d2351-nebula-x1-4k-triple-laser-projector",
  },
  {
    id: "sc-5",
    title: "soundcore Nebula P1 | Portable Projector with Detachable Speakers",
    pills: [`43${NBSP}%`, "New"],
    price: `7${NBSP}974,30${NBSP}kr`,
    wasPrice: `13${NBSP}990,00${NBSP}kr`,
    image: "/images/538d79b9411849f594156447d71cdfe1.png",
    href: "/se/products/d2431-nebula-p1",
  },
  {
    id: "sc-6",
    title:
      "soundcore Nebula P1i | World's First Smart Portable Projector with Flippable Speakers",
    pills: [`43${NBSP}%`],
    price: `3${NBSP}984,30${NBSP}kr`,
    wasPrice: `6${NBSP}990,00${NBSP}kr`,
    image: "/images/d2200_richimage_dtc_td01_us_v1.png",
    href: "/se/products/d2200-nebula-p1i",
  },
  {
    id: "sc-7",
    title: "soundcore Liberty 4 Pro | Noise Cancelling True-Wireless Earbuds",
    pills: [`35${NBSP}%`],
    price: `1${NBSP}293,50${NBSP}kr`,
    wasPrice: `1${NBSP}990,00${NBSP}kr`,
    image: "/images/a3954n11_dtc_listing_image_td01_us_v1_1.png",
    href: "/se/products/a3954-liberty-4-pro-tws-earbuds",
  },
  {
    id: "sc-8",
    title:
      "soundcore Nebula X1 Pro 4K Projector | World's First Mobile Theater Station",
    pills: [`36${NBSP}%`, "New"],
    price: `44${NBSP}793,60${NBSP}kr`,
    wasPrice: `69${NBSP}990,00${NBSP}kr`,
    image: "/images/20251231-140552.png",
    href: "/se/products/d2151-nebula-x1-pro",
  },
];

/**
 * The four homepage instances in topology order (#9, #14, #20, #26). Page
 * assembly maps over this and renders one `<ProductCarousel>` per entry —
 * each already renders its own `SectionHeading`, so do not add another.
 */
export const PRODUCT_CAROUSELS: readonly ProductCarouselInstance[] = [
  { id: "whats-new", heading: SECTION_HEADINGS.whatsNew, products: WHATS_NEW },
  { id: "anker", heading: SECTION_HEADINGS.anker, products: ANKER_PRODUCTS },
  { id: "eufy", heading: SECTION_HEADINGS.eufy, products: EUFY_PRODUCTS },
  {
    id: "soundcore",
    heading: SECTION_HEADINGS.soundcore,
    products: SOUNDCORE_PRODUCTS,
  },
];

export interface ProductCarouselProps {
  readonly carousel: ProductCarouselInstance;
  /**
   * Whether this component renders its own `SectionHeading`.
   *
   * True for "What's New" (#9 -> #10), where the heading sits directly on top
   * of the card row. False for the three brand blocks, where the topology puts
   * the heading ABOVE the video hero, two sections earlier:
   *
   *   #14 SectionHeading "Anker" -> #15 BrandVideoHero -> #18 ProductCarousel
   *
   * In that arrangement the page owns the heading and passes `false` here. The
   * caller must then render `SectionHeading` with `id={`${carousel.id}-heading`}`
   * so this section's `aria-labelledby` still resolves.
   */
  readonly withHeading?: boolean;
}

export function ProductCarousel({
  carousel,
  withHeading = true,
}: ProductCarouselProps) {
  const headingId = `${carousel.id}-heading`;

  return (
    <>
      {/* `SectionHeading` is itself a full section (48px h2 + 21px bottom
          padding = the measured 69px) and already carries the #F5F5F7
          background, so the row below is its sibling rather than its child. */}
      {withHeading ? (
        <SectionHeading text={carousel.heading} id={headingId} />
      ) : null}

      {/* `overflow-hidden ipc_container relative z-10 w-full` are the target's
          own shell classes; `ipc_container` is inert in this project and kept
          for traceability. */}
      <section
        aria-labelledby={headingId}
        className="ipc_container relative z-10 w-full overflow-hidden bg-[#F5F5F7]"
      >
        {/* Site-standard gutter container, identical to TodaysBestDeal and
            SectionHeading. At 1920 this yields the measured 1664px content
            column (2 x 832px inset). `laptop:px-16` and `desktop:px-16` are the
            same value on the target and both reproduced for traceability.

            DERIVED, not measured: the spec puts sections #14/#20/#26 at 480px
            @1920. 480 - 69 (SectionHeading) - 384 (card) = 27px, applied as the
            row's bottom padding. The capture does not say whether the target
            splits it top/bottom, and it does not reconcile #9's 640px - see the
            WHAT'S NEW BOX note at the top of this file.
            TODO: 27px placement unverified. */}
        <div className="mx-auto size-full px-4 pb-[27px] min-[768px]:px-8 min-[1024px]:px-16 min-[1440px]:px-16 min-[1920px]:max-w-full min-[1920px]:px-[calc(50%-832px)]">
          {/* Swiper replacement. The measured slide box equals the measured card
              box (316 x 384), so slides sit flush with no gap. Snapping is
              `proximity` rather than `mandatory` so free scrolling still feels
              like the target's. `tabIndex` makes the scroller reachable for
              keyboard-only users, which a bare overflow container is not. */}
          <ul
            tabIndex={0}
            className="flex w-full list-none snap-x snap-proximity overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
          >
            {carousel.products.map((product) => (
              <li key={product.id} className="relative shrink-0 snap-start">
                <ProductCard product={product} />
                {/* Stretched link - see the CARD LINK OVERLAY note above. It is
                    a later, positioned sibling, so it paints over the whole card
                    without any z-index and without nesting the card's button
                    inside an anchor. `rounded-[14px]` matches the card so the
                    focus ring traces the same corners. */}
                <Link
                  href={product.href}
                  className="absolute inset-0 rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#080A0F]"
                >
                  <span className="sr-only">{product.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
