// stores/userStore.js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  userInfo: null, // 초기 상태: null
  setUserInfo: (info) => set({ userInfo: info }), // 사용자 정보 설정
  updatePoints: (points) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        userPoint: { ...state.userInfo.userPoint, amount: points },
      },
    })), // 포인트 업데이트
  clearUserInfo: () => set({ userInfo: null }), // 사용자 정보 초기화
}));
