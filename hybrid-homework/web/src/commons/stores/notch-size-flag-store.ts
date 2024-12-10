import { create } from "zustand";

export const useNotchSizeFlagStore = create((set) => ({
  flag: false,
  setFlag: () => set(() => ({ flag: true })),
}));
