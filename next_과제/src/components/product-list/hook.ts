"use client";
import { FetchTravelproductsDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useSearch } from "@/commons/stores/search-store";
import { useEffect, useState } from "react";

export const useProductList = () => {
  const { search } = useSearch();
  const [isSoldout, setIsSoldout] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: fetchTravelsData,
    refetch,
    fetchMore,
  } = useQuery(FetchTravelproductsDocument, {
    variables: { isSoldout },
  });
  const data = fetchTravelsData?.fetchTravelproducts;
  console.log("숙박리스트", data);

  useEffect(() => {
    if (data) {
      setHasMore(true);
    }
  }, [data]);

  const fetchMoreData = async () => {
    if (!data) return;
    await fetchMore({
      variables: {
        page: Math.ceil((data.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchTravelproducts?.length) {
          setHasMore(false);
          return prev;
        }
        return {
          fetchTravelproducts: [
            ...prev.fetchTravelproducts,
            ...fetchMoreResult.fetchTravelproducts,
          ],
        };
      },
    });
  };

  return {
    data,
    refetch,
    setIsSoldout,
    isSoldout,
    hasMore,
    fetchMoreData,
  };
};
