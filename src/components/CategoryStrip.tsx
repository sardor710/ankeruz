// Section #5 — "CategoryStrip". Spec: docs/research/components/slogan-and-categories.spec.md
//
// NOTE — BREAKPOINT SUBSTITUTION: the target uses named Tailwind tiers that are
// NOT registered in this project's globals.css: tablet:(768) laptop:(1024)
// desktop:(1440) lg-desktop:(1920). They are written here as Tailwind v4
// arbitrary variants with the same pixel values: min-[768px]:, min-[1024px]:,
// min-[1440px]:, min-[1920px]:. Swap them for the named tiers once the
// breakpoints are registered in globals.css.
//
// NOTE — 14px ROOT: globals.css sets `html { font-size: 14px }` to match the
// target, so Tailwind's rem scale resolves at 0.875x and the site's own class
// names land on the measured pixels (text-sm -> 12.25px, p-3 -> 10.5px,
// p-4 -> 14px, p-6 -> 21px, text-lg -> 15.75px, leading-6 -> 21px). Utilities
// lifted from the target are used VERBATIM, not converted to arbitrary px.
//
// NOTE — TAILWIND v4 !important: the target's `lg-desktop:!leading-6` is written
// `min-[1920px]:leading-6!` here — v4 moved the bang from prefix to suffix.
//
// NOTE — NO SWIPER: the live strip is a Swiper instance whose DOM holds 32
// slides = 24 unique + 8 loop clones. Only the 24 unique tiles are built, and
// the carousel is reproduced with a CSS `overflow-x-auto` scroller instead of
// adding the `swiper` dependency. That keeps this a server component.
//
// NOTE — LABEL IS A SIBLING: on the target the label <p> sits NEXT TO the <a>,
// not inside it. That structure is reproduced exactly; the anchor takes its
// accessible name from the image alt instead.

import Image from "next/image";

/** One circular product-category tile in the strip. */
type Category = {
  readonly label: string;
  /** Local asset under public/ — all 24 verified present, all square. */
  readonly image: string;
  /** Same-origin path, verbatim from the target. */
  readonly href: string;
};

const CATEGORIES: readonly Category[] = [
  {
    label: "Outdoor Cameras",
    image: "/images/outdoor_cameras_-_eufycam_s4_-_t8172.png",
    href: "/collections/outdoor-cameras",
  },
  {
    label: "Robot Vacuum",
    image: "/images/frame_2121236702-1.png",
    href: "/collections/robot-vacuum",
  },
  {
    label: "Lawn Mowers",
    image: "/images/lawn_mowers_-_eufy_robot_mower_e15_-_t2880_1.png",
    href: "/collections/lawn-mower",
  },
  {
    label: "Sleep Earbuds",
    image: "/images/image_2_5_1.png",
    href: "/collections/sleep-earbuds",
  },
  {
    label: "Power Banks",
    image: "/images/power_banks_-_a110a_1.png",
    href: "/collections/power-banks",
  },
  {
    label: "Chargers",
    image: "/images/chargers_-_a2687.png",
    href: "/collections/chargers",
  },
  {
    label: "Cables",
    image: "/images/cables_-_a88e2_1.png",
    href: "/collections/cables",
  },
  {
    label: "Hubs and Docks",
    image: "/images/hubs_and_docks_-_a83b3.png",
    href: "/collections/hubs-and-docks",
  },
  {
    label: "Wireless Chargers",
    image: "/images/wireless_chargers_-_a25x7.png",
    href: "/collections/wireless-chargers",
  },
  {
    label: "AC Power",
    image: "/images/ac_power_-_a91b2.png",
    href: "/collections/ac-power",
  },
  {
    label: "Car Chargers",
    image: "/images/car_chargers_-_a2933.png",
    href: "/collections/car-chargers",
  },
  {
    label: "Smart Lights",
    image: "/images/smart_lights_-_permanent_outdoor_light_s4.png",
    // Label and slug genuinely disagree on the target — reproduced as given.
    href: "/collections/outdoor-light",
  },
  {
    label: "Breast Pumps",
    image: "/images/breast_pumps_-_wearable_breast_pump_s1_pro.png",
    href: "/collections/baby-1",
  },
  {
    label: "eufy Cleaning Accessories",
    image: "/images/frame_21212367011.png",
    href: "/collections/ap-accessory",
  },
  {
    label: "HomeBase",
    image: "/images/homebase_-_homebase_s380_homebase_3_-_t8030.png",
    href: "/collections/homebase",
  },
  {
    label: "Smart Displays",
    image: "/images/smart_displays_-_smart_display_e10_-_t87a0.png",
    href: "/collections/smart-display",
  },
  {
    label: "PoE Cameras",
    image:
      "/images/poe_cameras_-_nvr_security_system_s4_max_8_channels_nvr_with_4_poe_bul.png",
    href: "/collections/poe-cameras",
  },
  {
    label: "Indoor Cameras",
    image: "/images/indoor_cameras_-_indoor_cam_s350_-_t8416_1.png",
    // Capital "I" in the slug is the target's own inconsistency. Do not "fix".
    href: "/collections/Indoor-cameras",
  },
  {
    label: "Voice Recorders",
    image: "/images/voice_recorders_-_soundcore_work_ai_recorder_-_d3200.png",
    // The only /products/ href in the strip.
    href: "/products/d3200",
  },
  {
    label: "Truly Wireless Earbuds",
    image: "/images/true_wireless_earbuds_-_liberty_5_-_a3957_1.png",
    href: "/collections/true-wireless-earbuds",
  },
  {
    label: "Open-Ear Earbuds",
    image: "/images/open-ear_earbuds_-_aerofit_pro_2_-_a3875_1.png",
    href: "/collections/open-ear-headphones",
  },
  {
    label: "Open-Ear Headphones",
    image: "/images/image_3_-1.png",
    href: "/collections/headphones",
  },
  {
    label: "Speakers",
    image: "/images/speakers_-_rave_3s_-_a31a3_1.png",
    href: "/collections/speakers",
  },
  {
    label: "Projectors",
    image: "/images/smart_projectors_-_x1_-_d2351_1.png",
    href: "/collections/projectors",
  },
];

