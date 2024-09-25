/** @format */

import { IBoardReaderResource, IBoardResponse } from '@/models/boardReaderResponse';
import BoardItem from './BoardItem';

export default function BoardItemContainer({ resource }: IBoardReaderResource) {
	const boards: IBoardResponse = resource.read();

	return (
		Array.isArray(boards) &&
		boards.map((board) => <BoardItem key={board.boardId} board={board} />)
	);
}
