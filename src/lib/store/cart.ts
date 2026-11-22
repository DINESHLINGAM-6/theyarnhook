"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartLine } from "@/lib/commerce/types";
import { getProductById } from "@/lib/commerce/provider";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/commerce/data";

interface CartStore {
  lines: CartLine[];
  addLine: (productId: string, colourId: string, quantity?: number) => void;
  removeLine: (productId: string, colourId: string) => void;
  setQuantity: (productId: string, colourId: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      lines: [],
      addLine: (productId, colourId, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find(
            (line) => line.productId === productId && line.colourId === colourId,
          );
          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line === existing ? { ...line, quantity: line.quantity + quantity } : line,
              ),
            };
          }
          return { lines: [...state.lines, { productId, colourId, quantity }] };
        }),
      removeLine: (productId, colourId) =>
        set((state) => ({
          lines: state.lines.filter(
            (line) => !(line.productId === productId && line.colourId === colourId),
          ),
        })),
      setQuantity: (productId, colourId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter(
                  (line) => !(line.productId === productId && line.colourId === colourId),
                )
              : state.lines.map((line) =>
                  line.productId === productId && line.colourId === colourId
                    ? { ...line, quantity }
                    : line,
                ),
        })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "theyarnhook-cart",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.quantity, 0);
}

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((total, line) => {
    const product = getProductById(line.productId);
    return product ? total + product.price * line.quantity : total;
  }, 0);
}

export function freeShippingRemaining(subtotal: number): number {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
}
