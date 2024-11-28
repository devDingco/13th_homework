import { create } from "zustand";

interface ISearchDateStore {
  startDate: string;
  endDate: string;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
}
// 검색 날짜를 저장하는 스토어
export const useSearchDate = create<ISearchDateStore>((set) => ({
  startDate: "",
  endDate: "",
  setStartDate: (startDate) => set(() => ({ startDate })),
  setEndDate: (endDate) => set(() => ({ endDate })),
}));
