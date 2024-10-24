/** @format */

// NOTE Uncaught SyntaxError: Invalid or unexpected token (at layout.js:28:29)

import BoardItem from './BoardItem';
import { EProtocol } from '@/services/type';
import { EUrlEndPoint } from '~/config/axiosConfig';
import { GetBoardsQuery } from '@/graphql/queries/getBoards/getBoards.generated';
import { IApiResponseData } from '@/models/apiResponse';
import { ISearchParamsProps } from '@/models/children.type';
import { PaginationWithLinks } from '@/components/common/PaginationWithLinks';
import determineProtocolGetBoards from '@/services/determineProtocolGetBoards';

// import { boardUrlEndPoint } from '~/config/axiosConfig';
// import commonGet from '@/apis/commonGet';

export default async function BoardItemContainer({ searchParams }: ISearchParamsProps) {
	const page = parseInt((searchParams.page as string) || '1');
	const take = parseInt((searchParams.take as string) || '5');

	const variables = { page, take };

	// const data = await determineProtocolGetBoards({
	// 	protocol: EProtocol.REST,
	// 	endpoint: `${EUrlEndPoint.BOARD}?page=${page}&take=${take}`,
	// });
	const data = await determineProtocolGetBoards({
		protocol: EProtocol.GRAPHQL,
		variables,
	});

	// return (
	// 	<>
	// 		{data.result.map(
	// 			(board: IApiResponseData | GetBoardsQuery['getBoards']['result'][0]) => (
	// 				<BoardItem key={board.boardId} board={board} />
	// 			),
	// 		)}
	// 		<PaginationWithLinks
	// 			page={page}
	// 			take={take}
	// 			totalCount={data.totalCount}
	// 			pageSizeSelectOptions={{
	// 				pageSizeSearchParam: 'take',
	// 				pageSizeOptions: [3, 5, 10],
	// 			}}
	// 		/>
	// 	</>
	// );
}
