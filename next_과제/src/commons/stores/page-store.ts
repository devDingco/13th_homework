import { create } from "zustand";

interface IPageStore {
  page: number;
  setPage: (page: number) => void;
}
// 페이지를 저장하는 스토어
export const usePageChange = create<IPageStore>((set) => ({
  page: 1,
  setPage: (page) => set(() => ({ page })),
}));
