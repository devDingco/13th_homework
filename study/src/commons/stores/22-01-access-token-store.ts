import { create } from "zustand";

export const useAccessTokenStore = create((set) =>
  // set : 변경함수
  ({
    accessToken: "",
    setAccessToken: (newAccessToken) =>
      set(() => ({ accessToken: newAccessToken })),
  })
);
