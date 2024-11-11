import { create } from "zustand";

interface ISearchStore {
  search: string;
  setSearch: (changeSearch: string) => void;
}
// 검색어를 저장하는 스토어
export const useSearch = create<ISearchStore>((set) => ({
  search: "",
  setSearch: (search) => set(() => ({ search })),
}));
