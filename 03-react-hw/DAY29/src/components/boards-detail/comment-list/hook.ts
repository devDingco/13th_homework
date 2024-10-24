import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { DELETE_BOARD_COMMENT } from "./queries";
import { useState } from "react";

export default function useCommentList() {
  const params = useParams();
  const boardId = params.boardId as string;

  const { data } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      boardId,
    },
  });

  // 댓글 수정 상태 췤
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = () => {
    setIsEdit((prev) => !prev);
  };

  // 댓글 삭제
  const [deleteBoardComment] = useMutation(DELETE_BOARD_COMMENT, {
    //댓글 리스트 새로고침
    refetchQueries: [
      {
        query: FetchBoardCommentsDocument,
        variables: { boardId },
      },
    ],
  });

  // 댓글 삭제 기능
  const handleDelete = async (commentId: string) => {
    console.log("삭제 댓글 아이디: ", commentId);
    try {
      const password = prompt("댓글을 삭제하려면 비밀번호를 입력하세요.");
      if (!password) return;

      await deleteBoardComment({
        variables: {
          password,
          boardCommentId: commentId,
        },
      });
      alert("댓글이 삭제되었습니다.");
    } catch (error) {
      console.log("댓글 삭제 실패: ", error);
    }
  };

  return {
    data,
    handleDelete,
    onEdit,
    isEdit,
  };
}
