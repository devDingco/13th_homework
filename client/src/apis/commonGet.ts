/** @format */
'use server';

import { api } from '../../config/axios_config';

export default async function commonGet(url: string) {
	return await api.get(url).then((response) => response.data.data);
}
