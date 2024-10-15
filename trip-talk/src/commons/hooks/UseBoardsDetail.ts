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

  const boardWriter = data?.fetchBoard.writer;
  const boardTitle = data?.fetchBoard.title;
  const boardContents = data?.fetchBoard.contents;
  const boardCreatedAt = data?.fetchBoard.createdAt
    .slice(0, 10)
    .replaceAll("-", ".");

  return {
    boardId,
    boardWriter,
    boardTitle,
    boardContents,
    boardCreatedAt,
  };
}
