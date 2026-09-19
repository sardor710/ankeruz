// Full-width brand video panel — topology #15 (Anker), #21 (eufy),
// #27 (soundcore). One parameterised component, three instances.
//
// Spec:  docs/research/components/brand-blocks.spec.md
// Raw:   docs/research/www.ankernordics.com/raw/brand-video-heroes.json
//        docs/research/www.ankernordics.com/raw/sec-15-videohero.json
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
// verbatim — `gap-3` (10.5px), `gap-4` (14px) and the overlay's `gap-1`
// (measured 3.5px) are the target's own and already resolve correctly. Every
// value the spec states as a MEASUREMENT is written as an arbitrary `[Npx]`.
//
// NOTE — BOTH VARIANTS STAY IN THE DOM. The desktop and mobile panels are
// toggled purely by CSS (`min-[1024px]:block hidden` / `min-[1024px]:hidden
// block`), never conditionally rendered and never gated on a window-width hook.
// This is a server component: video autoplay needs no JavaScript.
//
// DEVIATION — NESTED ANCHORS REMOVED. The target wraps each panel in
// `<a href="/se" class="absolute inset-0 z-10">` and nests the "Learn More"
// `<a>` *inside* it. Nested anchors are invalid HTML: the parser closes the
// outer anchor, so the markup the browser builds is not the markup the site
// shipped, and assistive tech announces it inconsistently. This is a
// correctness fix, not a style preference. The panel is a plain wrapper `div`
// and the CTA is the sole `<a>`; whole-panel clickability is preserved with the
// standard stretched-link pattern (an `::after` on the CTA covering the panel).
// Consequence to be aware of: a click anywhere on the panel now resolves to the
// CTA's brand href rather than the target's `/se`.
//
// DEVIATION — VIDEO ELEMENT COUNT. sec-15-videohero.json records FOUR `<video>`
// elements: each `item-wrapper` holds a `tablet:block hidden` / `tablet:hidden
// block` pair, and the two wrappers are themselves toggled at `laptop`. That is
// four downloads for one visible frame. This component renders the two-variant
// model the spec describes — one video per wrapper, toggled at 1024 — which is
// visually identical and halves the network cost.
//
// NOTE — UNREGISTERED TOKENS: `ipc_container`, `multiLayoutGraphicBlock`,
// `item-wrapper`, `item-title`, `item-description` and `rounded-btn` are the
// target's own class names and are inert in this project; they are kept for
// traceability with their computed values written alongside. The target's
// `text-info-primary` is likewise undefined here — the measured overlay colour
// #F5F6F7 is applied directly to the title and description instead.

import { Fragment } from "react";

// APOSTROPHE U+0027 (plain ASCII), written with an explicit \u escape so it can
// never be confused with — or silently normalised into — the curly U+2019. See
// the note on BRAND_VIDEO_HEROES for why ASCII is the correct character here.
const APOS = "\u0027";

export interface BrandVideoHeroProps {
  /** Stable key / DOM id fragment for this instance. */
  readonly id: string;
  /**
   * Title, one entry per rendered line. The target's #27 title contains a real
   * `<br>`; modelling the title as lines keeps markup out of the string and
   * lets it render as a JSX `<br />` rather than escaped text.
   */
  readonly titleLines: readonly string[];
  /**
   * Description. Empty string for #21 and #27 — the target still renders the
   * `<h4>`, and the empty box is load-bearing: the overlay's 3.5px flex gap is
   * counted in the measured overlay heights (69 / 42 / 80px). Do not make this
   * optional and do not skip the element.
   */
  readonly description: string;
  readonly ctaLabel: string;
  readonly ctaHref: string;
  /** `/videos/*.mp4`, shown at >= 1024. */
  readonly desktopVideoSrc: string;
  /** `/videos/*.mp4`, shown below 1024. */
  readonly mobileVideoSrc: string;
}

/**
 * The three homepage instances, in topology order, for page assembly to map
 * over. Brand names are lowercase exactly as the target renders them.
 *
 * APOSTROPHE: "The world's No. 1 mobile charging brand" uses the ASCII
 * apostrophe U+0027, NOT the curly U+2019. The spec prose claims U+2019, but
 * the raw capture disagrees and raw wins: brand-video-heroes.json and
 * section-content.json both byte-dump as `77 6f 72 6c 64 27 73` (`world's`),
 * while the same capture pipeline preserves genuine U+2019 elsewhere
 * (topbars.json "Don’t Miss Out", section-content.json "Father’s
 * Day"). The ASCII form here is the site's, not a normalisation artefact. It is
 * factored into the APOS constant below with an explicit \u escape rather than
 * typed inline, so the distinction survives review and any editor that likes to
 * "smarten" quotes.
 */
