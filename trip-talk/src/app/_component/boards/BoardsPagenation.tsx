import pagenation from '@/app/_commons/formatter/pagenation';
import {
  Exact,
  FetchBoardsQuery,
  InputMaybe,
  Scalars,
} from '@/app/_commons/graphql/graphql';
import { ApolloQueryResult, gql, useQuery } from '@apollo/client';
import { SetStateAction, useEffect, useRef, useState } from 'react';

const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

export default function BoardsPagenation({
  nowPage,
  setPage,
  onPageChange,
  refetch,
}: {
  nowPage: number;
  setPage: (value: number) => void;
  onPageChange: (newPage: number) => void;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            page?: InputMaybe<Scalars['Int']['input']>;
          }>
        >
      | undefined,
  ) => Promise<ApolloQueryResult<FetchBoardsQuery>>;
}) {
  const [startPage, setStartPage] = useState(1);
  const fetchBoardCount = useQuery(FETCH_BOARDS_COUNT);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    setLastPage(pagenation(fetchBoardCount.data?.fetchBoardsCount));
  }, [fetchBoardCount]);

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage((prev) => prev - 10);
    setPage(startPage - 10);
    refetch({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 10);
      setPage(startPage + 10);
      refetch({ page: startPage + 10 });
    }
  };

  return (
    <div className="flex gap-1 w-full justify-center">
      {startPage !== 1 && <button onClick={onClickPrevPage}>&lt;</button>}
      {fetchBoardCount.data &&
        new Array(10).fill('').map(
          (_, index) =>
            index + startPage <= lastPage && (
              <button
                className={`${
                  nowPage === Number(index + startPage) &&
                  'font-bold text-primary'
                }`}
                key={index + startPage}
                id={String(index + startPage)}
                // onClick={onClickPage}
                onClick={(e) => {
                  onPageChange(Number(e.currentTarget.id));
                }}
                style={{ margin: '5px' }}>
                {index + startPage}
              </button>
            ),
        )}
      {startPage + 10 <= lastPage && (
        <button onClick={onClickNextPage}>&gt;</button>
      )}
    </div>
  );
}
