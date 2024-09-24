/** @format */

// import getAllBoards from '@/app/apis/boards/getAllBoards';

// import { useEffect, useState } from 'react';
import BoardItem from './BoardItem';
// import { IApiResponseData } from '@/models/apiResponse';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BoardItemContainer({ resource }: any) {
	const boards = resource.read();

	return boards.map((board) => <BoardItem key={board.boardId} board={board} />);
}
