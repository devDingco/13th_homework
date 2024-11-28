import { create } from "zustand";

interface IuserInfoData {
  id: string;
  name: string;
}
interface IUserInfoStore {
  userInfo: IuserInfoData | null;
  setUserInfo: (userInfo: IuserInfoData) => void;
}
// 유저 정보를 저장하는 스토어
export const useUserInfo = create<IUserInfoStore>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set(() => ({ userInfo })),
}));
