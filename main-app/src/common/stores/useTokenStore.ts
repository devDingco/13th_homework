import { create } from "zustand";

interface IUseTokenStore {
    token: string;
    setToken: (newToken: string | undefined) => void;
}

export const useTokenStore = create<IUseTokenStore>((set) => ({
    token: "",
    setToken: (newToken) => set(() => ({ token: newToken })),
}));
