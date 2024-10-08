"use client";
import { FetchBoardDocument } from "@/commons/graphql/graphql";
import BoardsWrite from "@/components/boards-write";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export default function BoardsDetailEditPage() {
  const params = useParams();
  const id = params.boardId;

  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: String(id) },
  });
  console.log("editdata:", data);

  return <BoardsWrite isEdit={true} data={data} />;
}
