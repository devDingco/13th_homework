import { usePageChange } from "@/commons/stores/page-store";
import { useSearch } from "@/commons/stores/search-store";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSearchDate } from "@/commons/stores/search-date-store";
import { IQuery } from "./types";

export const useTableList = ({
  refetch,
}: {
  refetch: (query: IQuery) => void;
}) => {
  const pathname = usePathname();
  const { search } = useSearch();
  const { page, setPage } = usePageChange();
  const { startDate, endDate } = useSearchDate();

  useEffect(() => {
    // ! 페이지 변경시 테이블 페이지 초기화
    setPage(1);
  }, [pathname]);

  // ! 페이지 변경시 리페치 처리 핸들러
  const pageChangeHandler = async (page: number) => {
    const query: IQuery = { search, page };
    if (startDate) query.startDate = startDate;
    if (endDate) query.endDate = endDate;

    const result = await refetch(query);
    console.log(result);
    setPage(page);
  };

  return { page, pageChangeHandler };
};
