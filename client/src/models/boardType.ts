/** @format */

export interface IBoardType extends IReaction {
	boardId: number;
	author: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt?: string;
	imageUrl?: string[];
	youtubeUrl?: string;
}

export interface IReaction {
	like: number;
	hate: number;
}

export interface IBoardItem {
	key: number;
	board: IBoardType;
}

export interface IBoardProps {
	infor?: IBoardType;
}
