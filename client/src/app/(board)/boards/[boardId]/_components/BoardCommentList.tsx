/** @format */
'use client';

import BoardComment from './BoardComment';
import BoardLoading from '../../_components/BoardLoading';
import { IResponseComment } from '@/models/comment.type';
import fetcher from '@/libs/fetcher';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function BoardCommentList() {
	const params = useParams();

	const { data, isLoading } = useSWR(`/board/${params.boardId}/comment`, fetcher, {
		suspense: true,
		revalidateOnFocus: false,
		fallbackData: [],
	});

	if (isLoading) return <BoardLoading />;
	else if (!data.length)
		return (
			<div className="prose-r_14_20 w-full text-center text-gray-500">
				등록된 댓글이 없습니다.
			</div>
		);
	return data.map((comment: IResponseComment) => (
		<BoardComment key={comment._id} comment={comment} />
	));
}
