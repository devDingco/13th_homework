/** @format */

import BoardComment from './BoardComment';
import BoardCommentEdit from './BoardCommentEdit';
import { IBoardCommentProps } from '@/models/comment.type';
import { useState } from 'react';

export default function BoardCommentSection({ comment }: IBoardCommentProps) {
	const [isEdit, setIsEdit] = useState(false);

	return (
		<div className={`flex w-full flex-col gap-2 border-b-[1px] border-b-gray-100 pb-8`}>
			{isEdit ? (
				<BoardCommentEdit comment={comment} setIsEdit={setIsEdit} />
			) : (
				<BoardComment comment={comment} setIsEdit={setIsEdit} />
			)}
		</div>
	);
}
