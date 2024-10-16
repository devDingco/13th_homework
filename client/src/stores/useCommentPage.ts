/** @format */
interface ICommentPageState {
	page: number;
	setPage: () => void;
}

import { create } from 'zustand';

export const useCommentPageStore = create<ICommentPageState>((set) => ({
	page: 1,
	setPage: () =>
		set((state) => ({
			page: state.page + 1,
		})),
}));
