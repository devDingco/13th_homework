/** @format */
'use client';

import { GetBoardDocument, GetBoardsQuery } from '@/graphql/generated/graphql';

import BoardItem from './BoardItem';
import BoardLoading from './BoardLoading';
import ErrorComponent from './ErrorComponent';
import { IApiResponseData } from '@/models/apiResponse';
import { boardUrlEndPoint } from '@/apis/config';
import fetcher from '@/libs/fetcher';
import { useQuery } from '@apollo/client';
import useSWR from 'swr';

export default function BoardItemContainer() {
	// const { data, isLoading, error } = useSWR(boardUrlEndPoint, fetcher, {
	// 	suspense: true,
	// 	revalidateOnFocus: false,
	// 	fallbackData: [],
	// });
	const { data, loading } = useQuery<GetBoardsQuery>(GetBoardDocument);
	console.log(data);

	if (loading) {
		return <BoardLoading />;
	}
	// if (error) return <ErrorComponent />;
	return (
		Array.isArray(data) &&
		data.map((board: IApiResponseData) => <BoardItem key={board.boardId} board={board} />)
	);
}
