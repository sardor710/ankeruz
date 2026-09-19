"use client";

// NOTE — BREAKPOINT SUBSTITUTION: the target site uses named Tailwind tiers that
// are not registered in this project's globals.css: laptop:(1024) desktop:(1440)
// lg-desktop:(1920). They are expressed here as Tailwind v4 arbitrary variants
// with the same pixel values: min-[1024px]:, min-[1440px]:, min-[1920px]:.
// Swap them for the named tiers once the breakpoints are registered.
//
// NOTE — 14px ROOT: globals.css now sets `html { font-size: 14px }` to match the
// target, so Tailwind's whole rem scale resolves at 0.875x and the site's own
// class names land on the measured pixels (px-5 -> 17.5px, px-7 -> 24.5px).
// Spacing utilities are therefore used verbatim. Two consequences to keep in
// mind when editing this file:
//   * `leading-tight` is the ONE class that still disagrees. Tailwind v4 defines
//     --leading-tight: 1.25 (node_modules/tailwindcss/theme.css) => 17.5px at the
//     button's 14px font, but the site measures 16.8px (= 1.2). globals.css does
//     not override the token, so measurement wins: `leading-[16.8px]`. That also
//     keeps the button at its measured 11 + 16.8 + 10 = 37.8 ~ 38px height.
//   * Utilities carrying a MEASURED pixel value are pinned as arbitrary values
//     rather than scale steps, because the 0.875x scale no longer hits them:
//     the 64px content inset is `pl-[64px]` (pl-16 would now be 56px) and the
//     40px pagination offset is `bottom-[40px]` (bottom-10 would now be 35px).
// `rounded-btn` resolves to radius 0 on the site and is dropped for `rounded-none`.
//
// VERBATIM CONTENT WARNING: slides 1 and 2 read "Al" with a capital A and a
// LOWERCASE L (U+006C), not "AI". This is the live site's own typo and is
// reproduced deliberately. Do not "correct" it. Slide 3 uses U+00D7 (x), slide 4
// keeps a trailing space before its line break, and slides 1/4 use U+2019 (').

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

/** Auto-advance interval. NOT measured on the live site — tune during QA. */
const AUTOPLAY_MS = 5000;

/** Appended to every hero CTA href by the live site. */
const HERO_REF = "?ref=image_hero_banner";

type SlideTheme = "light" | "dark";

type HeroButton = {
  readonly label: string;
  readonly href: string;
  /** "primary" = filled, "secondary" = inset-outline ghost. */
  readonly variant: "primary" | "secondary";
};

/**
 * Local shape rather than the shared `HeroSlide` in `@/types`: the hero needs a
 * multi-line headline and up to two differently-styled CTAs, neither of which
 * the shared single-`ctaLabel`/flat-`headline` interface can express.
 */
type HeroBannerSlide = {
  readonly id: string;
  readonly eyebrow: string;
  /** One entry per rendered line; joined with a real <br /> at render time. */
  readonly headlineLines: readonly string[];
  readonly image: string;
  readonly theme: SlideTheme;
  readonly buttons: readonly HeroButton[];
};

const SLIDES: readonly HeroBannerSlide[] = [
  {
    id: "liberty-5-pro-series",
    eyebrow: "Liberty 5 Pro Series",
    // "Al Note-Taker" — capital A + lowercase L. Verbatim from the live DOM.
    headlineLines: ["The World’s First Smart Screen", "Earbuds with Al Note-Taker."],
    image: "/images/group_2147239065_1.png",
    theme: "light",
    buttons: [
      { label: "Learn More", href: "/liberty-5-pro-series", variant: "secondary" },
      { label: "Liberty 5 Pro Series", href: "/products/d1204", variant: "primary" },
    ],
  },
  {
    id: "eufy-lawn-mower-c15",
    eyebrow: "eufy Lawn Mower C15",
    // "Al Vision" — capital A + lowercase L. Verbatim from the live DOM.
    headlineLines: ["No Wire, No Hassle.", "Just eufy Al Vision."],
    image: "/images/c15-kvx2-en-pc-1.jpg",
    theme: "light",
    buttons: [
      { label: "Learn More", href: "/eufy-c15-robot-lawn-mower", variant: "secondary" },
      { label: "Buy Now", href: "/products/t280b3a2", variant: "primary" },
    ],
  },
  {
    id: "eufy-robot-vacuum-omni-s2",
    eyebrow: "eufy Robot Vacuum Omni S2",
    // U+00D7 multiplication sign, not the letter x.
    headlineLines: ["15× Longer-Lasting Suction", "Day-One Deep Cleaning, All Year Long"],
    image: "/images/pc_1.png",
    theme: "light",
    buttons: [
      { label: "Learn More", href: "/robot-vacuum-s2", variant: "secondary" },
      { label: "Buy Now", href: "/products/t2081g11", variant: "primary" },
    ],
  },
  {
    id: "anker-nano-45w-smart-display-charger",
    eyebrow: "Anker Nano 45W Smart Display Charger",
    // Trailing space after "Display," is intentional — it precedes the <br> on the live site.
    headlineLines: ["The World’s First Smart Display, ", "Charger That Knows Your iPhone."],
    image: "/images/a121d_final.png",
    theme: "dark",
    buttons: [
      { label: "Learn More", href: "/a121d", variant: "secondary" },
      {
        label: "Buy Now",
        href: "/products/anker-nano-45w-smart-display-charger",
        variant: "primary",
      },
    ],
  },
  {
    id: "tomorrowland",
    eyebrow: "Jul. 17-19/24-26 2026",
    headlineLines: ["Ultimate Connection"],
    image: "/images/20260629-144002.jpg",
    theme: "light",
    // Only button on this slide, and it carries the PRIMARY style.
    buttons: [{ label: "Learn More", href: "/tomorrowland", variant: "primary" }],
  },
];

