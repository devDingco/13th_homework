import { create } from "zustand";

interface IUseAccessTokenStore {
  accessToken: string;
  setAccessToken: (newAccessToken: string) => void;
}
// 액세스 토큰을 저장하는 스토어
export const useAccessTokenStore = create<IUseAccessTokenStore>((set) => ({
  accessToken: "",
  setAccessToken: (newAccessToken: string) =>
    set(() => ({ accessToken: newAccessToken })),
}));
