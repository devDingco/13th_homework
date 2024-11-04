// import { create } from "zustand";

// interface IUseAccessTStore {
//   accessToken: string;
//   setAccessToken: (newAccessToken: string) => void;
// }

// export const useAccessTokenStore = create<IUseAccessTStore>((set) => ({
//   accessToken: "",
//   isLogin: false,
//   setAccessToken: (newAccessToken: string) =>
//     set(() => ({ accessToken: newAccessToken })),
// }));

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
