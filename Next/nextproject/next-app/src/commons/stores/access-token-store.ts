import { create } from "zustand";

interface IUseAccessTStore {
  accessToken: string;
  setAccessToken: (newAccessToken: string) => void;
  isLogin: boolean;
}

export const useAccessTokenStore = create<IUseAccessTStore>((set) => ({
  accessToken: "",
  isLogin: false,
  setAccessToken: (newAccessToken: string) =>
    set(() => ({ accessToken: newAccessToken })),
}));
