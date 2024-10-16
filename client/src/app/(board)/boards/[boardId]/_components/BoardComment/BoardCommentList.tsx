/** @format */
'use client';
// WARNING 최초 댓글 생성시 실제 컴포넌트에 업데이트가 안 됨 뭔가 에러가 발생한 거 같음. -> maybe cache
// [ ] key를 통해서 Update Delete 처리하기

import { IBoardCommentProp, IResponseComment } from '@/models/comment.type';
import { boardUrlEndPoint, commentUrlEndPoint } from '@/apis/config';

import BoardCommentEmpty from './BoardCommentEmpty';
import BoardCommentSection from './BoardCommentSection';
import Spinner from '@/components/common/Spinner';
import fetcher from '@/libs/fetcher';
import useSWR from 'swr';
import { useState } from 'react';

export default function BoardCommentList({ data, boardId }: IBoardCommentProp) {
	const [page, setPage] = useState<number>(1);
	const { data: cachedData } = useSWR(
		`${boardUrlEndPoint}/${boardId}${commentUrlEndPoint}?page=${page}`,
		fetcher,
		{
			fallbackData: data,
			revalidateOnFocus: false,
		},
	);

	if (cachedData.length === 0) {
		return <BoardCommentEmpty />;
	}

	return (
		<>
			{cachedData.map((comment: IResponseComment) => (
				<BoardCommentSection key={comment._id} comment={comment} />
			))}
			<div className="flex w-full items-center justify-center">
				<Spinner />
			</div>
		</>
	);
}
