/** @format */
'use client';

// NOTE Uncaught SyntaxError: Invalid or unexpected token (at layout.js:28:29)

import { GetBoardsQuery, useGetBoardsQuery } from '@/graphql/queries/getBoards/getBoards.generated';

import BoardItem from './BoardItem';
import { IApiResponseData } from '@/models/apiResponse';
import { ISearchParamsProps } from '@/models/children.type';
import { PaginationWithLinks } from '@/components/common/PaginationWithLinks';

// import { boardUrlEndPoint } from '~/config/axiosConfig';
// import commonGet from '@/apis/commonGet';

export default function BoardItemContainer({ searchParams }: ISearchParamsProps) {
	const page = parseInt((searchParams.page as string) || '1');
	const take = parseInt((searchParams.take as string) || '5');

	const variables = { page, take };

	const { data } = useGetBoardsQuery({
		variables,
	});
	console.log(data);

	// const data = await commonGet(`${boardUrlEndPoint}?page=${page}&take=${take}`);

	if (data)
		return (
			<>
				{data.getBoards.result.map(
					(board: IApiResponseData | GetBoardsQuery['getBoards']['result'][0]) => (
						<BoardItem key={board.boardId} board={board} />
					),
				)}
				<PaginationWithLinks
					page={page}
					take={take}
					totalCount={data.getBoards.totalCount}
					pageSizeSelectOptions={{
						pageSizeSearchParam: 'take',
						pageSizeOptions: [3, 5, 10],
					}}
				/>
			</>
		);
}
