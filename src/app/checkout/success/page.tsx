"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Package, Truck, ArrowRight, ShieldCheck } from "lucide-react";
import { AnkerHeaderLockup } from "@/components/icons";
import { formatPrice } from "@/lib/cart-context";

interface OrderSummaryData {
  orderId: string;
  items: { id: string; title: string; price: string; quantity: number; colorLabel?: string }[];
  totalAmount: number;
  customer: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  paymentMethod: string;
  shippingMethod: string;
  date: string;
}

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<OrderSummaryData | null>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("last_anker_order");
      if (saved) {
        setOrder(JSON.parse(saved));
      } else {
        // Fallback demo order
        setOrder({
          orderId: `ANK-SE-${Math.floor(100000 + Math.random() * 900000)}`,
          items: [
            {
              id: "d1204",
              title: "Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case",
              price: "2 690 000 so'm",
              quantity: 1,
              colorLabel: "Midnight Black",
            },
          ],
          totalAmount: 2690000,
          customer: {
            name: "Alex Lindqvist",
            email: "alex.nordic@example.com",
            address: "Kungsgatan 44, 111 35 Stockholm, Sweden",
            phone: "+46 70 123 4567",
          },
          paymentMethod: "Klarna",
          shippingMethod: "standard",
          date: new Date().toLocaleDateString("en-SE"),
        });
      }
    } catch {
      // Ignore
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-16">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
          <Link href="/" aria-label="Anker Nordics Home" className="[&>svg]:w-[180px]">
            <AnkerHeaderLockup width={512} height={20} />
          </Link>
          <span className="text-xs font-semibold text-emerald-600">Order Confirmed</span>
        </div>
      </header>

      <main className="mx-auto mt-10 max-w-2xl px-4 sm:px-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xs sm:p-10 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="size-10" />
          </div>

          <p className="mt-4 text-xs font-bold tracking-wider text-[#17BBEF] uppercase">
            Order Confirmation
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Thank you for your order!
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Order #{order?.orderId || "ANK-SE-839210"} has been placed successfully.
          </p>

          {/* Demo Alert Box */}
          <div className="mt-6 rounded-xl border border-cyan-100 bg-cyan-50/60 p-4 text-xs text-left text-[#0c7ea5]">
            <p className="font-bold">✨ Demo Simulation Complete</p>
            <p className="mt-1 leading-relaxed">
              This was a demonstration checkout. No actual monetary transaction took place, and no real shipment will be dispatched. A simulated confirmation has been logged.
            </p>
          </div>

          {/* Order Details Grid */}
          {order && (
            <div className="mt-8 space-y-6 border-t border-gray-100 pt-6 text-left">
              <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
                <div>
                  <span className="font-bold text-gray-400 uppercase">Customer</span>
                  <p className="mt-1 font-semibold text-gray-900">{order.customer.name}</p>
                  <p className="text-gray-600">{order.customer.email}</p>
                  <p className="text-gray-600">{order.customer.phone}</p>
                </div>

                <div>
                  <span className="font-bold text-gray-400 uppercase">Shipping Address</span>
                  <p className="mt-1 text-gray-800">{order.customer.address}</p>
                  <p className="mt-1 font-semibold text-emerald-700">
                    Carrier: {order.shippingMethod === "express" ? "DHL Express Nordic" : "PostNord Tracked"}
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className="border-t border-gray-100 pt-4">
                <span className="text-xs font-bold text-gray-400 uppercase">Items Ordered</span>
                <div className="mt-2 divide-y divide-gray-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 text-xs">
                      <div>
                        <p className="font-bold text-gray-900">{item.title}</p>
                        {item.colorLabel && (
                          <p className="text-gray-500">Color: {item.colorLabel} · Qty: {item.quantity}</p>
                        )}
                      </div>
                      <span className="font-semibold text-gray-900">{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-sm font-bold">
                  <span>Total Amount Paid (Demo):</span>
                  <span className="text-base text-[#17BBEF]">{formatPrice(order.totalAmount)}</span>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800"
            >
              <span>Continue Browsing</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
