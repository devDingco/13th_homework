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

  const writername = "작성자 명을 입력해 주세요.";
  const passwordPlaceholder = "비밀번호를 입력해 주세요.";
  const commentPlaceholder = "댓글을 입력해 주세요.";

  const [commentWriter, setCommentWriter] = useState("");
  const [commentPassword, setCommentPassword] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [createBoardComment] = useMutation(CreateCommentDocument);
  const [updateBoardComment] = useMutation(UpdateCommentDocument);
  const [commentRating, setCommentRating] = useState(0);

  const isButtonActive = isEdit
    ? !commentContent // 수정 모드에서는 내용만 확인
    : !commentWriter || !commentContent; // 등록 모드에서는 작성자와 내용 확인

  useEffect(() => {
    if (isEdit && comments) {
      setCommentWriter(comments.writer || ""); // 기존 작성자 설정
      setCommentContent(comments.contents || ""); // 기존 내용 설정
      setCommentRating(comments.rating || 0); // 기존 별점 설정
    }
  }, [isEdit, comments]);

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentWriter(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentPassword(event.target.value);
  };

  const onChangeComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(event.target.value);
  };

  const onClickComment = async () => {
    try {
      const { data } = await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer: commentWriter,
            password: commentPassword,
            contents: commentContent,
            rating: commentRating,
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
        Modal.success({ content: "댓글 등록에 성공하였습니다." });
        resetFormData();
      } else {
        Modal.error({ content: "댓글 등록에 실패하였습니다." });
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
            rating: commentRating,
          },
          boardCommentId: comments?._id ?? "",
          password: commentPassword,
        },
        refetchQueries: [
          {
            query: FetchCommentsDocument,
            variables: { page: 1, boardId: _id },
          },
        ],
      });
      if (data?.updateBoardComment) {
        Modal.success({ content: "댓글 수정에 성공하였습니다." });
        isEditMode(); // 수정 모드 종료
      } else {
        Modal.error({ content: "댓글 수정에 실패하였습니다." });
      }
    } catch (error) {
      console.error(error);
      Modal.error({ content: "댓글 수정 중 에러가 발생하였습니다." });
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
    setCommentWriter("");
    setCommentPassword("");
    setCommentContent("");
    setCommentRating(0);
  }

  return {
    onChangeWriter,
    onChangePassword,
    onChangeComment,
    onClickComment,
    onClickUpdate,
    onClickCancelEdit,
    isButtonActive,
    writername,
    passwordPlaceholder,
    commentPlaceholder,
    commentRating,
    setCommentRating,
    commentWriter,
    commentPassword,
    commentContent,
  };
};
