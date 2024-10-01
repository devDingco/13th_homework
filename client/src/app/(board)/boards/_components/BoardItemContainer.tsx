/** @format */
'use client';

// import { IBoardReaderResource, IBoardResponse } from '@/models/boardReaderResponse';
import BoardItem from './BoardItem';
import BoardLoading from './BoardLoading';
import { IApiResponseData } from '@/models/apiResponse';
import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

export default function BoardItemContainer() {
	// const boards: IBoardResponse = resource.read();
	const { data } = useSWR('/board', fetcher, {
		suspense: true,
		fallback: <BoardLoading />,
	});

	return (
		Array.isArray(data) &&
		data.map((board: IApiResponseData) => <BoardItem key={board.boardId} board={board} />)
	);
}
