/** @format */

import { api } from '../../config';
import { IReactionReader } from '@/models/boardReaderResponse';
import { IReaction } from '@/models/boardType';
//

export default function getReaction(boardId: number): IReactionReader {
	let status = 'pending';

	let board: IReaction | Promise<IReaction>;
	const response = api
		.get(`/board/${boardId}/reaction`)
		.then((response) => {
			setTimeout(() => {
				board = response.data.data;
				status = 'fulfilled';
			}, 2000);
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
