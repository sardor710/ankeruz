"use client";

/**
 * SiteHeader — 1:1 clone of the ankernordics.com header shell.
 *
 * Enhanced with:
 * - Interactive MegaMenu dropdown flyouts on hover & focus
 * - Shopping cart drawer toggle + live badge count
 * - User account / demo authentication modal trigger
 * - Mobile responsive navigation drawer
 */

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  AnkerHeaderLockup,
  CartIcon,
  ChevronDownIcon,
  MenuIcon,
  SearchIcon,
  UserProfileIcon,
} from "@/components/icons";
import { MEGA_MENUS } from "@/lib/nav-data";
import { MegaMenu } from "@/components/MegaMenu";
import { MobileNavDrawer } from "@/components/MobileNavDrawer";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

/** Site-standard gutter container, repeated inside each header variant. */
const GUTTER =
  "mx-auto size-full px-4 min-[768px]:px-8 min-[1024px]:px-16 min-[1440px]:px-16 min-[1920px]:px-[calc(50%-832px)] min-[1920px]:max-w-full";

/** Shared class string for every circular-free, chrome-free header icon button. */
const ICON_BUTTON = "relative cursor-pointer border-0 bg-transparent p-0";

/** Left-hand product categories. Verbatim from source, incl. the site's own typo. */
const CATEGORY_NAV_ITEMS = [
  "Security Cameras",
  "Robot Vaccums",
  "Charging",
  "Headphones",
  "Speakers",
  "Projectors",
  "Baby",
] as const;

/** Right-hand utility entries. Verbatim from source. */
const UTILITY_NAV_ITEMS = [
  "Deals",
  "New Release",
  "About Anker Nordics",
  "Help and Support",
] as const;

/**
 * Home link + full-width Anker lockup, shared by both header variants.
 */
function HomeLogoLink() {
  return (
    <Link href="/" aria-label="Home" className="[&>svg]:w-full">
      <AnkerHeaderLockup width={512} height={20} />
    </Link>
  );
}

