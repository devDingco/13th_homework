import { create } from "zustand";

interface IUseThemeStore {
  themeControl: string;
  setThemeControl: (theme: string) => void;
}

export const useThemeStore = create<IUseThemeStore>((set) => ({
  themeControl: "light",
  setThemeControl: (themeControl) => set({ themeControl }),
}));
