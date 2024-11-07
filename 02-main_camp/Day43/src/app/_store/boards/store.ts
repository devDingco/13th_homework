import { create } from "zustand";

interface ISearchStore {
  searchParams: ISearchParams;
  setSearchParams: (params: ISearchParams) => void;
}

export interface ISearchParams {
  keyword: string;
  startDate?: string | null;
  endDate?: string | null;
}

export const useSearchStore = create<ISearchStore>((set) => ({
  searchParams: {
    keyword: "",
  },
  setSearchParams: ({ keyword, startDate, endDate }: ISearchParams) =>
    set(() => {
      return {
        searchParams: {
          keyword,
          startDate,
          endDate,
        },
      };
    }),
}));
