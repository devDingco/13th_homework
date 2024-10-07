/** @format */
'use client';

import BoardComment from './BoardComment';
import BoardLoading from '../../_components/BoardLoading';
import BoardNoComment from './BoardNoComment';
import fetcher from '@/libs/fetcher';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function BoardCommentList() {
	const params = useParams();

	const { data, isLoading } = useSWR(`/board/${params.boardId}/comment`, fetcher, {
		suspense: true,
		fallbackData: [],
	});
	if (isLoading) return <BoardLoading />;
	else if (!data) return <BoardNoComment />;
	return data.map((comment) => <BoardComment key={comment._id} />);
}
