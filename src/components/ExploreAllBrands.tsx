// Section #12 — "Explore All Brands during Sale". Two brand panels, each
// rendered twice (a desktop half-width variant and a mobile full-width
// variant) and toggled purely by CSS — the same desktop/mobile pair pattern
// BrandVideoHero.tsx uses for its video panels.
//
// Spec: docs/research/components/explore-all-brands.spec.md
//
// NOTE — BREAKPOINT SUBSTITUTION: the target uses named Tailwind tiers that
// are NOT registered in this project's globals.css: tablet:(768)
// laptop:(1024) desktop:(1440) lg-desktop:(1920). They are written here as
// Tailwind v4 arbitrary variants with the same pixel values: min-[768px]:,
// min-[1024px]:, min-[1440px]:, min-[1920px]:.
//
// NOTE — 14px ROOT: globals.css sets `html { font-size: 14px }`, so
// Tailwind's rem scale resolves at 0.875x. Class names lifted from the
// target are used verbatim; every value the spec states as a MEASUREMENT is
// written as an arbitrary `[Npx]` instead.
//
// NOTE — FOUR GRID CHILDREN, NOT TWO: each of the two panels exists TWICE in
// the DOM — `col-span-6 laptop:block hidden` (>=1024, desktop image) and
// `col-span-12 laptop:hidden block` (<1024, mobile image) — both stay
// mounted and are toggled purely by CSS, never conditionally rendered.
//
// NOTE — PANEL 2's DESCRIPTION IS EMPTY on the live site; the `<h4>` is
// still rendered because its empty box is load-bearing for the overlay's
// flex gap — the same rule BrandVideoHero.tsx documents for its own empty
// descriptions.
//
// NOTE — PANEL POSITIONING: there are TWO boxes here and the spec's original
// `position: static; overflow: visible` reading described the outer one.
//
//   grid child   `col-span-6 laptop:block hidden`  static, overflow visible
//   item-wrapper `group relative ... overflow-hidden`  radius 14px, clips
//
// The component below renders the inner `item-wrapper` as `group relative
// overflow-hidden rounded-2xl`, which is what the target actually measures at
// 1920. Visual QA caught this: with the clip and radius left off, the panels
// rendered with square corners against the target's rounded ones.
//
// DEVIATION — NESTED ANCHORS REMOVED: the target nests the CTA `<a>` inside
// a panel-wide `<a class="absolute inset-0 z-10">`. Nested anchors are
// invalid HTML (the parser closes the outer one), so — mirroring
// BrandVideoHero.tsx's DEVIATION note — the panel is a plain wrapper `div`
// and the CTA is the sole `<a>`, with whole-panel clickability preserved via
// a stretched `::after` on the CTA.
//
// CTA COLORS — all four measured on the live site, no guesswork.
// The target's class list carries tokens that are unregistered here
// (`bg-btn-primary` / `text-btn-primary-foreground` / `hover:bg-gradient-brand`
// / `hover:text-btn-primary-active-foreground`). They were resolved by reading
// the custom properties in THIS section's scope, which matters: the tokens are
// theme-scoped and invert inside dark sections. Measured on the #12 CTA:
//
//   resting  background-color: rgb(8, 10, 15)      -> bg-[#080A0F]
//   resting  color:            rgb(255, 255, 255)  -> text-white
//   hover    --brand-gradient-color-0:
//              linear-gradient(90deg,#00befa 0%,#00befa 100%)
//            i.e. a flat fill                       -> hover:bg-[#00BEFA]
//   hover    --btn-text-active-color: #fff          -> hover:text-white
//   transition-duration: 0s  (the colour snaps; do not animate it)
//
// For contrast, the SAME token names on BrandVideoHero (#15) resolve to
// bg #F5F6F7 / text #1E2024 because that section sits in a dark scope.
//
// NOTE — UNREGISTERED TOKEN: `link-right` is the target's own class and
// carries no measured effect in the capture (no icon, spacing or colour
// delta recorded); it is dropped and kept only in this traceability note.
//
// JUDGMENT CALL — MOBILE PANEL HEIGHT: only the @1920 desktop panel box
// (825 x 641) was measured; no sub-1024 height was captured. The mobile
// variant reuses that same 825:641 aspect ratio rather than inventing a new
// one — verify against a real device.
//
// NOTE — `rounded-btn` resolves to radius 0 on the target (see
// HeroBannerCarousel.tsx / TodaysBestDeal.tsx) and is dropped for
// `rounded-none`.

import Image from "next/image";
import { SectionHeading } from "./SectionHeading";

/** U+00B0 DEGREE SIGN — used in panel 1's description ("360° coverage"). */
const DEGREE = "°";

interface BrandPanel {
  readonly id: string;
  readonly title: string;
  /** Genuinely empty for the "Robot Vacuum" panel — see the note above. */
  readonly description: string;
  readonly ctaLabel: string;
  readonly ctaHref: string;
  /** `/images/*.png`, shown at >= 1024. */
  readonly desktopImage: string;
  /** `/images/*.png`, shown below 1024. */
  readonly mobileImage: string;
}

