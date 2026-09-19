// Global site footer.
// Spec: docs/research/components/site-footer.spec.md (rewritten 2026-08-06 — trust only that
// file; an earlier capture of this section was wrong and is superseded).
//
// NOTE — BREAKPOINT SUBSTITUTION: the target uses named Tailwind tiers not registered in this
// project's globals.css: tablet:(768) laptop:(1024) desktop:(1440) lg-desktop:(1920). They are
// written here as Tailwind v4 arbitrary variants with the same pixel values: min-[768px]:,
// min-[1024px]:, min-[1024px]:, min-[1440px]:, min-[1920px]:. Swap them for the named tiers once
// the breakpoints are registered in globals.css.
//
// NOTE — 14px ROOT: globals.css sets `html { font-size: 14px }`, so Tailwind's rem scale resolves
// at 0.875x (text-xs = 10.5px, text-sm = 12.25px, text-base = 14px, text-xl = 17.5px). Classes
// lifted verbatim from the target are used AS-IS; anything the spec states as a MEASUREMENT is
// written as an arbitrary `[Npx]` value instead.
//
// NOTE — THE FOOTER IS BLACK. `.global_footer_layer` computes to #F5F5F7 but the gutter
// container inside it computes to rgb(0,0,0) and fully covers it, so it is rendered as bg-black
// directly on the gutter container below.
//
// NOTE — COLOUR GOTCHA: on the target every footer <a> itself computes to rgb(8,10,15) (i.e.
// near-black); the visible rgb(182,182,186) lives on the inner <span>. Every link below therefore
// carries no colour class itself — colour is always applied to the child <span> — or it would
// render invisible on the black background.

import type { ComponentType, SVGProps } from "react";

import Image from "next/image";

import { FooterNewsletter } from "@/components/FooterNewsletter";
import {
  AnkerFooterWordmark,
  AnkerNordicsFooterLogo,
  EufyFooterWordmark,
  EufyMakeFooterWordmark,
  GlobeIcon,
  SoundcoreFooterWordmark,
} from "@/components/icons";

type FooterLink = {
  readonly label: string;
  readonly href: string;
};

type LinkColumn = {
  readonly heading: string;
  readonly links: readonly FooterLink[];
};

type ServiceBadge = {
  readonly text: string;
  readonly icon: string;
};

type SocialLink = {
  readonly label: string;
  readonly href: string;
  readonly icon: string;
};

type PaymentMark = {
  readonly label: string;
  readonly icon: string;
};

type Wordmark = {
  readonly label: string;
  readonly Icon: ComponentType<SVGProps<SVGSVGElement>>;
  readonly width: number;
  readonly height: number;
  /** Only `AnkerNordicsFooterLogo` is a link on the target ("Footer, links to /." per
   * icons.tsx); the other four wordmarks carry no captured href, so they render unlinked. */
  readonly href?: string;
};

/** Same 3-level shared gutter container `TopBrandBar` uses, duplicated here (not exported
 * there) with the footer's own vertical rhythm: 56px padding top/bottom, 56px row gap, black
 * background — per the spec's "Computed @1920" note. */
const GUTTER_CLASSES =
  "mx-auto flex size-full flex-col gap-[56px] bg-black px-4 py-[56px] min-[768px]:px-8 min-[1024px]:px-16 min-[1440px]:px-16 min-[1920px]:max-w-full min-[1920px]:px-[calc(50%-832px)]";

/** Column heading + "Buy on the Anker Store" heading share this exact class string. */
const HEADING_CLASSES =
  "text-pretty tracking-[-0.02em] tracking text-xl font-bold leading-[1.2] text-white";

/** Link-grid column wrapper: bordered stacked row below 1440, plain grid cell at 1440+. */
const COLUMN_WRAPPER_CLASSES =
  "border-t border-[#3D3E3F] py-4 min-[1440px]:border-none min-[1440px]:py-0";

/** Inner <span> of every footer_main-services link — colour lives here, not on the <a>. */
const LINK_TEXT_CLASSES =
  "text-pretty tracking-[-0.02em] tracking text-sm font-bold leading-[1.2] text-[#B6B6BA] transition-colors group-hover:text-white min-[1440px]:text-base";

/** Badge / contact-block body copy: 14px / 700 / rgb(182,182,186), not given a named class by
 * the spec (only the computed values), so ported as arbitrary values. */
