"use client";

import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// 1. 가짜 api를 만들어서 테스트를 진행한다.
// 2. 가짜로 페이지 이동을 시키는지 확인한다.
// ! E2E 테스트는 실제 연동된 서버를 통해 테스트를 진행한다.

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function JestUnitTestMockingPage() {
  const router = useRouter();

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onClickSubmit = async () => {
    try {
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
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeWriter = (event) => {
    setWriter(event.target.value);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);
  };

  return (
    <>
      작성자:{" "}
      <input role="input-writer" type="text" onChange={onChangeWriter} />
      <br />
      제목: <input role="input-title" type="text" onChange={onChangeTitle} />
      <br />
      내용:{" "}
      <input role="input-contents" type="text" onChange={onChangeContents} />
      <br />
      <button role="submit-button" onClick={onClickSubmit}>
        GRAPHQL-API 요청하기
      </button>
    </>
  );
}
