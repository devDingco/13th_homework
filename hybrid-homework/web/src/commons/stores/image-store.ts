import { create } from "zustand";

export const useImageStore = create((set) => ({
  images: [],
  setImages: (imageGroup: string[]) => set(() => ({ images: imageGroup })),
  clearImages: () => set({ images: [] }),
}));
