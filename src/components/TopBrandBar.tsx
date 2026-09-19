// NOTE: The target site uses named Tailwind breakpoint tiers that are not yet
// registered in globals.css: tablet:(768) laptop:(1024) desktop:(1440)
// lg-desktop:(1920). Until those are added to the @theme block they are
// expressed here as Tailwind v4 arbitrary variants using the same pixel values
// (min-[768px]:, min-[1024px]:, min-[1440px]:, min-[1920px]:). Swap them for the
// named tiers once the breakpoints are registered.

import type { ComponentType, SVGProps } from "react";

import {
  AnkerInnovationsWordmark,
  AnkerWordmark,
  EufyMakeWordmark,
  EufyWordmark,
  SoundcoreWordmark,
} from "@/components/icons";

type BrandLink = {
  readonly label: string;
  readonly href: string;
  readonly Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const BRAND_LINKS: readonly BrandLink[] = [
  { label: "Anker", href: "/anker?ref=header", Icon: AnkerWordmark },
  { label: "eufy", href: "/eufy?ref=header", Icon: EufyWordmark },
  { label: "eufyMake", href: "/eufymake?ref=header", Icon: EufyMakeWordmark },
  { label: "soundcore", href: "/soundcore?ref=header", Icon: SoundcoreWordmark },
];

/** Shared 3-level container gutters: 16 / 32 / 64 / 64 px, capped at a 1664px column from 1920 up. */
const CONTAINER_GUTTERS =
  "mx-auto size-full px-4 min-[768px]:px-8 min-[1024px]:px-16 min-[1440px]:px-16 min-[1920px]:px-[calc(50%-832px)] min-[1920px]:max-w-full";

const LINK_CLASSES =
  "tracking text-[14px] font-bold text-[#080A0F] underline transition-colors hover:text-[#17BBEF]";

/**
 * Static 30px brand strip above the announcement bar. Server component by
 * design — it holds no state and must not be marked "use client".
 */
export function TopBrandBar() {
  return (
    <div className="relative z-[46] box-border h-[30px]">
      <div className="relative z-10 h-full w-full bg-[#F5F5F7]">
        <div className={`${CONTAINER_GUTTERS} flex justify-between bg-[#080A0F]`}>
          <div className="flex h-full items-center gap-2 py-[5px]">
            {BRAND_LINKS.map(({ label, href, Icon }) => (
              <a key={href} href={href} className={LINK_CLASSES} aria-label={label}>
                {/* h-[20px], not h-5: the wordmarks are intrinsically 20px tall and the 30px
                    bar minus 2x5px py-[5px] leaves exactly 20px. At our 14px root h-5 would
                    resolve to 17.5px. Measured values must use arbitrary units. */}
                <div className="hidden h-[20px] transition-all duration-200 min-[1024px]:block [&_svg]:h-full [&_svg]:w-auto">
                  <Icon />
                </div>
              </a>
            ))}
          </div>
          <div className="flex h-full items-center justify-end gap-2 py-[5px]">
            <a
              href="https://www.anker-in.com?ref=header"
              className={LINK_CLASSES}
              aria-label="Anker Innovations"
            >
              <div className="h-[10px] [&_svg]:h-full [&_svg]:w-auto">
                <AnkerInnovationsWordmark />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
