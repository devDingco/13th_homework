/** @format */

import { ICreateFormBoard } from './formBoard';

export interface IApiResponseData extends ICreateFormBoard {
	boardId: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface IApiResponse {
	message: string;
	statusCode: number;
	data: IApiResponseData;
}

export interface IBoardProps {
	infor: IApiResponseData;
}
