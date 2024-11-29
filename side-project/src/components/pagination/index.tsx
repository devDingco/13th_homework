'use client';

import { Pagination } from 'antd';

interface PaginationComponentProps {
  currentPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent({
  currentPage,
  total,
  onPageChange,
}: PaginationComponentProps) {
  return (
    <>
      <Pagination
        current={currentPage}
        total={total}
        onChange={onPageChange}
        pageSize={7} // 페이지당 항목 수를 고정
        align="center"
      />
    </>
  );
}
