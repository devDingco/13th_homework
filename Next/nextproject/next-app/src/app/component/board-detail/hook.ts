import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FetchBoard } from "../board-write/queries";
import { ChangeEvent, useState } from "react";
// import a from "../../boards
export const UseDetailWrite = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const params = useParams();
  const router = useRouter();

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event?.target.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event?.target.value);
  };
  const onChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event?.target.value);
  };
  const { data } = useQuery(FetchBoard, {
    variables: {
      myboardId: params.boardId,
    },
  });

  const onModify = () => {
    router.push(`../../routes/boards/${data?.fetchBoard._id}/edit`);
  };

  const onList = () => {
    router.push("../../boards");
  };
  return {
    onModify,
    data,
    onList,
    onChangeName,
    name,
    onChangePassword,
    password,
    onChangeComment,
    comment,
  };
};