const BODY_TEXT_CLASSES = "text-[14px] font-bold text-[#B6B6BA]";

const LEGAL_CLASSES =
  "text-pretty tracking-[-0.02em] tracking text-xs font-bold text-[#6D6D6F] min-[1440px]:text-sm";

// Verbatim four text nodes of the legal disclaimer span, separated by two <br> each. `world's`
// uses ASCII U+0027 (matches the same string in BrandVideoHero).
const LEGAL_TEXT_1 =
  "*Anker is the world's No. 1 mobile charging brand based on retail sales value for five consecutive years: 2020 to 2024.";
const LEGAL_TEXT_2 =
  "Data source: Euromonitor International (Shanghai) Co., Ltd., measured in terms of retail value sales in 2020 through 2024, based on research completed in June 2025. Mobile charging brands are defined as those with over 75% of retail sales from mobile phone charging products, including chargers, wireless chargers, power banks, and charging cables. These products may also be used with other consumer electronic devices.";
const LEGAL_TEXT_3 =
  "*soundcore ranks among the global top 3 audio brands by wireless headphone shipment volume.";
const LEGAL_TEXT_4 =
  "Source: Euromonitor International (Shanghai) Co., Ltd., based on global wireless headphone shipment volume in 2024. Audio brands are defined as brands with more than 75% of revenue from audio equipment, including headphones and speakers. Wireless headphones are defined as headphones that connect to electronic devices such as mobile phones and computers via wireless technologies (e.g., Bluetooth). Research completed in March 2025.";

const SERVICE_BADGES: readonly ServiceBadge[] = [
  { text: "Fast Shipping", icon: "/images/vector_2.png" },
  { text: "30-Day Money-Back Guarantee", icon: "/images/union-3.png" },
  { text: "Hassle-Free Warranty", icon: "/images/icon_support-2.png" },
  {
    text: "Sweden: +46 20 012 33 22 (Mon-Fri, 9am-6pm)",
    icon: "/images/union_1.png",
  },
];

const COMPANY_LINKS: readonly FooterLink[] = [
  { label: "Company Profile", href: "https://www.ankernordics.com/about" },
  {
    label: "Press Room",
    href: "https://via.tt.se/pressrum/3237203/anker-innovations",
  },
  {
    label: "Authorized Sellers",
    href: "https://www.ankernordics.com/wheretobuy",
  },
  { label: "Get support", href: "https://www.ankernordics.com/contact-us" },
  {
    label: "Terms of Use",
    href: "https://www.ankernordics.com/policies/terms-of-service",
  },
  { label: "Blogs", href: "https://www.ankernordics.com/blogs/se" },
];

const PROGRAM_LINKS: readonly FooterLink[] = [
  {
    label: "Become An Affiliate",
    href: "https://www.ankernordics.com/become-an-affiliate",
  },
  // "Cooperate Purchase" is the target's own typo — the href says "corporate". Kept verbatim.
  {
    label: "Cooperate Purchase",
    href: "https://www.ankernordics.com/corporate-purchase",
  },
  {
    label: "New Membership",
    href: "https://www.ankernordics.com/newcustomer",
  },
  {
    label: "AnkernordicCredits Program",
    href: "https://www.ankernordics.com/ankernordiccredits-program",
  },
  {
    label: "Refurbished Products",
    href: "https://www.ankernordics.com/collections/refurbished",
  },
];

const SUPPORT_LINKS: readonly FooterLink[] = [
  { label: "Order Tracking", href: "https://service.anker.com/eu/logistics" },
  {
    label: "Order Cancel",
    href: "https://passport.ankernordics.com/search-orders",
  },
  { label: "Support Center", href: "https://www.ankernordics.com/support" },
  { label: "Process a Warranty", href: "https://www.ankernordics.com/exchange" },
  {
    label: "Returns & Refunds",
    href: "https://www.ankernordics.com/policies/refund-policy",
  },
  {
    label: "Shipping Policy",
    href: "https://www.ankernordics.com/policies/shipping-policy",
  },
  {
    label: "Privacy Policy",
    href: "https://www.ankernordics.com/policies/privacy-policy",
  },
  { label: "Product Recall", href: "https://www.ankernordics.com/rc2506" },
];

