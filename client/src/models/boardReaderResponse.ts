/** @format */

import { IApiResponseData } from './apiResponse';
import { IReaction } from './board.type';

export type IBoardResponse = IApiResponseData | Promise<IApiResponseData> | undefined;

export interface IBoardReader {
	read(): IBoardResponse;
}
export interface IBoardReaderResource {
	resource: IBoardReader;
}

export type IReactionResponse = IReaction | Promise<IReaction> | undefined;

export interface IReactionReader {
	read(): IReactionResponse;
}

export interface IReactionResource {
	resource: IReactionReader;
}
