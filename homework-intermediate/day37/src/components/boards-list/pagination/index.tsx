'use client';

import { usePagination } from './hook';

export default function BoardsPagination(props) {
	console.log('🚀 ~ BoardsPagination ~ props:', props);
	const {
		startPage,
		lastPage,
		onClickPrevPageGroup,
		onClickNextPageGroup,
		onClickPage,
	} = usePagination(props);

	const length = props.data?.fetchBoards.length;
	console.log('🚀 ~ BoardsPagination ~ length:', length);

	return (
		<div className="flex items-center justify-center gap-2 p-4">
			<span onClick={onClickPrevPageGroup} className="cursor-pointer">
				이전페이지
			</span>
			{new Array(10).fill(null).map(
				(_, idx) =>
					idx + startPage <= lastPage && (
						<span
							key={idx + startPage}
							id={`${idx + startPage}`}
							onClick={onClickPage}
							className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 text-lg ${
								props.activePage === idx + startPage
									? 'border-blue-500 bg-blue-500 text-white'
									: 'border-gray-300 text-gray-700 hover:bg-gray-200'
							}`}
						>
							{idx + startPage}
						</span>
					),
			)}
			<span className="cursor-pointer" onClick={onClickNextPageGroup}>
				다음페이지
			</span>
		</div>
	);
}
