"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FETCH_BOARD } from "../graphql/backend-api";

export default function UseBoardsDetail() {
  const params = useParams();
  const boardId = params.boardId;
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId },
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
