import { create } from "zustand";
import { ImageStore } from "../../types/stores.type";

export const useImageStore = create<ImageStore>((set) => ({
  imageMap: {},
  setImage: (id, url) =>
    set((state) => ({ imageMap: { ...state.imageMap, [id]: url } })),
}));
