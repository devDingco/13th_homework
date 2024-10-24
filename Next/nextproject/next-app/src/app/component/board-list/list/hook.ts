import { useMutation, useQuery } from "@apollo/client";
import {
  DeleteBoard,
  FetchBoardsCount,
  FetchBoards,
} from "../../queires/queries";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { IListProps } from "./types";

export default function UseListWrite(props: IListProps) {
  const { data, refetch } = useQuery(FetchBoards, {
    variables: {
      mypage: props.currentPage,
    },
  });

  const { data: dataBoardsCount } = useQuery(FetchBoardsCount);
  const router = useRouter();

  const onMoveDetailPage = (id: string) => {
    router.push(`/routes/boards/${id}`);
  };

  const [deleteBoard] = useMutation(DeleteBoard);

  const onClickDelete = async (
    event: MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    console.log(id);
    try {
      await deleteBoard({
        variables: {
          boardId: id,
        },
        refetchQueries: [FetchBoards],
      });
    } catch (err) {
      console.log(err);
    }
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
