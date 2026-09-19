"use client";

// Topology #1 on the d1204 (Liberty 5 Pro Max) PDP — ProductGallery. Client
// component: clicking a thumbnail scrolls the main stage to that slide, which
// needs local state.
//
// Spec: docs/research/components/pdp-product-hero.spec.md #1 (grid contract,
// slide list) and docs/research/components/pdp-core.spec.md (breakpoint
// rules, asset resolution).
//
// BREAKPOINTS ARE INVERTED on this page vs. the rest of this repo: `md:` on
// the target means `@media (max-width: 767px)` (mobile-only) and `lg:` means
// `(min-width: 769px) and (max-width: 1024px)` (tablet band only). Translated
// here as `max-[767px]:` and `min-[769px]:max-[1024px]:` — NOT the
// `min-[768px]:` tiers used by the homepage components.
//
// The spec's wrapper class,
// `sticky top-0 col-span-6 mr-[30px] max-h-[600px] overflow-hidden
// md:aspect-h-1 md:relative md:col-span-10 md:mr-0 md:w-full md:aspect-w-[1.4]`,
// means: sticky 6-col column pinned at 726x600 on desktop; on MOBILE it drops
// the sticky/grid-column behaviour, becomes a relative full-width box, and
// gets a 1.4:1 aspect ratio (Tailwind's built-in `aspect-[1.4]` utility,
// no plugin needed).
//
// NO SWIPER: the target uses Swiper for both the vertical thumb rail and the
// horizontal main stage. Reproduced with the same CSS-scroller pattern as
// `ProductCarousel.tsx` — `overflow-*-auto` + scroll snap + hidden scrollbar —
// so no new dependency is added.
//
// VIDEO SLIDES: the spec's 24-slide list includes 4 HLS-only video slides
// (`.m3u8`, no MP4 rendition, no poster). Measured on the live element:
// `readyState: 0`, no poster frame — these render as empty players on the
// target itself, so this build renders NOTHING for them rather than
// fabricating a product-still substitute. The 4 entries stay in
// `GALLERY_SLIDES`, typed as `GalleryVideoSlide` and carrying their HLS URLs
// in a comment/field, so a future format decision doesn't require
// restructuring the data. Only `GalleryImageSlide` entries render in the DOM
// (20 total).
//
// JUDGMENT CALL — slides 22/23: the spec's own capture was truncated at the
// tail of the Gold range ("re-read slides 22-23"). Two independent facts
// resolve it without a re-visit: (1) the task brief's "20 images + 4 videos"
// total only balances if a 4th video hash exists beyond the 3 the spec table
// marks (rows 10-12) — and the video section does list exactly 4 HLS hashes,
// one more than the table accounts for; (2) the Black colourway has a clean
// 10-image run (slides 0-9, one per numbered TD asset + the 2 unnumbered
// ones) before its 3 video slides. Mirroring that shape onto Gold — which the
// confirmed rows 13-21 already show is assembling the identical asset set in
// the identical order — slide 22 is the Gold twin of Black's slide 9
// (`D1204ZB1_Rich_image_TD08…`, no-hash variant) and slide 23 is the 4th HLS
// video. This keeps both colourways' still-image counts equal (10 each = 20
// total) and accounts for all 4 video hashes. Flagged here rather than
// silently assumed; re-measure against the live DOM before treating this as
// final.
//
// Thumb slide box size/gap and inactive-thumbnail opacity were left
// unmeasured by the spec ("Still to measure before dispatch"). Built to a
// square thumb matching the 90px rail width with an 8px gap and a 0.5 inactive
// opacity — a reasonable default, not a measurement. Revisit once measured.

import Image from "next/image";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type GalleryColourway = "black" | "gold";

export type GalleryImageSlide = {
  readonly type: "image";
  readonly id: string;
  readonly colourway: GalleryColourway;
  readonly src: string;
  readonly alt: string;
};

export type GalleryVideoSlide = {
  readonly type: "video";
  readonly id: string;
  readonly colourway: GalleryColourway;
  /** HLS-only source; no MP4 rendition and no poster exist. Not rendered. */
  readonly hlsSrc: string;
};

export type GallerySlide = GalleryImageSlide | GalleryVideoSlide;

const PRODUCT_TITLE = "Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case";

