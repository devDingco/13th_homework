import { create } from "zustand";

interface ISearchDateStore {
  startDate: string;
  endDate: string;
  setStartDate: (changeStartDate: string) => void;
  setEndDate: (changeEndDate: string) => void;
}

export const useSearchDate = create<ISearchDateStore>((set) => ({
  startDate: "2021-09-03T09:54:33Z",
  endDate: new Date().toISOString(),
  setStartDate: (changeStartDate) =>
    set(() => ({ startDate: changeStartDate })),
  setEndDate: (changeEndDate) => set(() => ({ endDate: changeEndDate })),
}));
