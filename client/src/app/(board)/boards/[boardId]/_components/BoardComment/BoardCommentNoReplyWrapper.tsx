/** @format */

import BoardCommentForm from './BoardCommentForm';
import { useState } from 'react';

export default function BoardCommentNoReplyWrapper() {
	const [isView, setIsView] = useState(true);
	return isView ? (
		<div className="cursor-pointer" onClick={() => setIsView((prev) => !prev)}>
			+ 답글 달기
		</div>
	) : (
		<div className="flex w-[75dvw] flex-col gap-4">
			<div className="mb-4 cursor-pointer" onClick={() => setIsView((prev) => !prev)}>
				- 숨기기
			</div>
			<div className="prose-sb_18_24">대댓글</div>
			<BoardCommentForm />
		</div>
	);
}
