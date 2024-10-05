/** @format */

export interface IRequestComment {
	author: string;
	password: string;
	content: string;
	rating: number;
}

export interface IResponseComment extends IRequestComment {
	content: '안녕하세요 반갑습니다 저는 류지승입니다';
	rating: 2;
	parentId: null;
	author: '!23';
	boardId: 169;
	createdAt: '2024-10-05T05:46:43.242Z';
	updatedAt: '2024-10-05T05:46:43.242Z';
}
