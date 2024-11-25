"use client";

import {
  DeleteBoardCommentDocument,
  // FetchBoardCommentsDocument,
  FetchBoardCommentsQuery,
} from "@/commons/graphql/graphql";
import { useState } from "react";
import { useMutation } from "@apollo/client";
// import { useParams } from "next/navigation";
import { useModalStore } from "@/commons/stores/modal-store";

const useCommentItem = () => {
  // const { boardId }: { boardId: string } = useParams();
  const { isModal, setIsModal, removeModal } = useModalStore();

  const [deleteComment] = useMutation(DeleteBoardCommentDocument);
  const [isEdit, setIsEdit] = useState(false);

  // ! 댓글 삭제
  const commentDelete = async (commentId: string) => {
    // 댓글 삭제 요청 시 비밀번호 확인 모달 노출
    setIsModal({
      name: "delete_password_check",
      confirm: async (value) => {
        try {
          await deleteComment({
            variables: {
              password: value,
              boardCommentId: commentId,
            },
            update(cache, { data }) {
              cache.modify({
                fields: {
                  fetchBoardComments: (prev, { readField }) => {
                    const deletedCommentId = data?.deleteBoardComment;
                    // 기존 댓글 리스트에서 삭제한 댓글 제거
                    console.log(readField("_id", prev[0]));
                    return prev.filter(
                      (
                        comment: FetchBoardCommentsQuery["fetchBoardComments"][0]
                      ) => readField("_id", comment) !== deletedCommentId
                    );
                  },
                },
              });
            },
          });
          removeModal("delete_password_check"); // 비밀번호 확인 모달 닫기
          setIsModal({ name: "success", contents: "댓글이 삭제되었습니다." }); // 삭제 성공 모달
        } catch (error) {
          if (error instanceof Error) {
            setIsModal({ name: "error", contents: `${error.message}` });
          }
        }
      },
    });
  };

  // ! 댓글 수정 모드 처리 함수
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
