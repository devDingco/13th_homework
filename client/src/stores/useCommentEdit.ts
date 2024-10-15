/** @format */
interface ICommentEditState {
	isEdit: boolean;
	setIsEdit: () => void;
}

import { create } from 'zustand';

export const useCommentEditStore = create<ICommentEditState>((set) => ({
	isEdit: false,
	setIsEdit: () =>
		set((state) => ({
			isEdit: !state.isEdit,
		})),
}));