/** Largest rendered tile image on any tier (`desktop:size-[116px]`). */
const TILE_IMAGE_PX = 116;

export function CategoryStrip() {
  return (
    // Site-standard gutter container. `laptop:px-16` and `desktop:px-16` are the
    // same value on the target and are both reproduced for traceability.
    <div className="ipc_container relative z-10 w-full">
      <div className="mx-auto size-full px-4 min-[768px]:px-8 min-[1024px]:px-16 min-[1440px]:px-16 min-[1920px]:max-w-full min-[1920px]:px-[calc(50%-832px)]">
        {/* Swiper replacement. `snap-proximity` rather than `snap-mandatory`:
            the target scrolls freely and mandatory snapping would fight that.
            Scrollbar hidden via arbitrary properties because a `scrollbar-hide`
            utility is not registered and globals.css is out of scope here.
            tabIndex makes the scroller reachable for keyboard-only users, which
            a bare overflow container is not. */}
        <div
          role="region"
          aria-label="Shop by category"
          tabIndex={0}
          className="flex w-full snap-x snap-proximity overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 [&::-webkit-scrollbar]:hidden"
        >
          {CATEGORIES.map((category) => (
            // Measured slide width 316px @1440. `!h-[unset]` -> `h-[unset]!`.
            <div
              key={category.href}
              className="group h-[unset]! w-[316px] shrink-0 snap-start"
            >
              <div className="relative max-h-[240px] overflow-hidden">
                {/* The target uses the legacy aspect-ratio plugin
                    (`aspect-w-[167] aspect-h-[120]`, i.e. a 167:120 padding box)
                    with further `tablet:aspect-w-[404]…` overrides that were
                    TRUNCATED in the spec. Only the base ratio is known, so it is
                    applied at every tier: 316px wide -> 227px tall, inside the
                    240px cap. TODO: the section measures 265px @1440, so ~38px of
                    vertical space is unaccounted for — recover the tablet+ ratios
                    (or the wrapper padding) and reconcile. */}
                <div className="relative aspect-[167/120]">
                  <div className="absolute inset-0 max-h-[240px] min-[768px]:p-3 min-[1024px]:p-4 min-[1440px]:p-6">
                    {/* 300ms transition is armed on this wrapper on the target.
                        TODO: hover delta unverified — a restrained scale stands in. */}
                    <div className="flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                      <a href={category.href}>
                        {/* Stands in for the target's <picture> + 5 <source>
                            art-direction entries; those are the same asset at
                            different widths, so one next/image is sufficient. */}
                        <span className="block overflow-hidden min-[768px]:size-[72px] min-[1024px]:size-1/2 min-[1440px]:size-[116px]">
                          <Image
                            src={category.image}
                            alt={category.label}
                            width={TILE_IMAGE_PX}
                            height={TILE_IMAGE_PX}
                            className="w-full"
                          />
                        </span>
                      </a>
                    </div>

                    {/* SIBLING of the anchor, not a child — matches the target. */}
                    <p className="text-sm leading-[14px] font-bold text-center text-ink min-[1920px]:text-lg min-[1920px]:leading-6!">
                      {category.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
