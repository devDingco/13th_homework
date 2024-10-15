'use client';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { usePagination } from './hook';
import { IExtraPaginationProps } from './types';

export default function Pagination({
  refetch,
  lastPageNum,
  setSelectedPage,
}: IExtraPaginationProps) {
  const {
    selectedPage,
    startPageNum,
    onClickNextPage,
    onClickPrevPage,
    renderPage,
  } = usePagination({ refetch, lastPageNum });

  setSelectedPage(selectedPage);

  return (
    <div className="flex justify-center">
      <LeftOutlined
        onClick={onClickPrevPage}
        className="text-slate-800"
        style={{
          color: startPageNum === 1 ? '#bbbbbb' : 'black',
          cursor: startPageNum === 1 ? 'not-allowed' : 'pointer',
        }}
      />
      {new Array(5).fill('').map(
        (_, index) =>
          index + startPageNum <= lastPageNum && (
            <span
              className="text-slate-950 cursor-pointer m-2 flex items-center px-3 py-1"
              key={index + startPageNum}
              id={String(index + startPageNum)}
              onClick={renderPage}
              style={{
                border:
                  selectedPage === index + startPageNum ? '1px solid blue' : '',
                color: selectedPage === index + startPageNum ? 'blue' : '',
              }}
            >
              {index + startPageNum}
            </span>
          )
      )}

      <RightOutlined
        onClick={onClickNextPage}
        className="text-slate-800"
        style={{
          color: startPageNum + 5 > lastPageNum ? '#bbbbbb' : 'black',
          cursor: startPageNum + 5 > lastPageNum ? 'not-allowed' : 'pointer',
        }}
      />
    </div>
  );
}
