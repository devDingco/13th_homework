/** @format */

export interface ICommonAPIComment {
	author: string;
	content: string;
	rating?: number;
}
export interface IRequestComment extends ICommonAPIComment {
	password: string;
}

export interface IResponseComment extends ICommonAPIComment {
	parentId: string | null;
	boardId: number;
	_id: string;
	createdAt: string;
	updatedAt: string;
	replies: IBoardComment[];
}

export interface IBoardCommentProp {
	boardId: string;
}

export interface IBoardComment extends ICommonAPIComment, IReplies {
	_id: string;
	parentId: string | null;
	createdAt: string;
}
export interface IBoardCommentProps {
	key: string;
	comment: IBoardComment;
}
export interface IReplies {
	replies: IBoardComment[];
}
export interface IReply {
	reply: IBoardComment;
}
