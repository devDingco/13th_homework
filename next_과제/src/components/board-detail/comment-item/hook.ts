import {
  DeleteBoardCommentDocument,
  FetchBoardCommentsDocument,
} from "@/commons/graphql/graphql";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";

const useCommentItem = () => {
  const { boardId } = useParams();

  const [deleteComment] = useMutation(DeleteBoardCommentDocument);

  const [isEdit, setIsEdit] = useState(false);

  // 댓글 삭제
  const commentDelete = async (commentId: string) => {
    console.log(commentId);
    try {
      const prompt = window.prompt("비밀번호를 입력해 주세요.");
      if (prompt) {
        const result = await deleteComment({
          variables: {
            password: prompt,
            boardCommentId: String(commentId),
          },
          refetchQueries: [
            {
              query: FetchBoardCommentsDocument,
              variables: { boardId: String(boardId) },
            },
          ],
        });
        console.log(result);
      } else {
        // alert("취소되었습니다.");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`${error.message}`);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  // 댓글 수정 모드
  const editModeHandler = () => {
    setIsEdit(!isEdit);
  };

  return {
    isEdit,
    commentDelete,
    editModeHandler,
  };
};

export default useCommentItem;
