"use client";

// Section #7 — "Today's Best Deal": heading + click-driven tab bar + card row.
// Spec: docs/research/components/todays-best-deal.spec.md
// Raw measurements: docs/research/www.ankernordics.com/raw/sec-7-styles.json
// Raw content:      raw/sec-7-bestseller.json, raw/sec-7-todaysdeal.json
//
// NOTE — BREAKPOINT SUBSTITUTION: the target uses named Tailwind tiers that are
// NOT registered in this project's globals.css: tablet:(768) laptop:(1024)
// desktop:(1440) lg-desktop:(1920). They are written here as Tailwind v4
// arbitrary variants with the same pixel values: min-[768px]:, min-[1024px]:,
// min-[1440px]:, min-[1920px]:. Swap them for the named tiers once the
// breakpoints are registered in globals.css.
//
// NOTE — 14px ROOT: globals.css sets `html { font-size: 14px }`, so Tailwind's
// rem scale resolves at 0.875x. Classes lifted from the target are used verbatim
// (the tab container's `p-1` really is the measured 3.5px here); every value the
// spec states as a MEASUREMENT is written as an arbitrary `[Npx]` instead.
//
// NOTE — UNREGISTERED TOKENS: `bg-tabs-list-bg` (#EAEAEC), `rounded-tabs` (0px),
// `text-brand-0` / `outline-brand-0` (#080A0F) and `rounded-btn` (0px) are the
// target's design tokens and are not defined in this project. They are written
// as their computed literals. `justify-left` on the target's tab container is
// not a real utility and computes to nothing; `justify-start` is used, which is
// what the element actually lays out as.
//
// NOTE — CLICK-DRIVEN TABS: only the BACKGROUND changes between states (white
// when active, transparent when idle). The text colour is #080A0F in BOTH
// states — do not add a colour swap. The spec also records that the live site
// ignores synthetic `.click()` events, so QA must verify tab switching with a
// real mouse click, not a scripted one.
//
// NOTE — NO SWIPER: the target's card row is a Swiper instance. It is reproduced
// with a CSS `overflow-x-auto` scroller + scroll snapping and a hidden
// scrollbar, so no new dependency is added. Scrollbar hiding uses arbitrary
// properties because a `scrollbar-hide` utility is not registered and
// globals.css is out of scope for this component.

import { useCallback, useRef, useState } from "react";
import { ProductCard, type Product } from "./ProductCard";

// Prices are VERBATIM Swedish-locale strings — never derived from numbers,
// reformatted, or currency-converted. The separators are non-breaking spaces
// (U+00A0) on the target, both as the thousands separator and before `kr`;
// see the code-point evidence noted in ProductCard.tsx. The character is
// factored into this constant with an explicit \u escape rather than typed
// inline, so it stays visible in review and immune to editor whitespace
// normalisation — a raw U+00A0 in source looks exactly like a plain space.
const NBSP = "\u00A0";

