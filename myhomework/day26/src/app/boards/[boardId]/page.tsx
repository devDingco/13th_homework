"use client";

import { FetchBoardDocument } from "@/commons/graphql/graphql";
import BoardsDetail from "@/components/boards-detail";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export default function BoardsNewPage() {
  const params = useParams();
  console.log(params.boardId);
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: params.boardId as string },
  });
  return <BoardsDetail isEdit={false} data={data} />;
}
