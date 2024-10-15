/** @format */
'use client';
// WARNING 최초 댓글 생성시 실제 컴포넌트에 업데이트가 안 됨 뭔가 에러가 발생한 거 같음. -> maybe cache

import BoardComment from './BoardComment';
import { IResponseComment } from '@/models/comment.type';

export default function BoardCommentList({ data }) {
	return data.map((comment: IResponseComment) => (
		<BoardComment key={comment._id} comment={comment} />
	));
}
