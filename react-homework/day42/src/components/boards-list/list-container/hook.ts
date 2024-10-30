import {
  FetchBoardsCountDocument,
  FetchBoardsDocument,
} from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import _ from "lodash";

export default function useBoardsListContainer() {
  const { data, refetch } = useQuery(FetchBoardsDocument);
  const { data: dataBoardsCount, refetch: countRefetch } = useQuery(
    FetchBoardsCountDocument
  );
  // 검색한 keyword
  const [keyword, setKeyword] = useState<string | undefined>(undefined);

  // 마지막페이지 계산하기 - 페이지네이션
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

  return {
    data,
    refetch,
    keyword,
    setKeyword,
    lastPage,
    countRefetch,
  };
}
