import { create } from "zustand";

interface AppStore {
  navBarHeight: number;
  navBarPaddingBottom: number;
  setNavBarHeight: (value: number) => void;
  setNavBarPaddingBottom: (value: number) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  // iphone default values
  navBarHeight: 90,
  navBarPaddingBottom: 20,
  setNavBarHeight: (value) =>
    set((state) => ({ ...state, navBarHeight: value })),
  setNavBarPaddingBottom: (value) =>
    set((state) => ({ ...state, navBarPaddingBottom: value })),
}));
