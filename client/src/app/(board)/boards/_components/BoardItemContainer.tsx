/** @format */

// NOTE Uncaught SyntaxError: Invalid or unexpected token (at layout.js:28:29)

import { EProtocol, GraphQLOptions, RestOptions } from '@/models/protocol.type';
import { GetBoardsQuery, useGetBoardsQuery } from '@/graphql/queries/getBoards/getBoards.generated';

import BoardItem from './BoardItem';
import { EUrlEndPoint } from '~/config/axiosConfig';
import { IApiResponseData } from '@/models/apiResponse';
import { ISearchParamsProps } from '@/models/children.type';
import { PaginationWithLinks } from '@/components/common/PaginationWithLinks';
import commonGet from '@/apis/commonGet';
import { useDetermineProtocol } from '@/hooks/useDetermineProtoCol';

// import { boardUrlEndPoint } from '~/config/axiosConfig';
// import commonGet from '@/apis/commonGet';

export default async function BoardItemContainer({ searchParams }: ISearchParamsProps) {
	const page = parseInt((searchParams.page as string) || '1');
	const take = parseInt((searchParams.take as string) || '5');

	const restOptions: RestOptions = {
		protocol: EProtocol.REST,
		endpoint: `${EUrlEndPoint.BOARD}?page=${page}&take=${take}`,
	};

	const data = await useDetermineProtocol(restOptions, commonGet);

	// const variables = { page, take };

	// const graphQLOptions: GraphQLOptions = {
	// 	protocol: EProtocol.GRAPHQL,
	// 	variables,
	// };
	// // [ ] tomorrow

	// const data = await useDetermineProtocol(graphQLOptions, useGetBoardsQuery);

	return (
		<>
			{data.result.map(
				(board: IApiResponseData | GetBoardsQuery['getBoards']['result'][0]) => (
					<BoardItem key={board.boardId} board={board} />
				),
			)}
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
