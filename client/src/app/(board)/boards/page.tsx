/** @format */

import BoardItemContainer from './_components/BoardItemContainer';
import BoardLoading from './_components/BoardLoading';
import { Suspense } from 'react';
import getAllBoards from '@/apis/boards/getAllBoards';

export default function boardPage() {
	return (
		<div className="prose-me_16_20 flex w-full flex-col gap-6 rounded-2xl px-12 py-6 text-[#1c1c1c] shadow">
			<div className="flex w-full justify-center gap-2 px-6 py-4">
				<div className="flex w-16 items-center justify-center">번호</div>
				<div className="w-full">제목</div>
				<div className="flex w-[100px] items-center justify-center">작성자</div>
				<div className="flex w-[100px] items-center justify-center">날짜</div>
			</div>
			<Suspense fallback={<BoardLoading />}>
				<BoardItemContainer resource={getAllBoards()} />
			</Suspense>
		</div>
	);
}
