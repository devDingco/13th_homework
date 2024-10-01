/** @format */

import { api } from '../apis/config';

const fetcher = async (url: string) => {
	return await api.get(url).then((res) => res.data.data);
};

export default fetcher;