const BEST_SELLER: readonly Product[] = [
  {
    id: "bs-1",
    // FULLWIDTH VERTICAL LINE U+FF5C — not the ASCII `|`. Do not normalise.
    title: "Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case",
    pills: ["Hot", "New"],
    price: `2${NBSP}690,00${NBSP}kr`,
    image: "/images/d1204_black_new_logo1.png",
  },
  {
    id: "bs-2",
    title: "eufy Robot Vacuum Omni E25 (Black)",
    pills: ["Best Seller", "Hot"],
    price: `11${NBSP}990,00${NBSP}kr`,
    image: "/images/frame_2121236678.png",
  },
  {
    id: "bs-3",
    title: "eufyCam S4 (4K Bullet + 2K PTZ)",
    pills: ["New"],
    price: `4${NBSP}490,00${NBSP}kr`,
    image: "/images/background.png",
  },
  {
    id: "bs-4",
    title:
      "Anker Laptop Power Bank (25K, 165W, Built-In and Retractable Cables)",
    pills: [`29${NBSP}%`, "Best Seller"],
    price: `993,29${NBSP}kr`,
    wasPrice: `1${NBSP}399,00${NBSP}kr`,
    image: "/images/a1654_no_7.png",
  },
  {
    id: "bs-5",
    title: "eufyCam S3 Pro 4-Cam Kit",
    pills: ["Hot"],
    price: `10${NBSP}499,00${NBSP}kr`,
    image: "/images/t8894.png",
  },
  {
    id: "bs-6",
    title: "eufy X10 Pro Omni (Black)",
    pills: [`55${NBSP}%`, "Hot"],
    price: `4${NBSP}495,50${NBSP}kr`,
    wasPrice: `9${NBSP}990,00${NBSP}kr`,
    image: "/images/frame_2147226845_1.png",
  },
  {
    id: "bs-7",
    // Plain ASCII `|` here (the spec's markdown escapes it as `\|`).
    title: "soundcore Sleep A30 | The World's First Smart ANC Sleep Earbuds",
    pills: [],
    price: `2${NBSP}990,00${NBSP}kr`,
    image: "/images/group2147226706.png",
  },
  {
    id: "bs-8",
    title: "eufyCam S330 (eufyCam 3) 4-Cam Kit",
    pills: ["Hot"],
    price: `8${NBSP}490,00${NBSP}kr`,
    image: "/images/s330eufycam_eufycam3_4-camkit.png",
  },
  {
    id: "bs-9",
    title: "Anker Laptop Charger (140W, 4-Port, PD 3.1) with USB-C Cable",
    pills: ["Best Seller"],
    price: `1${NBSP}299,00${NBSP}kr`,
    image: "/images/b26973z1.png",
  },
  {
    id: "bs-10",
    title: "Anker Prime Charger (250W, 6 Ports, GaNPrime)",
    pills: ["Best Seller"],
    price: `2${NBSP}299,00${NBSP}kr`,
    image: "/images/a1654_no_9.png",
  },
  {
    id: "bs-11",
    title: "Anker Prime Charger (200W, 6 Ports, GaN)",
    pills: [`23${NBSP}%`, "Hot"],
    price: `993,30${NBSP}kr`,
    wasPrice: `1${NBSP}290,00${NBSP}kr`,
    image: "/images/a2683141_td01_v1-removebg-preview.png",
  },
  {
    id: "bs-12",
    title: "Video Doorbell E340",
    pills: ["Best Seller", "New"],
    price: `1${NBSP}890,00${NBSP}kr`,
    image: "/images/1060_1060.png",
  },
];