/**
 * All 24 slides in DOM order, Black (0-12) then Gold (13-23) — see
 * `pdp-product-hero.spec.md` #1. Kept as one flat array (rather than two
 * per-colourway arrays) so `PdpBuyBox` can eventually drive the active
 * colourway by filtering on `colourway`, matching the source DOM order.
 */
export const GALLERY_SLIDES: readonly GallerySlide[] = [
  // --- Black -----------------------------------------------------------
  {
    type: "image",
    id: "black-0",
    colourway: "black",
    src: "/images/1204_black.png",
    alt: PRODUCT_TITLE,
  },
  {
    type: "image",
    id: "black-1",
    colourway: "black",
    src: "/images/d1204z11_rich_image_td07_en_1600_2000_v1.png",
    alt: PRODUCT_TITLE,
  },
  {
    type: "image",
    id: "black-2",
    colourway: "black",
    src: "/images/d1203z31_rich-image_elkjop_nod_soundcore_03_en_v1.png",
    alt: PRODUCT_TITLE,
  },
  {
    type: "image",
    id: "black-3",
    colourway: "black",
    src: "/images/d1204z11_rich_image_td05_en_1600_2000_v1.png",
    alt: PRODUCT_TITLE,
  },
  {
    type: "image",
    id: "black-4",
    colourway: "black",
    src: "/images/d1204z11_rich_image_td09_en_1600_2000_v1.png",
    alt: PRODUCT_TITLE,
  },
  {
    type: "image",
    id: "black-5",
    colourway: "black",
    src: "/images/d1204zb1_rich_image_td04_en_1600_2000_v1.png",
    alt: PRODUCT_TITLE,
  },
  {
    type: "image",
    id: "black-6",
    colourway: "black",
    src: "/images/d1204z11_rich_image_td02_en_1600_2000_v1.png",
    alt: PRODUCT_TITLE,
  },
  {
    type: "image",
    id: "black-7",
    colourway: "black",
    src: "/images/a3875zq1_rich_image_td03_us_v1.jpg",
    alt: PRODUCT_TITLE,
  },
  {
    type: "image",
    id: "black-8",
    colourway: "black",
    src: "/images/d1204z11_rich_image_td06_en_1600_2000_v1.png",
    alt: PRODUCT_TITLE,
  },
  {
    type: "image",
    id: "black-9",
    colourway: "black",
    src: "/images/d1204zb1_rich_image_td08_us_v1.png",
    alt: PRODUCT_TITLE,
  },
  {
    type: "video",
    id: "black-10",
    colourway: "black",
    hlsSrc:
      "https://checkout.ankernordics.com/cdn/shop/videos/c/vp/81eb4d4257034b36afce7a5971a0c8ee/81eb4d4257034b36afce7a5971a0c8ee.m3u8",
  },
  {
    type: "video",
    id: "black-11",
    colourway: "black",
    hlsSrc:
      "https://checkout.ankernordics.com/cdn/shop/videos/c/vp/5d1082c9d527466aae189632d0f579ba/5d1082c9d527466aae189632d0f579ba.m3u8",
  },
  {
    type: "video",
    id: "black-12",
    colourway: "black",
    hlsSrc:
      "https://checkout.ankernordics.com/cdn/shop/videos/c/vp/d1df7e123e6a44edb57f643a3ec60ac7/d1df7e123e6a44edb57f643a3ec60ac7.m3u8",
  },
  // --- Gold --------------------------------------------------------------
  {
    type: "image",
    id: "gold-13",
    colourway: "gold",
    src: "/images/1204_gold.png",
    alt: PRODUCT_TITLE,
  },
  {
    type: "image",
    id: "gold-14",
    colourway: "gold",
    src: "/images/d1204zb1_rich_image_td07_en_1600_2000_v1.png",
    alt: PRODUCT_TITLE,
  },
  {
    type: "image",
    id: "gold-15",
    colourway: "gold",
    src: "/images/d1203z31_rich-image_elkjop_nod_soundcore_03_en_v1-2.png",
    alt: PRODUCT_TITLE,
  },
  {
    type: "image",
    id: "gold-16",
    colourway: "gold",
    src: "/images/d1204zb1_rich_image_td04_en_1600_2000_v1-2.png",
    alt: PRODUCT_TITLE,
  },
  {
    type: "image",
    id: "gold-17",
    colourway: "gold",
    src: "/images/d1204zb1_rich_image_td05_en_1600_2000_v1.png",
    alt: PRODUCT_TITLE,
  },
  {
    type: "image",
    id: "gold-18",
    colourway: "gold",
    src: "/images/d1204zb1_rich_image_td09_en_1600_2000_v1.png",
    alt: PRODUCT_TITLE,
  },
  {
    type: "image",
    id: "gold-19",
    colourway: "gold",
    src: "/images/d1204zb1_rich_image_td02_en_1600_2000_v1.png",
    alt: PRODUCT_TITLE,
  },
  {
    type: "image",
    id: "gold-20",
    colourway: "gold",
    src: "/images/a3875zq1_rich_image_td03_us_v1-2.jpg",
    alt: PRODUCT_TITLE,
  },
  {
    type: "image",
    id: "gold-21",
    colourway: "gold",
    src: "/images/d1204zb1_rich_image_td06_en_1600_2000_v1.png",
    alt: PRODUCT_TITLE,
  },
  {
    // Judgment call — see file header note. Gold twin of black-9.
    type: "image",
    id: "gold-22",
    colourway: "gold",
    src: "/images/d1204zb1_rich_image_td08_us_v1-2.png",
    alt: PRODUCT_TITLE,
  },
  {
    // Judgment call — see file header note. The 4th HLS hash; unrendered.
    type: "video",
    id: "gold-23",
    colourway: "gold",
    hlsSrc:
      "https://checkout.ankernordics.com/cdn/shop/videos/c/vp/546bf67bb68742359c2b6290ee39bb1c/546bf67bb68742359c2b6290ee39bb1c.m3u8",
  },
];

