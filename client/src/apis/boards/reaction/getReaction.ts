/** @format */

import { IReaction } from '@/models/board.type';
import { IReactionReader } from '@/models/boardReaderResponse';
import { api } from '../../config';

export default function getReaction(boardId: number): IReactionReader {
	let status = 'pending';

	let board: IReaction | Promise<IReaction>;
	const response = api
		.get(`/board/${boardId}/reaction`)
		.then((response) => {
			board = response.data.data;
			status = 'fulfilled';
		})
		.catch((e) => {
			status = 'reject';
			board = e;
		});

	return {
		read() {
			if (status === 'pending') {
				throw response;
			} else if (status === 'reject') throw board;
			else if (status === 'fulfilled') return board;
		},
	};
}