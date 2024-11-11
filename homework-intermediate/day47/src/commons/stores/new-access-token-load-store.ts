import { create } from 'zustand';

type NewAccessTokenStore = {
	newAccessTokenLoaded: boolean;
	setNewAccessTokenLoaded: () => void;
};

export const useNewAccessTokenLoaded = create<NewAccessTokenStore>((set) => ({
	newAccessTokenLoaded: false,
	setNewAccessTokenLoaded: () => set({ newAccessTokenLoaded: true }),
}));
