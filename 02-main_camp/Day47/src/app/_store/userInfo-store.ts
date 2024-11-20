import { FetchUserLoggedInQuery } from "@/commons/gql/graphql";
import { create } from "zustand";

type UserInfo = FetchUserLoggedInQuery["fetchUserLoggedIn"];

interface IUserInfo {
  userInfo: UserInfo;
  setUserInfo: (newInfo: UserInfo) => void;
}

export const useUserInfo = create<IUserInfo>((set) => ({
  userInfo: {
    _id: "",
    email: "",
    name: "",
  },
  setUserInfo: (newInfo: UserInfo) => set(() => ({ userInfo: newInfo })),
}));
