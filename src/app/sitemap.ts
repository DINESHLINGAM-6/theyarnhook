import type { MetadataRoute } from "next";
import { collections, products } from "@/lib/commerce/data";

const BASE_URL = "https://theyarnhook.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/shop",
    "/collections",
    "/about",
    "/contact",
    "/faq",
    "/policies/shipping",
    "/policies/returns",
    "/policies/privacy",
    "/policies/terms",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route === "/shop" ? 0.9 : 0.7,
    })),
    ...collections.map((collection) => ({
      url: `${BASE_URL}/collections/${collection.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `${BASE_URL}/products/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
