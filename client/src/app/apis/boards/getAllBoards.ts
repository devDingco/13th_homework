/** @format */

// import { IApiResponseData } from '@/models/apiResponse';
import { IApiResponseData } from '@/models/apiResponse';
import { api } from '../config';

export default function getAllBoards() {
	let status = 'pending';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let board: IApiResponseData | any;
	const response = api
		.get('/board')
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
