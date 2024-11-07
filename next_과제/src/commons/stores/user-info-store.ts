import { create } from "zustand";

export interface IuserInfoData {
  id: string;
  name: string;
}
interface IUserInfoStore {
  userInfo: IuserInfoData | null;
  setUserInfo: (userInfo: IuserInfoData) => void;
}

export const useUserInfo = create<IUserInfoStore>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set(() => ({ userInfo })),
}));
