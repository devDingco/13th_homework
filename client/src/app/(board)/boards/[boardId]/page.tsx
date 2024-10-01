/** @format */

import BoardContainer from './_components/BoardContainer';
import BoardFooter from './_components/BoardFooter';
import BoardLikeHate from './_components/BoardLikeHate';
import BoardSkeleton from './_components/BoardSkeleton';
import BoardSkeletonReaction from './_components/BoardSkeletonReaction';
import { IDeatilPageProps } from '@/models/children.type';
import { Suspense } from 'react';
import getBoard from '@/apis/boards/getBoard';
import getReaction from '@/apis/boards/reaction/getReaction';

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
