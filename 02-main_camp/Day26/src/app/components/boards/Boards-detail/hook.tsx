import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FETCH_BOARD } from "../Boards-write/queries";

const useBoardsDetail = () => {
  const router = useRouter();
  const params = useParams();

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
  });

  const board = {
    title: data?.fetchBoard.title,
    writer: data?.fetchBoard.writer,
    contents: data?.fetchBoard.contents,
  };

  const onClickEdit = () => {
    router.push(`/boards/${params.boardId}/edit`);
  };

  const onClickShowBoards = () => {
    router.push("/boards");
  };

  return {
    board,
    onClickEdit,
    onClickShowBoards,
  };
};

export default useBoardsDetail;
