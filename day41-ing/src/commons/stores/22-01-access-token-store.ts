//글로벌 스토어 (zustand) accessToken 글로벌스토어에 저장 설정

import { create } from "zustand";

export const useAccessTokenStore = create((set) => ({
  accessToken: "",
  setAccessToken: (newAccessToken) =>
    set(() => ({ accessToken: newAccessToken })),
}));
