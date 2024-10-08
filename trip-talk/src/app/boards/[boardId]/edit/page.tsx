"use client";

import { useParams } from "next/navigation";
import BoardsWrite from "../../../components/BoardsWrite/BoardsWrite";
import { useQuery } from "@apollo/client";
import { FetchBoardDocument } from "../../../../commons/graphql/graphql";

export default function BoardsEdit() {
  const params = useParams();
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: String(params.boardId) },
  });
  return (
    <>
      <BoardsWrite isEdit={true} data={data} />
    </>
  );
}
