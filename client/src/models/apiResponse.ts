/** @format */
// TODO - 전반적으로 interface 재사용을 올려야함.

import { ICreateFormBoard } from './board.type';

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