const TODAYS_DEAL: readonly Product[] = [
  {
    id: "td-1",
    title: "eufyCam S330 (eufyCam 3) 4-Cam Kit + 1 TB Hard Drive",
    pills: [`39${NBSP}%`, "Best Seller"],
    price: `5${NBSP}483,90${NBSP}kr`,
    wasPrice: `8${NBSP}990,00${NBSP}kr`,
    image: "/images/1tb_1.png",
  },
  {
    id: "td-2",
    // TRADE MARK SIGN U+2122, verbatim from the target.
    title: "eufyCam S4 + eufy HomeBase™ S380",
    pills: [`25${NBSP}%`, "New"],
    price: `4${NBSP}717,50${NBSP}kr`,
    wasPrice: `6${NBSP}290,00${NBSP}kr`,
    image: "/images/frame214722685111_1.png",
  },
  {
    id: "td-3",
    title: "eufyCam C37 2K (4 Pack) + Homebase Mini + Solar Panel*4",
    pills: [`28${NBSP}%`, "New"],
    price: `4${NBSP}672,80${NBSP}kr`,
    wasPrice: `6${NBSP}490,00${NBSP}kr`,
    image: "/images/e814x3261.png",
  },
  {
    id: "td-4",
    title: "eufyCam S3 Pro 4-Cam Kit + Video Doorbell S220 Add-on",
    pills: [`27${NBSP}%`],
    price: `8${NBSP}022,70${NBSP}kr`,
    wasPrice: `10${NBSP}990,00${NBSP}kr`,
    image: "/images/t8894_us_td01_4_1.png",
  },
  {
    id: "td-5",
    title: "Anker Prime Power Bank (26K, 300W)",
    pills: [`20${NBSP}%`, "Best Seller"],
    price: `1${NBSP}992,00${NBSP}kr`,
    wasPrice: `2${NBSP}490,00${NBSP}kr`,
    image: "/images/frame_2121237348.png",
  },
  {
    id: "td-6",
    title: "Anker Prime Charger (160W, 3 Ports, Smart Display)",
    pills: [`24${NBSP}%`, "Best Seller"],
    price: `1${NBSP}284,40${NBSP}kr`,
    wasPrice: `1${NBSP}690,00${NBSP}kr`,
    image: "/images/frame_20000.png",
  },
  {
    id: "td-7",
    title: "Anker Nano 45W Smart Display Charger (2-Pack)",
    pills: [`11${NBSP}%`, "New"],
    price: `844,61${NBSP}kr`,
    wasPrice: `949,00${NBSP}kr`,
    image: "/images/bundle-a121d311-2_rich_image_td01_en_v2.png",
  },
  {
    id: "td-8",
    title: "eufyCam C35 4-Cam Kit",
    pills: [`30${NBSP}%`, "New"],
    price: `3${NBSP}003,00${NBSP}kr`,
    wasPrice: `4${NBSP}290,00${NBSP}kr`,
    image: "/images/frame_371.png",
  },
  {
    id: "td-9",
    title:
      "Anker Laptop Power Bank (25K, 165W, Built-In and Retractable Cables)",
    pills: [`29${NBSP}%`, "Best Seller"],
    price: `993,29${NBSP}kr`,
    wasPrice: `1${NBSP}399,00${NBSP}kr`,
    // Same product as bs-4 but a DIFFERENT asset on the target — kept distinct.
    image: "/images/a1654_no_8_f50a2351-3931-4a6d-a9b9-d73db1fed721.png",
  },
  {
    id: "td-10",
    // Plain ASCII `|` here (the spec's markdown escapes it as `\|`).
    title: "soundcore Space One | Active Noise Cancelling Headphones",
    pills: [`31${NBSP}%`],
    price: `890,10${NBSP}kr`,
    wasPrice: `1${NBSP}290,00${NBSP}kr`,
    image: "/images/frame_2121237312.png",
  },
  {
    id: "td-11",
    title: "eufy X10 Pro Omni (Black) + Replacement Parts Kit",
    pills: [`58${NBSP}%`, "Hot"],
    price: `4${NBSP}615,80${NBSP}kr`,
    wasPrice: `10${NBSP}990,00${NBSP}kr`,
    image: "/images/frame_21212366702.png",
  },
  {
    id: "td-12",
    title: "soundcore Work | The World's First Coin-Sized AI Voice Recorder",
    pills: [`24${NBSP}%`, "Hot"],
    price: `1${NBSP}284,40${NBSP}kr`,
    wasPrice: `1${NBSP}690,00${NBSP}kr`,
    image: "/images/d3200z11_listing_image_07_us_v11.png",
  },
  {
    id: "td-13",
    title: "Nebula X1 | 4K Triple Laser Projector with Dolby Audio",
    pills: [`43${NBSP}%`, "Hot"],
    price: `19${NBSP}944,30${NBSP}kr`,
    wasPrice: `34${NBSP}990,00${NBSP}kr`,
    image: "/images/image_1.png",
  },
];

type TabKey = "best-seller" | "todays-deal";

const TABS: readonly { readonly key: TabKey; readonly label: string }[] = [
  { key: "best-seller", label: "Best Seller" },
  { key: "todays-deal", label: "Today's Deal" },
];

const PANELS: Readonly<Record<TabKey, readonly Product[]>> = {
  "best-seller": BEST_SELLER,
  "todays-deal": TODAYS_DEAL,
};

