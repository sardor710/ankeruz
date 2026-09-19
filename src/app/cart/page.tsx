"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  Tag,
  Check,
  X,
} from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart-context";
import { formatSom } from "@/lib/currency";
import { TopBrandBar } from "@/components/TopBrandBar";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { INITIAL_FUSION_DISCOUNTS, type FusionDiscount } from "@/lib/cms/fusion-cms";
import {
  calculateCartDiscount,
  validateDiscount,
  formatCurrency,
  type CartLineItem,
} from "@/lib/discounts/discount-engine";

export default function CartPage() {
  const {
    items,
    totalItems,
    subtotal,
    formattedSubtotal,
    removeItem,
    updateQuantity,
    clearCart,
    freeShippingThreshold,
    amountToFreeShipping,
    freeShippingProgress,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<FusionDiscount | null>(null);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [allDiscounts, setAllDiscounts] = useState<FusionDiscount[]>(INITIAL_FUSION_DISCOUNTS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("fusion_discounts");
      if (stored) {
        setAllDiscounts(JSON.parse(stored));
      }
    } catch {}
  }, []);

  // Map cart items for discount evaluation
  const cartLineItems: CartLineItem[] = items.map((item) => ({
    id: item.id,
    slug: item.id,
    title: item.title,
    numericPrice: item.numericPrice ?? (Number(String(item.price).replace(/[^0-9.]/g, "")) || 0),
    quantity: item.quantity,
    category: item.title.toLowerCase().includes("liberty") || item.title.toLowerCase().includes("soundcore")
      ? "Audio & Headphones"
      : item.title.toLowerCase().includes("prime") || item.title.toLowerCase().includes("charger")
      ? "Charging & Power"
      : "Smart Home & Security",
  }));

  const discountSummary = calculateCartDiscount(cartLineItems, appliedDiscount);
  const discountAmount = discountSummary.totalDiscountAmount;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 49000;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");

    const input = promoCode.trim().toUpperCase();
    if (!input) return;

    let found = allDiscounts.find((d) => d.code.toUpperCase() === input);
    if (!found) {
      if (input === "ANKER10" || input === "NORDIC10") {
        found = {
          id: "legacy-anker10",
          code: input,
          title: "Nordic Explorer 10% Off",
          type: "percentage",
          value: 10,
          scope: "storewide",
          status: "active",
          usedCount: 14,
          createdAt: "2026-01-01",
          updatedAt: "2026-01-01",
        };
      } else if (input === "SAVE20") {
        found = {
          id: "legacy-save20",
          code: "SAVE20",
          title: "Nordic VIP 20% Off",
          type: "percentage",
          value: 20,
          scope: "storewide",
          status: "active",
          usedCount: 22,
          createdAt: "2026-01-01",
          updatedAt: "2026-01-01",
        };
      }
    }

    if (!found) {
      setPromoError("Invalid promotional code. Try NORDIC20 or SOUNDCORE15");
      setAppliedDiscount(null);
      return;
    }

    const validation = validateDiscount(found, subtotal);
    if (!validation.isValid) {
      setPromoError(validation.reason || "This discount cannot be applied to your order.");
      setAppliedDiscount(null);
      return;
    }

    const calc = calculateCartDiscount(cartLineItems, found);
    if (calc.totalDiscountAmount === 0 && subtotal > 0) {
      setPromoError(
        found.scope === "category"
          ? `This code only applies to eligible categories.`
          : found.scope === "product"
          ? `This code only applies to specific promotional products.`
          : `No items in your cart qualify for this promotion.`
      );
      setAppliedDiscount(null);
      return;
    }

    setAppliedDiscount(found);
    setPromoSuccess(
      `${found.title} applied! You saved ${formatCurrency(calc.totalDiscountAmount)}.`
    );
  };

  const handleRemovePromo = () => {
    setAppliedDiscount(null);
    setPromoCode("");
    setPromoSuccess("");
    setPromoError("");
  };

  return (
    <>
      <TopBrandBar />
      <AnnouncementBar />
      <SiteHeader />

      <main className="min-h-[70vh] bg-[#F7F8FA] pb-16">
        <div className="mx-auto max-w-[1440px] px-4 py-8 min-[768px]:px-8 min-[1024px]:px-16 min-[1920px]:px-[calc(50%-832px)]">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-black">Shopping Cart</span>
          </nav>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
          </h1>

          {items.length === 0 ? (
            /* Empty Cart */
            <div className="mt-8 flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-xs">
              <div className="flex size-20 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                <ShoppingBag className="size-10" />
              </div>
              <h2 className="mt-6 text-xl font-bold text-gray-900">Your cart is currently empty</h2>
              <p className="mt-2 max-w-md text-sm text-gray-500">
                Looks like you haven&apos;t added any items yet. Discover high-fidelity earbuds, fast GaN chargers, solar security cameras, and smart home appliances.
              </p>
              <Link
                href="/products/d1204"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#17BBEF] px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#13a8d8]"
              >
                <span>Start Shopping</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : (
            /* Cart Layout */
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Left Column: Line Items (8 cols) */}
              <div className="space-y-6 lg:col-span-8">
                {/* Free shipping banner */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <Truck className="size-5 text-[#17BBEF]" />
                    {amountToFreeShipping === 0 ? (
                      <span className="font-bold text-emerald-600">
                        You have unlocked FREE standard shipping! 🎉
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-black">{formatPrice(amountToFreeShipping)}</strong> more to your order for FREE shipping
                      </span>
                    )}
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-[#17BBEF] transition-all duration-300"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Items Container */}
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xs">
                  <div className="hidden border-b border-gray-100 px-6 py-4 text-xs font-bold tracking-wider text-gray-400 uppercase sm:grid sm:grid-cols-12 sm:gap-4">
                    <span className="sm:col-span-6">Product</span>
                    <span className="text-center sm:col-span-3">Quantity</span>
                    <span className="text-right sm:col-span-3">Total</span>
                  </div>

                  <div className="divide-y divide-gray-100 px-6">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.color || "def"}`}
                        className="py-6 sm:grid sm:grid-cols-12 sm:items-center sm:gap-4"
                      >
                        {/* Product Info (6 cols) */}
                        <div className="flex gap-4 sm:col-span-6">
                          <Link
                            href={item.href}
                            className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-gray-50 p-2"
                          >
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="80px"
                              className="object-contain"
                            />
                          </Link>
                          <div className="flex flex-col justify-center">
                            <Link
                              href={item.href}
                              className="text-sm font-bold text-gray-900 transition hover:text-[#17BBEF]"
                            >
                              {item.title}
                            </Link>
                            {item.colorLabel && (
                              <p className="mt-1 text-xs text-gray-500">
                                Color: <span className="font-semibold text-gray-700">{item.colorLabel}</span>
                              </p>
                            )}
                            <button
                              type="button"
                              onClick={() => removeItem(item.id, item.color)}
                              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-gray-400 transition hover:text-red-600 sm:hidden"
                            >
                              <Trash2 className="size-3.5" /> Remove
                            </button>
                          </div>
                        </div>

                        {/* Quantity Controls (3 cols) */}
                        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:col-span-3 sm:justify-center">
                          <div className="flex items-center rounded-full border border-gray-200 bg-white">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                              className="flex size-8 items-center justify-center text-gray-500 hover:text-black"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                              className="flex size-8 items-center justify-center text-gray-500 hover:text-black"
                              aria-label="Increase quantity"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id, item.color)}
                            className="hidden text-gray-400 hover:text-red-500 sm:block sm:ml-3"
                            title="Remove"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>

                        {/* Line Total (3 cols) */}
                        <div className="mt-2 text-right font-bold text-gray-900 sm:mt-0 sm:col-span-3">
                          {formatPrice(item.numericPrice * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions row */}
                  <div className="flex flex-wrap items-center justify-between border-t border-gray-100 bg-gray-50/60 px-6 py-4">
                    <Link
                      href="/"
                      className="text-xs font-bold text-gray-700 hover:text-[#17BBEF]"
                    >
                      ← Continue Shopping
                    </Link>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs font-medium text-gray-400 hover:text-red-600"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-xs sm:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="size-6 text-[#17BBEF]" />
                    <div className="text-xs">
                      <p className="font-bold text-gray-900">18-Month Warranty</p>
                      <p className="text-gray-500">Official Nordic guarantee</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="size-6 text-[#17BBEF]" />
                    <div className="text-xs">
                      <p className="font-bold text-gray-900">30-Day Free Returns</p>
                      <p className="text-gray-500">Hassle-free refunds</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="size-6 text-[#17BBEF]" />
                    <div className="text-xs">
                      <p className="font-bold text-gray-900">Nordic Express</p>
                      <p className="text-gray-500">PostNord delivery 2-4 days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary (4 cols) */}
              <div className="space-y-6 lg:col-span-4">
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs">
                  <h2 className="text-base font-bold text-gray-900">Order Summary</h2>

                  <div className="mt-4 space-y-3 border-b border-gray-100 pb-4 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span className="font-semibold text-gray-900">{formattedSubtotal}</span>
                    </div>

                    {discountAmount > 0 && appliedDiscount && (
                      <div className="flex justify-between items-center text-emerald-600 font-medium">
                        <div className="flex items-center gap-1.5">
                          <span>
                            Promo ({appliedDiscount.code}):
                          </span>
                          <span className="text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded font-bold uppercase">
                            {appliedDiscount.type === "percentage" ? `-${appliedDiscount.value}%` : `-${formatSom(appliedDiscount.value)}`}
                          </span>
                        </div>
                        <span className="font-bold">-{formatCurrency(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-600">
                      <span>Shipping:</span>
                      <span className="font-semibold text-gray-900">
                        {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Estimated VAT (25% included):</span>
                      <span>{formatPrice(finalTotal * 0.2)}</span>
                    </div>
                  </div>

                  {/* Promo Code Form */}
                  <form onSubmit={handleApplyPromo} className="mt-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-gray-700">Promo Code</label>
                      {appliedDiscount && (
                        <button
                          type="button"
                          onClick={handleRemovePromo}
                          className="text-[11px] font-bold text-red-500 hover:underline flex items-center gap-1"
                        >
                          <X className="size-3" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    <div className="mt-1 flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute top-2.5 left-2.5 size-4 text-gray-400" />
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Try: NORDIC20 or SOUNDCORE15"
                          disabled={!!appliedDiscount}
                          className="w-full rounded-lg border border-gray-200 py-2 pr-3 pl-8 text-xs uppercase focus:border-[#17BBEF] focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
                        />
                      </div>
                      {!appliedDiscount ? (
                        <button
                          type="submit"
                          className="rounded-lg bg-gray-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-black"
                        >
                          Apply
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleRemovePromo}
                          className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    {promoSuccess && (
                      <p className="mt-1.5 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        <Check className="size-3.5" />
                        <span>{promoSuccess}</span>
                      </p>
                    )}
                    {promoError && (
                      <p className="mt-1.5 text-xs font-medium text-red-500">{promoError}</p>
                    )}
                  </form>

                  {/* Total */}
                  <div className="mt-6 flex items-baseline justify-between border-t border-gray-100 pt-4">
                    <div>
                      <span className="text-base font-bold text-gray-900">Total:</span>
                      <span className="ml-1 text-xs text-gray-500">(Moms included)</span>
                    </div>
                    <span className="text-2xl font-bold text-black">{formatPrice(finalTotal)}</span>
                  </div>

                  {/* Checkout CTA */}
                  <Link
                    href="/checkout"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#17BBEF] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#13a8d8]"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="size-4" />
                  </Link>

                  {/* Payment Icons */}
                  <div className="mt-6 text-center">
                    <p className="text-[11px] font-medium text-gray-400">Guaranteed Safe & Secure Checkout</p>
                    <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-400">
                      <span className="rounded bg-gray-100 px-2 py-1 font-bold text-gray-600">Klarna</span>
                      <span className="rounded bg-gray-100 px-2 py-1 font-bold text-gray-600">Swish</span>
                      <span className="rounded bg-gray-100 px-2 py-1 font-bold text-gray-600">Visa</span>
                      <span className="rounded bg-gray-100 px-2 py-1 font-bold text-gray-600">Apple Pay</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
