"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
    void useWishlistStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}
