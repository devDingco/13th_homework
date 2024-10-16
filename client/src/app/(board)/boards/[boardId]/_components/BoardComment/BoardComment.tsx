/** @format */

import BoardCommentDeleteImage from './BoardCommentDeleteImage';
import BoardCommentEditImage from './BoardCommentEditImage';
import BoardCommentStar from './BoardCommentStar';
import { IBoardComment } from '@/models/comment.type';
import { ICommentEditProps } from '@/models/children.type';
import Image from 'next/image';
import { changeDateToISO } from '@/utils/changeDateToISO';

export default function BoardComment({ comment, setIsEdit }: ICommentEditProps) {
	const { _id, createdAt, author, content, rating } = comment as IBoardComment;

	const changeDate = changeDateToISO(createdAt);

	return (
		<>
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-2">
					<Image src="/Images/profile.svg" alt="profile" width={24} height={24} />
					<div className="prose-l_14_20">{author}</div>
					<BoardCommentStar rating={rating} />
				</div>
				<div className="flex items-center gap-2">
					<BoardCommentEditImage setIsEdit={setIsEdit} />
					<BoardCommentDeleteImage commentId={_id} />
				</div>
			</div>
			<div className="prose-r_16_24">{content}</div>
			<div className="prose-r_14_20 text-[#818181]">{changeDate}</div>
		</>
	);
}
