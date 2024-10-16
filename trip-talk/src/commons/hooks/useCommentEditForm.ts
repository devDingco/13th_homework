import { useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  FetchBoardCommentsDocument,
  UpdateBoardCommentDocument,
} from "../graphql/graphql";
import { IError } from "../../types/components.type";

export default function useCommentEditForm(commentData) {
  const [commentEditData, setCommentEditData] = useState({
    writer: commentData.commentData.writer,
    password: "",
    contents: commentData.commentData.content,
  });

  const [updateBoardComment] = useMutation(UpdateBoardCommentDocument);
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;

    setCommentEditData((prev) => ({
      ...prev,
      [id]: value,
    }));

    console.log(commentEditData);
  };

  const handleSubmitEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await updateBoardComment({
        variables: {
          updateBoardCommentInput: {
            contents: commentEditData.contents,
          },
          password: commentEditData.password,
          boardCommentId: commentData.commentData._id,
        },
        refetchQueries: [FetchBoardCommentsDocument],
      });
      console.log(result);
    } catch (error) {
      const err = error as IError;
      console.error(err);
      alert("error");
    }
  };

  let disabledButton;

  return {
    handleSubmitEdit,
    handleInputChange,
    disabledButton,
    commentData,
  };
}
