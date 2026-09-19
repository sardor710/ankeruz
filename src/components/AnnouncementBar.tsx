"use client";

// NOTE: The target site uses named Tailwind breakpoint tiers that are not yet
// registered in globals.css: tablet:(768) laptop:(1024) desktop:(1440)
// lg-desktop:(1920). Where they are needed they are expressed as Tailwind v4
// arbitrary variants using the same pixel values (min-[768px]:, min-[1024px]:,
// min-[1440px]:, min-[1920px]:). Swap them for the named tiers once the
// breakpoints are registered. (This component is width-agnostic — its 45px
// height and 1280px content cap are identical at every tier.)

import { useEffect, useState, useSyncExternalStore } from "react";

import { DealsIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/** Auto-rotation interval. Not measured on the live site — tune during QA. */
const ROTATE_MS = 4000;

type Slide = {
  readonly text: string;
  readonly href: string;
  readonly withIcon?: boolean;
};

const SLIDES: readonly Slide[] = [
  { text: "New Arrivals Unveiled – Don’t Miss Out", href: "/collections/new-releases" },
  { text: "Premium Refurbished - Save More, Waste Less", href: "/collections/refurbished" },
  { text: "New Week, New Deals – Shop and Save.", href: "/deals", withIcon: true },
];

/** One static class per slide index — keeps the track transform out of inline styles. */
const TRACK_TRANSFORMS = ["translate-x-0", "-translate-x-full", "-translate-x-[200%]"];

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

export function AnnouncementBar() {
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
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return (
    <div
      id="announcementBar"
      className="sticky top-0 z-[55] flex h-[45px] items-center bg-[url('/images/gradient-banner-1920x40.gif')] bg-cover bg-center"
      aria-label="Announcements"
      role="region"
    >
      <div className="mx-auto h-full w-full max-w-[1280px] overflow-hidden">
        <div
          className={cn(
            "flex h-full transition-transform duration-500 ease-in-out motion-reduce:transition-none",
            TRACK_TRANSFORMS[index]
          )}
        >
          {SLIDES.map((slide, slideIndex) => {
            const isActive = slideIndex === index;

            return (
              <a
                key={slide.href}
                href={slide.href}
                aria-hidden={!isActive}
                tabIndex={isActive ? undefined : -1}
                className="flex h-[45px] w-full shrink-0 items-center justify-center gap-2 text-[14px] leading-[21px] font-medium text-[#17BBEF]"
              >
                {/* size-[20px], not size-5: the site sets this icon to an explicit
                    h-[20px] w-[20px]. At our 14px root size-5 resolves to 17.5px. */}
                {slide.withIcon ? <DealsIcon className="size-[20px] shrink-0" /> : null}
                <span>{slide.text}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
