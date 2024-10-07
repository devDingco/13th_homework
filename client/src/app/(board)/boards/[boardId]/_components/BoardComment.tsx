/** @format */

import { IBoardCommentProps } from '@/models/comment.type';
import Image from 'next/image';
import { changeDateToISO } from '@/utils/changeDateToISO';

export default function BoardComment(props: IBoardCommentProps) {
	const { _id, parentId, createdAt, author, content, rating } = props.comment;

	const changeDate = changeDateToISO(createdAt);

	return (
		<div
			className={`flex h-10 w-full flex-col gap-2 border-b-[1px] border-b-gray-100`}
			id={_id}
		>
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-2">
					<Image src="/Images/profile.svg" alt="profile" width={24} height={24} />
					<div className="prose-l_14_20">{author}</div>
				</div>
				<div className="flex gap-2">
					<Image src="/Images/edit.svg" alt="edit" width={20} height={20} />
					<Image src="/Images/close.svg" alt="close" width={20} height={20} />
				</div>
			</div>
			<div className="prose-r_16_24">{content}</div>
			<div className="prose-r_14_20 text-[#818181]">{changeDate}</div>
		</div>
	);
}
