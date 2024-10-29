import { create } from "zustand";

export const useAccessTokenStore = create((set) => {
  return {
    accessToken: "",
    setAccessToken: (newAccessToken) =>
      set(() => {
        return {
          accessToken: newAccessToken,
        };
      }),
  };
});
