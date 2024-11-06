import { create } from "zustand";

interface IuseAccessTokenStore {
  accessToken: string;
  setAccessToken: (newAccessToken: string) => void;
}

export const useAccessTokenStore = create<IuseAccessTokenStore>((set) =>
  // set : 변경함수
  ({
    accessToken: "",
    setAccessToken: (newAccessToken) =>
      set(() => ({ accessToken: newAccessToken })),
  })
);
