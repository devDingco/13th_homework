import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENTS } from "./queries";

export default function useCommentPage() {
  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const params = useParams();
  const boardId = params.boardId;

  // 쿼리에서 boardId 변수를 사용하여 데이터 조회
  const { refetch } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: { boardId },
  });

  const commentSubmit = async () => {
    try {
      const result = await createBoardComment({
        variables: {
          boardId,
          writer,
          password,
          contents,
        },
      });
      setWriter("");
      setPassword("");
      setContents("");

      refetch();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return commentSubmit;
}
