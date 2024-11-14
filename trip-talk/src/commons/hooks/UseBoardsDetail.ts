"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FetchBoardDocument } from "../graphql/graphql";

export default function useBoardsDetail() {
  const params = useParams();
  const boardId = params.boardId;
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: String(boardId) },
  });

  const boardData = data?.fetchBoard;

  return { boardId, boardData };
}
