import { CreateBoardCommentDocument } from "./../../../../commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function useCommentWriter() {
  //댓글 등록후 초기화
  const INITIAL_COMMENT_DATA = {
    writer: "",
    password: "",
    rating: 0,
    contents: "",
  };

  //input에 따라 상태 변화
  const [commentData, setCommentData] = useState(INITIAL_COMMENT_DATA);

  //그래프큐엘 내용들 보내기
  const [createBoardComment] = useMutation(CreateBoardCommentDocument);

  const params = useParams();
  const boardId = params.boardId as string;

  // typing value will udate 'commentData.writer or ...' to my typing
  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    // contents일때만 길이 체크
    if (name === "contents") {
      if (value.length <= 100) {
        setCommentData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
      // 100자 넘으면 입력안되게?
    } else {
      // 다른 필드라면 그래도 업데이트
      setCommentData((prev) => ({
        ...prev, //copies all existing properties from the current state
        [name]: value, // updates only specific (writer,, or ~) property with the new value
      }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); //폼 제출 기본 동작 방지

    try {
      // 댓글 등록
      const commentResult = await createBoardComment({
        variables: {
          createBoardCommentInput: commentData,
          boardId,
        },
      });
      console.log("게시글 댓글 등록 성공: ", commentResult);
      alert("댓글 등록 성공 🍀");
      //성공후 댓글 초기화
      setCommentData(INITIAL_COMMENT_DATA);
    } catch (error) {
      console.error("게시글 댓글 등록 실패: ", error);
    }
  };

  return {
    commentData,
    handleSubmit,
    onChange,
  };
}
