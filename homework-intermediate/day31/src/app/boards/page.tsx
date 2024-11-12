'use client';

import BoardsPagination from '@/components/boards-list/pagination';
import BoardList from '@/components/boards-list/list';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FetchBoardsDocument } from '@/commons/graphql/graphql';

export default function BoardsPage() {
  const [activePage, setActivePage] = useState(1);

  const { data } = useQuery(FetchBoardsDocument, {
    variables: { page: activePage },
  });

  return (
    <>
      <BoardList data={data} activePage={activePage} />
      <BoardsPagination activePage={activePage} setActivePage={setActivePage} />
    </>
  );
}
