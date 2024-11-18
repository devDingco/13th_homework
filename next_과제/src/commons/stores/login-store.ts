import { create } from "zustand";

interface ILoginStore {
  isLogin: boolean | "loading";
  setIsLogin: (isLogin: boolean) => void;
}

// 로그인 상태를 저장하는 스토어
export const useLoginStore = create<ILoginStore>((set) => ({
  isLogin: "loading",
  setIsLogin: (isLogin) => set(() => ({ isLogin })),
}));
