export type CollectionId = "desire" | "milka" | "souffle" | "plush-luxe";

export type WeightCategory = 2 | 3 | 4 | 5 | 6 | 7;

export type Fibre = "Cotton" | "Merino" | "Acrylic" | "Bamboo" | "Alpaca" | "Blend";

export type ProjectId = "amigurumi" | "garments" | "blankets" | "socks" | "bags" | "home";

export type ProductTag = "new" | "bestseller" | "sale";

export type MediaKind = "skein" | "ball" | "texture";

export interface Colour {
  id: string;
  name: string;
  hex: string;
  inStock: boolean;
}

export interface Media {
  kind: MediaKind;
  palette: string[];
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  image?: string;
  brandImage?: string;
  collectionId: CollectionId;
  price: number;
  compareAtPrice?: number;
  fibre: Fibre;
  weight: WeightCategory;
  weightLabel: string;
  brand: string;
  colours: Colour[];
  rating: number;
  reviewCount: number;
  yardage: number;
  ply: number;
  needleSize: string;
  hookSize: string;
  description: string;
  care: string[];
  media: Media[];
  tags: ProductTag[];
  stock: number;
  projects: ProjectId[];
}

export interface CollectionAccent {
  solid: string;
  tint: string;
  ink: string;
  on: string;
}

export type CollectionSymbol = "rose" | "milk" | "puff" | "star";

export interface Collection {
  id: CollectionId;
  slug: string;
  name: string;
  image?: string;
  tagline: string;
  description: string;
  accent: CollectionAccent;
  mood: string;
  signature: string;
  symbol: CollectionSymbol;
  palette: string[];
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  title: string;
  body: string;
  productId?: string;
  verified: boolean;
}

export interface ProjectMeta {
  id: ProjectId;
  name: string;
  blurb: string;
}

export interface WeightMeta {
  weight: WeightCategory;
  label: string;
  blurb: string;
}

export interface ProductFilters {
  collection?: CollectionId;
  fibre?: Fibre[];
  weight?: WeightCategory[];
  brand?: string[];
  colour?: string[];
  price?: [number, number];
  inStockOnly?: boolean;
  project?: ProjectId;
  tags?: ProductTag[];
  query?: string;
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

export interface CartLine {
  productId: string;
  colourId: string;
  quantity: number;
}