const PANELS: readonly BrandPanel[] = [
  {
    id: "ptz-cam",
    title: "Pan-Tilt-Zoom Cameras",
    description: `See more, secure more with 360${DEGREE} coverage`,
    ctaLabel: "Learn More",
    ctaHref: "https://www.ankernordics.com/ptz-cam",
    desktopImage: "/images/frame_241.png",
    mobileImage: "/images/frame_2589.png",
  },
  {
    id: "robot-vacuum",
    title: "Robot Vacuum",
    description: "",
    ctaLabel: "Learn More",
    ctaHref: "https://www.ankernordics.com/collections/robot-vacuum",
    desktopImage: "/images/frame_2499.png",
    mobileImage: "/images/frame_2600.png",
  },
];

interface PanelProps {
  readonly panel: BrandPanel;
  readonly image: string;
  /** Panel box sizing — differs between the two CSS-toggled variants. */
  readonly boxClassName: string;
  readonly sizes: string;
}

function Panel({ panel, image, boxClassName, sizes }: PanelProps) {
  return (
    // `rounded-2xl overflow-hidden` are MEASURED on the target's `item-wrapper`
    // (border-radius: 14px, overflow: hidden @1920). 14px is exactly `rounded-2xl`
    // under this project's 14px root, so the utility is used rather than an
    // arbitrary value. The earlier `overflow: visible` reading in the spec was
    // taken from the GRID CHILD one level up, which really is static/visible —
    // the clipping and the corner radius both live on this inner wrapper.
    <div
      className={`group relative box-border w-full overflow-hidden rounded-2xl ${boxClassName}`}
    >
      {/* Media clip wrapper — the rounding/crop lives here, not on the panel. */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={image}
          alt={panel.title}
          fill
          sizes={sizes}
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
        />
      </div>

      {/* Link overlay: h3 -> h4 -> CTA in a flex column, bottom-left anchored,
          matching BrandVideoHero's overlay structure. */}
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-end gap-[24px] p-[24px] min-[1024px]:p-[40px]">
        <div className="flex flex-col gap-1">
          <h3 className="item-title text-balance text-[24px] leading-[120%] font-bold tracking-[-0.04em] text-[#080A0F] min-[1440px]:text-[32px]">
            {panel.title}
          </h3>
          <h4 className="item-description line-clamp-1 text-balance text-[14px] font-bold tracking-[-0.04em] text-[#080A0F] min-[1440px]:text-[16px] min-[1920px]:text-[18px]">
            {panel.description}
          </h4>
        </div>

        <a
          href={panel.ctaHref}
          className="inline-flex cursor-pointer items-center justify-center rounded-none border-none bg-[#080A0F] px-5 pt-[11px] pb-[10px] text-[14px] leading-[16.8px] font-bold text-white after:absolute after:inset-0 after:content-[''] hover:bg-[#00BEFA] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none min-[1920px]:px-7 min-[1920px]:pt-[15px] min-[1920px]:pb-[14px] min-[1920px]:text-[16px] min-[1920px]:leading-[19.2px]"
        >
          {panel.ctaLabel}
        </a>
      </div>
    </div>
  );
}

export function ExploreAllBrands() {
  const headingId = "explore-all-brands-heading";

  return (
    <>
      <SectionHeading text="Explore All Brands during Sale" id={headingId} />

      {/* `ipc_container relative z-10 w-full` are the target's own shell
          classes; `ipc_container` is inert in this project and kept for
          traceability — same shell as SectionHeading / RecommendedBy. */}
      <section
        aria-labelledby={headingId}
        className="ipc_container relative z-10 w-full overflow-hidden bg-[#F5F5F7]"
      >
        {/* Site-standard gutter container. At 1920 this yields the measured
            1664px content column (2 x 832px inset). */}
        <div className="mx-auto size-full px-4 min-[768px]:px-8 min-[1024px]:px-16 min-[1440px]:px-16 min-[1920px]:max-w-full min-[1920px]:px-[calc(50%-832px)]">
          {/* Target: `laptop:gap-4 grid grid-cols-12 gap-3 w-full`. Computed
              @1920: 12 columns x 125.828px, gap 14px. */}
          <div className="grid w-full grid-cols-12 gap-3 min-[1024px]:gap-4">
            {/* DESKTOP variants — target `col-span-6 laptop:block hidden`.
                Height 641px is MEASURED @1920 (panel box 825 x 641). */}
            {PANELS.map((panel) => (
              <div
                key={`${panel.id}-desktop`}
                className="col-span-6 hidden min-[1024px]:block"
              >
                <Panel
                  panel={panel}
                  image={panel.desktopImage}
                  boxClassName="h-[641px]"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
            ))}

            {/* MOBILE variants — target `col-span-12 laptop:hidden block`.
                Height unmeasured below 1024 — see the MOBILE PANEL HEIGHT
                judgment call above. */}
            {PANELS.map((panel) => (
              <div
                key={`${panel.id}-mobile`}
                className="col-span-12 block min-[1024px]:hidden"
              >
                <Panel
                  panel={panel}
                  image={panel.mobileImage}
                  boxClassName="aspect-[825/641]"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
