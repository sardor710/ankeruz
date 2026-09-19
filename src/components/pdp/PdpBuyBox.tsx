"use client";

// Topology #1 (right column) on the d1204 (Liberty 5 Pro Max) PDP.
// Spec: docs/research/components/pdp-core.spec.md, section "2. PdpBuyBox"
// Grid contract: docs/research/components/pdp-product-hero.spec.md
//
// BREAKPOINTS ARE INVERTED here vs. the rest of this repo — `md:` on the
// target means `@media (max-width: 767px)` (mobile only), so it is written
// as `max-[767px]:` below, and `lg:` (the 769-1024 tablet band) would be
// `min-[769px]:max-[1024px]:`. See the spec's "BREAKPOINTS ARE INVERTED"
// section before touching any class here.
//
// SCOPE: this is section #1 of the buy box's 13 DOM children — 0 title,
// 1 rating, 2 description + View More, 3 colour selector, 4 price,
// 5 installment accordion, 7 Choice cards, 9 Order Support, 11 Payment
// Methods. Children 6, 8, 10 and 12 are omitted: 6 and 10 measure 0px at
// 1920 (empty), 8 is the mobile-only duplicate description (`hidden
// md:block`, i.e. hidden at desktop) already covered by child 2's desktop
// copy, and 12 was never captured by the research pass ("not captured —
// re-read" in the spec). Do not fabricate content for any of them.
//
// SCOPE GUARD: no cart, no checkout, no fetch, no analytics. The
// installment accordion is presentational — its toggle button renders but
// carries no open/close state or content to reveal.

import { useState, type SVGProps } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "../icons";

/**
 * Colour swatch key. Exported so a parent page can eventually lift this
 * state to drive the product gallery's colourway (slides 0-12 Black,
 * 13-23 Gold per pdp-product-hero.spec.md) — out of scope for this
 * component, which only owns its own local selection.
 */
export type BuyBoxColorKey = "black" | "gold";

// Explicit \u escapes for every non-ASCII code point that appears in the
// target's real copy, so an editor's "normalize whitespace/punctuation"
// pass can't silently rewrite them. See spec gotchas 1-4.
const FULLWIDTH_VBAR = "｜"; // U+FF5C FULLWIDTH VERTICAL LINE (h1 + Choice card 1 title)
const EM_DASH = "—"; // U+2014 EM DASH
const LDQUO = "“"; // U+201C LEFT DOUBLE QUOTATION MARK
const RDQUO = "”"; // U+201D RIGHT DOUBLE QUOTATION MARK
const TRADEMARK = "™"; // U+2122 TRADE MARK SIGN
const NBSP = " "; // U+00A0 NO-BREAK SPACE (price thousands/currency separator)

// The fullwidth vertical line here matches the <h1> and the breadcrumb's
// trailing crumb; Choice card 2's title below uses the ASCII `|` instead —
// both are genuine target data (spec gotcha 1).
const TITLE = `Liberty 5 Pro Max${FULLWIDTH_VBAR}AI Recording Earbuds with Smart Case`;

const PRICE = `2${NBSP}690${NBSP}kr`;

type ColorOption = {
  readonly key: BuyBoxColorKey;
  /** Also doubles as the rendered label after the CSS-driven capitalisation — see below. */
  readonly label: string;
  readonly image: string;
};

const COLOR_OPTIONS: readonly ColorOption[] = [
  { key: "black", label: "Black", image: "/images/1204_black.png" },
  { key: "gold", label: "Gold", image: "/images/1204_gold.png" },
];

type Bullet = {
  readonly id: string;
  readonly lead: string;
  /**
   * Bullet 1's lead-in has no trailing colon and is followed by an em dash;
   * bullets 2-7 fold the colon into the bold lead-in and continue directly.
   * See the spec's numbered list under child 2 — this flag reproduces that
   * one structural difference instead of hardcoding it per bullet.
   */
  readonly hasColon: boolean;
  readonly body: string;
};

