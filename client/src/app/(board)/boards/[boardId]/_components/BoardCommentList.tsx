/** @format */

// WARNING 최초 댓글 생성시 실제 컴포넌트에 업데이트가 안 됨 뭔가 에러가 발생한 거 같음. -> maybe cache

import BoardComment from './BoardComment';
import BoardCommentEmpty from './BoardCommentEmpty';
import BoardCommentLoading from './BoardCommentLoading';
import { IResponseComment } from '@/models/comment.type';
import fetcher from '@/libs/fetcher';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function BoardCommentList() {
	const params = useParams();

	const { data, isLoading } = useSWR(`board/${params.boardId}/comment`, fetcher, {
		suspense: true,
		revalidateOnFocus: false,
		fallbackData: [],
	});

	if (isLoading) return <BoardCommentLoading />;
	if (!data.length) return <BoardCommentEmpty />;
	return data.map((comment: IResponseComment) => (
		<BoardComment key={comment._id} comment={comment} />
	));
}
