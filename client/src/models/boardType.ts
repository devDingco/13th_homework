/** @format */

export interface IBoardType {
    boardId: number;
    author: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
    imageUrl?: string[];
    youtubeUrl?: string;
    like?: number;
    hate?: number;
}

export interface IBoardItem {
    key: number;
    board: IBoardType;
}

export interface IBoardProps {
    infor?: IBoardType;
}
