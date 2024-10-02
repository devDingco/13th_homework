/** @format */

import { IApiResponseData } from '@/models/apiResponse';
import { IBoardReader } from '@/models/boardReaderResponse';
import { api } from '../config';

export default function getAllBoardsSuspense(): IBoardReader {
	let status = 'pending';

	let board: IApiResponseData | Promise<IApiResponseData>;
	const response = api
		.get('/board')
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
