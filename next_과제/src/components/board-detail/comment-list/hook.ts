import { useState } from "react";
// import {
//   FETCH_BOARD_COMMENTS,
//   DELETE_BOARD_COMMENT,
// } from "@/components/board-detail/comment-list/queries";

import {
  FetchBoardCommentsDocument,
  DeleteBoardCommentDocument,
} from "@/commons/graphql/graphql";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "next/navigation";

export const useCommentList = () => {
  const params = useParams();

  const { data, error } = useQuery(FetchBoardCommentsDocument, {
    variables: { page: 1, boardId: String(params.boardId) },
  });

  const [deleteComment] = useMutation(DeleteBoardCommentDocument);

  const [mode, setMode] = useState(
    Array.from({ length: 10 }, (el, idx) => "view") || []
  );

  // 댓글 삭제
  const commentDelete = async (commentId: string) => {
    console.log(commentId, params.boardId);
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
              variables: { page: 1, boardId: String(params.boardId) },
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
  const editModeHandler = (idx: number) => {
    const newMode = [...mode];
    newMode[idx] = newMode[idx] === "view" ? "edit" : "view";
    setMode(newMode);
  };

  return { data, error, commentDelete, editModeHandler, mode, setMode };
};
