/** @format */

import { IApiResponseData } from './apiResponse';

export enum ETitle {
	Author = 'Author',
	Password = 'Password',
	Title = 'Title',
	Content = 'Content',
	Address = 'Address',
	DetailAddress = 'DetailAddress',
	YoutubeUrl = 'YoutubeUrl',
	Comment = 'comment',
}

export enum ENewTitleProps {
	Author = '작성자',
	Password = '비밀번호',
	Title = '제목',
	Content = '내용',
	Address = '주소',
	DetailAddress = '상세 주소',
	YoutubeUrl = '유튜브 링크',
}

export const RNewInputPlaceHolder: Record<ETitle, string> = {
	[ETitle.Author]: '작성자 명을 입력해주세요.',
	[ETitle.Password]: '비밀번호를 입력해주세요.',
	[ETitle.Title]: '제목을 입력해주세요.',
	[ETitle.Content]: '내용을 입력해주세요.',
	[ETitle.Address]: '주소를 입력해주세요.',
	[ETitle.DetailAddress]: '상세주소',
	[ETitle.YoutubeUrl]: '링크를 입력해주세요.',
	[ETitle.Comment]: '댓글을 입력해 주세요.',
};

export interface ITitle {
	title: ETitle;
	error?: string;
}
export interface ITitleTextArea extends ITitle {
	setLength?: React.Dispatch<React.SetStateAction<number>>;
}
export interface IAddress {
	address?: string;
	detailAddress?: string;
}
export interface ICreateFormBoard {
	author: string;
	title: string;
	content: string;
	password: string;
	address?: string;
	detailAddress?: string;
	youtubeUrl?: string;
	imageUrl?: string[];
}

export interface IBoardType extends IReaction, ICreateFormBoard {
	boardId: number;
	createdAt: Date;
	updatedAt?: Date;
}

export interface IReaction {
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

export interface IBoardEditProps {
	boardInfor?: IApiResponseData;
}
