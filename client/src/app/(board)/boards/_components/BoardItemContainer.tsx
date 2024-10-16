/** @format */

// NOTE Uncaught SyntaxError: Invalid or unexpected token (at layout.js:28:29)

// import { GetBoardDocument, GetBoardsQuery } from '@/graphql/generated/graphql';

import BoardItem from './BoardItem';
// import BoardLoading from './BoardLoading';
// import ErrorComponent from './ErrorComponent';
import { IApiResponseData } from '@/models/apiResponse';
import { ISearchParamsProps } from '@/models/children.type';
import { PaginationWithLinks } from '@/components/common/PaginationWithLinks';
import { boardUrlEndPoint } from '@/apis/config';
import commonGet from '@/apis/commonGet';

// import { useQuery } from '@apollo/client';

export default async function BoardItemContainer({ searchParams }: ISearchParamsProps) {
	const page = parseInt((searchParams.page as string) || '1');
	const take = parseInt((searchParams.take as string) || '5');

	const data = await commonGet(`${boardUrlEndPoint}?page=${page}&take=${take}`);

	if (data)
		return (
			<>
				{data.result.map((board: IApiResponseData) => (
					<BoardItem key={board.boardId} board={board} />
				))}
				<PaginationWithLinks
					page={page}
					take={take}
					totalCount={data.totalCount}
					pageSizeSelectOptions={{
						pageSizeSearchParam: 'take',
						pageSizeOptions: [3, 5, 10],
					}}
				/>
			</>
		);
}
