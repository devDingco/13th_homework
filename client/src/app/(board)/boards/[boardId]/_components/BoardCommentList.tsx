/** @format */
'use client';

import BoardComment from './BoardComment';
import BoardCommentEmpty from './BoardCommentEmpty';
import BoardCommentLoading from './BoardCommentLoading';
import { IResponseComment } from '@/models/comment.type';
import fetcher from '@/libs/fetcher';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function BoardCommentList() {
	const params = useParams();

	const { data, isLoading, error } = useSWR(`/board/${params.boardId}/comment`, fetcher, {
		suspense: true,
		revalidateOnFocus: false,
		fallbackData: [],
	});

	if (isLoading) return <BoardCommentLoading />;
	if (error || !data.length) return <BoardCommentEmpty />;
	return data.map((comment: IResponseComment) => (
		<BoardComment key={comment._id} comment={comment} />
	));
}
