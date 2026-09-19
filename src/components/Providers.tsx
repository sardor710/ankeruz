"use client";

import React from "react";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { UserAuthModal } from "@/components/UserAuthModal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <CartDrawer />
        <UserAuthModal />
      </CartProvider>
    </AuthProvider>
  );
}
