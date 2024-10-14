/** @format */

import BoardCommentForm from './BoardCommentForm';
import Image from 'next/image';

export default function BoardCommentWrapper() {
	return (
		<div className="mt-10 flex flex-col gap-6">
			<div className="flex items-center gap-2">
				<Image src={'/Images/chat.svg'} alt="chat" width={24} height={24} />
				<div className="prose-sb_16_24">댓글</div>
			</div>
			<BoardCommentForm />
		</div>
	);
}
