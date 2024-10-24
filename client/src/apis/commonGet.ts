/** @format */

import { api } from '../../config/axiosConfig';

export default async function commonGet(url: string) {
	return await api.get(url).then((response) => response.data);
}
