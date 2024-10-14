/** @format */
interface IPaginationState {
	page: number;
	pageCount: number | undefined;
	setPage: (page: number) => void;
	setPrevPage: () => void;
	setNextPage: () => void;
	setPageCount: (pageCount: number) => void;
}

import { create } from 'zustand';

export const usePaginationStore = create<IPaginationState>((set) => ({
	page: 1,
	pageCount: undefined,
	setPage: (page) => set({ page }),
	setPrevPage: () => set((state) => ({ page: state.page - 10 })),
	setNextPage: () => set((state) => ({ page: state.page + 10 })),
	setPageCount: (pageCount) => set({ pageCount }),
}));
