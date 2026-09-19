// Topology #11 on the d1204 (Liberty 5 Pro Max) PDP. Server component by design —
// it holds no state and must not be marked "use client".
//
// BREAKPOINTS ARE INVERTED here vs. the rest of this repo (see
// docs/research/components/pdp-core.spec.md): `md:` on the target means
// `@media (max-width: 767px)`, i.e. mobile-only, so it is written as
// `max-[767px]:` below — NOT `min-[768px]:`.
//
// Scope: no cart backend. Both buttons are inert — `type="button"`, no
// handler, no fetch, no navigation, no analytics.

const PRODUCT_TITLE = "Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case";
const PRICE = "2 690 000 so'm";

/** Fixed bottom buy bar. 76px tall, 16px vertical padding (8px on mobile). */
export function PdpStickyBuyBar() {
  return (
    <div className="fixed bottom-0 z-20 w-full bg-white py-[16px] shadow-2xl max-[767px]:py-[8px]">
      <div className="mx-auto flex h-full w-auto max-w-[1280px] items-center justify-between">
        <p className="w-[581px] truncate text-[20px] leading-none font-bold text-[rgb(0,0,0)]">
          {PRODUCT_TITLE}
        </p>
        <div className="flex items-center gap-4">
          <p className="text-[24px] leading-none font-bold text-[rgb(0,0,0)]">{PRICE}</p>
          <button
            type="button"
            className="h-[44px] w-[147px] rounded-[70px] border-2 border-[rgb(0,0,0)] bg-[#FFFFFF] text-[16px] font-bold text-[rgb(0,0,0)]"
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="h-[44px] w-[118px] rounded-[70px] bg-[rgb(23,187,239)] text-[16px] font-bold text-[#FFFFFF]"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
