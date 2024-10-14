'use client';

import BoardsPagination from '@/components/boards-list/pagination';
import BoardList from '@/components/boards-list/list';
import { useState } from 'react';

export default function BoardsPage() {
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      <BoardList activePage={activePage} />
      <BoardsPagination activePage={activePage} setActivePage={setActivePage} />
    </>
  );
}
