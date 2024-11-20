import { create } from "zustand";

interface IAccessToken {
  accessToken: string;
  setAccessToken: (newToken: string) => void;
}

export const useAccessTokenStore = create<IAccessToken>((set) => ({
  accessToken: "",
  setAccessToken: (newToken: string) => set(() => ({ accessToken: newToken })),
}));
