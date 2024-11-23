import { create } from "zustand";

export type SearchParamsType = {
  keyword: string;
  startDate: string | null;
  endDate: string | null;
};

interface ISearchParamsWithTravelProduct {
  searchParams: SearchParamsType;
  setSearchParams: (newSearchParams: SearchParamsType) => void;
}

export const useSearchKeywordWithTravelProduct =
  create<ISearchParamsWithTravelProduct>((set) => ({
    searchParams: {
      keyword: "",
      startDate: "",
      endDate: "",
    },
    setSearchParams: (newSearchParams: SearchParamsType) =>
      set(() => ({ searchParams: newSearchParams })),
  }));
