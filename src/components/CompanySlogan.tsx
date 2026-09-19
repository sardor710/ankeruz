// Section #2 — "CompanySlogan". Spec: docs/research/components/slogan-and-categories.spec.md
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
// class names land on the measured pixels (gap-3 -> 10.5px, px-16 -> 56px,
// px-8 -> 28px, px-4 -> 14px). Spacing utilities lifted from the target are
// therefore used VERBATIM and must not be converted to arbitrary px values.
//
// NOTE — THE TICKER DOES NOT TICK: the inner `flex-col transition-transform
// duration-500` wrapper is a vertical-carousel track on the live site, but at
// desktop it holds exactly one child row and its transform never leaves
// matrix(1,0,0,1,0,0) (probed at rest and after scrolling into view). The
// wrapper and its `overflow-hidden` + `min-[768px]:h-[40px]` viewport are kept
// so the structure matches, but rotation is deliberately NOT implemented and no
// state is introduced. This stays a server component.

import { Fragment } from "react";

/** One statistic in the (non-rotating) feature row. */
type SloganStat = {
  readonly id: string;
  /** Verbatim from the live DOM, including the `+` and the thousands comma. */
  readonly text: string;
};

const STATS: readonly SloganStat[] = [
  { id: "countries", text: "146+ Countries and Regions" },
  { id: "consumers", text: "200M+ Global Consumers" },
  { id: "employees", text: "5,000+ Worldwide Employees" },
];

/**
 * The page's real <h1>. A second, visually-hidden <h1> elsewhere carries the SEO
 * title — that one is not this component's concern.
 * Measured: 30px / 700 / 33px line-height / -1.2px tracking / #080A0F, 675px wide @1440.
 */
const SLOGAN_TITLE =
  "A Global Smart Hardware Technology Company Driven by Ultimate Innovation";

export function CompanySlogan() {
  return (
    // Site-standard gutter container. `laptop:px-16` and `desktop:px-16` are the
    // same value on the target and are both reproduced for traceability.
    <div className="ipc_container relative z-10 w-full">
      <div className="mx-auto size-full px-4 min-[768px]:px-8 min-[1024px]:px-16 min-[1440px]:px-16 min-[1920px]:max-w-full min-[1920px]:px-[calc(50%-832px)]">
        {/* The target's `slogan-container` class is site CSS that could not be
            captured; only its laptop+ overrides were observable. Below laptop the
            two blocks stack — the column gap is an estimate, not a measurement.
            TODO: verify the sub-1024px stacked gap. */}
        <div className="flex w-full flex-col gap-6 min-[1024px]:flex-row min-[1024px]:items-end min-[1024px]:justify-between">
          {/* `slogan-title` is site CSS carrying the type ramp; reconstructed from
              the measured values. The max-width is the measured 675px content box
              @1440 — without it the h1 would flex to the full ~811px of free track
              and wrap differently. */}
          <h1 className="text-left text-[30px] leading-[33px] font-bold text-balance tracking-[-0.04em] text-ink min-[1024px]:max-w-[675px]">
            {SLOGAN_TITLE}
          </h1>

          {/* Carousel viewport — see the "ticker does not tick" note above. */}
          <div className="relative w-full max-w-[500px] overflow-hidden min-[768px]:h-[40px]">
            {/* Carousel track. Static: exactly one child row, no transform. */}
            <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]">
              <div className="flex w-full flex-row items-stretch gap-3 overflow-hidden min-[768px]:h-[40px] min-[1024px]:justify-end">
                {STATS.map((stat, index) => (
                  <Fragment key={stat.id}>
                    {index > 0 ? (
                      // 1px hairline, full row height. #E4E5E6 is a literal on the
                      // target and is deliberately NOT the theme's --rule (#EAEAEC).
                      <div
                        aria-hidden="true"
                        className="slogan-feature-divider w-px self-stretch bg-[#E4E5E6]"
                      />
                    ) : null}
                    <p className="text-[14px] leading-[19.6px] font-bold tracking-[-0.02em] text-ink">
                      {stat.text}
                    </p>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
