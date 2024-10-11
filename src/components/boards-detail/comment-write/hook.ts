"use client";

import { useMutation, useQuery } from "@apollo/client";
import {
  CreateCommentDocument,
  FetchBoardCommentsDocument,
  FetchBoardsDocument,
} from "commons/graphql/graphql";
import { useParams } from "next/navigation";
import { useState, ChangeEvent } from "react";
export const useCommentCreate = () => {
  const [newComment] = useMutation(CreateCommentDocument);
  const [commentWriter, setCommentWriter] = useState("");
  const [commentPassword, setCommentPassword] = useState("");
  const [commentText, setCommentText] = useState("");
  const [starCount, setStarCount] = useState(0);

  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();
  const id = params.boardId.toString();

  //비밀번호는 없는것 가능함
  const isButtonDisabled = !commentWriter || !commentText;

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentWriter(event.target.value);
  };

  const onChangePW = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentPassword(event.target.value);
  };

  const onChangeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
  };

  const onChangeStarCount = (e: number) => {
    setStarCount(e);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createComment = async () => {
    try {
      const { data } = await newComment({
        variables: {
          createBoardCommentInput: {
            writer: commentWriter,
            password: commentPassword,
            contents: commentText,

            rating: starCount,
          },
          boardId: id,
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            // page 번호 하드코딩 됨
            variables: { page: 1, boardId: id },
          },
        ],
      });
      console.log("data", data);
      if (data?.createBoardComment) {
        setModalContent("댓글 등록이 완료 되었습니다!");
        setIsModalOpen(true);
        // 댓글이 등록된 후, 댓글입력창을 모두 초기화 합니다.
        setCommentText("");
        setCommentWriter("");
        setCommentPassword("");
      } else {
        setModalContent("댓글 등록에 실패하였습니다");
        setIsModalOpen(true);
      }
    } catch (err: any) {
      setModalContent(err);
      setIsModalOpen(true);
      console.error(err);
    }
  };
  return {
    starCount,
    setStarCount,
    isButtonDisabled,
    onChangePW,
    onChangeText,
    onChangeWriter,
    commentWriter,
    setCommentWriter,
    commentPassword,
    setCommentPassword,
    commentText,
    setCommentText,
    createComment,
    isModalOpen,
    setIsModalOpen,
    modalContent,
    setModalContent,
    handleOk,
    handleCancel,
    onChangeStarCount,
  };
};
