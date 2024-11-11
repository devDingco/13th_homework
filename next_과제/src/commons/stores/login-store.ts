import { create } from "zustand";

interface IUseLoginStore {
  isLogged: boolean;
  setIsLogged: (newIsLoggen: boolean) => void;
}
// 로그인 상태를 저장하는 스토어
export const useLoginStore = create<IUseLoginStore>((set) => ({
  isLogged: false,
  setIsLogged: (isLogged) => set(() => ({ isLogged })),
}));
