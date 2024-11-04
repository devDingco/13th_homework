"use client";
// import { FETCH_TRAVELS } from "./queries";
import { FetchTravelproductsDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";

export const useProductList = () => {
  const { data: fetchTravelsData } = useQuery(FetchTravelproductsDocument, {
    variables: { isSoldout: false, search: "", page: 2 },
  });
  const data = fetchTravelsData?.fetchTravelproducts;
  console.log("숙박리스트", data);

  return { data };
};
