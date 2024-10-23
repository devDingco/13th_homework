import { useState, useCallback, ChangeEvent } from "react";
import { gql, useQuery } from "@apollo/client";
import _ from "lodash";
import { FetchBoardsWithSearchDocument } from "@/commons/graphql/graphql";

const FETCH_BOARDS = gql`
  query fetchBoardsWithSearch($currentPage: Int, $search: String) {
    fetchBoards(page: $currentPage, search: $search) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

const useSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { data, refetch } = useQuery(FetchBoardsWithSearchDocument, {
    variables: { currentPage: 1, search: "" },
  });

  // 디바운스된 검색 함수
  const getDebounce = useCallback(
    _.debounce((value: string) => {
      setKeyword(value);
      refetch({ search: value, currentPage: 1 });
    }, 300),
    []
  );

  // 검색어 변경 핸들러
  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    getDebounce(value);
  };

  return { onChangeSearch, data, keyword };
};

export default useSearch;
