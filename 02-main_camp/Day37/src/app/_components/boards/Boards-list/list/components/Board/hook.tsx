import { ISearchParams, useSearchStore } from "@/app/_store/boards/store";
import { DeleteBoardDocument } from "@/commons/gql/graphql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

interface IBoardProps {
  id: string;
  refetchBoards: (searchParams: ISearchParams, page: number) => void;
}

const useBoard = ({ id, refetchBoards }: IBoardProps) => {
  const { searchParams } = useSearchStore();
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
    });
    refetchBoards(searchParams, 1);
  };

  return {
    onClickBoard,
    onClickDelete,
    searchParams,
  };
};

export default useBoard;
