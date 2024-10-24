import { create } from "zustand";

export const useCountStore = create((set) =>
  // set : 변경함수
  ({
    count: 0,
    setCount: (newCount) => set(() => ({ count: newCount })),
  })
);
