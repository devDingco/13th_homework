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
import { useCommentPageStore } from '@/stores/useCommentPage';
import useSWR from 'swr';

export default function BoardCommentList({ boardId }: IBoardCommentProp) {
	const { page } = useCommentPageStore();
	const { data, isLoading, error } = useSWR(
		`${boardUrlEndPoint}/${boardId}${commentUrlEndPoint}?page=${page}`,
		fetcher,
		{
			revalidateOnFocus: false,
		},
	);
	if (isLoading) {
		return (
			<div className="flex w-full items-center justify-center">
				<Spinner />
			</div>
		);
	}

	if (data.length === 0 || error) {
		return <BoardCommentEmpty />;
	}

	return (
		<>
			{data.map((comment: IResponseComment) => (
				<BoardCommentSection key={comment._id} comment={comment} />
			))}
		</>
	);
}
