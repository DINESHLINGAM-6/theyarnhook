import { collections, products, reviews } from "./data";
import type { Collection, CollectionId, Product, Review } from "./types";

export function getCollections(): Collection[] {
  return collections;
}

export function getCollection(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}

export function getCollectionById(id: CollectionId): Collection {
  return collections.find((collection) => collection.id === id) ?? collections[0];
}

export function getProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCollection(collectionId: CollectionId): Product[] {
  return products.filter((product) => product.collectionId === collectionId);
}

export function getBestsellers(limit = 8): Product[] {
  return products
    .filter((product) => product.tags.includes("bestseller"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return products.filter((product) => product.tags.includes("new")).slice(0, limit);
}

export function getSaleProducts(limit = 8): Product[] {
  return products.filter((product) => product.tags.includes("sale")).slice(0, limit);
}

export function getRelated(product: Product, limit = 4): Product[] {
  const sameCollection = products.filter(
    (item) => item.collectionId === product.collectionId && item.id !== product.id,
  );
  const sameFibre = products.filter(
    (item) =>
      item.fibre === product.fibre &&
      item.collectionId !== product.collectionId &&
      item.id !== product.id,
  );
  return [...sameCollection, ...sameFibre].slice(0, limit);
}

export function getReviewsForProduct(productId: string): Review[] {
  return reviews.filter((review) => review.productId === productId);
}

export function getFeaturedReviews(limit = 4): Review[] {
  return reviews.slice(0, limit);
}

export function getFeaturedCollection(): Collection {
  return collections.find((collection) => collection.id === "plush-luxe") ?? collections[0];
}

export function getCollectionCount(collectionId: CollectionId): number {
  return products.filter((product) => product.collectionId === collectionId).length;
}

export function productInStock(product: Product): boolean {
  return product.stock > 0 && product.colours.some((colour) => colour.inStock);
}
