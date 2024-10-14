'use client';

import {
  FetchBoardsCountDocument,
  FetchBoardsDocument,
} from '@/commons/graphql/graphql';
import BoardsPagination from '@/components/boards-list/pagination';
import BoardList from '@/components/boards-list/list';
import { useQuery } from '@apollo/client';

export default function BoardsPage() {
  const { data, refetch } = useQuery(FetchBoardsDocument);
  const { data: dataBoardsCount } = useQuery(FetchBoardsCountDocument);

  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

  return (
    <>
      <BoardList data={data} />
      <BoardsPagination refetch={(args) => refetch(args)} lastPage={lastPage} />
    </>
  );
}
