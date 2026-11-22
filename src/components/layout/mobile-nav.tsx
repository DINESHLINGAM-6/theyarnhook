"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import { cartCount, useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useUIStore } from "@/lib/store/ui";
import { useMounted } from "@/lib/hooks/use-mounted";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const mounted = useMounted();
  const overlay = useUIStore((state) => state.overlay);
  const openSearch = useUIStore((state) => state.openSearch);
  const openCart = useUIStore((state) => state.openCart);
  const lines = useCartStore((state) => state.lines);
  const wishlistIds = useWishlistStore((state) => state.ids);
  const count = mounted ? cartCount(lines) : 0;
  const wishes = mounted ? wishlistIds.length : 0;

  if (overlay !== null) return null;

  const item = (active: boolean) =>
    cn(
      "relative flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-medium tracking-wide transition-colors",
      active ? "text-ink" : "text-muted hover:text-ink",
    );

  return (
    <nav
      aria-label="Mobile"
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur md:hidden"
    >
      <div className="flex items-stretch px-2">
        <Link href="/" className={item(pathname === "/")} aria-current={pathname === "/" ? "page" : undefined}>
          <Home size={18} aria-hidden />
          Home
          {pathname === "/" ? <span className="absolute top-0 h-0.5 w-6 rounded-full bg-brass" /> : null}
        </Link>
        <Link href="/shop" className={item(pathname.startsWith("/shop") || pathname.startsWith("/collections"))} aria-current={pathname === "/shop" ? "page" : undefined}>
          <LayoutGrid size={18} aria-hidden />
          Shop
        </Link>
        <button type="button" onClick={openSearch} className={item(false)} aria-label="Search">
          <Search size={18} aria-hidden />
          Search
        </button>
        <Link href="/wishlist" className={item(pathname === "/wishlist")} aria-label={`Wishlist, ${wishes} items`}>
          <span className="relative">
            <Heart size={18} aria-hidden />
            {wishes > 0 ? (
              <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brass px-1 text-[9px] font-semibold text-white">
                {wishes}
              </span>
            ) : null}
          </span>
          Wishlist
        </Link>
        <button type="button" onClick={openCart} className={item(false)} aria-label={`Bag, ${count} items`}>
          <span className="relative">
            <ShoppingBag size={18} aria-hidden />
            {count > 0 ? (
              <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brass px-1 text-[9px] font-semibold text-white">
                {count}
              </span>
            ) : null}
          </span>
          Bag
        </button>
      </div>
    </nav>
  );
}