const LINK_COLUMNS: readonly LinkColumn[] = [
  { heading: "Company", links: COMPANY_LINKS },
  { heading: "Program", links: PROGRAM_LINKS },
  { heading: "Support", links: SUPPORT_LINKS },
];

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/anker_nordics/",
    icon: "/images/icon_instagram.png",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@eufy.nordics",
    icon: "/images/icon_tiktok-2.png",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/anker-nordics/",
    icon: "/images/icon_linkedin.png",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCPcOcLs7ZF0JCDg69CUvzdw",
    icon: "/images/icon_youtube-2.png",
  },
];

const PAYMENT_MARKS: readonly PaymentMark[] = [
  { label: "Visa", icon: "/images/05f313d1-eb29-4f6e-8b7c-50128a62215b_l-1.png" },
  { label: "Mastercard", icon: "/images/999d3679-949b-4542-bb86-d998a72bfd87_h-1.png" },
  { label: "American Express", icon: "/images/d98b9143-de4d-4b43-852b-31690469fd5e_b-1.png" },
  { label: "PayPal", icon: "/images/eb54d220-728b-4219-acc8-595ffcba11a6_i-1.png" },
  { label: "Klarna", icon: "/images/20260408-194805.png" },
];

const WORDMARKS: readonly Wordmark[] = [
  { label: "Anker Nordics", Icon: AnkerNordicsFooterLogo, width: 98, height: 36, href: "/" },
  { label: "Anker", Icon: AnkerFooterWordmark, width: 87, height: 36 },
  { label: "eufy", Icon: EufyFooterWordmark, width: 68, height: 36 },
  { label: "eufyMake", Icon: EufyMakeFooterWordmark, width: 140, height: 36 },
  { label: "soundcore", Icon: SoundcoreFooterWordmark, width: 138, height: 36 },
];

/**
 * Global footer. Static, server component by design — it holds no state and must not be marked
 * "use client". Renders the legal disclaimers, the (externally owned) newsletter panel, the
 * main services / link-grid nav, and the brand strip, in that order.
 */
