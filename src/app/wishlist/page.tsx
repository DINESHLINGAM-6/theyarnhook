import type { Metadata } from "next";
import { WishlistView } from "@/components/commerce/wishlist-view";

export const metadata: Metadata = {
  title: "Your wishlist",
  description: "The yarns you've saved for later at TheYarnHook.",
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return <WishlistView />;
}
