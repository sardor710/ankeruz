"use client";

// "FooterNewsletter" — the `#footer-marketing-conversion` panel. Spec:
// docs/research/components/footer-newsletter.spec.md
//
// NOTE — SCOPE: this clone has no backend. The form is static markup only —
// `onSubmit` calls `preventDefault()` and nothing else, no `action`, no
// fetch, no analytics. Nothing here leaves the page.
//
// NOTE — CLIENT COMPONENT, and it has to be. An earlier revision of this file
// tried to stay a server component on the reasoning that it holds no state and
// that `@base-ui/react`'s `Checkbox.Root` carries its own `"use client"`.
// That reasoning is wrong for one specific reason: the `<form>` below passes an
// `onSubmit` function, and a server component cannot hand a function across the
// server/client boundary. `tsc` does not catch this — it only surfaced when
// `next build` prerendered the page:
//
//   Error: Event handlers cannot be passed to Client Component props.
//     {method: "get", onSubmit: function onSubmit, ...}
//
// The directive is what keeps `preventDefault()` (and therefore the "no network
// call" guarantee above) legal. Do not remove it while the handler exists.
//
// NOTE — 14px ROOT: globals.css sets `html { font-size: 14px }`, so the
// site's own utility class names (e.g. `text-sm`, `text-base`, `gap-8`)
// resolve at the measured pixel values without conversion.
//
// NOTE — BREAKPOINTS: the target's named tiers are not registered in this
// project's Tailwind theme, so they are written as arbitrary variants with
// the same pixel values: tablet:->min-[768px]:, laptop:->min-[1024px]:,
// desktop:->min-[1440px]:, lg-desktop:->min-[1920px]:.
//
// NOTE — `rounded-btn`: this token is not registered in this project's
// `@theme`, so the class is a verbatim no-op that matches the spec's
// computed `border-radius: 0` for both the container and the Sign Up
// button.
//
// NOTE — headline size below `desktop`: the spec only captures the class
// contract (`desktop:text-[32px]`) and the computed value at 1920px; no
// pixel value was measured for <1440px, so none is invented here — the
// class list is ported verbatim and the headline falls back to the
// inherited paragraph size below `desktop`.

import type { ReactNode } from "react";
import { Checkbox } from "@base-ui/react/checkbox";

const EYEBROW = "Subscribe now to get a gift with your first order!";
const HEADLINE = "Get an Exclusive 15% Off Your First Purchase";

type ConsentRowProps = {
  readonly name: "terms" | "news";
  readonly ariaLabel: string;
  readonly children: ReactNode;
};

/**
 * One checkbox row. Three elements in order, per spec:
 * 1. the visible `<button role="checkbox">` control (from `Checkbox.Root`)
 * 2. the visually-hidden native `<input type="checkbox">` (also rendered by
 *    `Checkbox.Root`, as a sibling, carrying `name` for form semantics)
 * 3. a `<label>` wrapping the text `<p>`
 */
function ConsentRow({ name, ariaLabel, children }: ConsentRowProps) {
  return (
    <div className="flex items-start gap-2 min-[1024px]:items-center">
      <Checkbox.Root
        name={name}
        nativeButton
        aria-label={ariaLabel}
        render={<button type="button" />}
        className="peer h-[14px] w-[14px] shrink-0 rounded-[1.75px] border border-[#B6B6BA] bg-transparent"
      />
      <label>
        {/* Colour gotcha: the <label> itself computes to rgb(0,0,0) on the
            live site; the visible light-grey lives on the inner <p>. */}
        <p className="text-sm leading-[21px] font-medium text-[#B6B6BA]">
          {children}
        </p>
      </label>
    </div>
  );
}

export function FooterNewsletter() {
  return (
    <div className="rounded-btn flex flex-col gap-8 bg-[#1E2024] px-4 py-8 min-[1024px]:px-8 min-[1440px]:flex-row min-[1440px]:gap-16 min-[1440px]:py-16">
      {/* `text-center` is measured, not assumed: the wrapper computes to
          `text-align: center` as well as `align-items: center`, and both the
          eyebrow and the headline inherit it (each 670px wide, centred on the
          panel's own centre line at x=952 @1920). */}
      <div className="subscribe-component flex w-full flex-col items-center gap-8 text-center min-[1024px]:flex-row min-[1024px]:gap-4 min-[1440px]:flex-col min-[1440px]:gap-8">
        <div>
          <p className="text-sm tracking-[-0.02em] font-bold text-white text-pretty min-[1440px]:text-base">
            {EYEBROW}
          </p>
          <p className="mt-1 tracking-[-0.02em] font-bold text-white text-pretty min-[1440px]:mt-2 min-[1440px]:text-[32px]">
            {HEADLINE}
          </p>
        </div>

        <form
          method="get"
          onSubmit={(event) => event.preventDefault()}
          // Measured @1920: the form is 454px wide and centred (x=724 on a
          // panel whose content box runs 148..1756). It must therefore NOT be
          // `w-full` once the wrapper turns back into a column at 1440 — the
          // wrapper's `items-center` centres it only while it is shrink-to-fit.
          className="w-full min-[1024px]:flex-1 min-[1440px]:w-auto min-[1440px]:flex-none"
        >
          <div className="flex h-[38px] items-center min-[1440px]:h-[48px]">
            <input
              type="text"
              name="email"
              placeholder="Email"
              // 353px is measured, not derived: input 353 + button 101 = the
              // measured 454px row. Left as `flex-1` below 1440 where the form
              // stretches to the column width instead.
              className="h-full min-w-0 flex-1 border border-[#B6B6BA] bg-transparent px-[14px] text-[14px] text-white placeholder:text-[#B6B6BA] min-[1440px]:w-[353px] min-[1440px]:flex-none"
            />
            <button
              type="submit"
              // `whitespace-nowrap` is load-bearing: the measured 101px width
              // minus the measured 24.5px side padding leaves a ~52px content
              // box, which is almost exactly the width of "Sign Up" at 16px/700.
              // Without it the label wraps onto two lines and the button grows
              // past the 48px row height.
              className="rounded-btn inline-flex h-full w-[101px] shrink-0 cursor-pointer items-center justify-center whitespace-nowrap bg-white px-[24.5px] text-[16px] font-bold text-black"
            >
              Sign Up
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <ConsentRow
              name="terms"
              ariaLabel="I agree to the Terms of Use and Privacy Policy."
            >
              I agree to the{" "}
              <a
                href="/policies/terms-of-service"
                className="text-[#B6B6BA] underline"
              >
                Terms of Use
              </a>{" "}
              and{" "}
              <a
                href="/policies/privacy-policy"
                className="text-[#B6B6BA] underline"
              >
                Privacy Policy
              </a>
              .
            </ConsentRow>
            <ConsentRow
              name="news"
              ariaLabel="Send me news and special offers. I can unsubscribe at any time"
            >
              Send me news and special offers. I can unsubscribe at any time
            </ConsentRow>
          </div>
        </form>
      </div>
    </div>
  );
}
