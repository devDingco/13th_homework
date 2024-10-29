import { create } from "zustand";

export const useCountStore = create((set) => {
  return {
    count: 0,
    setCount: (newCount) =>
      set(() => {
        return {
          count: newCount,
        };
      }),
  };
});
