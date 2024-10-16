import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { UPDATE_BOARD_COMMENT } from "./queries";
import { FETCH_BOARD_COMMENTS } from "./queries";

export default function useBoardsCommentEdit({ el }) {
  const params = useParams();

  const [name, setName] = useState(el.writer);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState(el.contents);
  const [rating, setRating] = useState(el.rating);
  const id = el?._id; // 상세 커멘트 id 값

  const [isEdit, setIsEdit] = useState(false);

  const desc = ["매우싫음", "싫음", "보통", "좋음", "매우좋음"];

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onChangeRating = (value: number) => {
    setRating(value); // 선택된 숫자 값을 바로 설정
  };

  const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT);

  const onCLickComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // event.preventDefault();

    console.log("작성자 이름은:", name);
    console.log("작성자 비번은:", password);
    console.log("게시물 내용은:", content);
    console.log("수정id값은", id);

    try {
      const result = await updateBoardComment({
        variables: {
          boardCommentId: id, // 미리 id값을 변수로 만들었음
          writer: name, // 나머지 필드는 바로 전달
          password: password,
          contents: content,
          rating: rating,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: params.boardId },
          },
          // 리패치쿼리써서 새로고침하지 않아도 바로 화면에 보여줌.
          // 리패치할때는 코맨트의 id가 필요한게 아니라 상세페이지의 id값이 필요하다.
        ],
      });
      console.log(result);

      // 댓글 등록이 성공하면 입력 필드 초기화
      // 이거 3개랑 각 인풋값에 value추가해야 함
      setName("");
      setPassword("");
      setContent("");

      alert("댓글 등록 완료함");

      setIsEdit(false); // 내일 마저 더 해보기
    } catch (error) {
      alert(error);
    }
  };
  return {
    onChangeName,
    onChangePassword,
    onChangeContent,
    onChangeRating,
    onCLickComment,
    name,
    password,
    content,
    rating,
    desc,
  };
}
