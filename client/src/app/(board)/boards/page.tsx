/** @format */
// WARNING: 뭐가 문제인 지 모르겠는데 가끔 무한 loading 상태가 됨 뭐 layout.tsx error라는데?.

import BoardItemContainer from './_components/BoardItemContainer';
import { ISearchParamsProps } from '@/models/children.type';

export default async function boardPage({ searchParams }: ISearchParamsProps) {
	return (
		<div className="prose-me_16_20 flex w-full flex-col gap-6 rounded-2xl px-12 py-6 text-[#1c1c1c] shadow">
			<div className="flex w-full justify-center gap-2 px-6 py-4">
				<div className="flex w-16 items-center justify-center">번호</div>
				<div className="w-full">제목</div>
				<div className="flex w-28 items-center justify-center">작성자</div>
				<div className="flex w-32 items-center justify-center">날짜</div>
			</div>

			<BoardItemContainer searchParams={searchParams} />
		</div>
	);
}
