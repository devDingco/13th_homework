import { useMutation, useQuery } from "@apollo/client";
import {
  DeleteBoard,
  FetchBoardsCount,
  FetchBoards,
} from "../../queires/queries";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function UseListWrite(currentPage: number) {
  const { data, refetch } = useQuery(FetchBoards, {
    variables: {
      mypage: currentPage,
    },
  });

  const { data: dataBoardsCount } = useQuery(FetchBoardsCount);
  console.log(dataBoardsCount?.fetchBoardsCount);
  const router = useRouter();

  const onMoveDetailPage = (id: string) => {
    router.push(`/routes/boards/${id}`);
  };

  const [deleteBoard] = useMutation(DeleteBoard);

  const onClickDelete = async (
    event: MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.stopPropagation();
    console.log(id);
    try {
      await deleteBoard({
        variables: {
          boardId: id,
        },
      });
    } catch (err) {
      console.log(err);
    }
    refetch({ page: currentPage });
  };

  const onClickWriteBoard = () => {
    router.push("../../../routes/boards/new");
  };

  return {
    onMoveDetailPage,
    onClickDelete,
    data,
    dataBoardsCount,
    onClickWriteBoard,
    refetch,
  };
}
