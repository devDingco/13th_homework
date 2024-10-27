"use client";

import { useQuery } from "@apollo/client";
import BoardsWrite from "@/components/boards-wirte";
import { useParams } from "next/navigation";
import { FetchBoardDocument } from "@/commons/graphql/graphql";

export default function BoardsEditPage() {
  const params = useParams();
  console.log(params.boardId);
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: params.boardId as string },
  });

  return <BoardsWrite isEdit={true} data={data} />;
}
