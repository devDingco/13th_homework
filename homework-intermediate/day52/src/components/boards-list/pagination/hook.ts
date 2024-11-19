import { FetchBoardsCountDocument } from '@/commons/graphql/graphql';
import { gql, useQuery } from '@apollo/client';
import { MouseEvent, useState } from 'react';

export const FETCH_BOARDS_COUNT = gql`
	query fetchBoardsCount(
		$search: String
		$endDate: DateTime
		$startDate: DateTime
	) {
		fetchBoardsCount(search: $search, endDate: $endDate, startDate: $startDate)
	}
`;

export const usePagination = (props) => {
	const { setActivePage, refetch, titleSearch } = props;

	const [startPage, setStartPage] = useState(1);
	const { data: dataBoardsCount } = useQuery(FetchBoardsCountDocument, {
		variables: { search: titleSearch },
	});
	const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

	const onClickPrevPageGroup = () => {
		if (startPage === 1) return;
		setStartPage(startPage - 10);
		setActivePage(startPage - 10);
		refetch({ page: startPage - 10 });
	};

	const onClickNextPageGroup = () => {
		if (lastPage < startPage + 10) return;
		setStartPage(startPage + 10);
		setActivePage(startPage + 10);
		refetch({ page: startPage + 10 });
	};

	const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
		setActivePage(+event.currentTarget.id);
		refetch({ page: +event.currentTarget.id });
	};

	return {
		startPage,
		lastPage,
		onClickPrevPageGroup,
		onClickNextPageGroup,
		onClickPage,
	};
};
