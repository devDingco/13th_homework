import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Comment, FETCH_COMMENTS } from "./queries";

export const UseCommentWrite = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");

  const [value, setValue] = useState(0);

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event?.target.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event?.target.value);
  };
  const onChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event?.target.value);
  };

  const onChangeStar = (value: any) => {
    setValue(value);
  };
  const params = useParams();
  const { data } = useQuery(FETCH_COMMENTS, {
    variables: {
      boardId: params.boardId,
    },
  });
  console.log(data);

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
            rating: value,
          },
        },
        refetchQueries: [{ query: FETCH_COMMENTS }],
      });
      console.log(result);
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
    value,
    onChangeStar,
  };
};
