import { FetchBoardDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function useBoardsDetailForm() {
  const router = useRouter();
  const params = useParams(); //동적 라우팅, boardID에 접근한다
  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: params.boardId as string,
    },
  });

  console.log("상세페이지 ID: ", params.boardId);

  const handlePage = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.id === "boardListPage") {
      router.push(`/boards`);
    } else {
      router.push(`/boards/${params.boardId}/edit`);
    }
  };

  return {
    handlePage,
    data,
    params,
  };
}
