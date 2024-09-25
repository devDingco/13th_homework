/** @format */

import { IApiResponseData } from './apiResponse';

export type IBoardResponse = IApiResponseData | Promise<IApiResponseData> | undefined;

export interface IBoardReader {
	read(): IBoardResponse;
}
export interface IBoardReaderResource {
	resource: IBoardReader;
}
