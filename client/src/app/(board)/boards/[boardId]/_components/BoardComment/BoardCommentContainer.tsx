/** @format */

import { boardUrlEndPoint, commentUrlEndPoint } from '@/apis/config';

import BoardCommentList from './BoardCommentList';
import BoardCommentWrapper from './BoardCommentWrapper';
import { IboardId } from '@/models/children.type';
import commonGet from '@/apis/commonGet';
import { use } from 'react';

export default function BoardCommentContainer({ boardId }: IboardId) {
	const data = use(commonGet(`${boardUrlEndPoint}/${boardId}${commentUrlEndPoint}`));

	return (
		<div className="flex w-full flex-col gap-10 border-t-[1px] border-gray-200">
			<BoardCommentWrapper />
			<BoardCommentList data={data} boardId={boardId} />
		</div>
	);
}
