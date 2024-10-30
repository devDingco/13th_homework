'use client';

import React, { useRef, useState } from 'react';
import Board from '@/app/_component/boards/Board';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from '@/app/_commons/graphql/graphql';
import useModalStore from '@/app/_store/useModalStore';
import BoardsPagenation from '@/app/_component/boards/BoardsPagenation';
import { FETCH_BOARDS } from '@/app/_api/board/Query';
import BoardsListComponent from '@/app/_component/boards/BoardsList';

function BoardsList() {
  // ^state
  const [page, setPage] = useState(1);

  // ?fetch
  const { data, loading, refetch } = useQuery(FETCH_BOARDS, {
    fetchPolicy: 'no-cache',
    variables: { page, search: '' },
  });

  const onPageChange = (newPage: number) => {
    setPage(newPage);
    refetch({ page });
  };
  // *function

  return (
    <>
      <div className="p-10">
        {loading
          ? '리스트 조회중...'
          : data && (
              <BoardsListComponent data={data} page={page} refetch={refetch} />
            )}
        <BoardsPagenation
          nowPage={page}
          setPage={setPage}
          onPageChange={onPageChange}
          refetch={refetch}
        />
      </div>
    </>
  );
}
export default BoardsList;
