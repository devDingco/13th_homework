"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FETCH_SOLPLACE_LOG } from "../apis/queries/fetch-solplace-logs";

export const usePlaceDetail = () => {
  const params = useParams();
  const id = params.solplaceLogId.toString();

  const { data } = useQuery(FETCH_SOLPLACE_LOG, { variables: { id } });

  return { data };
};
