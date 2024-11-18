import { create } from 'zustand';

type BoardStore = {
	activePage: number;
	setActivePage: (page: number) => void;
	titleSearch: string;
	setTitleSearch: (title: string) => void;
};

export const useBoardStore = create<BoardStore>((set) => {
	return {
		// 페이지 번호와 검색어 관리
		activePage: 1,
		setActivePage: (page: number) => set({ activePage: page }),
		titleSearch: '',
		setTitleSearch: (title: string) => set({ titleSearch: title }),
	};
});
