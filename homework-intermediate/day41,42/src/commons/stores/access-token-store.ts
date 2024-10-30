import { create } from 'zustand';

type AccessTokenStore = {
	accessToken: string;
	setAccessToken: (newToken: string) => void;
};

export const useAccessTokenStore = create<AccessTokenStore>((set) => ({
	accessToken: '',
	setAccessToken: (newToken) => set(() => ({ accessToken: newToken })),
}));
