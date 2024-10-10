import { useMutation, useQuery } from "@apollo/client";
import { DELETE_BOARD, FETCH_BOARDS } from "./queries";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function useBoard() {
  const { data } = useQuery(FETCH_BOARDS);
  console.log(data);

  const router = useRouter();

  const goingBoardDetail = (id: string) => {
    router.push(`/boards/${id}`);
  };

  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = (event: MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    const target = event.target as HTMLImageElement; // 타입 단언 추가
    deleteBoard({
      variables: {
        boardId: target.id,
      },
      refetchQueries: [
        { query: FETCH_BOARDS },
        // {}
        // ....
      ],
    });
    alert("삭제되었습니다!");
  };
  return {
    goingBoardDetail,
    onClickDelete,
    data,
  };
}
