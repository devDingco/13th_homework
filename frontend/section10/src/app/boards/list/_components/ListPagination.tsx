import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

export default function ListPagination({ refetch, lastPage, pageScale }) {
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const onClickPage = (event) => {
    const page = Number(event.currentTarget.id);
    setCurrentPage(page);
    refetch({ page });
  };
  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - pageScale);
    setCurrentPage(startPage - pageScale);
    refetch({ page: startPage - pageScale });
  };
  const onClickNextPage = () => {
    if (startPage + pageScale >= lastPage) return;
    setStartPage(startPage + pageScale);
    setCurrentPage(startPage + pageScale);
    refetch({ page: startPage + pageScale });
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={onClickPrevPage} />
        </PaginationItem>
        {new Array(pageScale).fill(0).map(
          (el, idx) =>
            idx + startPage <= lastPage && (
              <PaginationItem key={idx + startPage}>
                <PaginationLink
                  id={String(idx + startPage)}
                  isActive={idx + startPage === currentPage ? true : false}
                  onClick={onClickPage}
                >
                  {idx + startPage}
                </PaginationLink>
              </PaginationItem>
            )
        )}
        <PaginationItem>
          <PaginationNext onClick={onClickNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
