import { FETCH_BOARDS } from '@/app/_api/board/Query';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

export default function useFetchBoardsData(page = 1, search = '') {
  // ?fetch
  const { data, loading, refetch } = useQuery(FETCH_BOARDS, {
    fetchPolicy: 'no-cache',
    variables: { page, search },
  });

  return { data, loading, refetch };
}