export function SiteHeader() {
  const [activeMenuKey, setActiveMenuKey] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { totalItems, openCart } = useCart();
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const handleMouseEnter = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenuKey(label);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenuKey(null);
    }, 180);
  };

  const activeMenuData = activeMenuKey ? MEGA_MENUS[activeMenuKey] : null;

  return (
    <>
      <div className="sticky top-[45px] z-[53]">
        <header
          id="header"
          className="sticky top-0 z-[100] transition-transform duration-500 ease-in-out"
        >
          <div className="bg-white text-black transition-all duration-500 ease-in-out">
            {/* Full variant — visible on laptops and desktops (>=1024px). Two rows: logo, then nav. */}
            <div className="relative z-10 hidden h-[96px] w-full bg-white! min-[1024px]:block">
              <div className={GUTTER}>
                <div className="flex h-full flex-col justify-end gap-3 min-[1440px]:gap-4">
                  {/* Top Bar: Logo + Utility icons */}
                  <div className="flex items-center justify-between">
                    <HomeLogoLink />
                    <div className="flex items-center gap-4 min-[1440px]:gap-6">
                      <Link
                        href="/products/d1204"
                        aria-label="Search products"
                        className={ICON_BUTTON}
                      >
                        <span className="size-5">
                          <SearchIcon className="size-full" />
                        </span>
                      </Link>

                      {/* Shopping Cart Trigger */}
                      <button
                        type="button"
                        onClick={openCart}
                        aria-label={`Shopping cart with ${totalItems} items`}
                        className={ICON_BUTTON}
                      >
                        <span className="relative block size-5">
                          <CartIcon className="size-full" />
                          {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2.5 flex min-w-4 h-4 items-center justify-center rounded-full bg-[#17BBEF] px-1 text-[10px] font-bold text-white shadow-xs">
                              {totalItems}
                            </span>
                          )}
                        </span>
                      </button>

                      {/* User Profile / Auth Modal Trigger */}
                      <button
                        type="button"
                        onClick={openAuthModal}
                        aria-label="User profile"
                        className={ICON_BUTTON}
                      >
                        <span className="relative block size-5">
                          <UserProfileIcon className="size-full" />
                          {isAuthenticated && (
                            <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                          )}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Nav row: Category triggers & Utility triggers */}
                  <nav
                    aria-label="Primary navigation"
                    className="flex justify-between overflow-x-auto scrollbar-none"
                  >
                    {/* Left Category triggers */}
                    <div className="flex gap-2 min-[1280px]:gap-3 shrink-0">
                      {CATEGORY_NAV_ITEMS.map((label) => (
                        <div
                          key={label}
                          onMouseEnter={() => handleMouseEnter(label)}
                          onMouseLeave={handleMouseLeave}
                          className="group"
                        >
                          <div className="relative">
                            <button
                              type="button"
                              aria-label={label}
                              className="flex cursor-pointer items-center gap-1 border-0 bg-transparent pb-3.5"
                            >
                              <span className="text-pretty text-xs min-[1280px]:text-sm font-bold leading-[1.4] tracking-[-0.02em] whitespace-nowrap">
                                {label}
                              </span>
                              <ChevronDownIcon
                                className={`size-3.5 min-[1280px]:size-4 transition-all duration-300 ${
                                  activeMenuKey === label
                                    ? "rotate-180 opacity-100 text-[#17BBEF]"
                                    : "opacity-0 group-hover:opacity-100"
                                }`}
                              />
                            </button>
                            <div
                              className={`absolute bottom-0 left-0 h-[2px] bg-[#080A0F] transition-all duration-300 ${
                                activeMenuKey === label ? "w-full bg-[#17BBEF]" : "w-0 group-hover:w-full"
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right Utility triggers */}
                    <div className="flex gap-2 min-[1280px]:gap-3 shrink-0">
                      {UTILITY_NAV_ITEMS.map((label) => (
                        <div
                          key={label}
                          onMouseEnter={() => handleMouseEnter(label)}
                          onMouseLeave={handleMouseLeave}
                          className="group"
                        >
                          <div className="relative">
                            <button
                              type="button"
                              aria-label={label}
                              className="flex cursor-pointer items-center gap-1 border-0 bg-transparent pb-3.5"
                            >
                              <span className="text-pretty text-xs min-[1280px]:text-sm font-bold leading-[1.4] tracking-[-0.02em] whitespace-nowrap">
                                {label}
                              </span>
                              <ChevronDownIcon
                                className={`size-3.5 min-[1280px]:size-4 transition-all duration-300 ${
                                  activeMenuKey === label
                                    ? "rotate-180 opacity-100 text-[#17BBEF]"
                                    : "opacity-0 group-hover:opacity-100"
                                }`}
                              />
                            </button>
                            <div
                              className={`absolute bottom-0 left-0 h-[2px] bg-[#080A0F] transition-all duration-300 ${
                                activeMenuKey === label ? "w-full bg-[#17BBEF]" : "w-0 group-hover:w-full"
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>

              {/* Desktop Mega Menu flyout */}
              {activeMenuData && (
                <MegaMenu
                  data={activeMenuData}
                  isOpen={!!activeMenuKey}
                  onMouseEnter={() => {
                    if (closeTimeoutRef.current) {
                      clearTimeout(closeTimeoutRef.current);
                      closeTimeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={handleMouseLeave}
                  onClose={() => setActiveMenuKey(null)}
                />
              )}
            </div>

            {/* Compact variant — visible at <1024px. Two rows: logo/actions on row 1, horizontal category bar on row 2. */}
            <div className="relative z-10 block w-full bg-white! min-[1024px]:hidden">
              <div className={GUTTER}>
                <div className="flex h-[52px] items-center justify-between gap-4">
                  <HomeLogoLink />
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                      <Link
                        href="/products/d1204"
                        aria-label="Search"
                        className={ICON_BUTTON}
                      >
                        <SearchIcon className="size-5" />
                      </Link>

                      <button
                        type="button"
                        onClick={openCart}
                        aria-label={`Shopping cart with ${totalItems} items`}
                        className={ICON_BUTTON}
                      >
                        <span className="relative block size-5">
                          <CartIcon className="size-full" />
                          {totalItems > 0 && (
                            <span className="absolute -top-1.5 -right-2 flex size-3.5 items-center justify-center rounded-full bg-[#17BBEF] text-[9px] font-bold text-white">
                              {totalItems}
                            </span>
                          )}
                        </span>
                      </button>
                    </div>

                    {/* Mobile Hamburger menu button */}
                    <button
                      type="button"
                      onClick={() => setIsMobileMenuOpen(true)}
                      aria-label="Open menu"
                      className={ICON_BUTTON}
                    >
                      <MenuIcon className="size-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick horizontal category bar on mobile/tablet */}
              <div className="flex h-[38px] items-center gap-4 overflow-x-auto border-t border-gray-100 px-4 scrollbar-none">
                {CATEGORY_NAV_ITEMS.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      setActiveMenuKey(label);
                      setIsMobileMenuOpen(true);
                    }}
                    className="shrink-0 text-xs font-bold text-gray-700 hover:text-[#17BBEF]"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
