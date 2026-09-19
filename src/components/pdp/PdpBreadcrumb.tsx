// Topology #0 on the d1204 (Liberty 5 Pro Max) PDP. Server component by design —
// it holds no state and must not be marked "use client".
//
// The trailing crumb is the product title, which uses U+FF5C FULLWIDTH VERTICAL
// LINE ("｜"), not ASCII "|" — see docs/research/components/pdp-core.spec.md #1.

type Crumb = {
  readonly label: string;
  readonly href: string;
};

const LINK_CRUMBS: readonly Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Earbuds", href: "https://www.ankernordics.com/collections/true-wireless-earbuds" },
];

const PRODUCT_TITLE = "Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case";

const LINK_CLASSES = "text-[#17BBEF]";

/** Breadcrumb strip sitting at the top of the PDP content wrapper. 17px tall. */
export function PdpBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="h-[17px]">
      <ol className="flex items-center text-[14px] leading-[16.8px] font-medium text-[rgb(0,0,0)]">
        {LINK_CRUMBS.map(({ label, href }) => (
          <li key={href} className="flex items-center">
            <a href={href} className={LINK_CLASSES}>
              {label}
            </a>
            <span className="px-1" aria-hidden="true">
              /
            </span>
          </li>
        ))}
        <li aria-current="page">{PRODUCT_TITLE}</li>
      </ol>
    </nav>
  );
}
