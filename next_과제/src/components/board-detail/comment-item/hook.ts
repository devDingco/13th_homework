"use client";

import {
  DeleteBoardCommentDocument,
  FetchBoardCommentsDocument,
} from "@/commons/graphql/graphql";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { useModalStore } from "@/commons/stores/modal-store";

const useCommentItem = () => {
  const { boardId }: { boardId: string } = useParams();
  const { isModal, setIsModal } = useModalStore();

  const [deleteComment] = useMutation(DeleteBoardCommentDocument);
  const [isEdit, setIsEdit] = useState(false);

  // 댓글 삭제
  const commentDelete = async (commentId: string) => {
    // 비밀번호 확인 모달
    setIsModal({
      name: "delete_password_check",
      confirm: async (value) => {
        try {
          await deleteComment({
            variables: {
              password: value,
              boardCommentId: commentId,
            },
            refetchQueries: [
              {
                query: FetchBoardCommentsDocument,
                variables: { boardId: boardId },
              },
            ],
          });
          setIsModal({ name: "success", contents: "댓글이 삭제되었습니다." }); // 삭제 성공 모달
        } catch (error) {
          if (error instanceof Error) {
            setIsModal({ name: "error", contents: `${error.message}` });
          }
        }
      },
    });
  };

  // 댓글 수정 모드
  const editModeHandler = () => {
    setIsEdit(!isEdit);
  };

  return {
    isEdit,
    commentDelete,
    editModeHandler,
    isModal,
    setIsModal,
  };
};

export default useCommentItem;
