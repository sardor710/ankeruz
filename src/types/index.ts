// Content shapes observed on the ankernordics.com homepage.
// Refined as each section's extraction lands — see docs/research/www.ankernordics.com/.

/** The four brands the site merchandises, plus the parent group. */
export type BrandKey = "anker" | "eufy" | "eufymake" | "soundcore";

export interface BrandRef {
  key: BrandKey;
  /** Display name as written on the site, e.g. "eufy Make". */
  label: string;
  href: string;
}

/** A full-bleed slide in the top hero Swiper (5 slides at capture time). */
export interface HeroSlide {
  id: string;
  /** Small line above the headline, e.g. "Liberty 5 Pro Series". */
  eyebrow?: string;
  /** Headline; may contain an intentional line break. */
  headline: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Background artwork — desktop and mobile crops differ. */
  image: string;
  imageMobile?: string;
  /** Some slides layer a promo/gift badge over the artwork. */
  overlayImage?: string;
  /** Slides use light text on dark art, or the inverse. */
  theme: "light" | "dark";
}

/** Award / certification badges shown beneath the hero. */
export interface AwardBadge {
  image: string;
  alt: string;
}

/** Product card used by the brand carousels, "What's New", and "Today's Best Deal". */
/** Renamed from `ProductCard` to avoid colliding with the component of that name
 *  in `src/components/ProductCard.tsx`, which owns its own `Product` type. */
export interface ProductCardData {
  id: string;
  title: string;
  /** Short marketing line under the title, when present. */
  subtitle?: string;
  image: string;
  href: string;
  price?: Price;
  /** e.g. "New", "Best Seller", "-20%". */
  badge?: string;
  rating?: Rating;
}

export interface Price {
  /** Formatted exactly as the site prints it, incl. currency. */
  current: string;
  /** Struck-through original, when discounted. */
  original?: string;
}

export interface Rating {
  /** 0–5. */
  value: number;
  count: number;
}

/** Large editorial banner that follows each brand carousel. */
export interface FeatureBanner {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  /** Several banners are video-backed rather than image-backed. */
  video?: string;
  theme: "light" | "dark";
}

/** A brand block = heading + carousel + feature banner (repeats 3x on the page). */
export interface BrandSection {
  brand: BrandRef;
  /** Carousel headline, e.g. "Live Charged." */
  headline: string;
  products: ProductCardData[];
  banner: FeatureBanner;
}

/** Top-level nav entry; each opens a mega-menu flyout. */
export interface NavItem {
  label: string;
  href: string;
  children?: NavGroup[];
}

export interface NavGroup {
  label?: string;
  items: NavLink[];
}

export interface NavLink {
  label: string;
  href: string;
  image?: string;
}

/** Rotating promo messages in the 45px announcement bar. */
export interface AnnouncementSlide {
  text: string;
  href?: string;
}

/** Cards in the "Featured Blogs and News" section. */
export interface BlogCard {
  title: string;
  excerpt?: string;
  image: string;
  href: string;
  date?: string;
  category?: string;
}

/** Press/award logos in the "RECOMMENDED BY" strip. */
export interface PressLogo {
  image: string;
  alt: string;
  href?: string;
}

/** One step of the scroll-driven sticky media sequence (topology #32/#33). */
export interface StickyMediaStep {
  /** Scroll progress 0–1 at which this step becomes active. */
  at: number;
  title: string;
  description?: string;
  video?: string;
  image?: string;
}
