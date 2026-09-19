"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { type DetailedProduct } from "@/lib/products-data";

interface PdpOverviewSubNavProps {
  product: DetailedProduct;
}

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "pure-silence", label: "Instant Pure Silence" },
  { id: "clear-calls", label: "Whisper-Clear Calls" },
  { id: "smart-screen", label: "Smart Screen" },
  { id: "specs", label: "Specs" },
  { id: "compare", label: "Compare" },
  { id: "reviews", label: "Reviews" },
];

export function PdpOverviewSubNav({ product }: PdpOverviewSubNavProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const { addItem } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop - 180;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleQuickAdd = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      numericPrice: product.numericPrice,
      image: product.mainImage,
      href: `/products/${product.slug}`,
    });
  };

  return (
    <div className="sticky top-[96px] z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 min-[768px]:px-8 min-[1024px]:px-16 min-[1920px]:px-[calc(50%-832px)]">
        {/* Navigation jump links */}
        <div className="flex items-center gap-6 overflow-x-auto py-3 scrollbar-none">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={`relative whitespace-nowrap text-xs font-bold transition-colors ${
                  isActive ? "text-[#17BBEF]" : "text-gray-600 hover:text-black"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-3 left-0 h-[2px] w-full bg-[#17BBEF]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Quick price + buy button */}
        <div className="hidden items-center gap-4 py-2 sm:flex shrink-0">
          <span className="text-sm font-extrabold text-black">{product.price}</span>
          <button
            type="button"
            onClick={handleQuickAdd}
            className="rounded-full bg-[#17BBEF] px-5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#13a8d8]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
