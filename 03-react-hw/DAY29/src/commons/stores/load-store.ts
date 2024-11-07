import { create } from "zustand";

interface IUsedLoadStore {
  isLoaded: boolean;
  setIsLoaded: () => void;
}

export const useLoadStore = create<IUsedLoadStore>((set) => ({
  isLoaded: false,
  setIsLoaded: () => set(() => ({ isLoaded: true })),
}));
