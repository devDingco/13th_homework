"use client";

import { useMutation } from "@apollo/client";
import {
  CREATE_BOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
  UPDATE_BOARD_COMMENT,
} from "./queries";
import { ChangeEvent, useState } from "react";
import { useParams } from "next/navigation";
// import useCommentListItem from "../comment-list-item/hook";

export default function useCommentWrite(setIsEdit) {
  const params = useParams();
  const [comment, setComment] = useState({
    writer: "",
    password: "",
    contents: "",
    rating: 3,
  });

  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);
  const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT);

  const onClickRegister = async () => {
    await createBoardComment({
      variables: {
        createBoardCommentInput: {
          ...comment,
        },
        boardId: params.boardId,
      },
      refetchQueries: [
        {
          query: FETCH_BOARD_COMMENTS,
          variables: { boardId: params.boardId },
        },
      ],
    });
  };

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment({
      ...comment,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeRating = (rating) => {
    setComment({
      ...comment,
      rating,
    });
  };

  const onClickEdit = async (commentId) => {
    await updateBoardComment({
      variables: {
        updateBoardCommentInput: {
          contents: comment.contents,
          rating: comment.rating,
        },
        password: comment.password,
        boardCommentId: commentId,
      },
      refetchQueries: [
        {
          query: FETCH_BOARD_COMMENTS,
          variables: {
            boardId: params.boardId,
          },
        },
      ],
    });
    // onCancelEdit();
    setIsEdit(false);
  };

  return {
    comment,
    onClickRegister,
    onChangeInput,
    onChangeRating,
    onClickEdit,
  };
}
