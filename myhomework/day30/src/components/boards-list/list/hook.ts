"use client";

import { useQuery, useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { MouseEvent } from "react";
import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from "@/commons/graphql/graphql";

export const useBoardsList = (_id: string) => {
  const params = useParams();
  const router = useRouter();
  console.log("Params:", params);

  const result = useQuery(FetchBoardsDocument, {
    variables: { page: 1 },
  });

  const [deleteBoard] = useMutation(DeleteBoardDocument);

  console.log(result.data);

  const onClickMoveToDetail = (_id: string) => {
    router.push(`/boards/${_id}`);
  };

  const onClickDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    deleteBoard({
      variables: {
        boardId: event.currentTarget.id,
      },
      refetchQueries: [{ query: FetchBoardsDocument }],
    });
  };

  return {
    onClickMoveToDetail,
    onClickDelete,
  };
};
