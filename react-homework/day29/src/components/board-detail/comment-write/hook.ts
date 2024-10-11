import {
  CreateBoardCommentDocument,
  FetchBoardCommentsDocument,
} from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const useCommentWrite = () => {
  // commentInfo state
  const [commentInfo, setCommentInfo] = useState({
    writer: "",
    password: "",
    contents: "",
  });

  // rating state
  const [rating, setRating] = useState(0);

  // params 이거 Page컴포넌트에서 props로 받아오는게 나으려나..
  const params = useParams();
  // boardId
  const boardId = params.boardId as string;

  const [createBoardComment] = useMutation(CreateBoardCommentDocument, {
    refetchQueries: [
      {
        query: FetchBoardCommentsDocument,
        variables: { boardId },
      },
    ],
  });

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // input state에 넣기
    const newInputs = {
      ...commentInfo,
      [event.target.name]: event.target.value,
    };
    setCommentInfo(newInputs);
  };
  // 필수 입력사항 모두 입력했는지
  const allInputFilled =
    commentInfo.writer.trim() !== "" && commentInfo.password.trim() !== "";

  const commentSubmit = async () => {
    try {
      const result = await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer: commentInfo.writer,
            password: commentInfo.password,
            contents: commentInfo.contents,
            rating: rating,
          },
          boardId,
        },
      });
      console.log(result);
      alert("댓글 등록 완료😊");
    } catch (error) {
      console.error(error);
    }
  };

  const onClickSubmit = () => {
    // 댓글 등록
    commentSubmit();
    // 인풋, 별점 초기화
    setCommentInfo({ writer: "", password: "", contents: "" });
    setRating(0);
  };
  return {
    onChangeInput,
    commentInfo,
    allInputFilled,
    onClickSubmit,
    rating,
    setRating,
  };
};
