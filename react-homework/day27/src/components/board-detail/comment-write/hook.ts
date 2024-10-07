import { CreateBoardCommentDocument } from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const useCommentWrite = () => {
  // input state
  const [inputs, setInputs] = useState({
    writer: "",
    password: "",
    contents: "",
    rating: 0,
  });

  // params 이거 Page컴포넌트에서 props로 받아오는게 나으려나..
  const params = useParams();

  const [createBoardComment] = useMutation(CreateBoardCommentDocument);

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // input state에 넣기
    const newInputs = {
      ...inputs,
      [event.target.name]: event.target.value,
    };
    setInputs(newInputs);
  };
  // 필수 입력사항 모두 입력했는지
  const allInputFilled =
    inputs.writer.trim() !== "" && inputs.password.trim() !== "";

  const commentSubmit = async () => {
    // 리패치 코드 추가
    try {
      const result = await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer: inputs.writer,
            password: inputs.password,
            contents: inputs.contents,
            rating: inputs.rating,
          },
          boardId: params.boardId as string,
        },
      });
      console.log(result);
      alert("댓글 등록 완료완료😊");
    } catch (error) {
      console.error(error);
    }
  };

  const onClickSubmit = () => {
    // 댓글 등록
    commentSubmit();
    // 인풋 초기화
    setInputs({ writer: "", password: "", contents: "", rating: 0 });
  };
  return {
    onChangeInput,
    inputs,
    allInputFilled,
    onClickSubmit,
  };
};
