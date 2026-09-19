"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart-context";

export function CartDrawer() {
  const {
    items,
    totalItems,
    formattedSubtotal,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    amountToFreeShipping,
    freeShippingProgress,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300">
        {/* Header */}
        <div className="flex h-[68px] items-center justify-between border-b border-gray-100 px-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-5 text-gray-900" />
            <h2 className="text-base font-bold text-gray-900">
              Shopping Cart ({totalItems})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex size-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-3.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
            <Truck className="size-4 text-[#17BBEF]" />
            {amountToFreeShipping === 0 ? (
              <span className="font-bold text-emerald-600">
                You&apos;ve unlocked FREE shipping! 🎉
              </span>
            ) : (
              <span>
                Add <strong className="text-black">{formatPrice(amountToFreeShipping)}</strong> more for FREE shipping
              </span>
            )}
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#17BBEF] transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <ShoppingBag className="size-8" />
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-900">Your cart is empty</h3>
              <p className="mt-1 max-w-xs text-xs text-gray-500">
                Explore our latest earbuds, fast chargers, security cameras, and smart home essentials.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-6 rounded-full bg-black px-6 py-2.5 text-xs font-bold text-white transition hover:bg-gray-800"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={`${item.id}-${item.color || "default"}`} className="flex gap-4 py-4">
                  {/* Thumbnail */}
                  <Link
                    href={item.href}
                    onClick={closeCart}
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

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={item.href}
                          onClick={closeCart}
                          className="line-clamp-2 text-xs font-bold text-gray-900 hover:text-[#17BBEF]"
                        >
                          {item.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id, item.color)}
                          className="text-gray-400 hover:text-red-500"
                          title="Remove item"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      {item.colorLabel && (
                        <p className="mt-1 text-[11px] text-gray-500">
                          Color: <span className="font-medium text-gray-700">{item.colorLabel}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity selector */}
                      <div className="flex items-center rounded-full border border-gray-200 bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                          className="flex size-7 items-center justify-center text-gray-500 hover:text-black"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                          className="flex size-7 items-center justify-center text-gray-500 hover:text-black"
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xs font-bold text-black">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 bg-white p-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-600">Subtotal:</span>
              <span className="text-lg font-bold text-black">{formattedSubtotal}</span>
            </div>
            <p className="mt-1 text-[11px] text-gray-500">
              Taxes and shipping calculated at checkout.
            </p>

            <div className="mt-5 flex flex-col gap-2.5">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#17BBEF] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#13a8d8]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="flex w-full items-center justify-center rounded-full border border-gray-200 py-2.5 text-xs font-bold text-gray-700 transition hover:bg-gray-50"
              >
                View Full Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
