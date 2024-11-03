/** @format */

import BoardCommentForm from './BoardCommentForm';
import BoardCommentReply from './BoardCommentReply';
import { IReplies } from '@/models/comment.type';
import { useState } from 'react';

export default function BoardCommentReplyWrapper({ replies }: IReplies) {
	const [isView, setIsView] = useState(true);
	return isView ? (
		<div className="flex cursor-pointer" onClick={() => setIsView((prev) => !prev)}>
			+ {replies.length}개의 답글
		</div>
	) : (
		<>
			<div className="mb-4 cursor-pointer" onClick={() => setIsView((prev) => !prev)}>
				- 숨기기
			</div>
			<div className="flex w-[75dvw] flex-col gap-4">
				{replies.map((reply) => (
					<BoardCommentReply key={reply._id} reply={reply} />
				))}
				<div className="mt-6 flex flex-col gap-4">
					<div className="prose-sb_18_24">대댓글</div>
					<BoardCommentForm />
				</div>
			</div>
		</>
	);
}
