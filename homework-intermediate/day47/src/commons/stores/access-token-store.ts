import { create } from 'zustand';

type AccessTokenStore = {
	accessToken: string | null;
	setAccessToken: (newToken: string | null) => void;
};

export const useAccessTokenStore = create<AccessTokenStore>((set) => ({
	accessToken: null,
	setAccessToken: (newToken) => set(() => ({ accessToken: newToken })),
}));