export const BRAND_VIDEO_HEROES: readonly BrandVideoHeroProps[] = [
  {
    // Topology #15
    id: "anker",
    titleLines: ["Live Charged."],
    description: `The world${APOS}s No. 1 mobile charging brand`,
    ctaLabel: "Learn More",
    ctaHref: "/anker",
    desktopVideoSrc: "/videos/76eee370bf62410ca08c839be6382529.mp4",
    mobileVideoSrc: "/videos/2c94c918738f49fa839decfef3e362e0.mp4",
  },
  {
    // Topology #21. The SAME file is used for both variants on the target —
    // that is correct, not a copy/paste error. Do not "fix" it.
    id: "eufy",
    titleLines: ["Built with Care"],
    description: "",
    ctaLabel: "Learn More",
    ctaHref: "/eufy",
    desktopVideoSrc: "/videos/50cb951712394439be9c0ca204705deb.mp4",
    mobileVideoSrc: "/videos/50cb951712394439be9c0ca204705deb.mp4",
  },
  {
    // Topology #27. Two lines, split on the target's real `<br>`.
    id: "soundcore",
    titleLines: ["Top 3 Global", "Wireless Headphone Brand"],
    description: "",
    ctaLabel: "Learn More",
    ctaHref: "/soundcore",
    desktopVideoSrc: "/videos/9beb9a270b504370bac18d35c53880ed.mp4",
    mobileVideoSrc: "/videos/75ecf2b4c40b49fd83bd83478f0fd2e5.mp4",
  },
];

interface BrandVideoPanelProps extends BrandVideoHeroProps {
  readonly videoSrc: string;
  /** Panel box sizing — differs between the two CSS-toggled variants. */
  readonly boxClassName: string;
}

function BrandVideoPanel({
  titleLines,
  description,
  ctaLabel,
  ctaHref,
  videoSrc,
  boxClassName,
}: BrandVideoPanelProps) {
  return (
    // Target: `item-wrapper cursor-pointer group relative box-border w-full
    // overflow-hidden`. Laid out as a flex column so the content block can be a
    // static flex item: `z-10` still creates a stacking context on a flex item,
    // which keeps the panel itself the nearest positioned ancestor and lets the
    // CTA's stretched `::after` cover the whole panel rather than just the
    // content box.
    <div
      className={`item-wrapper group relative box-border flex w-full cursor-pointer flex-col justify-end overflow-hidden ${boxClassName}`}
    >
      {/* Target video classes are `size-full overflow-hidden object-cover`;
          `absolute inset-0` is added here so the content block can sit in flow
          on top of it. Attributes match the target exactly — autoplay, loop,
          muted, no poster — plus `playsInline` so iOS does not go fullscreen.
          The capture reported `paused: true` for every video because the
          section was off-screen; that is the browser deferring autoplay until
          visible, native behaviour, nothing to reproduce.
          The video is decorative background: `aria-hidden` keeps it out of the
          accessibility tree, and there is no audio track to caption.
          TODO: hover delta unverified — `item-wrapper` carries `cursor-pointer
          group` on the target so SOMETHING responds to `group-hover:`, but the
          capture never recorded what. The 1.02 scale below (and the CTA's
          background lift) are restrained placeholders, gated behind
          `motion-safe:`. Replace once the real delta is measured.
          TODO (a11y): WCAG 2.2.2 wants a pause control for motion that runs
          longer than 5s. The target ships none, and adding one would make this
          a client component; flagged rather than silently deviated. */}
      <video
        className="absolute inset-0 size-full overflow-hidden object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.02]"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* TODO: overlay inset, padding and the title-to-CTA gap were NOT
          captured — only the overlay's own box (333/216/411 wide,
          69/42/80 tall) and its 3.5px internal gap. The bottom-left placement
          and the paddings below are a judgement call and need a visual check
          against the reference screenshots. */}
      <div className="z-10 flex flex-col items-start gap-[24px] p-[24px] min-[1024px]:p-[40px]">
        {/* Target: `flex flex-col gap-1` — measured gap 3.5px, which `gap-1`
            resolves to at this 14px root. */}
        <div className="flex flex-col gap-1">
          {/* Target: `text-balance tracking-[-0.04em] desktop:text-[32px]
              text-[24px] leading-[120%] font-bold item-title`.
              Measured @1920: 32px / 700 / 38.4px / -1.28px / #F5F6F7. */}
          {/* No DOM id here: both variants stay in the DOM, so an id would be
              duplicated. The section is labelled with `aria-label` instead. */}
          <h3
            className="item-title text-[24px] leading-[120%] font-bold text-balance tracking-[-0.04em] text-[#F5F6F7] min-[1440px]:text-[32px]"
          >
            {titleLines.map((line, index) => (
              <Fragment key={`${index}-${line}`}>
                {index > 0 ? <br /> : null}
                {line}
              </Fragment>
            ))}
          </h3>

          {/* Target: `text-balance tracking-[-0.04em] font-bold
              item-description desktop:text-[16px] lg-desktop:text-[18px]
              line-clamp-1 text-[14px]`.
              Measured @1920: 18px / 700 / 27px / -0.72px / #F5F6F7.
              Rendered even when empty — see the `description` prop doc. */}
          <h4 className="item-description line-clamp-1 text-[14px] font-bold text-balance tracking-[-0.04em] text-[#F5F6F7] min-[1440px]:text-[16px] min-[1920px]:text-[18px]">
            {description}
          </h4>
        </div>

        {/* Measured: 141 x 48, bg #F5F6F7, text #1E2024, 16px / 700 / 19.2px,
            radius 0 (`rounded-btn`), padding 15px 24.5px 14px — which is
            exactly what reproduces both measured dimensions.
            `after:*` is the stretched link replacing the target's invalid
            panel-wrapping anchor; see the DEVIATION note at the top.
            The target's own `focus-visible:ring-2` carries no ring colour and
            would land on `currentColor`; an explicit light outline is used so
            focus stays visible against the video. */}
        <a
          href={ctaHref}
          className="inline-flex cursor-pointer items-center justify-center rounded-none bg-[#F5F6F7] pt-[15px] pr-[24.5px] pb-[14px] pl-[24.5px] text-[16px] leading-[19.2px] font-bold text-[#1E2024] after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F6F7] motion-safe:transition-colors motion-safe:duration-200 hover:bg-[#FFFFFF]"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}

