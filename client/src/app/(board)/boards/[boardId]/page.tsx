/** @format */
'use client';

import { boardUrlEndPoint, reactionUrlEndPoint } from '~/config/axiosConfig';

import BoardCommentContainer from './_components/BoardComment/BoardCommentContainer';
import BoardFooter from './_components/BoardFooter';
import BoardIdContainer from './_components/BoardIdContainer';
import BoardLikeHate from './_components/BoardLikeHate';
import BoardSkeleton from './_components/BoardSkeleton';
import BoardSkeletonReaction from './_components/BoardSkeletonReaction';
import ComposeSuspenseWrapper from './_components/ComposeSuspenseWrapper';
import ErrorBoundary from '@/components/error/ErrorBoundary';
import ErrorComponent from '../_components/ErrorComponent';
import { IDetailProps } from '@/models/children.type';
import { Suspense } from 'react';
import commonGet from '@/apis/commonGet';
import { wrapPromise } from '@/utils/wrapPromise';

export default function DetailPage({ params }: IDetailProps) {
	const boardId: string = params.boardId;

	return (
		<div className="flex flex-col gap-4">
			<ErrorBoundary fallback={<ErrorComponent />}>
				<Suspense fallback={<BoardSkeleton />}>
					{/* <ComposeSuspenseWrapper
						resource={wrapPromise(commonGet(`${boardUrlEndPoint}/${boardId}`))}
						Component={BoardIdContainer}
					/> */}
					<ComposeSuspenseWrapper
						resource={wrapPromise(commonGet(`${boardUrlEndPoint}/${boardId}`))}
						Component={BoardIdContainer}
					/>
				</Suspense>

				<Suspense fallback={<BoardSkeletonReaction />}>
					<ComposeSuspenseWrapper
						resource={wrapPromise(
							commonGet(`${boardUrlEndPoint}/${boardId}${reactionUrlEndPoint}`),
						)}
						Component={BoardLikeHate}
					/>
				</Suspense>
			</ErrorBoundary>
			<BoardFooter />
			<BoardCommentContainer boardId={boardId} />
		</div>
	);
}
