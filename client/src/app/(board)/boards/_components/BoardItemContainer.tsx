/** @format */
'use client';

import BoardItem from './BoardItem';
import BoardLoading from './BoardLoading';
import { IApiResponseData } from '@/models/apiResponse';
import { boardUrlEndPoint } from '@/apis/config';
import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

export default function BoardItemContainer() {
	const { data, isLoading } = useSWR(boardUrlEndPoint, fetcher, {
		suspense: true,
		revalidateOnFocus: false,
		fallbackData: [],
	});

	if (isLoading) {
		return <BoardLoading />;
	}
	return (
		Array.isArray(data) &&
		data.map((board: IApiResponseData) => <BoardItem key={board.boardId} board={board} />)
	);
}
