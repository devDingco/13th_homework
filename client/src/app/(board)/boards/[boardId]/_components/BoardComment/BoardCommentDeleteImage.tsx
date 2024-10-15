/** @format */

import { boardUrlEndPoint, commentUrlEndPoint } from '@/apis/config';

import { IDeleteProps } from '@/models/children.type';
import { IResponseComment } from '@/models/comment.type';
import Image from 'next/image';
import deleteComment from '@/apis/comments/deleteComment';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function BoardCommentDeleteImage({ commentId }: IDeleteProps) {
	const param = useParams();
	const boardId = param.boardId as string;

	const { data, mutate } = useSWR(`${boardUrlEndPoint}/${boardId}${commentUrlEndPoint}`, {
		revalidateOnFocus: false,
	});

	const onClickDeleteBoardComment = async (commentId: string) => {
		// 낙관적 UI 업데이트
		mutate(
			data.filter((item: IResponseComment) => item._id !== commentId),
			false,
		);
		const res = await deleteComment(boardId, commentId);

		if (!res) {
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
			onClick={() => onClickDeleteBoardComment(commentId)}
		/>
	);
}