/**
 * One static class per slide index so the track transform never becomes an
 * inline style (and so Tailwind's scanner sees complete class names).
 */
const TRACK_TRANSFORMS = [
  "translate-x-0",
  "-translate-x-[100%]",
  "-translate-x-[200%]",
  "-translate-x-[300%]",
  "-translate-x-[400%]",
];

/**
 * Verbatim shared button classes from the live site, for traceability:
 *   rounded-btn inline-flex cursor-pointer items-center justify-center font-bold
 *   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
 *   disabled:pointer-events-none border-solid
 *   px-5 pb-[10px] pt-[11px] text-[14px] leading-tight
 *   lg-desktop:px-7 lg-desktop:pb-[14px] lg-desktop:pt-[15px] lg-desktop:text-[16px]
 * Measured result @1440: 38px tall, padding 11px 17.5px 10px, radius 0px.
 * With the 14px root in globals.css these resolve exactly: px-5 = 1.25rem =
 * 17.5px, px-7 = 1.75rem = 24.5px. Only `leading-tight` is substituted — see the
 * file header for why 16.8px is used instead.
 */
const BUTTON_BASE = cn(
  "inline-flex cursor-pointer items-center justify-center font-bold",
  "rounded-none border-0 border-solid",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  "disabled:pointer-events-none",
  "px-5 pt-[11px] pb-[10px] text-[14px] leading-[16.8px]",
  "min-[1920px]:px-7 min-[1920px]:pt-[15px] min-[1920px]:pb-[14px] min-[1920px]:text-[16px]",
  // TODO: hover values unverified — the site has hover classes but they were not captured.
  "transition-colors"
);

/**
 * The visible edge on "Learn More" is an inset OUTLINE, not a border: the site's
 * computed `border-width` is genuinely 0px. Using a border instead would shift
 * layout by 1.6px per side. Explicit `length:` / `color:` hints keep
 * tailwind-merge from collapsing the width and colour utilities together.
 */
const SECONDARY_BASE = "bg-transparent outline outline-[length:1.6px] outline-offset-[-1.6px]";

const THEME = {
  light: {
    text: "text-[#F5F6F7]",
    secondary: "text-[#F5F6F7] outline-[color:#F5F6F7]",
    primary: "bg-[#F5F6F7] text-[rgb(30,32,36)]",
    control: "text-[#F5F6F7]",
    bullet: "bg-[#F5F6F7]",
  },
  dark: {
    text: "text-[#080A0F]",
    secondary: "text-[#080A0F] outline-[color:#080A0F]",
    primary: "bg-[#080A0F] text-[#FFFFFF]",
    control: "text-[#080A0F]",
    bullet: "bg-[#080A0F]",
  },
} as const satisfies Record<SlideTheme, Record<string, string>>;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionOnServer() {
  return false;
}

type ChevronProps = {
  readonly className?: string;
};

