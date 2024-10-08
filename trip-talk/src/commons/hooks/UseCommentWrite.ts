import { useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  CreateBoardCommentDocument,
  FetchBoardCommentsDocument,
} from "../graphql/graphql";
import { useParams } from "next/navigation";

export default function UseCommentWrite() {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [rating, setRating] = useState(0);
  const disabledButton = !(writer && password);
  const [createBoardComment] = useMutation(CreateBoardCommentDocument);
  const params = useParams();

  const comment = {
    writer,
    password,
    contents,
    rating,
  };

  const resetInputValue = () => {
    setWriter("");
    setPassword("");
    setContents("");
    console.log("test");
  };

  const handleCommentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const result = await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer,
            contents,
            password,
            rating: Number(rating),
          },
          boardId: String(params.boardId),
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case "writer":
        setWriter(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "rating":
        setRating(Number(event.target.value));
    }
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  return {
    handleCommentSubmit,
    handleInputChange,
    handleContentChange,
    disabledButton,
    comment,
  };
}
