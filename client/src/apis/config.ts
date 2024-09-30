/** @format */

import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACK_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	},
);
