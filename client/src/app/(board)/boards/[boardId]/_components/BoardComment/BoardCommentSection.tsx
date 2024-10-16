/** @format */

import BoardComment from './BoardComment';
import BoardCommentForm from './BoardCommentForm';
import { IBoardCommentProps } from '@/models/comment.type';
import { useState } from 'react';

export default function BoardCommentSection({ comment }: IBoardCommentProps) {
	const [isEdit, setIsEdit] = useState(false);
	console.log(1);

	return (
		<div className={`flex w-full flex-col gap-2 border-b-[1px] border-b-gray-100 pb-8`}>
			{isEdit ? (
				<BoardCommentForm comment={comment} setIsEdit={setIsEdit} />
			) : (
				<BoardComment comment={comment} setIsEdit={setIsEdit} />
			)}
		</div>
	);
}
