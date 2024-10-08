import {
  CreateBoardCommentDocument,
  FetchBoardCommentsDocument,
} from "@/commons/gql/graphql";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { ChangeEvent, MouseEvent, useState } from "react";

const useCommentWrite = () => {
  const params = useParams();

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [rating, setRating] = useState("");

  const comment: IComment = {
    writer: writer,
    password: password,
    contents: contents,
    rating: Number(rating),
  };

  const [createBoardComment] = useMutation(CreateBoardCommentDocument);

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setWriter(value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setContents(value);
  };

  const onChangeRating = () => {};

  const resetInputValue = () => {
    setWriter("");
    setPassword("");
    setContents("");
  };

  const onClickSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    try {
      const result = await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer: writer,
            password: password,
            contents: contents,
            rating: Number(rating),
          },
          boardId: String(params.boardId),
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: {
              boardId: String(params.boardId),
            },
          },
        ],
      });
      comment.id = result.data?.createBoardComment._id;
      resetInputValue();
      alert(CONSTANTS_ALERT_MESSAGE.CREATE_COMMENTS_SUCCEED);
    } catch (error) {
      alert(`${CONSTANTS_ALERT_MESSAGE.CREATE_COMMENTS_FAILED} (${error})`);
    }
  };

  return {
    comment,
    onChangeWriter,
    onChangePassword,
    onChangeContents,
    onClickSubmit,
  };
};

export default useCommentWrite;
