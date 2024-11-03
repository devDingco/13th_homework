/** @format */

import { IApiResponseData } from './apiResponse';

export interface IFormStateError {
	data: IApiResponseData | null;
	errors: {
		author: string | null;
		password: string | null;
		title: string | null;
		content: string | null;
		general: string | null;
	};
}

export interface IFormState {
	Author: string;
	Password: string;
	Title: string;
	Content: string;
}
