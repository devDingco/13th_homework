"use client";

import { useMutation } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";
import {
  CreateCommentDocument,
  FetchCommentsDocument,
  UpdateCommentDocument,
} from "@/commons/graphql/graphql";
import { useParams } from "next/navigation";
import { Modal } from "antd";
import { ICommentWriteProps } from "./types";

export const useCommentWrite = ({
  comments,
  isEdit,
  isEditMode,
}: ICommentWriteProps) => {
  const params = useParams();

  const _id = params.boardId as string;

  const commentPlaceholder = "문의사항을 입력해 주세요.";

  const [commentContent, setCommentContent] = useState("");
  const [createBoardComment] = useMutation(CreateCommentDocument);
  const [updateBoardComment] = useMutation(UpdateCommentDocument);

  const isButtonActive = isEdit ? !commentContent : !commentContent;

  useEffect(() => {
    if (isEdit && comments) {
      setCommentContent(comments.contents || ""); // 기존 내용 설정
    }
  }, [isEdit, comments]);

  const onChangeComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(event.target.value);
  };

  const onClickComment = async () => {
    try {
      const { data } = await createBoardComment({
        variables: {
          createBoardCommentInput: {
            contents: commentContent,
          },
          boardId: _id,
        },
        refetchQueries: [
          {
            query: FetchCommentsDocument,
            variables: { page: 1, boardId: _id },
          },
        ],
      });
      console.log("data", data);
      if (data?.createBoardComment) {
        Modal.success({ content: "문의 사항 등록에 성공하였습니다." });
        resetFormData();
      } else {
        Modal.error({ content: "문의 사항 등록에 실패하였습니다." });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickUpdate = async () => {
    try {
      const { data } = await updateBoardComment({
        variables: {
          updateBoardCommentInput: {
            contents: commentContent,
          },
        },
        refetchQueries: [
          {
            query: FetchCommentsDocument,
            variables: { page: 1, boardId: _id },
          },
        ],
      });
      if (data?.updateBoardComment) {
        Modal.success({ content: "수정에 성공하였습니다." });
        isEditMode(); // 수정 모드 종료
      } else {
        Modal.error({ content: "5수정에 실패하였습니다." });
      }
    } catch (error) {
      console.error(error);
      Modal.error({ content: "수정 중 에러가 발생하였습니다." });
    }
  };

  console.log("Updated comment:", comments?.updatedAt);

  const onClickCancelEdit = () => {
    resetFormData();
    Modal.info({
      content: `${isEdit ? "수정" : "등록"}이 취소되었습니다.`,
      onOk: () => {
        isEditMode();
      },
    });
  };

  function resetFormData() {
    // 폼 초기화
    setCommentContent("");
  }

  return {
    onChangeComment,
    onClickComment,
    onClickUpdate,
    onClickCancelEdit,
    isButtonActive,
    commentPlaceholder,
    commentContent,
  };
};
