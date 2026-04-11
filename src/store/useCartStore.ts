"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  variantId: string;
  quantity: number;
  title: string;
  handle: string;
  price: string;
  image: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  checkoutUrl: string | null;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.variantId === item.variantId);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              isCartOpen: true,
            };
          }
          return { items: [...state.items, item], isCartOpen: true };
        }),
      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),
      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId ? { ...i, quantity } : i
          ),
        })),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      clearCart: () => set({ items: [] }),
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      checkoutUrl: null,
    }),
    {
      name: 'shopify-cart',
    }
  )
);
