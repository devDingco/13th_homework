/** @format */

import BoardCommentDeleteImage from './BoardCommentDeleteImage';
import { IReply } from '@/models/comment.type';
import Image from 'next/image';

export default function BoardCommentReply({ reply }: IReply) {
	return (
		<div className="flex flex-col gap-2 rounded border-[1px] border-gray-200 bg-white p-4">
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-2">
					<Image src="/Images/profile.svg" alt="profile" width={24} height={24} />
					<div className="prose-sb_16_24">{reply.author}</div>
				</div>
				<div className="flex items-center gap-2">
					<BoardCommentDeleteImage
						commentId={reply._id}
						parentId={reply.parentId as string}
					/>
				</div>
			</div>
			<div className="prose-me_16_20">{reply.content}</div>
		</div>
	);
}
