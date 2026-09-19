"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Star,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  ChevronDown,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { type DetailedProduct } from "@/lib/products-data";
import { useCart } from "@/lib/cart-context";
import { PdpOverviewSubNav } from "./PdpOverviewSubNav";
import { PdpOverviewHero } from "./PdpOverviewHero";
import { PdpPureSilenceSection } from "./PdpPureSilenceSection";
import { PdpCallsAndChipSection } from "./PdpCallsAndChipSection";
import { PdpComparisonTable } from "./PdpComparisonTable";
import { PdpReviewsSection } from "./PdpReviewsSection";

interface ProductDetailClientProps {
  product: DetailedProduct;
  relatedProducts: DetailedProduct[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();

  const [selectedColor, setSelectedColor] = useState(product.colors[0] || null);
  const [activeImage, setActiveImage] = useState(product.mainImage);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>("specs");
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Sync color image
  const handleColorSelect = (color: typeof product.colors[0]) => {
    setSelectedColor(color);
    if (color.image) {
      setActiveImage(color.image);
    }
  };

  // Scroll listener for sticky bottom bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        slug: product.slug,
        title: product.title,
        price: product.price,
        numericPrice: product.numericPrice,
        image: selectedColor?.image || product.mainImage,
        color: selectedColor?.key,
        colorLabel: selectedColor?.label,
        href: `/products/${product.slug}`,
      },
      quantity
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb Bar */}
      <div className="border-b border-gray-100 bg-[#FBFBFB]">
        <div className="mx-auto max-w-[1440px] px-4 py-3 min-[768px]:px-8 min-[1024px]:px-16 min-[1920px]:px-[calc(50%-832px)]">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-500">{product.category}</span>
            <span>/</span>
            <span className="line-clamp-1 font-semibold text-gray-900">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="mx-auto max-w-[1440px] px-4 py-10 min-[768px]:px-8 min-[1024px]:px-16 min-[1920px]:px-[calc(50%-832px)]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Product Gallery (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex flex-col-reverse gap-4 sm:flex-row">
              {/* Thumbnail Rail */}
              <div className="flex gap-3 overflow-x-auto sm:flex-col sm:overflow-y-auto sm:max-h-[580px] pr-2">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative size-18 shrink-0 overflow-hidden rounded-xl border bg-gray-50 p-2 transition ${
                      activeImage === img
                        ? "border-[#17BBEF] ring-2 ring-[#17BBEF]/20"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} view ${idx + 1}`}
                      fill
                      sizes="72px"
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>

              {/* Main Stage Image */}
              <div className="relative aspect-square flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-[#F9FAFB] p-8">
                {product.discountPill && (
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-xs">
                    {product.discountPill}
                  </span>
                )}
                <Image
                  src={activeImage}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Buy Box (5 cols) */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              {/* Brand label */}
              <span className="text-xs font-bold tracking-wider text-[#17BBEF] uppercase">
                {product.brandDisplay}
              </span>

              {/* Product Title */}
              <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>

              {/* Subtitle */}
              <p className="mt-2 text-sm text-gray-500">{product.subtitle}</p>

              {/* Star Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-900">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviewCount} customer reviews)</span>
              </div>

              {/* Price & Discounts */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-black">{product.price}</span>
                {product.wasPrice && (
                  <span className="text-lg text-gray-400 line-through">{product.wasPrice}</span>
                )}
                {product.discountPill && (
                  <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-600">
                    Save {product.discountPill}
                  </span>
                )}
              </div>

              {/* Installment note */}
              <div className="mt-3 rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
                <span>Flexible installment options available from </span>
                <strong className="font-semibold text-black">
                  {Math.round(product.numericPrice / 4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so&apos;m/month
                </strong>.
              </div>

              {/* Colorway Selection */}
              {product.colors.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                    <span>
                      Color: <strong className="text-black">{selectedColor?.label}</strong>
                    </span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-3">
                    {product.colors.map((color) => {
                      const isSelected = selectedColor?.key === color.key;
                      return (
                        <button
                          key={color.key}
                          type="button"
                          onClick={() => handleColorSelect(color)}
                          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                            isSelected
                              ? "border-[#17BBEF] bg-cyan-50/50 text-[#17BBEF] ring-2 ring-[#17BBEF]/20"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          <span
                            className="size-3.5 rounded-full border border-gray-300"
                            style={{ backgroundColor: color.hex || "#000" }}
                          />
                          <span>{color.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity & Stock */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700">Quantity</span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>In Stock ({product.stockCount} left)</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center rounded-full border border-gray-200 bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="flex size-9 items-center justify-center text-gray-500 hover:text-black"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-gray-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="flex size-9 items-center justify-center text-gray-500 hover:text-black"
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-black bg-white py-3.5 text-sm font-bold text-black transition hover:bg-black hover:text-white"
                >
                  <ShoppingBag className="size-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#17BBEF] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#13a8d8]"
                >
                  <Zap className="size-4" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Feature highlights */}
              <div className="mt-8 border-t border-gray-100 pt-6">
                <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                  Key Features
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed text-gray-700">
                      <Check className="size-4 shrink-0 text-[#17BBEF]" />
                      <span>
                        <strong className="font-bold text-black">{h.title}: </strong>
                        {h.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Confidence guarantees */}
              <div className="mt-8 grid grid-cols-3 gap-3 rounded-xl bg-gray-50 p-4 text-center text-[11px] text-gray-600">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="size-4 text-[#17BBEF]" />
                  <span className="font-bold text-black">Free Shipping</span>
                  <span>Over 500 000 so&apos;m</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="size-4 text-[#17BBEF]" />
                  <span className="font-bold text-black">18-Mo Warranty</span>
                  <span>Official Nordic</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="size-4 text-[#17BBEF]" />
                  <span className="font-bold text-black">30-Day Returns</span>
                  <span>Money-back</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Sub-Navigation Bar */}
      <PdpOverviewSubNav product={product} />

      {/* Flagship Editorial Overview Section 1: AI Note-Taker & Smart Screen */}
      <PdpOverviewHero />

      {/* Flagship Editorial Overview Section 2: Instant Pure Silence (Adaptive ANC 3.0) */}
      <PdpPureSilenceSection />

      {/* Flagship Editorial Overview Section 3: Whisper-Clear Calls & Thus AI Chip */}
      <PdpCallsAndChipSection />

      {/* Flagship Editorial Overview Section 4: Specifications & What's in the Box */}
      <div id="specs" className="border-t border-gray-100 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 min-[768px]:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold tracking-widest text-[#17BBEF] uppercase">
              Full Details
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
              Product Specifications & Packaging
            </h2>
          </div>

          <div className="space-y-4">
            {/* Tech Specs */}
            <div className="rounded-xl border border-gray-200 overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setOpenAccordion((prev) => (prev === "specs" ? null : "specs"))}
                className="flex w-full items-center justify-between bg-white px-6 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50"
              >
                <span>Technical Specifications</span>
                <ChevronDown
                  className={`size-4 text-gray-500 transition-transform ${
                    openAccordion === "specs" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "specs" && (
                <div className="border-t border-gray-100 bg-[#FAFAFA] p-6 text-xs animate-in fade-in">
                  <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between border-b border-gray-200/60 pb-2">
                        <dt className="font-medium text-gray-500">{key}:</dt>
                        <dd className="font-bold text-gray-900">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>

            {/* What's In The Box */}
            <div className="rounded-xl border border-gray-200 overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setOpenAccordion((prev) => (prev === "box" ? null : "box"))}
                className="flex w-full items-center justify-between bg-white px-6 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50"
              >
                <span>What&apos;s in the Box</span>
                <ChevronDown
                  className={`size-4 text-gray-500 transition-transform ${
                    openAccordion === "box" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "box" && (
                <div className="border-t border-gray-100 bg-[#FAFAFA] p-6 text-xs animate-in fade-in">
                  <ul className="space-y-2">
                    {product.whatsInTheBox.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <Check className="size-3.5 text-emerald-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Shipping & Warranty */}
            <div className="rounded-xl border border-gray-200 overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setOpenAccordion((prev) => (prev === "shipping" ? null : "shipping"))}
                className="flex w-full items-center justify-between bg-white px-6 py-4 text-left text-sm font-bold text-gray-900 hover:bg-gray-50"
              >
                <span>Shipping & Warranty Information</span>
                <ChevronDown
                  className={`size-4 text-gray-500 transition-transform ${
                    openAccordion === "shipping" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "shipping" && (
                <div className="border-t border-gray-100 bg-[#FAFAFA] p-6 text-xs space-y-3 animate-in fade-in text-gray-700">
                  <p><strong>Shipping: </strong>{product.shippingInfo}</p>
                  <p><strong>Warranty: </strong>{product.warrantyInfo}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Flagship Editorial Overview Section 5: Comparison Matrix */}
      <PdpComparisonTable />

      {/* Flagship Editorial Overview Section 6: Verified Customer Reviews & FAQ */}
      <PdpReviewsSection />

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-100 bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-4 min-[768px]:px-8 min-[1024px]:px-16 min-[1920px]:px-[calc(50%-832px)]">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              You May Also Like
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.slug}`}
                  className="group flex flex-col rounded-2xl border border-gray-100 bg-[#F9FAFB] p-5 transition hover:border-gray-200 hover:shadow-md"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white p-4">
                    <Image
                      src={rel.mainImage}
                      alt={rel.title}
                      fill
                      sizes="220px"
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex flex-1 flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-[#17BBEF] uppercase">
                        {rel.brandDisplay}
                      </span>
                      <h3 className="line-clamp-2 mt-1 text-xs font-bold text-gray-900 group-hover:text-[#17BBEF]">
                        {rel.title}
                      </h3>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-extrabold text-black">{rel.price}</span>
                      <span className="text-xs font-semibold text-[#17BBEF] group-hover:underline">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Buy Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 z-40 w-full border-t border-gray-200 bg-white/95 py-3.5 backdrop-blur-md shadow-2xl transition-all animate-in slide-in-from-bottom-2">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 min-[768px]:px-8 min-[1024px]:px-16 min-[1920px]:px-[calc(50%-832px)]">
            <div className="flex items-center gap-3">
              <div className="relative size-12 overflow-hidden rounded-lg bg-gray-50">
                <Image
                  src={selectedColor?.image || product.mainImage}
                  alt={product.title}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <p className="line-clamp-1 max-w-md text-xs font-bold text-gray-900">{product.title}</p>
                <p className="text-[11px] text-gray-500">{selectedColor?.label || product.brandDisplay}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-base font-bold text-black sm:text-xl">{product.price}</span>
              <button
                type="button"
                onClick={handleAddToCart}
                className="rounded-full bg-[#17BBEF] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#13a8d8]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
