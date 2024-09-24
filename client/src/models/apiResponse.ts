/** @format */

import { ICreateFormBoard } from './formBoard';

export interface IApiResponseData extends ICreateFormBoard {
	boardId: number;
	createdsAt: Date;
	updatedAt: Date;
}

export interface IApiResponse {
	message: string;
	statusCode: number;
	data: IApiResponseData;
}
