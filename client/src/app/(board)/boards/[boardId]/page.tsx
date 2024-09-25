/** @format */

import { Suspense } from 'react';
import BoardFooter from './_components/BoardFooter';
import BoardLoading from '../_components/BoardLoading';
import BoardContainer from './_components/BoardContainer';
import getBoard from '@/app/apis/boards/getBoard';
import { IDeatilPageProps } from '@/models/detailPageProps';

export default function Detail({ params }: IDeatilPageProps) {
	const param = params.boardId;

	return (
		<div className="flex flex-col gap-4">
			<Suspense fallback={<BoardLoading />}>
				<BoardContainer resource={getBoard(+param)} />
			</Suspense>
			{/* <BoardLikeHate infor={boardInfor} /> */}
			<BoardFooter />
		</div>
	);
}
