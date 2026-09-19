"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronRight, ShoppingBag, User } from "lucide-react";
import { MEGA_MENUS } from "@/lib/nav-data";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const { totalItems, openCart } = useCart();
  const { user, openAuthModal } = useAuth();

  if (!isOpen) return null;

  const toggleAccordion = (key: string) => {
    setExpandedMenu((prev) => (prev === key ? null : key));
  };

  const menuKeys = Object.keys(MEGA_MENUS);

  return (
    <div className="fixed inset-0 z-[200] min-[1440px]:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 right-0 flex w-full max-w-[360px] flex-col bg-white shadow-2xl transition-transform duration-300">
        {/* Top Header */}
        <div className="flex h-[60px] items-center justify-between border-b border-gray-100 px-6">
          <span className="text-base font-bold tracking-tight text-gray-900">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex size-9 items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X className="size-5 text-gray-600" />
          </button>
        </div>

        {/* Quick actions row */}
        <div className="flex items-center justify-around border-b border-gray-100 py-3 bg-gray-50/70 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              onClose();
              openCart();
            }}
            className="flex items-center gap-1.5 text-gray-700 hover:text-[#17BBEF]"
          >
            <ShoppingBag className="size-4" />
            <span>Cart ({totalItems})</span>
          </button>
          <div className="h-4 w-[1px] bg-gray-200" />
          <button
            type="button"
            onClick={() => {
              onClose();
              openAuthModal();
            }}
            className="flex items-center gap-1.5 text-gray-700 hover:text-[#17BBEF]"
          >
            <User className="size-4" />
            <span>{user ? user.name : "Sign In / Register"}</span>
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-1">
            {menuKeys.map((key) => {
              const menu = MEGA_MENUS[key];
              const isExpanded = expandedMenu === key;

              return (
                <div key={key} className="border-b border-gray-100 last:border-0 pb-1">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(key)}
                    className="flex w-full items-center justify-between py-3 text-left text-sm font-bold text-gray-900 transition-colors hover:text-[#17BBEF]"
                  >
                    <span>{key}</span>
                    <ChevronDown
                      className={`size-4 text-gray-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-[#17BBEF]" : ""
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="mb-3 space-y-4 pl-3 pt-1 border-l-2 border-[#17BBEF]/30 animate-in fade-in slide-in-from-top-1">
                      {menu.sidebarTabs.map((tab) => (
                        <div key={tab.id} className="space-y-1.5">
                          <div className="flex items-center justify-between pr-2">
                            <p className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                              {tab.name}
                            </p>
                            <Link
                              href={tab.viewMoreHref}
                              onClick={onClose}
                              className="text-[10px] font-semibold text-[#17BBEF]"
                            >
                              View All →
                            </Link>
                          </div>
                          <ul className="space-y-1">
                            {tab.products.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <Link
                                  href={item.href}
                                  onClick={onClose}
                                  className="flex items-center justify-between py-1 text-xs font-medium text-gray-700 hover:text-[#17BBEF]"
                                >
                                  <span className="line-clamp-1">{item.title}</span>
                                  {item.badges && item.badges.length > 0 && (
                                    <span className="ml-1 shrink-0 rounded-full bg-cyan-50 px-1.5 py-0.2 text-[9px] font-bold text-[#17BBEF]">
                                      {item.badges[0]}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {menu.bottomCta && (
                        <div className="pt-2 pr-2">
                          <Link
                            href={menu.bottomCta.href}
                            onClick={onClose}
                            className="flex w-full items-center justify-center rounded-lg bg-black py-2.5 text-xs font-bold text-white transition hover:bg-gray-800"
                          >
                            {menu.bottomCta.text}
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="border-t border-gray-100 bg-gray-50 p-4 text-xs text-gray-500">
          <p className="font-semibold text-gray-700">Anker Nordics Store</p>
          <p className="mt-0.5 text-[11px]">Free delivery on orders over 500 000 so&apos;m.</p>
        </div>
      </div>
    </div>
  );
}
