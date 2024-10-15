import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import {
  FetchBoardsDocument,
  DeleteBoardDocument,
} from "@/commons/gql/graphql";

export function useBoardsList() {
  const [deleteBoard] = useMutation(DeleteBoardDocument);
  const router = useRouter();

  const onClickMove = (id: string) => {
    router.push(`/boards/${id}`);
  };

  const onClickDelete = (event: MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    deleteBoard({
      variables: {
        board_id: event.currentTarget.id,
      },
      refetchQueries: [{ query: FetchBoardsDocument }],
    });
  };

  return {
    onClickMove,
    onClickDelete,
  };
}