function ChevronLeftIcon({ className }: ChevronProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: ChevronProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function HeroBannerCarousel() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getReducedMotionOnServer
  );

  useEffect(() => {
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [reducedMotion, index]);

  const activeTheme = THEME[SLIDES[index].theme];

  const goTo = (next: number) => setIndex((next + SLIDES.length) % SLIDES.length);

  return (
    <div
      className={cn(
        "banner-mod-container relative w-full overflow-hidden",
        // Measured hero heights: 600px @1296/laptop, 632px @1440, 793px @1920.
        // TODO: mobile tier unverified — the browser could not be driven below
        // 768px, so the base value simply repeats the laptop measurement.
        "h-[600px] min-[1440px]:h-[632px] min-[1920px]:h-[793px]"
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured products"
    >
      <div
        className={cn(
          "flex h-full transition-transform duration-700 ease-in-out motion-reduce:transition-none",
          TRACK_TRANSFORMS[index]
        )}
      >
        {SLIDES.map((slide, slideIndex) => {
          const isActive = slideIndex === index;
          const theme = THEME[slide.theme];

          return (
            <div
              key={slide.id}
              className="relative h-full w-full shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${slideIndex + 1} of ${SLIDES.length}`}
              aria-hidden={!isActive}
            >
              {/* Exactly one image per slide. Award badges, the "FREE €44.99"
                  gift tag and the feature pills are baked into the artwork. */}
              <Image
                src={slide.image}
                alt={slide.eyebrow}
                fill
                sizes="100vw"
                // Next.js 16 deprecates `priority` in favour of `preload`.
                preload={slideIndex === 0}
                className="object-cover"
              />

              <div className="absolute inset-0 flex flex-col justify-end pl-[64px] pb-[57px]">
                {/* Measured 64px inset — pinned as an arbitrary value because at
                    the 14px root `pl-16` is 56px, not 64px.
                    Bottom-anchored: the block's top sits ~238px above the slide
                    bottom (y≈394 of 632). 57px = 238 − 181px block height
                    (21 eyebrow + 14 mt-4 + 80 headline + 28 mt-8 + 38 button).
                    Re-derive this if the mt-4/mt-8 gaps below change — only the
                    394 anchor is measured; the internal gaps are estimates. */}
                <div
                  className={cn(
                    "hero-banner-wrap-text",
                    "min-[1024px]:max-w-[440px] min-[1440px]:max-w-[648px] min-[1920px]:max-w-[824px]"
                  )}
                >
                  <p
                    className={cn(
                      "text-[14px] leading-[21px] font-bold tracking-[-0.02em]",
                      theme.text
                    )}
                  >
                    {slide.eyebrow}
                  </p>

                  <h2
                    className={cn(
                      "mt-4 font-bold text-balance tracking-[-0.04em] leading-none",
                      // 30px base taken from the 30px/700 heading in the section
                      // directly below the hero, which sits on the same
                      // tracking-[-0.04em] ramp: 30 -> 40 @1440 -> 48 @1920.
                      // TODO: still unverified at mobile — the browser could not
                      // be driven below 768px.
                      "text-[30px] min-[1440px]:text-[40px] min-[1920px]:text-[48px]",
                      theme.text
                    )}
                  >
                    {slide.headlineLines.map((line, lineIndex) => (
                      <span key={line}>
                        {lineIndex > 0 ? <br /> : null}
                        {line}
                      </span>
                    ))}
                  </h2>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {slide.buttons.map((button) => (
                      <a
                        key={button.href}
                        href={`${button.href}${HERO_REF}`}
                        tabIndex={isActive ? undefined : -1}
                        className={cn(
                          BUTTON_BASE,
                          button.variant === "primary"
                            ? theme.primary
                            : cn(SECONDARY_BASE, theme.secondary)
                        )}
                      >
                        {button.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* TODO: arrow hit-area and chevron dimensions were not measured. */}
      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Previous slide"
        className={cn(
          "absolute top-1/2 left-4 z-10 flex -translate-y-1/2 cursor-pointer items-center justify-center p-2",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "transition-colors",
          activeTheme.control
        )}
      >
        <ChevronLeftIcon className="size-8" />
      </button>

      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Next slide"
        className={cn(
          "absolute top-1/2 right-4 z-10 flex -translate-y-1/2 cursor-pointer items-center justify-center p-2",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "transition-colors",
          activeTheme.control
        )}
      >
        <ChevronRightIcon className="size-8" />
      </button>

      {/* TODO: bullet width/height/gap were not measured — active renders as a
          short pill, inactive as small dots, per the screenshots. */}
      {/* Measured 40px offset — pinned as an arbitrary value because at the 14px
          root `bottom-10` is 35px, not 40px. */}
      <div className="absolute bottom-[40px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 bg-transparent">
        {SLIDES.map((slide, slideIndex) => {
          const isActive = slideIndex === index;

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(slideIndex)}
              aria-label={`Go to slide ${slideIndex + 1}`}
              aria-current={isActive}
              className={cn(
                "h-2 cursor-pointer rounded-full transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                isActive ? "w-6 opacity-100" : "w-2 opacity-50",
                activeTheme.bullet
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
