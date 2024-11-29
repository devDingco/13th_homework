'use client';

import { useRouter } from 'next/navigation';
import PaginationComponent from '@/components/pagination';
import { useFetchBoardsQuery } from '@/graphql/queries/fetchBoards/fetchBoards.generated';
import { useFetchBoardsCountQuery } from '@/graphql/queries/fetchBoardsCount/fetchBoardsCount.generated';
import { useState } from 'react';

export default function MainListComponent() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 게시글 수
  const { data: countData } = useFetchBoardsCountQuery();

  // 페이지 변경 시 데이터를 가져오기
  const { data, refetch } = useFetchBoardsQuery({
    variables: { page: currentPage },
    fetchPolicy: 'cache-and-network',
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch({ page }); // 페이지 변경 시 데이터를 다시 가져오기
  };

  return (
    <div>
      <h1>게시글 목록</h1>
      {data?.fetchBoards.map((board) => (
        <div
          className="flex gap-3 justify-center"
          key={board._id}
          onClick={() => router.push(`/boards/${board._id}`)}
        >
          <h3>{board.title}</h3>
          <p>{board.contents}</p>
          <small>작성자: {board.writer}</small>
          <p>{String(board.createdAt).split('T')[0]}</p>
        </div>
      ))}
      <PaginationComponent
        currentPage={currentPage}
        total={countData?.fetchBoardsCount || 0}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
