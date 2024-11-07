import { create } from "zustand";

interface IPageStore {
  page: number;
  setPage: (changePage: number) => void;
}

export const usePageChange = create<IPageStore>((set) => ({
  page: 1,
  setPage: (changePage) => set(() => ({ page: changePage })),
}));
