"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

export interface CartItem {
  id: string;
  slug: string;
  title: string;
  price: string;
  numericPrice: number;
  image: string;
  color?: string;
  colorLabel?: string;
  quantity: number;
  href: string;
}

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  formattedSubtotal: string;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string, color?: string) => void;
  updateQuantity: (id: string, color: string | undefined, quantity: number) => void;
  clearCart: () => void;
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  freeShippingProgress: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "ankernordics_cart_items";
const FREE_SHIPPING_THRESHOLD = 500000;

export function formatPrice(amount: number): string {
  const parts = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${parts} so'm`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Normalize any legacy prices into so'm
          const normalized = parsed.map((item: CartItem) => {
            const rawNum = item.numericPrice || Number(String(item.price).replace(/[^0-9.]/g, "")) || 0;
            // If legacy number is small (e.g. 2690 kr instead of 2690000 som), scale appropriately
            const somVal = rawNum < 10000 ? rawNum * 1000 : rawNum;
            return {
              ...item,
              numericPrice: somVal,
              price: formatPrice(somVal),
            };
          });
          setItems(normalized);
        }
      } else {
        // Provide 1 initial demo item (Liberty 5 Pro Max) in so'm
        setItems([
          {
            id: "d1204",
            slug: "d1204",
            title: "Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case",
            price: "2 690 000 so'm",
            numericPrice: 2690000,
            image: "/images/1204_black.png",
            color: "black",
            colorLabel: "Midnight Black",
            quantity: 1,
            href: "/products/d1204",
          },
        ]);
      }
    } catch {
      // Ignore parsing errors
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore write errors
    }
  }, [items, isInitialized]);

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.numericPrice * item.quantity, 0);
  }, [items]);

  const formattedSubtotal = useMemo(() => {
    return formatPrice(subtotal);
  }, [subtotal]);

  const amountToFreeShipping = useMemo(() => {
    return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  }, [subtotal]);

  const freeShippingProgress = useMemo(() => {
    return Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  }, [subtotal]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = (newItem: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (i) => i.id === newItem.id && (i.color || "") === (newItem.color || "")
      );

      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prevItems, { ...newItem, quantity }];
      }
    });

    // Auto-reveal drawer on adding
    setIsOpen(true);
  };

  const removeItem = (id: string, color?: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && (i.color || "") === (color || ""))));
  };

  const updateQuantity = (id: string, color: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, color);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id && (item.color || "") === (color || "")) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        formattedSubtotal,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountToFreeShipping,
        freeShippingProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
