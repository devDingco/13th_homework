import { create } from "zustand";

interface ISearchStore {
  search: string;
  setSearch: (changeSearch: string) => void;
}

export const useSearch = create<ISearchStore>((set) => ({
  search: "",
  setSearch: (changeSearch: string) => set(() => ({ search: changeSearch })),
}));
