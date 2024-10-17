import { useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  FetchBoardCommentsDocument,
  UpdateBoardCommentDocument,
} from "../graphql/graphql";
import { ICommentData } from "../../types/components.type";

export default function useCommentEditForm(commentData: ICommentData) {
  const [commentEditData, setCommentEditData] = useState({
    writer: commentData.commentData.writer,
    password: "",
    contents: commentData.commentData.contents,
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
      console.error(error);
      alert("error");
    }
  };

  const disabledButton = !(
    commentEditData.password &&
    commentData.commentData.contents !== commentEditData.contents
  );

  return {
    handleSubmitEdit,
    handleInputChange,
    disabledButton,
    commentData,
  };
}
