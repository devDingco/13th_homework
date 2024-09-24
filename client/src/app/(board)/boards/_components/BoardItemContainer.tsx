/** @format */

'use client';

import getAllBoards from '@/app/apis/boards/getAllBoards';

import { useEffect, useState } from 'react';
import BoardItem from './BoardItem';
import { IApiResponseData } from '@/models/apiResponse';

export default function BoardItemContainer() {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [boardItem, setBoardItem] = useState<IApiResponseData>();

	useEffect(() => {
		const getAllBoardData = async () => {
			setIsLoading(true);
			try {
				const response = await getAllBoards();

				if (response.statusCode === 200 && response) {
					setBoardItem(response.data);
				}
			} catch (error) {
				console.error('Error fetching boards:', error);
			} finally {
				setIsLoading(false);
			}
		};

		getAllBoardData();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		Array.isArray(boardItem) &&
		boardItem.map((board) => <BoardItem key={board.boardId} board={board} />)
	);
}