export function BrandVideoHero(props: BrandVideoHeroProps) {
  const { desktopVideoSrc, mobileVideoSrc } = props;

  return (
    // Target shell: `div.overflow-hidden.ipc_container.relative.z-10.w-full`.
    <div className="ipc_container relative z-10 w-full overflow-hidden">
      {/* Site-standard gutter container. At 1920 this yields the measured
          1664px content column (2 x 832px inset). `laptop:px-16` and
          `desktop:px-16` are the same value on the target and both reproduced
          for traceability. */}
      <div className="mx-auto size-full px-4 min-[768px]:px-8 min-[1024px]:px-16 min-[1440px]:px-16 min-[1920px]:max-w-full min-[1920px]:px-[calc(50%-832px)]">
        <section
          className="multiLayoutGraphicBlock"
          aria-label={props.titleLines.join(" ")}
        >
          {/* Target: `laptop:gap-4 grid grid-cols-12 gap-3 w-full`. Both gaps
              are the target's own class names, so they are ported verbatim. */}
          <div className="grid w-full grid-cols-12 gap-3 min-[1024px]:gap-4">
            {/* DESKTOP variant — target `col-span-12 laptop:block hidden`.
                Height 640px is MEASURED @1920 (video box 1664 x 640,
                object-fit: cover). The panel's `tablet:aspect-w-[704]
                tablet:aspect-h-[400]` classes belong to a plugin that is not
                installed on the target either — they compute to nothing there
                (they would have forced 945px, not the measured 640px), so they
                are not reproduced on this variant. */}
            <div className="col-span-12 hidden min-[1024px]:block">
              <BrandVideoPanel
                {...props}
                videoSrc={desktopVideoSrc}
                boxClassName="h-[640px]"
              />
            </div>

            {/* MOBILE variant — target `col-span-12 laptop:hidden block`.
                TODO: this tier was never measured — the browser could not be
                driven below 768px and the 768-1023 band was not captured
                either. The 704:400 ratio is taken from the target's own
                `aspect-w-[704] / aspect-h-[400]` declaration on the wrapper and
                carried down to the base tier; verify against a real device. */}
            <div className="col-span-12 block min-[1024px]:hidden">
              <BrandVideoPanel
                {...props}
                videoSrc={mobileVideoSrc}
                boxClassName="aspect-[704/400]"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