export function SiteFooter() {
  return (
    <footer>
      {/* .global_footer_layer — fully covered by the black gutter container below, kept as its
          own element for DOM-structure parity with the target. */}
      <div className="bg-[#F5F5F7]">
        <div className={GUTTER_CLASSES}>
          {/* 1. Legal disclaimers */}
          <span className={LEGAL_CLASSES}>
            {LEGAL_TEXT_1}
            <br />
            <br />
            {LEGAL_TEXT_2}
            <br />
            <br />
            {LEGAL_TEXT_3}
            <br />
            <br />
            {LEGAL_TEXT_4}
          </span>

          {/* 2. Newsletter panel — owned by another builder. */}
          <FooterNewsletter />

          {/* 3. Main services nav */}
          <nav id="footer-main-services" className="flex flex-col gap-[28px]">
            {/* 3a. Store services row */}
            <div>
              <span className={HEADING_CLASSES}>Buy on the Anker Store</span>
              <div className="mt-4 flex flex-col gap-2 min-[1024px]:flex-row min-[1024px]:flex-wrap min-[1440px]:gap-4">
                {SERVICE_BADGES.map((badge) => (
                  <div
                    key={badge.text}
                    className="flex flex-1 shrink-0 items-center gap-2 min-[1440px]:min-w-[288px]"
                  >
                    <Image
                      src={badge.icon}
                      alt=""
                      width={18}
                      height={18}
                      className="h-[18px] w-[18px] object-contain"
                    />
                    <span className={BODY_TEXT_CLASSES}>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3b. Divider — visible only >=1440 (unlike the always-visible #footer-brand one). */}
            <div className="hidden h-px bg-[#3D3E3F] min-[1440px]:block" />

            {/* 3c. Link grid — 4-up grid at >=1440; bordered stacked rows below that. */}
            <div className="grid-cols-4 gap-4 min-[1440px]:grid">
              {LINK_COLUMNS.map((column) => (
                <div key={column.heading} className={COLUMN_WRAPPER_CLASSES}>
                  <span className={HEADING_CLASSES}>{column.heading}</span>
                  <div className="mt-4 flex flex-col gap-2">
                    {column.links.map((link) => (
                      <a key={link.href} href={link.href} className="group">
                        <span className={LINK_TEXT_CLASSES}>{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}

              {/* Column 4 — "Contact Us". Not a link list: six stacked rows. */}
              <div className={COLUMN_WRAPPER_CLASSES}>
                {/* Row 1 — heading */}
                <div className="flex items-center justify-between pb-4 min-[1440px]:pb-0">
                  <span className={HEADING_CLASSES}>Contact Us</span>
                </div>

                {/* Row 2 — contact block (phone, email) */}
                <div className="mb-4 flex flex-col gap-2 min-[1440px]:mt-4 min-[1440px]:mb-0">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/icon_voice-2.png"
                      alt=""
                      width={18}
                      height={18}
                      className="h-[18px] w-[18px] object-contain"
                    />
                    <span className={BODY_TEXT_CLASSES}>
                      Sweden: +46 20 012 33 22 (Mon-Fri, 9am-6pm)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Image
                      src="/images/icon_email-2.png"
                      alt=""
                      width={18}
                      height={18}
                      className="mt-[2px] h-[18px] w-[18px] object-contain"
                    />
                    <div className={`flex flex-col ${BODY_TEXT_CLASSES}`}>
                      <span>Anker: support@anker.com</span>
                      <span>Soundcore: service@soundcore.com</span>
                      <span>Eufy: support@eufy.com</span>
                    </div>
                  </div>
                </div>

                {/* Row 3 — mobile-only "Sweden" row, hidden >=1440 (the working country
                    selector lives in #footer-brand instead). */}
                <div className="border-t border-b border-[#3D3E3F] py-4 min-[1440px]:hidden min-[1440px]:border-none min-[1440px]:py-0">
                  <span className="text-sm font-bold text-[#B6B6BA]">Sweden</span>
                </div>

                {/* Row 4 — spacer, hidden >=1440 */}
                <div className="mt-8 min-[1440px]:hidden" />

                {/* Row 5 — social row, 28x28 icons */}
                <div className="mt-8 flex items-center gap-2">
                  {SOCIAL_LINKS.map((social) => (
                    <a key={social.href} href={social.href} aria-label={social.label}>
                      <Image
                        src={social.icon}
                        alt=""
                        width={28}
                        height={28}
                        className="h-[28px] w-[28px] object-contain"
                      />
                    </a>
                  ))}
                </div>

                {/* Row 6 — payment marks, 44x28, not links */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {PAYMENT_MARKS.map((mark) => (
                    <Image
                      key={mark.label}
                      src={mark.icon}
                      alt={mark.label}
                      width={44}
                      height={28}
                      className="h-[28px] w-[44px] object-contain"
                    />
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* 4. Brand strip */}
          <div id="footer-brand" className="flex flex-col gap-[14px]">
            {/* 4a. Brand row: wordmarks + static country selector */}
            <div className="min-[1440px]:flex min-[1440px]:items-center min-[1440px]:gap-4">
              <div className="flex flex-col items-start gap-[14px] min-[1024px]:flex-row min-[1024px]:items-center min-[1440px]:flex-[980]">
                {WORDMARKS.map(({ label, Icon, width, height, href }) =>
                  href ? (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="text-[#B6B6BA] transition-colors hover:text-white"
                    >
                      <Icon width={width} height={height} />
                    </a>
                  ) : (
                    <span key={label} aria-label={label} className="text-[#B6B6BA]">
                      <Icon width={width} height={height} />
                    </span>
                  ),
                )}
              </div>

              {/* Static country selector — no other locale is in scope, so this does not
                  switch anything; it exists to match the target's visible control. */}
              <button
                type="button"
                className="flex items-center gap-2 border-t border-[#3D3E3F] py-4 text-sm font-bold text-[#B6B6BA] min-[1440px]:border-none min-[1440px]:py-0"
              >
                <GlobeIcon width={20} height={20} />
                Sweden
              </button>
            </div>

            {/* 4b. Divider — always visible (unlike the main-services one). */}
            <div className="h-px bg-[#3D3E3F]" />

            {/* 4c. Copyright row */}
            <div className="flex flex-col items-start gap-1 min-[1024px]:flex-row min-[1440px]:items-center min-[1440px]:gap-4">
              <p className="text-[14px] font-bold leading-[21px] text-[#6D6D6F]">
                © Fantasia Trading LLC 2025 200923810277
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
