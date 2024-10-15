/** @format */
// TODO 시간되면.. skeleton 변경하기
// [ ] swr을 사용하지 않고 component 합성을 통해 재사용성 늘리기 그러면서 use hook 사용해보기

import { boardUrlEndPoint, reactionUrlEndPoint } from '@/apis/config';

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
					<ComposeSuspenseWrapper
						resource={wrapPromise(commonGet(`${boardUrlEndPoint}/${boardId}`))}
						Component={BoardIdContainer}
					></ComposeSuspenseWrapper>
				</Suspense>
				<Suspense fallback={<BoardSkeletonReaction />}>
					<ComposeSuspenseWrapper
						resource={wrapPromise(
							commonGet(`${boardUrlEndPoint}/${boardId}${reactionUrlEndPoint}`),
						)}
						Component={BoardLikeHate}
					></ComposeSuspenseWrapper>
				</Suspense>
				<BoardFooter />
				<BoardCommentContainer />
			</ErrorBoundary>
		</div>
	);
}
