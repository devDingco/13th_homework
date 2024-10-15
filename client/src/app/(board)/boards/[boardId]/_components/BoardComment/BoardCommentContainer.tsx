/** @format */

import { boardUrlEndPoint, commentUrlEndPoint } from '@/apis/config';

import BoardCommentList from './BoardCommentList';
import BoardCommentWrapper from './BoardCommentWrapper';
import BoardLoading from '../../../_components/BoardLoading';
import ComposeSuspenseWrapper from '../ComposeSuspenseWrapper';
import { IboardId } from '@/models/children.type';
import { Suspense } from 'react';
import commonGet from '@/apis/commonGet';
import { wrapPromise } from '@/utils/wrapPromise';

export default function BoardCommentContainer({ boardId }: IboardId) {
	return (
		<div className="flex w-full flex-col gap-10 border-t-[1px] border-gray-200">
			<BoardCommentWrapper />
			<Suspense fallback={<BoardLoading />}>
				<ComposeSuspenseWrapper
					resource={wrapPromise(
						commonGet(`${boardUrlEndPoint}/${boardId}${commentUrlEndPoint}`),
					)}
					Component={BoardCommentList}
				></ComposeSuspenseWrapper>
			</Suspense>
		</div>
	);
}
