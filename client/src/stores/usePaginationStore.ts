/** @format */
interface IPaginationState {
	page: number;
	setPage: (page: number) => void;
	setPrevPage: () => void;
	setNextPage: () => void;
}

import { create } from 'zustand';

export const usePaginationStore = create<IPaginationState>((set) => ({
	page: 1,
	setPage: (page) => set({ page }),
	setPrevPage: () => set((state) => ({ page: state.page - 10 })),
	setNextPage: () => set((state) => ({ page: state.page + 10 })),
}));
