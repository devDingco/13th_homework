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
  const [keyword, setKeyword] = useState("");

  // 마지막페이지 계산하기
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

  const getDebounce = _.debounce((endDate, startDate, search) => {
    refetch({ endDate, startDate, search, mypage: 1 });
    // 검색했을 때 검색어 넣어서 refetch해주기
    countRefetch({ endDate, startDate, search });
    setKeyword(search);
  }, 500);

  return {
    data,
    keyword,
    getDebounce,
    lastPage,
    refetch,
  };
}
