import { create } from "zustand";

export const useAccessTokenStore = create((set) => ({
  accessToken: "",
  setAccessToken: (newAccessToken) =>
    set(() => ({ accessToken: newAccessToken })),
}));

// 꼭 주스탠드, 로그인 부분은 강의 100번 다시 돌려보시오.
