// Section #35 — "Recommended By". Horizontally scrollable row of 8 media
// cards (screenshots from third-party video endorsements) linking out to
// YouTube.
//
// Spec: docs/research/components/recommended-by.spec.md
//
// NOTE — BREAKPOINT SUBSTITUTION: the target uses named Tailwind tiers that
// are NOT registered in this project's globals.css: tablet:(768)
// laptop:(1024) desktop:(1440) lg-desktop:(1920). They are written here as
// Tailwind v4 arbitrary variants with the same pixel values: min-[768px]:,
// min-[1024px]:, min-[1440px]:, min-[1920px]:.
//
// NOTE — 14px ROOT: globals.css sets `html { font-size: 14px }`, so
// Tailwind's rem scale resolves at 0.875x. Class names lifted from the
// target are used verbatim; every value the spec states as a MEASUREMENT
// (the 404x480 slide box, the h3 sizes) is written as an arbitrary `[Npx]`
// instead.
//
// NOTE — NO SWIPER: the target drives this row with Swiper
// (`.swiper-wrapper`, 8 slides). It is reproduced with the same CSS
// `overflow-x-auto` + scroll-snap scroller as ProductCarousel.tsx, so no new
// dependency is added.
//
// NOTE — APOSTROPHES: cards 2 and 4 use the curly U+2019 (in "Father's
// Day"), card 5 uses the ASCII U+0027 (in "You've"). Both are factored into
// named constants below with explicit \u escapes so the two code points stay
// visually distinguishable in review and survive any editor's "smart quote"
// normalisation.
//
// NOTE — CARDS 2 AND 8 HAVE NO HREF on the live site; they render as a plain
// non-interactive `article` instead of inventing a link target.
//
// JUDGMENT CALL — h3 COLOR: the spec's verbatim class list for the overlay
// h3 carries no color utility (the target's own `graphic-description-item`
// class supplies it, and is inert here), but the spec's computed-style read
// explicitly records `rgb(255, 255, 255)`. `text-white` is added to restore
// that, matching the note "the overlay <h3> is white ... sitting over the
// image".

import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "./SectionHeading";

/** U+2019 RIGHT SINGLE QUOTATION MARK — used in cards 2 and 4. */
const RSQUO = "\u2019";
/** U+0027 APOSTROPHE (ASCII) — used only in card 5's title. */
const APOS = "\u0027";

interface RecommendedCard {
  readonly id: string;
  readonly title: string;
  readonly image: string;
  /** `null` on the live site for cards 2 and 8 — render as a non-link. */
  readonly href: string | null;
}

const CARDS: readonly RecommendedCard[] = [
  {
    id: "rb-1",
    title: "Anker providing powerful energy to keep the journey going.",
    image: "/images/mask_group-5.png",
    href: "https://www.youtube.com/watch",
  },
  {
    id: "rb-2",
    // Curly U+2019 via RSQUO — see the APOSTROPHES note above.
    title: `Happy Father${RSQUO}s Day from eufy to the heroes who always know`,
    image: "/images/frame_2121235191.png",
    href: null,
  },
  {
    id: "rb-3",
    title:
      "If you want portable power proven under the harshest conditions, Anker delivers.",
    image: "/images/mask_group-7.png",
    href: "https://www.youtube.com/watch",
  },
  {
    id: "rb-4",
    // Curly U+2019 via RSQUO — see the APOSTROPHES note above.
    title: `Celebrating Dads with eufy this Father${RSQUO}s Day.`,
    image: "/images/frame_2121235189-3.png",
    href: "https://www.youtube.com/watch",
  },
  {
    id: "rb-5",
    // ASCII U+0027 via APOS — see the APOSTROPHES note above.
    title: `soundcore Liberty 4: You${APOS}ve Gotta Hear Them For Yourself!`,
    image: "/images/endorse-2-mobile.webp",
    href: "https://www.youtube.com/watch",
  },
  {
    id: "rb-6",
    title: "This Robot Lawn Mower Just Changed Everything!",
    image: "/images/frame_2121235741.png",
    href: "https://www.youtube.com/watch",
  },
  {
    id: "rb-7",
    title: "The Longest Lasting Headphones!",
    image: "/images/endorse-1-mobile.webp",
    href: "https://www.youtube.com/shorts/hE6wAfGDhK8",
  },
  {
    id: "rb-8",
    title: "Still picking up hair every day? Give the eufy E28 a try.",
    image: "/images/frame_2121235739.png",
    href: null,
  },
];

/** Media clip + sr-only title + overlay title — identical for every card. */
function CardBody({ title, image }: { title: string; image: string }) {
  return (
    <>
      {/* Media clip: `rounded-xl` (<1024) -> `laptop:rounded-2xl` (>=1024). */}
      <div className="absolute inset-0 overflow-hidden rounded-xl min-[1024px]:rounded-2xl">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1920px) 404px, (min-width: 1024px) 30vw, 80vw"
          className="object-cover transition-all duration-300 min-[768px]:hover:scale-110"
        />
      </div>
      {/* Accessible title repeat, kept per the target's own markup. */}
      <span className="sr-only">{title}</span>
      {/* Overlay: `p-4` (<1024) -> `laptop:p-6` (>=1024), anchored bottom-0. */}
      <div className="absolute bottom-0 z-[1] box-border flex w-full flex-col p-4 min-[1024px]:p-6">
        <h3 className="descTitle text-lines-2 graphic-description-item mt-1 line-clamp-3 flex-1 text-[24px] leading-[1.2] font-bold text-white min-[1440px]:mt-2 min-[1440px]:text-[24px] min-[1920px]:text-[32px]">
          {title}
        </h3>
      </div>
    </>
  );
}

/** One card: `<article>` fixed at the measured 404x480 slide box. */
function Card({ card }: { card: RecommendedCard }) {
  const article = (
    <article className="group relative h-[480px] w-[404px]">
      <CardBody title={card.title} image={card.image} />
    </article>
  );

  if (card.href === null) {
    return article;
  }

  return (
    <Link
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#080A0F] min-[1024px]:rounded-2xl"
    >
      {article}
    </Link>
  );
}

export function RecommendedBy() {
  const headingId = "recommended-by-heading";

  return (
    <>
      <SectionHeading text="RECOMMENDED BY" id={headingId} />

      {/* `ipc_container relative z-10 w-full` are the target's own shell
          classes; `ipc_container` is inert in this project and kept for
          traceability — same shell as ProductCarousel and SectionHeading. */}
      <section
        aria-labelledby={headingId}
        className="ipc_container relative z-10 w-full overflow-hidden bg-[#F5F5F7]"
      >
        {/* Site-standard gutter container. At 1920 this yields the measured
            1664px content column (2 x 832px inset). `laptop:px-16` and
            `desktop:px-16` are the same value on the target and both
            reproduced for traceability. */}
        <div className="mx-auto size-full px-4 min-[768px]:px-8 min-[1024px]:px-16 min-[1440px]:px-16 min-[1920px]:max-w-full min-[1920px]:px-[calc(50%-832px)]">
          {/* Swiper replacement — same overflow-x-auto + scroll-snap scroller
              as ProductCarousel.tsx. The wrapper itself carries no gap on the
              target (spacing comes from Swiper's slide margin); `gap-4` here
              reproduces that spacing without a new dependency. */}
          <ul
            tabIndex={0}
            className="flex w-full list-none gap-4 snap-x snap-proximity overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
          >
            {CARDS.map((card) => (
              <li key={card.id} className="relative shrink-0 snap-start">
                <Card card={card} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
