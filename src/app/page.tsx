import { Hero } from "@/components/home/hero";
import { CollectionsGrid } from "@/components/home/collections-grid";
import { ShopByWeight } from "@/components/home/shop-by-weight";
import { ShopByProject } from "@/components/home/shop-by-project";
import { ProductTabs } from "@/components/home/product-tabs";
import { CollectionSpotlight } from "@/components/home/collection-spotlight";
import { BrandStrip } from "@/components/home/brand-strip";
import { Reviews } from "@/components/home/reviews";
import { Newsletter } from "@/components/home/newsletter";
import { Lookbook } from "@/components/home/lookbook";
import { InstagramGrid } from "@/components/home/instagram-grid";
import { TrustBadges } from "@/components/layout/trust-badges";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CollectionsGrid />
      <ShopByWeight />
      <ShopByProject />
      <TrustBadges />
      <ProductTabs />
      <Lookbook />
      <CollectionSpotlight />
      <BrandStrip />
      <Reviews />
      <Newsletter />
      <InstagramGrid />
    </>
  );
}
