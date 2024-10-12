'use client';

import BoardBanner from '@/components/boards-list/banner';
import { BoardsList } from '@/components/boards-list/list';

export default function BoardsListPage() {
  return (
    <>
      <BoardBanner />
      <BoardsList />
    </>
  );
}
