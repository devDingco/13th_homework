/** @format */

import { use } from 'react';
import { wrapPromise } from '@/utils/wrapPromise';

export function useResource<T>(promise: Promise<T>): T {
	const resource = wrapPromise(promise);
	return use(resource);
}
