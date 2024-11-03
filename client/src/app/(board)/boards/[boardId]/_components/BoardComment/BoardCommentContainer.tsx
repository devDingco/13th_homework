/** @format */

import BoardCommentList from './BoardCommentList';
import BoardCommentWrapper from './BoardCommentWrapper';
import { IboardId } from '@/models/children.type';

export default function BoardCommentContainer({ boardId }: IboardId) {
	return (
		<div className="flex w-full flex-col gap-10 border-t-[1px] border-gray-200">
			<BoardCommentWrapper />
			<BoardCommentList boardId={boardId} />
		</div>
	);
}
