import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { CREATE_BOARD_COMMENT } from "./\bqueries";
import { FETCH_BOARD_COMMENTS } from "../comment-list/queries";

export default function useBoardsCommentWrite() {
  const router = useRouter();
  const params = useParams();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    console.log(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);

  const onCLickComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // event.preventDefault();

    console.log("작성자 이름은:", name);
    console.log("작성자 비번은:", password);
    console.log("게시물 내용은:", content);
    console.log(params);

    try {
      const result = await createBoardComment({
        variables: {
          boardId: params.boardId, // boardId는 따로 전달
          writer: name, // 나머지 필드는 바로 전달
          password: password,
          contents: content,
          rating: 3,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: params.boardId },
          },
          // 리패치쿼리써서 새로고침하지 않아도 바로 화면에 보여줌.
        ],
      });
      console.log(result);

      // 댓글 등록이 성공하면 입력 필드 초기화
      // 이거 3개랑 각 인풋값에 value추가해야 함
      setName("");
      setPassword("");
      setContent("");

      alert("댓글 등록 완료함");
    } catch (error) {
      alert(error);
    }
  };
  return {
    onChangeName,
    onChangePassword,
    onChangeContent,
    onCLickComment,
    name,
    password,
    content,
  };
}
