/** @format */
'use client';
// CHECKLIST : SWR은 상태관리라이브러리입니다. prop drilling으로 data를 안 내려줘도 됨.

// import { GetBoardDocument, GetBoardsQuery } from '@/graphql/generated/graphql';

import BoardItem from './BoardItem';
import BoardLoading from './BoardLoading';
import ErrorComponent from './ErrorComponent';
import { IApiResponseData } from '@/models/apiResponse';
import { ISearchParamsProps } from '@/models/children.type';
import { boardUrlEndPoint } from '@/apis/config';
import fetcher from '@/libs/fetcher';
// import { useQuery } from '@apollo/client';
import useSWR from 'swr';

export default function BoardItemContainer({ searchParams }: ISearchParamsProps) {
	const page = parseInt((searchParams.page as string) || '1');
	const take = parseInt((searchParams.page as string) || '10');
	const { data, isLoading, error } = useSWR(
		`${boardUrlEndPoint}?page=${page}&take=${take}`,
		fetcher,
		{
			suspense: true,
			revalidateOnFocus: false,
			fallbackData: [],
		},
	);
	// const { data, loading } = useQuery<GetBoardsQuery>(GetBoardDocument);

	if (isLoading) {
		return <BoardLoading />;
	}
	if (error) return <ErrorComponent />;
	console.log(data);
	return (
		Array.isArray(data.result) &&
		data.result.map((board: IApiResponseData) => (
			<BoardItem key={board.boardId} board={board} />
		))
	);
}
