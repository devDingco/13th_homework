/** @format */

import { Usable } from 'react';

export function wrapPromise<T>(promise: Promise<T>): Usable<T> {
	let status: 'pending' | 'success' | 'error' = 'pending';
	let result: T | null = null;
	const suspender = promise.then(
		(res) => {
			status = 'success';
			result = res;
		},
		(err) => {
			status = 'error';
			result = err;
		},
	);

	if (status === 'pending') {
		throw suspender;
	} else if (status === 'error') {
		throw result;
	} else if (status === 'success') {
		return result;
	} else {
		throw result;
	}
}