export function TodaysBestDeal() {
  const [active, setActive] = useState<TabKey>("best-seller");
  const tabRefs = useRef<Partial<Record<TabKey, HTMLButtonElement | null>>>({});

  // Roving focus: Left/Right (plus Home/End) move between tabs and activate,
  // which is the WAI-ARIA automatic-activation pattern. Purely additive — it
  // changes no styling and the target's own mouse behaviour is unaffected.
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const last = TABS.length - 1;
      let next = -1;
      if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
      else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = last;
      if (next === -1) return;
      event.preventDefault();
      const target = TABS[next];
      setActive(target.key);
      tabRefs.current[target.key]?.focus();
    },
    [],
  );

  return (
    // `overflow-hidden ipc_container relative z-10 w-full` are the target's own
    // classes on the section shell.
    <section className="ipc_container relative z-10 w-full overflow-hidden">
      {/* Site-standard gutter container. At 1920 this yields the measured
          1664px content column (2 x 832px inset). `laptop:px-16` and
          `desktop:px-16` are the same value on the target and both reproduced
          for traceability. */}
      <div className="mx-auto size-full px-4 min-[768px]:px-8 min-[1024px]:px-16 min-[1440px]:px-16 min-[1920px]:max-w-full min-[1920px]:px-[calc(50%-832px)]">
        {/* Section height is 531.25px @1440, where heading = 40, tab bar = 57
            and the card row = 384. That leaves 50.25px split across the two
            gaps, i.e. ~25px each — the source of `gap-[25px]`. */}
        <div className="flex w-full flex-col gap-[25px]">
          <h2
            id="todays-best-deal-heading"
            className="text-[32px] leading-[100%] font-bold text-balance tracking-[-0.04em] text-[#080A0F] min-[1440px]:text-[40px] min-[1920px]:text-[48px]"
          >
            Today&apos;s Best Deal
          </h2>

          {/* `flex w-fit max-w-full overflow-x-auto p-1` are the target's own
              classes; `p-1` is the measured 3.5px at this 14px root. The
              container background is #EAEAEC (`bg-tabs-list-bg`) and its radius
              computes to 0 (`rounded-tabs`). */}
          <div
            role="tablist"
            aria-labelledby="todays-best-deal-heading"
            className="flex w-fit max-w-full justify-start overflow-x-auto rounded-none bg-[#EAEAEC] p-1"
          >
            {TABS.map((tab, index) => {
              const isActive = tab.key === active;
              return (
                <button
                  key={tab.key}
                  ref={(node) => {
                    tabRefs.current[tab.key] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${tab.key}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.key}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(tab.key)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  // Measured: padding 15px 28px 14px, 14px / 700 / 21px,
                  // radius 0. ONLY the background differs between states; the
                  // text stays #080A0F in both.
                  className={`inline-flex cursor-pointer items-center justify-center rounded-none pt-[15px] pr-[28px] pb-[14px] pl-[28px] text-[14px] leading-[21px] font-bold whitespace-nowrap text-[#080A0F] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#080A0F] ${
                    isActive ? "bg-[#FFFFFF]" : "bg-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Swiper replacement. The measured slide box equals the measured card
              box (316 x 384), so the slides sit flush with no gap — spaceBetween
              would have shown up as extra slide width and does not. Snapping is
              `proximity` rather than `mandatory` so free scrolling still feels
              like the target's. tabIndex makes the scroller reachable for
              keyboard-only users, which a bare overflow container is not. */}
          {TABS.map((tab) => (
            <div
              key={tab.key}
              role="tabpanel"
              id={`panel-${tab.key}`}
              aria-labelledby={`tab-${tab.key}`}
              hidden={tab.key !== active}
            >
              <div
                tabIndex={0}
                className="flex w-full snap-x snap-proximity overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
              >
                {PANELS[tab.key].map((product) => (
                  <div key={product.id} className="shrink-0 snap-start">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