function isImageSlide(slide: GallerySlide): slide is GalleryImageSlide {
  return slide.type === "image";
}

export interface PdpProductGalleryProps {
  /** Drives which colourway's slides render. Local-only for now; `PdpBuyBox`
   * will eventually own this selection and pass it down. */
  readonly colourway?: GalleryColourway;
}

/** Sticky product gallery: vertical thumb rail + horizontal main stage. */
export function PdpProductGallery({ colourway = "black" }: PdpProductGalleryProps) {
  const slides = GALLERY_SLIDES.filter(
    (slide): slide is GalleryImageSlide => slide.colourway === colourway && isImageSlide(slide),
  );

  const [activeId, setActiveId] = useState<string>(slides[0]?.id ?? "");
  const stageRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  const handleThumbClick = (id: string) => {
    setActiveId(id);
    stageRefs.current.get(id)?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  return (
    <div className="sticky top-0 col-span-6 mr-[30px] max-h-[600px] overflow-hidden max-[767px]:relative max-[767px]:col-span-10 max-[767px]:mr-0 max-[767px]:aspect-[1.4] max-[767px]:w-full">
      <div className="flex h-full overflow-hidden">
        {/* Thumb rail — vertical scroller, 90 x 600 @1920. */}
        <ul
          tabIndex={0}
          aria-label="Product images"
          className="flex h-full w-[90px] shrink-0 list-none flex-col gap-2 overflow-y-auto overscroll-y-contain [-ms-overflow-style:none] [scrollbar-width:none] snap-y snap-proximity [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, index) => {
            const isActive = slide.id === activeId;
            return (
              <li key={slide.id} className="relative shrink-0 snap-start">
                <button
                  type="button"
                  onClick={() => handleThumbClick(slide.id)}
                  aria-current={isActive}
                  aria-label={`View image ${index + 1} of ${slides.length}`}
                  className={cn(
                    "relative block size-[90px] overflow-hidden bg-white transition-opacity",
                    isActive ? "opacity-100" : "opacity-50",
                  )}
                >
                  <Image
                    src={slide.src}
                    alt=""
                    fill
                    sizes="90px"
                    className="object-contain"
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Main stage — horizontal scroller, 626 x 600 @1920. */}
        <ul
          tabIndex={0}
          aria-label={PRODUCT_TITLE}
          className="ml-[10px] flex h-full flex-1 list-none snap-x snap-proximity overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, index) => (
            <li
              key={slide.id}
              ref={(el) => {
                if (el) stageRefs.current.set(slide.id, el);
                else stageRefs.current.delete(slide.id);
              }}
              className="relative h-full w-full shrink-0 snap-start"
            >
              <Image
                src={slide.src}
                alt={index === 0 ? slide.alt : ""}
                fill
                sizes="(max-width: 767px) 100vw, 626px"
                priority={index === 0}
                className="object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
