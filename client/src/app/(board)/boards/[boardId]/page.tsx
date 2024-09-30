/** @format */

import { Suspense } from 'react';
import BoardFooter from './_components/BoardFooter';
import BoardContainer from './_components/BoardContainer';
import getBoard from '@/apis/boards/getBoard';
import { IDeatilPageProps } from '@/models/detailPageProps';
import BoardLikeHate from './_components/BoardLikeHate';
import getReaction from '@/apis/boards/reaction/getReaction';
import BoardSkeleton from './_components/BoardSkeleton';
import BoardSkeletonReaction from './_components/BoardSkeletonReaction';

export default function Detail({ params }: IDeatilPageProps) {
	const param = params.boardId;

	return (
		<div className="flex flex-col gap-4">
			<Suspense fallback={<BoardSkeleton />}>
				<BoardContainer resource={getBoard(+param)} />
			</Suspense>
			<Suspense fallback={<BoardSkeletonReaction />}>
				<BoardLikeHate resource={getReaction(+param)} />
			</Suspense>
			<BoardFooter />
		</div>
	);
}
