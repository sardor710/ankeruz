"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { type MegaMenuData } from "@/lib/nav-data";
import { ChevronRight } from "lucide-react";

interface MegaMenuProps {
  data: MegaMenuData;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}

export function MegaMenu({ data, isOpen, onMouseEnter, onMouseLeave, onClose }: MegaMenuProps) {
  const [activeTabId, setActiveTabId] = useState<string>(
    data.sidebarTabs[0]?.id || ""
  );

  // Sync active tab when menu data changes
  useEffect(() => {
    if (data.sidebarTabs.length > 0) {
      setActiveTabId(data.sidebarTabs[0].id);
    }
  }, [data]);

  if (!isOpen) return null;

  const currentTab =
    data.sidebarTabs.find((t) => t.id === activeTabId) || data.sidebarTabs[0];

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 z-50 w-full border-t border-gray-200/80 bg-white shadow-2xl transition-all duration-150 animate-in fade-in"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-6 min-[1920px]:px-[calc(50%-832px)]">
        <div className="flex gap-8">
          {/* Left Column: Vertical Subcategory Tabs */}
          <div className="flex w-[210px] shrink-0 flex-col justify-between border-r border-gray-100 pr-6">
            <div className="flex flex-col gap-1">
              {data.sidebarTabs.map((tab) => {
                const isActive = tab.id === currentTab?.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onMouseEnter={() => setActiveTabId(tab.id)}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-xs font-bold transition-colors ${
                      isActive
                        ? "bg-gray-100 text-black shadow-2xs"
                        : "text-gray-700 hover:bg-gray-50 hover:text-black"
                    }`}
                  >
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom-left Black Action Button */}
            {data.bottomCta && (
              <div className="pt-6">
                <Link
                  href={data.bottomCta.href}
                  onClick={onClose}
                  className="flex w-full items-center justify-center rounded-lg bg-black px-4 py-3 text-xs font-bold text-white transition hover:bg-gray-800"
                >
                  {data.bottomCta.text}
                </Link>
              </div>
            )}
          </div>

          {/* Right Column: Active Tab Title + 3-Column Product Grid */}
          <div className="flex-1 min-w-0">
            {currentTab && (
              <>
                {/* Header: Subcategory Title & View More link */}
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="text-base font-bold text-gray-900">{currentTab.name}</h3>
                  <Link
                    href={currentTab.viewMoreHref}
                    onClick={onClose}
                    className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-[#17BBEF]"
                  >
                    <span>View More</span>
                    <ChevronRight className="size-3.5" />
                  </Link>
                </div>

                {/* 3-Column Product Cards Grid */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {currentTab.products.map((product, idx) => (
                    <Link
                      key={idx}
                      href={product.href}
                      onClick={onClose}
                      className="group flex items-center gap-3.5 rounded-xl border border-transparent bg-[#F9FAFB] p-3 transition hover:border-gray-200 hover:bg-white hover:shadow-sm"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-white p-1.5 border border-gray-100">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          sizes="64px"
                          className="object-contain transition-transform duration-200 group-hover:scale-105"
                        />
                      </div>

                      {/* Details & Badges */}
                      <div className="flex-1 min-w-0">
                        {/* Badges row */}
                        {product.badges && product.badges.length > 0 && (
                          <div className="mb-1 flex flex-wrap items-center gap-1.5">
                            {product.badges.map((b, bIdx) => (
                              <span
                                key={bIdx}
                                className={`rounded-full px-2 py-0.2 text-[9px] font-bold tracking-tight leading-tight ${
                                  b === "Best Seller"
                                    ? "border border-amber-400 bg-amber-50 text-amber-900"
                                    : b === "Hot"
                                      ? "border border-red-400 bg-red-50 text-red-700"
                                      : "border border-gray-400 bg-white text-gray-800"
                                }`}
                              >
                                {b}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <p className="line-clamp-2 text-xs font-bold text-gray-900 transition-colors group-hover:text-[#17BBEF] leading-snug">
                          {product.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
