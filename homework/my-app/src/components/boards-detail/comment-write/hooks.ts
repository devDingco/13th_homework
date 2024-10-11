"use client";

import { CreateBoardCommentDocument } from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { useState } from "react";

export const useCommentWrite = () => {
  const params = useParams();
  const [createBoardCommentfun] = useMutation(CreateBoardCommentDocument);
  // 배열에 나의함수를 만드는이유?

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [rating, setRating] = useState("");

  const onChangeWriter = (event) => {
    setWriter(event.target.value);
    console.log(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    console.log(event.target.value);
  };
  const onChangeContents = (event) => {
    setContents(event.target.value);
    console.log(event.target.value);
  };
  const onChangeRating = () => {};

  const onClickCommmentAdd = async () => {
    console.log(123);

    const { data } = await createBoardCommentfun({
      variables: {
        createBoardCommentInput: {
          writer: writer,
          password: password,
          contents: contents,
          rating: 32, // 별같애
        },
        boardId: String(params.boardId),
      },
    });
    console.log(data);
  };

  return {
    onClickCommmentAdd,
    onChangeWriter,
    onChangePassword,
    onChangeContents,
    onChangeRating,
  };
};
