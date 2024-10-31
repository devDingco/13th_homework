import { create } from "zustand";

// export const useSearchStore = create((set) => ({
//   search: "",
//   setSearch: (newSearch) => set(() => ({ search: newSearch })),
// }));

// export const useDatesStore = create((set) => ({
//   dates: {
//     startDate: null,
//     endDate: null,
//   },
//   setDates: (newStartDate, newEndDate) =>
//     set(() => ({
//       dates: {
//         startDate: newStartDate,
//         endDate: newEndDate,
//       },
//     })),
// }));

interface IUseAccessTokenStore {
  accessToken: string;
  setAccessToken: (newAccessToken: string) => void;
}

export const useAccessTokenStore = create<IUseAccessTokenStore>((set) => ({
  accessToken: "",
  setAccessToken: (newAccessToken: string) =>
    set(() => ({ accessToken: newAccessToken })),
}));
