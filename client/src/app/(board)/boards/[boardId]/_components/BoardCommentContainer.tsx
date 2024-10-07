/** @format */

import BoardCommentWrapper from './BoardCommentWrapper';
import BoardLoading from '../../_components/BoardLoading';
import { Suspense } from 'react';

export default function BoardCommentContainer() {
	return (
		<div className="flex w-full flex-col gap-10 border-t-[1px] border-gray-200">
			<BoardCommentWrapper />
			<Suspense fallback={<BoardLoading />}></Suspense>
		</div>
	);
}
