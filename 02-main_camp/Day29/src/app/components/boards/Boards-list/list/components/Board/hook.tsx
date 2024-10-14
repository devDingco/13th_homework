import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from "@/commons/gql/graphql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

const useBoard = (id: string) => {
  const router = useRouter();
  const [deleteBoard] = useMutation(DeleteBoardDocument);

  const onClickBoard = () => {
    router.push(`/boards/${id}`);
  };

  const onClickDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteBoard({
      variables: {
        id: id,
      },
      refetchQueries: [
        {
          query: FetchBoardsDocument,
          variables: {
            page: Number(1),
          },
        },
      ],
    });
  };

  return {
    onClickBoard,
    onClickDelete,
  };
};

export default useBoard;
