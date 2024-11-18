"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
// import { DETAIL_FETCH_BOARD } from "@/components/board-detail/queries";
import { FetchBoardDocument } from "@/commons/graphql/graphql";

export const useBoardDetail = () => {
  const { boardId }: { boardId: string } = useParams();
  const { data, error, loading } = useQuery(FetchBoardDocument, {
    variables: { boardId },
  });
  const detailData = data?.fetchBoard;
  return { detailData, boardId, error, loading };
};
