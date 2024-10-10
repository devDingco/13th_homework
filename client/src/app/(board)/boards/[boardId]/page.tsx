/** @format */

import BoardCommentContainer from './_components/BoardCommentContainer';
import BoardFooter from './_components/BoardFooter';
import BoardIdContainer from './_components/BoardIdContainer';
import BoardLikeHate from './_components/BoardLikeHate';
import BoardSkeleton from './_components/BoardSkeleton';
import BoardSkeletonReaction from './_components/BoardSkeletonReaction';
import { IDetailProps } from '@/models/children.type';
import { Suspense } from 'react';
import getBoard from '@/apis/boards/getBoard';
import getReaction from '@/apis/boards/reaction/getReaction';

export default function Detail({ params }: IDetailProps) {
	const param: string = params.boardId;

	return (
		<div className="flex flex-col gap-4">
			<Suspense fallback={<BoardSkeleton />}>
				<BoardIdContainer resource={getBoard(+param)} />
			</Suspense>
			<Suspense fallback={<BoardSkeletonReaction />}>
				<BoardLikeHate resource={getReaction(+param)} />
			</Suspense>
			<BoardFooter />
			<BoardCommentContainer />
		</div>
	);
}
