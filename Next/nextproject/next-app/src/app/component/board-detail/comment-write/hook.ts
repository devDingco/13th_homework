import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Comment, FETCH_COMMENTS } from "./queries";
export const UseCommentWrite = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event?.target.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event?.target.value);
  };
  const onChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event?.target.value);
  };
  const params = useParams();
  const { data } = useQuery(FETCH_COMMENTS, {
    variables: {
      writer: name,
      comment: comment,
      boardId: params.boardId,
      password: password,
    },
  });

  const [submit] = useMutation(Comment);

  const onclicksubmit = async () => {
    try {
      const result = await submit({
        variables: {
          boardId: params.boardId,
          createBoardCommentInput: {
            writer: name,
            contents: comment,
            password: password,
            rating: 4.5,
          },
        },
        refetchQueries: [{ query: FETCH_COMMENTS }],
      });
    } catch {
      alert("에러");
    }
  };

  return {
    name,
    password,
    comment,
    onChangeComment,
    onChangePassword,
    onChangeName,
    onclicksubmit,
    data,
  };
};
