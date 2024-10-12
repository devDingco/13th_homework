import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from "@/commons/graphql/graphql";
import { errorModal, successModal } from "@/utils/modal";

export const useBoardsList = (id?: string) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const [deleteBoard] = useMutation(DeleteBoardDocument);
  const { data } = useQuery(FetchBoardsDocument);

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  // 게시글 클릭시 디테일페이지로 이동

  const onClickBoard = () => {
    console.log(id);
    router.push(`/boards/${id}`);
  };

  // 게시글 삭제
  const onClickDelete = (event: MouseEvent<HTMLButtonElement>) => {
    // 디테일페이지로 이동되는 거 막기! (이벤트버블링)
    event.stopPropagation();
    const boardId = Array.isArray(id) ? id[0] : id;
    try {
      deleteBoard({
        variables: {
          boardId,
        },
        refetchQueries: [{ query: FetchBoardsDocument }],
      });
      successModal("게시글을 삭제하였습니다.");
    } catch (error) {
      console.error(error);
      errorModal("게시글을 삭제할 수 없습니다 ");
    }
  };

  return {
    data,
    onMouseEnter,
    onMouseLeave,
    onClickBoard,
    onClickDelete,
    isHovered,
  };
};
