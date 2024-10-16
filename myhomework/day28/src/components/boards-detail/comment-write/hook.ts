"use client";

import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  CreateCommentDocument,
  FetchCommentsDocument,
} from "@/commons/graphql/graphql";
import { useParams } from "next/navigation";

export const useCommentWrite = () => {
  const params = useParams();

  const _id = params.boardId as string;

  const writername = "작성자 명을 입력해 주세요.";
  const passwordPlaceholder = "비밀번호를 입력해 주세요.";
  const commentPlaceholder = "댓글을 입력해 주세요.";

  const [commentWriter, setCommentWriter] = useState("");
  const [commentPassword, setCommentPassword] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [createBoardComment] = useMutation(CreateCommentDocument);
  const [value, setValue] = useState(0);

  const isButtonActive = !commentWriter || !commentContent;

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
            rating: value,
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
        alert("댓글 등록에 성공하였습니다.");
        resetFormData();
      } else {
        alert("댓글 등록에 실패하였습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  function resetFormData() {
    // 폼 초기화
    const el = document.querySelectorAll("input, textarea");
    for (let i = 0; i < el.length; i++) {
      const element = el[i] as HTMLInputElement | HTMLTextAreaElement;
      element.value = "";
    }
  }

  return {
    onChangeWriter,
    onChangePassword,
    onChangeComment,
    onClickComment,
    isButtonActive,
    writername,
    passwordPlaceholder,
    commentPlaceholder,
    value,
    setValue,
  };
};
