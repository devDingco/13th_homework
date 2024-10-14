'use client';

import { usePagination } from './hook';
import { IBoardsPaginationProps } from './types';

export default function BoardsPagination({
  refetch,
  lastPage,
}: IBoardsPaginationProps) {
  const {
    activePage,
    startPage,
    onClickPrevPageGroup,
    onClickNextPageGroup,
    onClickPage,
  } = usePagination({ refetch, lastPage });

  return (
    <div className="flex gap-2 items-center justify-center p-4">
      <span onClick={onClickPrevPageGroup} className="cursor-pointer">
        이전페이지
      </span>
      {new Array(10).fill(null).map(
        (_, idx) =>
          idx + startPage <= lastPage && (
            <span
              key={idx + startPage}
              id={`${idx + startPage}`}
              onClick={onClickPage}
              className={`cursor-pointer w-10 h-10 flex items-center justify-center text-lg rounded-full border-2 ${
                activePage === idx + startPage
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {idx + startPage}
            </span>
          )
      )}
      <span className="cursor-pointer" onClick={onClickNextPageGroup}>
        다음페이지
      </span>
    </div>
  );
}
