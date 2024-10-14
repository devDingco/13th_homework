/** @format */
'use client';

import BoardLoading from './BoardLoading';
import { boardUrlEndPoint } from '@/apis/config';
import fetcher from '@/libs/fetcher';
import { usePaginationStore } from '@/stores/usePaginationStore';
import useSWR from 'swr';

export default function BoardPaginationContainer() {
	const { setPageCount } = usePaginationStore();
	const { data, isLoading, error } = useSWR(`${boardUrlEndPoint}/count}`, fetcher, {
		suspense: true,
		revalidateOnFocus: false,
		fallbackData: [],
	});

	if (isLoading) {
		return <BoardLoading />;
	}

	if (error) return <div>error</div>;
	if (data) {
		setPageCount(data);
	}
	// return data && [...new Array(data < 10 ? data : 10)].map(())
}
