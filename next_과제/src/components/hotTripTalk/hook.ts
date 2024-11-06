"use client";

import { FetchBoardsOfTheBestDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";

export const useHotTripTalk = () => {
  const { data, error, loading } = useQuery(FetchBoardsOfTheBestDocument);

  return { data: data?.fetchBoardsOfTheBest, error, loading };
};
