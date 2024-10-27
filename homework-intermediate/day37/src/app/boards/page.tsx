'use client';

import BoardsPagination from '@/components/boards-list/pagination';
import BoardList from '@/components/boards-list/list';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FetchBoardsDocument } from '@/commons/graphql/graphql';
import BoardTitleSearch from '@/components/boards-list/search';

export default function BoardsPage() {
	const [activePage, setActivePage] = useState(1);
	const { data, refetch } = useQuery(FetchBoardsDocument);

	return (
		<div className="flex w-full max-w-7xl flex-col gap-8">
			<BoardTitleSearch refetch={refetch} />
			<BoardList data={data} />
			<BoardsPagination
				data={data}
				refetch={refetch}
				activePage={activePage}
				setActivePage={setActivePage}
			/>
		</div>
	);
}
