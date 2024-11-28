import { create } from "zustand";

interface IUsedLoadStore {
  isLoaded: boolean;
  setIsLoaded: () => void;
}
// 로딩 상태를 저장하는 스토어
export const useLoadStore = create<IUsedLoadStore>((set) => ({
  isLoaded: false,
  setIsLoaded: () => set(() => ({ isLoaded: true })),
}));
