// Shared section heading — topology #9 (What's New), #14 (Anker), #20 (eufy),
// #26 (soundcore). Sections #7 and #12 use the same treatment but are already
// built inline and are deliberately NOT retrofitted here.
//
// Spec:  docs/research/components/brand-blocks.spec.md
// Raw:   docs/research/www.ankernordics.com/raw/sections-9-30.json  (s9/s14/s20/s26)
//
// NOTE — BREAKPOINT SUBSTITUTION: the target uses named Tailwind tiers that are
// NOT registered in this project's globals.css: tablet:(768) laptop:(1024)
// desktop:(1440) lg-desktop:(1920). They are written here as Tailwind v4
// arbitrary variants with the same pixel values: min-[768px]:, min-[1024px]:,
// min-[1440px]:, min-[1920px]:. Swap them for the named tiers once the
// breakpoints are registered.
//
// NOTE — 14px ROOT: globals.css sets `html { font-size: 14px }`, so Tailwind's
// rem scale resolves at 0.875x. Class names lifted from the target are used
// verbatim (they already resolve correctly); every value the spec states as a
// MEASUREMENT is written as an arbitrary `[Npx]` instead.
//
// NOTE — APOSTROPHE: "What's New" uses the ASCII apostrophe U+0027, NOT the
// curly U+2019. The spec prose claims U+2019, but the raw capture disagrees and
// raw wins: sections-9-30.json byte-dumps as `57 68 61 74 27 73` (`What's`),
// while the same capture pipeline preserves genuine U+2019 elsewhere
// (topbars.json "Don’t Miss Out", section-content.json "Father’s Day"), so the
// ASCII form here is the site's, not a normalisation artefact. It is written as
// `&apos;` so the distinction stays visible in review.

export interface SectionHeadingProps {
  /** Heading copy, verbatim from the target. */
  readonly text: string;
  /** Optional DOM id so page assembly can wire up `aria-labelledby`. */
  readonly id?: string;
}

export function SectionHeading({ text, id }: SectionHeadingProps) {
  return (
    // `ipc_container relative z-10 w-full` are the target's own shell classes;
    // `ipc_container` is inert in this project and kept for traceability.
    <section className="ipc_container relative z-10 w-full overflow-hidden bg-[#F5F5F7]">
      {/* Site-standard gutter container. At 1920 this yields the measured
          1664px content column (2 x 832px inset). `laptop:px-16` and
          `desktop:px-16` are the same value on the target and both reproduced
          for traceability.

          MEASURED: the section is 69px tall and the h2 box is exactly 48px with
          zero padding of its own, so the remaining 21px sits on this wrapper.
          The capture did not record whether the target splits it top/bottom —
          it is applied as bottom padding, which is how the heading reads
          against the content block that follows it.
          TODO: 21px top/bottom split unverified. */}
      <div className="mx-auto size-full px-4 pb-[21px] min-[768px]:px-8 min-[1024px]:px-16 min-[1440px]:px-16 min-[1920px]:max-w-full min-[1920px]:px-[calc(50%-832px)]">
        {/* Target class list, verbatim apart from the breakpoint substitution:
            text-balance tracking-[-0.04em] desktop:text-[40px]
            lg-desktop:text-[48px] text-[32px] leading-[100%] font-bold
            text-[#080A0F]. Measured @1920: 48px / 700 / 48px / -1.92px. */}
        <h2
          id={id}
          className="text-[32px] leading-[100%] font-bold text-balance tracking-[-0.04em] text-[#080A0F] min-[1440px]:text-[40px] min-[1920px]:text-[48px]"
        >
          {text}
        </h2>
      </div>
    </section>
  );
}

/**
 * The four homepage instances, in topology order. Brand names are lowercase
 * exactly as the target renders them (`eufy`, `soundcore`) — do not title-case.
 */
export const SECTION_HEADINGS = {
  /** Topology #9 — ASCII apostrophe, see the note above. */
  whatsNew: "What's New",
  /** Topology #14 */
  anker: "Anker",
  /** Topology #20 */
  eufy: "eufy",
  /** Topology #26 */
  soundcore: "soundcore",
} as const satisfies Record<string, string>;
