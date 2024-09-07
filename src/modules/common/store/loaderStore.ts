import { create } from "zustand";

interface LoaderStore {
  canInitAnimation: boolean;
  setCanInitAnimation: () => void;
  animationLoaded: boolean;
  setAnimationLoaded: () => void;
}

export const useLoaderStore = create<LoaderStore>((set) => ({
  canInitAnimation: false,
  animationLoaded: false,
  setCanInitAnimation: () =>
    set((state) => ({ ...state, canInitAnimation: true })),
  setAnimationLoaded: () =>
    set((state) => ({ ...state, animationLoaded: true })),
}));
