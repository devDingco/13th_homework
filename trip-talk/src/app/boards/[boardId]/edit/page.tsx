"use client"

import { useParams } from "next/navigation";
import BoardsWrite from "../../../components/BoardsWrite/BoardsWrite";
import { useQuery } from "@apollo/client";
import { FETCH_BOARD } from "../../../../commons/graphql/backend-api";

export default function BoardsEdit() {
  const params = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: params.boardId },
  });
  return (
    <>
      <BoardsWrite isEdit={true} data={data} />
    </>
  );
}
