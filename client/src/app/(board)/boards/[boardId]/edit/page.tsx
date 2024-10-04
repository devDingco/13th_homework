/** @format */

import BoardLoading from '../../_components/BoardLoading';
import EditContainer from './_components/EditContainer';
import { IDeatilProps } from '@/models/children.type';
import { Suspense } from 'react';

export default function editPage({ params }: IDeatilProps) {
	return (
		<>
			<div className="prose-b_20_28">게시물 수정</div>
			<Suspense fallback={<BoardLoading />}>
				<EditContainer boardId={params.boardId} />
			</Suspense>
		</>
	);
}
