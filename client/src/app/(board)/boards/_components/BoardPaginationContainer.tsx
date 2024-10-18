/** @format */
'use client';

import BoardLoading from './BoardLoading';
import { boardUrlEndPoint } from '~/config/axios_config';
import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

export default function BoardPaginationContainer() {
	const { data, isLoading, error } = useSWR(`${boardUrlEndPoint}/count}`, fetcher, {
		suspense: true,
		revalidateOnFocus: false,
		fallbackData: [],
	});

	if (isLoading) {
		return <BoardLoading />;
	}

	if (error) return <div>error</div>;
    return {data && }
}
