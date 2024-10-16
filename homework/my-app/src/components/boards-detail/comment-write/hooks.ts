import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENTS } from "./queries";
import { FetchBoardCommentsQuery } from "@/commons/graphql/graphql";

export default function useCommentPage() {
  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const params = useParams();
  const boardId = params.boardId;

  // 쿼리에서 boardId 변수를 사용하여 데이터 조회
  // 쿼리에서 boardId 변수를 사용하여 데이터 조회
  const { data, fetchMore, refetch } = useQuery<FetchBoardCommentsQuery>(
    FETCH_BOARD_COMMENTS,
    {
      variables: { boardId },
    }
  );
  const commentSubmit = async () => {
    try {
      // 댓글 작성
      const result = await createBoardComment({
        variables: {
          boardId,
          writer,
          password,
          contents,
        },
      });

      // 작성 후 인풋 초기화
      setWriter("");
      setPassword("");
      setContents("");

      // 댓글 목록 리패치 (실시간으로 목록 갱신)
      await refetch();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return {
    writer,
    password,
    contents,
    setWriter,
    setPassword,
    setContents,
    commentSubmit,
  };
}
