"use client";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: createBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMuatationPage() {
  const router = useRouter();
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer,
          title,
          contents,
          password: "1234",
        },
      },
    });
    console.log(result);
    const boardId = result.data.createBoard._id;
    router.push(`/boards/${boardId}`);
  };

  const onChangeWiter = (event) => {
    setWriter(event.target.value);
  };
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const onChangeContent = (event) => {
    setContents(event.target.value);
  };

  // 한줄일때는 리턴다음에오는 괄호 생략 가능
  return (
    <>
      작성자: <input role="input-writer" type="text" onChange={onChangeWiter} />{" "}
      <br />
      제목: <input role="input-title" type="text" onChange={onChangeTitle} />
      <br />
      내용:
      <input type="text" role="input-contents" onChange={onChangeContent} />
      <br />
      <button role="submit-button" onClick={onClickSubmit}>
        GRAPHQL-API 요청하기
      </button>
    </>
  );
}
