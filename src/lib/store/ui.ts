"use client";

import { create } from "zustand";

type Overlay = "cart" | "search" | "menu" | "filter" | null;

interface UIStore {
  overlay: Overlay;
  openCart: () => void;
  openSearch: () => void;
  openMenu: () => void;
  openFilter: () => void;
  close: () => void;
  closeAll: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  overlay: null,
  openCart: () => set({ overlay: "cart" }),
  openSearch: () => set({ overlay: "search" }),
  openMenu: () => set({ overlay: "menu" }),
  openFilter: () => set({ overlay: "filter" }),
  close: () => set({ overlay: null }),
  closeAll: () => set({ overlay: null }),
}));
