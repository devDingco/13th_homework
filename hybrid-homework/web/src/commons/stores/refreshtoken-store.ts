import { create } from "zustand";

interface IUseRefreshTokenStore {
  refreshToken: string;
  setRefreshToken: (newRefreshToken: string) => void;
}

export const useRefreshTokenStore = create<IUseRefreshTokenStore>((set) => ({
  refreshToken: "",
  setRefreshToken: (newRefreshToken: string) =>
    set(() => ({ refreshToken: newRefreshToken })),
}));
