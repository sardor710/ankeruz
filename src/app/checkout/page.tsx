"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Lock,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Truck,
  Check,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { AnkerHeaderLockup } from "@/components/icons";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, formattedSubtotal, clearCart, freeShippingThreshold } = useCart();
  const { user } = useAuth();

  // Form State
  const [email, setEmail] = useState(user?.email || "alex.nordic@example.com");
  const [firstName, setFirstName] = useState(user ? user.name.split(" ")[0] : "Alex");
  const [lastName, setLastName] = useState(user ? user.name.split(" ").slice(1).join(" ") || "Lindqvist" : "Lindqvist");
  const [address, setAddress] = useState("Kungsgatan 44");
  const [city, setCity] = useState("Stockholm");
  const [postalCode, setPostalCode] = useState("111 35");
  const [country, setCountry] = useState("Sweden");
  const [phone, setPhone] = useState("+46 70 123 4567");

  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"klarna" | "card" | "swish" | "applepay">("klarna");

  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("789");

  const [isProcessing, setIsProcessing] = useState(false);

  const baseShipping = subtotal >= freeShippingThreshold ? 0 : 49000;
  const shippingCost = shippingMethod === "express" ? 99000 : baseShipping;
  const totalAmount = subtotal + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderData = {
      orderId: `ANK-SE-${Math.floor(100000 + Math.random() * 900000)}`,
      items,
      totalAmount,
      customer: {
        name: `${firstName} ${lastName}`,
        email,
        address: `${address}, ${postalCode} ${city}, ${country}`,
        phone,
      },
      paymentMethod,
      shippingMethod,
      date: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem("last_anker_order", JSON.stringify(orderData));
    } catch {
      // Ignore
    }

    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Checkout Minimal Top Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
          <Link href="/" aria-label="Anker Nordics Home" className="[&>svg]:w-[180px]">
            <AnkerHeaderLockup width={512} height={20} />
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
            <Lock className="size-4 text-emerald-600" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Area */}
      <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <h2 className="text-xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-sm text-gray-500">Please add items to your cart before proceeding to checkout.</p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#17BBEF] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#13a8d8]"
            >
              <ArrowLeft className="size-4" /> Return to Store
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Form Column (7 cols) */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmitOrder} className="space-y-8">
                {/* Breadcrumbs steps */}
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                  <Link href="/cart" className="text-[#17BBEF] hover:underline">
                    Cart
                  </Link>
                  <ChevronRight className="size-3 text-gray-300" />
                  <span className="text-gray-900">Information</span>
                  <ChevronRight className="size-3 text-gray-300" />
                  <span className="text-gray-900">Shipping</span>
                  <ChevronRight className="size-3 text-gray-300" />
                  <span className="text-gray-900">Payment</span>
                </div>

                {/* Demo Notice Banner */}
                <div className="flex items-start gap-3 rounded-xl border border-cyan-100 bg-cyan-50/70 p-4 text-xs leading-relaxed text-[#0c7ea5]">
                  <AlertCircle className="size-5 shrink-0 text-[#17BBEF]" />
                  <div>
                    <strong className="font-bold">Store Demo Mode:</strong> This checkout flow is in presentation mode. No actual charge will occur on your card or payment account. Feel free to complete the order test.
                  </div>
                </div>

                {/* Section 1: Contact Information */}
                <div>
                  <h2 className="text-base font-bold text-gray-900">Contact Information</h2>
                  <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#17BBEF] focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700">Mobile Phone (for PostNord SMS tracking)</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+46 70 123 4567"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#17BBEF] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Shipping Address */}
                <div>
                  <h2 className="text-base font-bold text-gray-900">Shipping Address</h2>
                  <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700">Country / Region</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#17BBEF] focus:outline-none"
                      >
                        <option value="Sweden">Sweden (Sverige)</option>
                        <option value="Norway">Norway (Norge)</option>
                        <option value="Denmark">Denmark (Danmark)</option>
                        <option value="Finland">Finland (Suomi)</option>
                      </select>
                    </div>

                    <div className="hidden sm:block" />

                    <div>
                      <label className="block text-xs font-semibold text-gray-700">First Name</label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Alex"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#17BBEF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700">Last Name</label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Lindqvist"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#17BBEF] focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700">Street Address</label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street and house number"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#17BBEF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700">Postal Code</label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="111 35"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#17BBEF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700">City</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Stockholm"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#17BBEF] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Shipping Method */}
                <div>
                  <h2 className="text-base font-bold text-gray-900">Delivery Method</h2>
                  <div className="mt-3 space-y-3">
                    <label
                      className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                        shippingMethod === "standard"
                          ? "border-[#17BBEF] bg-cyan-50/20 shadow-xs"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={shippingMethod === "standard"}
                          onChange={() => setShippingMethod("standard")}
                          className="size-4 text-[#17BBEF] focus:ring-[#17BBEF]"
                        />
                        <div>
                          <p className="text-sm font-bold text-gray-900">PostNord Tracked Home / Parcel Locker</p>
                          <p className="text-xs text-gray-500">2–4 business days delivery</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {baseShipping === 0 ? "FREE" : formatPrice(baseShipping)}
                      </span>
                    </label>

                    <label
                      className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                        shippingMethod === "express"
                          ? "border-[#17BBEF] bg-cyan-50/20 shadow-xs"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={shippingMethod === "express"}
                          onChange={() => setShippingMethod("express")}
                          className="size-4 text-[#17BBEF] focus:ring-[#17BBEF]"
                        />
                        <div>
                          <p className="text-sm font-bold text-gray-900">DHL Express Nordic Priority</p>
                          <p className="text-xs text-gray-500">Next business day guaranteed</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{formatPrice(99000)}</span>
                    </label>
                  </div>
                </div>

                {/* Section 4: Payment Method (Demo) */}
                <div>
                  <h2 className="text-base font-bold text-gray-900">Payment (Demo Simulation)</h2>
                  <div className="mt-3 space-y-3">
                    {/* Klarna option */}
                    <label
                      className={`block cursor-pointer rounded-xl border p-4 transition ${
                        paymentMethod === "klarna"
                          ? "border-[#17BBEF] bg-cyan-50/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === "klarna"}
                            onChange={() => setPaymentMethod("klarna")}
                            className="size-4 text-[#17BBEF] focus:ring-[#17BBEF]"
                          />
                          <span className="text-sm font-bold text-gray-900">Klarna (Pay in 30 Days / Direct)</span>
                        </div>
                        <span className="rounded bg-[#FFB3C7] px-2 py-0.5 text-xs font-black text-black">Klarna.</span>
                      </div>
                      {paymentMethod === "klarna" && (
                        <p className="mt-2 text-xs text-gray-600 pl-7">
                          Receive your order first, pay later with Klarna. No hidden interest or fees.
                        </p>
                      )}
                    </label>

                    {/* Credit Card option */}
                    <label
                      className={`block cursor-pointer rounded-xl border p-4 transition ${
                        paymentMethod === "card"
                          ? "border-[#17BBEF] bg-cyan-50/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === "card"}
                            onChange={() => setPaymentMethod("card")}
                            className="size-4 text-[#17BBEF] focus:ring-[#17BBEF]"
                          />
                          <span className="text-sm font-bold text-gray-900">Credit / Debit Card</span>
                        </div>
                        <CreditCard className="size-5 text-gray-500" />
                      </div>
                      {paymentMethod === "card" && (
                        <div className="mt-4 grid grid-cols-2 gap-3 pl-7">
                          <div className="col-span-2">
                            <label className="block text-[11px] font-semibold text-gray-600">Card Number (Demo)</label>
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="mt-1 w-full rounded border border-gray-300 px-3 py-1.5 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-600">Expiry</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="mt-1 w-full rounded border border-gray-300 px-3 py-1.5 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-600">CVC</label>
                            <input
                              type="text"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              className="mt-1 w-full rounded border border-gray-300 px-3 py-1.5 text-xs"
                            />
                          </div>
                        </div>
                      )}
                    </label>

                    {/* Swish option */}
                    <label
                      className={`block cursor-pointer rounded-xl border p-4 transition ${
                        paymentMethod === "swish"
                          ? "border-[#17BBEF] bg-cyan-50/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === "swish"}
                            onChange={() => setPaymentMethod("swish")}
                            className="size-4 text-[#17BBEF] focus:ring-[#17BBEF]"
                          />
                          <span className="text-sm font-bold text-gray-900">Swish / MobilePay</span>
                        </div>
                        <span className="rounded bg-sky-600 px-2 py-0.5 text-xs font-bold text-white">Swish</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#17BBEF] py-4 text-base font-bold text-white shadow-lg transition hover:bg-[#13a8d8] disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>Placing Demo Order...</span>
                    ) : (
                      <>
                        <ShieldCheck className="size-5" />
                        <span>Complete Demo Order ({formatPrice(totalAmount)})</span>
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-xs text-gray-400">
                    Your personal information is handled according to GDPR and Nordic e-commerce regulations.
                  </p>
                </div>
              </form>
            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-8 rounded-2xl border border-gray-100 bg-[#F9FAFB] p-6 shadow-xs">
                <h3 className="text-base font-bold text-gray-900">Order Summary</h3>

                {/* Line items list */}
                <div className="mt-4 max-h-[380px] divide-y divide-gray-200 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.color}`} className="flex items-center gap-4 py-3">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white p-1">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="64px"
                          className="object-contain"
                        />
                        <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="line-clamp-1 text-xs font-bold text-gray-900">{item.title}</p>
                        {item.colorLabel && (
                          <p className="text-[11px] text-gray-500">{item.colorLabel}</p>
                        )}
                      </div>
                      <span className="text-xs font-bold text-gray-900">
                        {formatPrice(item.numericPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotal breakdown */}
                <div className="mt-4 space-y-2.5 border-t border-gray-200 pt-4 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-gray-900">{formattedSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping:</span>
                    <span className="font-semibold text-gray-900">
                      {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Moms / VAT (25% included):</span>
                    <span>{formatPrice(totalAmount * 0.2)}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="mt-6 flex items-baseline justify-between border-t border-gray-200 pt-4">
                  <span className="text-base font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-black">{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