const BULLETS: readonly Bullet[] = [
  {
    id: "ai-note-taker",
    lead: "AI Note-Taker & Subscription",
    hasColon: false,
    body: `Record OFFLINE meetings and easily transcribe them on demand to generate AI summaries with action items. Manage workflows on the go via the soundcore app (iOS/Android), or use the Web portal with the ${LDQUO}Ask Anka${RDQUO} AI assistant for efficient desktop management. Standard subscription plans include Pro plan offers 1,200 minutes per month ($15.99/mo, $69.99/6-mo, or $99.99/yr) and Unlimited supports 24-hour all day transcription needs ($239.99/yr). You can also purchase additional minutes as needed. Liberty 5 Pro Max comes with a free Starter Plan 120 minutes of complimentary AI transcription per month for 24 months.`,
  },
  {
    id: "business-privacy",
    lead: "STRICT BUSINESS-GRADE PRIVACY",
    hasColon: true,
    body: "The trusted audio choice for professionals handling confidential information. Your conversations are secured with local AES-256 encryption. Without cloud sync enabled, temporary cloud files will be immediately deleted once you receive the audio transcription results, ensuring no audio and transcription content is retained. Built to the security standards with ISO 27001/27701, SOC 2 Type 1, HIPAA, EN 18031, EN 303645, and NIST IR 8425 compliance, the soundcore app and Liberty 5 Pro Max deliver uncompromising data privacy and peace of mind.",
  },
  {
    id: "screen-control",
    lead: "Effortless Screen Control",
    hasColon: true,
    // The 1.78" inch mark is a straight ASCII double-quote, unlike the curly
    // quotes around "Ask Anka" above — spec gotcha 3, preserved verbatim.
    body: `Features a large 1.78" AMOLED display that lets you access the AI Voice Recorder, adjust ANC, and manage earbud settings${EM_DASH}all from the screen. Add custom wallpapers to make your charging case truly yours.`,
  },
  {
    id: "whisper-clear-calls",
    lead: "Whisper-Clear Calls",
    hasColon: true,
    body: `Equipped with 10 sensors and the Thus${TRADEMARK} AI Chip, enjoy crystal-clear calls in 100 dB+ noisy environments or even quiet rooms. Whisper, speak, or shout${EM_DASH}your voice is always heard, anywhere you go.`,
  },
  {
    id: "instant-pure-silence",
    lead: "Instant Pure Silence",
    hasColon: true,
    body: `100% more effective noise cancellation than our previous flagship model. Powered by 8 sensors and the Thus${TRADEMARK} AI Chip, the earbuds process 384K+ noise signals per second, blocking subway, office, or street chaos for instant silence.`,
  },
  {
    id: "signature-sound",
    lead: "Your Signature Sound",
    hasColon: true,
    body: "HearID 5.0 with personalized EQ and an AI Audio Enhancer deliver sound precisely tuned to your ears. No more compromises with generic, standard audio.",
  },
  {
    id: "voice-control",
    lead: "Lag-Free Voice Control",
    hasColon: true,
    body: `With 20 built-in commands, you can skip songs, take calls, and adjust the volume${EM_DASH}offline processing ensures zero delay.`,
  },
];

type ChoiceCard = {
  readonly id: string;
  readonly selected: boolean;
  readonly image: string;
  readonly title: string;
  readonly price: string;
};

const CHOICE_CARDS: readonly ChoiceCard[] = [
  {
    id: "liberty-5-pro-max",
    selected: true,
    image: "/images/1204_black.png",
    title: TITLE, // fullwidth vbar — see spec gotcha 1
    price: PRICE,
  },
  {
    id: "liberty-5-pro",
    selected: false,
    image: "/images/1203.png",
    // ASCII `|` here, not the fullwidth vbar above — spec gotcha 1, both forms are real.
    title: "Liberty 5 Pro | Noise Cancelling Earbuds for Clear Calls",
    price: `2${NBSP}190${NBSP}kr`,
  },
];

