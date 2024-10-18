/** @format */

import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACK_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const boardUrlEndPoint = '/board';
export const boardsUrlEndPoint = `${boardUrlEndPoint}s`;
export const newUrlEndPoint = '/new';
export const editUrlEndPoint = '/edit';
export const commentUrlEndPoint = '/comment';
export const reactionUrlEndPoint = '/reaction';

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
		if (error.response) {
			const status = error.response.status;

			switch (status) {
				case 401:
					console.log('Unauthorized! Redirecting to login...');
					break;

				case 403:
					console.log('Forbidden! You do not have access.');
					break;

				case 500:
					console.log('Server error. Please try again later.');
					break;

				default:
					console.log(`Error occurred: ${status} - ${error.message}`);
			}
			if (error.response.data && error.response.data.message) {
				console.error('Error message:', error.response.data.message);
			}
		} else if (error.request) {
			console.error('No response received:', error.request);
		} else {
			console.error('Error setting up request:', error.message);
		}

		return Promise.reject(error);
	},
);
