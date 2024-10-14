/** @format */
interface IPaginationState {
	page: number;
	pageCount: number | undefined;
	setPrevPage: () => void;
	setNextPage: () => void;
	setPageCount: (pageCount: number) => void;
}

import { create } from 'zustand';

export const useAddressStore = create<IPaginationState>((set) => ({
	page: 0,
	pageCount: undefined,
	setPrevPage: () => set((state) => ({ page: state.page - 1 })),
	setNextPage: () => set((state) => ({ page: state.page + 1 })),
	setPageCount: (pageCount) => set({ pageCount }),
}));
