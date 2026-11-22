import { Hero } from "@/components/home/hero";
import { CollectionsGrid } from "@/components/home/collections-grid";
import { ShopByWeight } from "@/components/home/shop-by-weight";
import { ShopByProject } from "@/components/home/shop-by-project";
import { ProductTabs } from "@/components/home/product-tabs";
import { CollectionSpotlight } from "@/components/home/collection-spotlight";
import { BrandStrip } from "@/components/home/brand-strip";
import { Reviews } from "@/components/home/reviews";
import { InstagramGrid } from "@/components/home/instagram-grid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CollectionsGrid />
      <ShopByWeight />
      <ShopByProject />
      <ProductTabs />
      <CollectionSpotlight />
      <BrandStrip />
      <Reviews />
      <InstagramGrid />
    </>
  );
}
