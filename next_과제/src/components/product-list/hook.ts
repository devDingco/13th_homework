"use client";
import { FetchTravelproductsDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useSearch } from "@/commons/stores/search-store";
import { useState } from "react";

export const useProductList = () => {
  const { search } = useSearch();
  const [isSoldout, setIsSoldout] = useState(false);
  const { data: fetchTravelsData, refetch } = useQuery(
    FetchTravelproductsDocument,
    {
      variables: { isSoldout },
    }
  );
  const data = fetchTravelsData?.fetchTravelproducts;
  console.log("숙박리스트", data);

  const handleSearch = async () => {
    const result = await refetch({ search });
    console.log(result);
  };

  return { data, handleSearch, setIsSoldout, isSoldout };
};
