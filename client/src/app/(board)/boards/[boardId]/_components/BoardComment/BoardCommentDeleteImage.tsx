/** @format */

import { IBoardComment, IResponseComment } from '@/models/comment.type';
import { boardUrlEndPoint, commentUrlEndPoint } from '~/config/axiosConfig';

import { IDeleteProps } from '@/models/children.type';
import Image from 'next/image';
import deleteComment from '@/apis/comments/deleteComment';
import { useCommentPageStore } from '@/stores/useCommentPage';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function BoardCommentDeleteImage({ commentId, parentId }: IDeleteProps) {
	const { page } = useCommentPageStore();
	const param = useParams();
	const boardId = param.boardId as string;

	const { data, mutate } = useSWR(
		`${boardUrlEndPoint}/${boardId}${commentUrlEndPoint}?page=${page}`,
		{
			revalidateOnFocus: false,
		},
	);

	const onClickDeleteBoardComment = async (commentId: string, parentId: string) => {
		// 낙관적 UI 업데이트

		let updateBoardComment = data.filter((item: IResponseComment) => item._id !== commentId);

		if (updateBoardComment.length === data.length) {
			const parentComment = data.find((item: IResponseComment) => item._id === parentId);

			if (parentComment) {
				parentComment.replies = parentComment.replies.filter(
					(item: IBoardComment) => item._id !== commentId,
				);

				updateBoardComment = updateBoardComment.map((item: IResponseComment) =>
					item._id === parentId ? { ...parentComment } : item,
				);
			}
		}

		mutate([...updateBoardComment], false);

		const res = await deleteComment(boardId, commentId);

		if (res.status !== 200) {
			mutate();
		}
	};
	return (
		<Image
			src="/Images/close.svg"
			alt="close"
			width={24}
			height={24}
			className="cursor-pointer"
			onClick={() => onClickDeleteBoardComment(commentId, parentId as string)}
		/>
	);
}
