"use client";

import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { MouseEvent } from "react";
import {
  DeleteBoardDocument,
  FetchBoardQuery,
  FetchBoardsDocument,
} from "@/commons/graphql/graphql";

export const useBoardsList = () => {
  const params = useParams();
  const { data } = useQuery<FetchBoardQuery>(FetchBoardsDocument);
  console.log("Params:", params);

  const result = useQuery(FetchBoardsDocument, {
    variables: { page: 1 },
  });

  const [deleteBoard] = useMutation(DeleteBoardDocument);

  console.log(result.data);

  // const onClickMoveToDetail = (_id: string) => {
  //   router.push(`/boards/${_id}`);
  // };

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
    data,
    onClickDelete,
  };
};