const ORDER_SUPPORT_BADGES: readonly string[] = [
  "Fast Shipping",
  "30-Day Money-Back Guarantee",
  "Hassle-Free Warranty",
  // TODO: the spec records only 3 of the 4 badge labels ("+1", not
  // transcribed — pdp-product-hero.spec.md "Still to measure"). Add the
  // 4th once it's measured; do not guess it here.
];

/**
 * Minimal 5-point star, used only for the rating row. Star fill colour was
 * not captured by the research pass, so this uses the row's own measured
 * text colour (`rgb(0,0,0)`) as a conservative default rather than
 * guessing a brand accent — replace once the real colour is measured.
 */
function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M10 1.5l2.318 4.698 5.187.754-3.753 3.658.886 5.166L10 13.35l-4.638 2.426.886-5.166-3.753-3.658 5.187-.754L10 1.5Z" />
    </svg>
  );
}

export function PdpBuyBox() {
  const [expanded, setExpanded] = useState(false);
  const [color, setColor] = useState<BuyBoxColorKey>("black");
  const selectedOption = COLOR_OPTIONS.find((option) => option.key === color) ?? COLOR_OPTIONS[0];

  return (
    <div className="col-span-4 max-[767px]:col-span-10">
      {/* 0 — title. Same fullwidth-vbar copy as the breadcrumb's trailing crumb. */}
      <h1 className="text-[30px] leading-[36px] font-bold tracking-[-0.04em] text-balance text-[rgb(0,0,0)]">
        {TITLE}
      </h1>

      {/* 1 — rating row: 5 filled stars + review count. */}
      <div className="relative mt-[16px] flex w-fit items-center gap-[6px] text-[14px] leading-[16.8px] font-medium text-[rgb(0,0,0)]">
        <div className="flex items-center gap-[2px]" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <StarIcon key={index} className="h-[14px] w-[14px] text-[rgb(0,0,0)]" />
          ))}
        </div>
        <span>69 reviews</span>
      </div>

      {/* 2 — desktop description copy. `md:hidden` on the target hides this on
          MOBILE (see the breakpoints note above), so it is visible here and
          hidden under 767px. Collapsed box is 120px; "View More" toggles it. */}
      <div className="max-[767px]:hidden">
        <ul
          className={`list-disc space-y-[8px] overflow-hidden pl-[18px] text-[14px] leading-[16.8px] font-medium text-[rgb(0,0,0)] ${
            expanded ? "max-h-none" : "max-h-[120px]"
          }`}
        >
          {BULLETS.map((bullet) => (
            <li key={bullet.id}>
              <strong className="font-bold">
                {bullet.lead}
                {bullet.hasColon ? ":" : ""}
              </strong>{" "}
              {bullet.hasColon ? bullet.body : `${EM_DASH} ${bullet.body}`}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-[8px] text-[14px] leading-[16.8px] font-bold text-[#17BBEF]"
        >
          {expanded ? "View Less" : "View More"}
        </button>
      </div>

      {/* 3 — colour selector. The DOM textContent is "color: Black" (lowercase
          "color"); the visible "Color: Black" comes from a CSS
          text-transform, not the source string — spec gotcha 5. Reproduced
          here with the lowercase source text plus `capitalize`, rather than
          hardcoding "Color", so the source-of-truth string matches the DOM. */}
      <div className="mt-[20px] grid gap-[12px]">
        <p className="text-[14px] leading-[16.8px] font-medium text-[rgb(0,0,0)] capitalize">
          {`color: ${selectedOption.label}`}
        </p>
        <div className="flex items-center gap-[12px]">
          {COLOR_OPTIONS.map((option) => {
            const isSelected = option.key === color;
            return (
              <button
                key={option.key}
                type="button"
                aria-pressed={isSelected}
                aria-label={option.label}
                onClick={() => setColor(option.key)}
                className={`h-[40px] w-[40px] shrink-0 overflow-hidden rounded-full border border-[#E5E7EB] outline outline-2 ${
                  isSelected ? "outline-[#17BBEF]" : "outline-[#FFFFFF]"
                }`}
              >
                <Image
                  src={option.image}
                  alt={option.label}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 — price. */}
      <div className="mt-[18px] flex flex-col max-[767px]:items-start">
        <p className="text-[24px] leading-[28.8px] font-bold text-[rgb(0,0,0)] max-[767px]:text-[20px]">
          {PRICE}
        </p>
      </div>

      {/* 5 — installment accordion. Presentational per the scope guard: the
          toggle renders but owns no open/close state or revealed content.
          The leading icon's artwork was not captured by the research pass,
          so a neutral placeholder stands in rather than invented iconography. */}
      <div className="my-4 flex h-[44px] items-center justify-between border border-[#F7F8FA] px-[12px]">
        <div className="flex items-center gap-[8px]">
          <span className="block h-[20px] w-[20px] shrink-0 rounded-full bg-[#F7F8FA]" aria-hidden="true" />
          <p className="text-[14px] leading-[16.8px] font-medium text-[rgb(0,0,0)]">
            Flexible installment payment options available.
          </p>
        </div>
        <button
          type="button"
          aria-expanded="false"
          className="flex h-[24px] w-[24px] shrink-0 items-center justify-center text-[rgb(0,0,0)]"
        >
          <ChevronDownIcon className="h-[16px] w-[16px]" />
        </button>
      </div>

      {/* 7 — Choice: 2 option cards. Card 1's title uses the fullwidth vbar,
          card 2's the ASCII pipe — spec gotcha 1, both verbatim. */}
      <div className="mb-[48px]">
        <p className="text-[18px] leading-[21.6px] font-bold text-[rgb(0,0,0)]">Choice</p>
        <div className="mt-[16px] grid grid-cols-2 gap-[10.5px]">
          {CHOICE_CARDS.map((card) => (
            <div
              key={card.id}
              className={`flex h-[156px] w-full items-center gap-[8px] overflow-hidden rounded-[8px] p-[8px] ${
                card.selected
                  ? "border-[2px] border-[rgb(51,51,51)]"
                  : "border border-[rgb(216,216,216)]"
              }`}
            >
              <span className="relative h-[100px] w-[100px] shrink-0">
                <Image src={card.image} alt={card.title} fill className="object-contain" />
              </span>
              <div className="flex flex-col gap-[4px]">
                <p className="line-clamp-3 text-[14px] leading-[16.8px] font-medium text-[rgb(0,0,0)]">
                  {card.title}
                </p>
                <p className="text-[14px] leading-[16.8px] font-bold text-[rgb(0,0,0)]">
                  {card.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9 — Order Support. Icon filenames were not captured by the research
          pass ("Still to measure" in pdp-product-hero.spec.md), so only the
          heading and the known badge labels render — no invented icon
          artwork. */}
      <div className="mt-[24px] bg-white">
        <p className="text-[16px] leading-[19.2px] font-bold text-[rgb(0,0,0)]">Order Support</p>
        <ul className="mt-[12px] flex flex-wrap gap-x-[16px] gap-y-[8px] text-[14px] leading-[16.8px] font-medium text-[rgb(0,0,0)]">
          {ORDER_SUPPORT_BADGES.map((badge) => (
            <li key={badge}>{badge}</li>
          ))}
        </ul>
      </div>

      {/* 11 — Payment Methods. Not measured in detail (spec: "Not measured in
          detail" / "Still to measure: ... Payment Methods icon filenames").
          Heading only; badge icons intentionally omitted rather than
          invented. */}
      <div className="border-t border-[#E8E8E8] px-[8px] py-[16px] max-[767px]:px-0">
        <p className="text-[16px] leading-[19.2px] font-bold text-[rgb(0,0,0)]">Payment Methods</p>
        {/* TODO: payment-method badge icons/labels were not captured during
            the research pass — add them once measured. */}
      </div>
    </div>
  );
}
