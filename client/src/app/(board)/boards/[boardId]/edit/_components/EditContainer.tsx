/** @format */
'use client';

import BoardLoading from '../../../_components/BoardLoading';
import { IboardId } from '@/models/children.type';
import NewForm from '../../../new/_components/NewForm';
import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

export default function EditContainer({ boardId }: IboardId) {
	const { data, isLoading } = useSWR(`/board/${boardId}`, fetcher, {
		suspense: true,
		revalidateOnFocus: false,
		fallbackData: [],
	});

	if (isLoading) {
		return <BoardLoading />;
	}

	return <>{data && <NewForm />}</>;
}
