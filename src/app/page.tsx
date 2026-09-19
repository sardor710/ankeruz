// Homepage assembly for ankernordics.com.
// Section numbers refer to docs/research/www.ankernordics.com/PAGE_TOPOLOGY.md.
//
// The three brand blocks repeat one shape, and the heading order matters:
//
//   #14 SectionHeading "Anker"     -> #15 BrandVideoHero -> #18 ProductCarousel
//   #20 SectionHeading "eufy"      -> #21 BrandVideoHero -> #24 ProductCarousel
//   #26 SectionHeading "soundcore" -> #27 BrandVideoHero -> #30 ProductCarousel
//
// The heading sits ABOVE the video hero, so the page renders it and passes
// `withHeading={false}` to the carousel. "What's New" (#9 -> #10) keeps the
// carousel's own heading because there the two really are adjacent.

import { AnnouncementBar } from "@/components/AnnouncementBar";
import { BRAND_VIDEO_HEROES, BrandVideoHero } from "@/components/BrandVideoHero";
import { CategoryStrip } from "@/components/CategoryStrip";
import { CompanySlogan } from "@/components/CompanySlogan";
import { ExploreAllBrands } from "@/components/ExploreAllBrands";
import { FeaturedBlogs } from "@/components/FeaturedBlogs";
import { HeroBannerCarousel } from "@/components/HeroBannerCarousel";
import { PRODUCT_CAROUSELS, ProductCarousel } from "@/components/ProductCarousel";
import { RecommendedBy } from "@/components/RecommendedBy";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TodaysBestDeal } from "@/components/TodaysBestDeal";
import { TopBrandBar } from "@/components/TopBrandBar";
import { WhyShop } from "@/components/WhyShop";

const [whatsNew, ...brandCarousels] = PRODUCT_CAROUSELS;

/**
 * The target's `ipc_spacer` blocks — 15 of them, 1483px of vertical rhythm in
 * total at 1920. Without these the page renders ~1000px short and every section
 * butts against its neighbour.
 *
 * All 15 carry an IDENTICAL utility class list
 * (`laptop:h-16 desktop:h-[96px] lg-desktop:h-[128px] tablet:h-16 h-16`); the
 * three distinct heights come from a per-instance `block-style_<hash>` rule
 * that overrides it. So the utilities are a red herring and the measured
 * heights below are the real contract:
 *
 *   lg -> 128px @1920, 96px @1440, 56px (`h-16`) below      x11
 *   sm ->  30px  (one instance, between CompanySlogan and CategoryStrip)
 *   xs ->  15px  (three, each between a BrandVideoHero and its carousel)
 *
 * MEASURED AT 1920 ONLY. The `sm`/`xs` overrides could not be re-measured at
 * other widths (browser resize was unavailable during capture), so they are
 * treated as fixed. Re-check them at 1440 and 768 before calling this final.
 */
function Spacer({ size = "lg" }: { readonly size?: "lg" | "sm" | "xs" }) {
  const height =
    size === "lg"
      ? "h-16 min-[1440px]:h-[96px] min-[1920px]:h-[128px]"
      : size === "sm"
        ? "h-[30px]"
        : "h-[15px]";

  return <div aria-hidden className={`ipc_spacer relative z-10 ${height}`} />;
}

export default function Home() {
  return (
    <>
      <TopBrandBar />
      <AnnouncementBar />
      <SiteHeader />

      <main>
        {/* #0 */}
        <HeroBannerCarousel />
        <Spacer /> {/* #1 */}
        {/* #2 */}
        <CompanySlogan />
        <Spacer size="sm" /> {/* #4 */}
        {/* #5 */}
        <CategoryStrip />
        <Spacer /> {/* #6 */}
        {/* #7 */}
        <TodaysBestDeal />
        <Spacer /> {/* #8 */}
        {/* #9 + #10 */}
        <ProductCarousel carousel={whatsNew} />
        <Spacer /> {/* #11 */}
        {/* #12 */}
        <ExploreAllBrands />
        <Spacer /> {/* #13 */}

        {/* #14-#30 — one heading/hero/carousel triple per brand, each closed by
            the #19 / #25 / #31 spacer. */}
        {BRAND_VIDEO_HEROES.map((hero, index) => {
          const carousel = brandCarousels[index];
          return (
            <div key={hero.id}>
              <SectionHeading
                text={carousel.heading}
                id={`${carousel.id}-heading`}
              />
              <BrandVideoHero {...hero} />
              <Spacer size="xs" /> {/* #17 / #23 / #29 */}
              <ProductCarousel carousel={carousel} withHeading={false} />
              <Spacer /> {/* #19 / #25 / #31 */}
            </div>
          );
        })}

        {/* #32 + #33 */}
        <WhyShop />
        <Spacer /> {/* #34 */}
        {/* #35 */}
        <RecommendedBy />
        <Spacer /> {/* #36 */}
        {/* #37 + #38 */}
        <FeaturedBlogs />
        <Spacer /> {/* #39 */}
      </main>

      <SiteFooter />
    </>
  );
}
