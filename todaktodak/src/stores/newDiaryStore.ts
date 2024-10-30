import { create } from "zustand";

interface NewDiaryState {
  isOpen: boolean;
  openNewDiary: () => void;
  closeNewDiary: () => void;
}

export const useNewDiaryStore = create<NewDiaryState>((set) => ({
  isOpen: false,
  openNewDiary: () => set({ isOpen: true }),
  closeNewDiary: () => set({ isOpen: false }),
}));
