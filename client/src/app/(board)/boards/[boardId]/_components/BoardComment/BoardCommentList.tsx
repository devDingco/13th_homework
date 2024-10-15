/** @format */
'use client';
// WARNING 최초 댓글 생성시 실제 컴포넌트에 업데이트가 안 됨 뭔가 에러가 발생한 거 같음. -> maybe cache

import { IBoardCommentProp, IResponseComment } from '@/models/comment.type';
import { boardUrlEndPoint, commentUrlEndPoint } from '@/apis/config';

import BoardComment from './BoardComment';
import BoardCommentEmpty from './BoardCommentEmpty';
import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

export default function BoardCommentList({ data, boardId }: IBoardCommentProp) {
	const { data: cachedData } = useSWR(
		`${boardUrlEndPoint}/${boardId}${commentUrlEndPoint}`,
		fetcher,
		{ fallbackData: data },
	);
	if (cachedData.length === 0) {
		return <BoardCommentEmpty />;
	}
	return cachedData.map((comment: IResponseComment) => (
		<BoardComment key={comment._id} comment={comment} />
	));
}
