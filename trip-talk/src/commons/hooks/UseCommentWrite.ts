import { useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import { CreateBoardCommentDocument, FetchBoardCommentsDocument } from "../graphql/graphql";
import { useParams } from "next/navigation";
import { ICommentFormData } from "../../types/components.type";

export default function UseCommentWrite() {
  const [commentFormData, setCommentFormData] = useState<ICommentFormData>({
    writer: "",
    password: "",
    contents: "",
    rating: 0,
  });

  const disabledButton = !(commentFormData.writer && commentFormData.password);
  const [createBoardComment] = useMutation(CreateBoardCommentDocument);
  const params = useParams();

  const comment = {
    writer: commentFormData.writer,
    password: commentFormData.password,
    contents: commentFormData.contents,
    rating: commentFormData.rating,
  };

  const resetInputValue = () => {
    setCommentFormData({
      writer: "",
      password: "",
      contents: "",
      rating: 0,
    });
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newFormData = {
      ...commentFormData,
      [event.target.id]: event.target.value,
    };
    setCommentFormData(newFormData);
  };

  const handleCommentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const result = await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer: commentFormData.writer,
            password: commentFormData.password,
            contents: commentFormData.contents,
            rating: commentFormData.rating,
          },
          boardId: params.boardId as string,
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: { boardId: String(params.boardId) },
          },
        ],
      });
      console.log(result);
      alert("댓글 등록 완료");
      resetInputValue();
    } catch (error) {
      console.error(error);
      alert("댓글 등록 안됨");
    }
  };

  return {
    handleCommentSubmit,
    handleInputChange,
    disabledButton,
    comment,
  };
}
