"use client";

import { useMutation } from "@apollo/client";
import { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENTS } from "./queries";
import { ChangeEvent, useState } from "react";
import { useParams } from "next/navigation";

export default function useCommentWrite() {
  const params = useParams();
  const [comment, setComment] = useState({
    writer: "",
    password: "",
    contents: "",
    rating: 3,
  });

  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);

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
          variables: { page: 1, boardId: params.boardId },
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

  return {
    comment,
    onClickRegister,
    onChangeInput,
    onChangeRating,
  };
}
