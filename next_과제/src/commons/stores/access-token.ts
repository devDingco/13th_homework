import { create } from "zustand";

interface AccessTokenStore {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
}

export const useAccessTokenStore = create<AccessTokenStore>((set) => ({
  accessToken: null,
  setAccessToken: (accessToken) => set(() => ({ accessToken })),
}));
