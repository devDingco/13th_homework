import { useState, useCallback, ChangeEvent } from "react";
import { gql, useQuery } from "@apollo/client";
import _ from "lodash";
import { FetchBoardsWithSearchDocument } from "@/commons/graphql/graphql";

const FETCH_TRAVEL_PRODUCTS = gql`
  query FetchTravelProducts($isSoldout: Boolean, $search: String, $page: Int) {
    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {
      _id
      name
      price
      images
      tags
      contents
      seller {
        name
        picture
      }
    }
  }
`;
const useSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { data, refetch } = useQuery(FETCH_TRAVEL_PRODUCTS, {
    variables: { page: 1, search: "" },
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
