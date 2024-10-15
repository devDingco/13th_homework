"use client";

import { useMutation, gql } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

const 나의graphql쿼리 = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function StaticRoutingPage() {
  const router = useRouter();
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [나의함수] = useMutation(나의graphql쿼리);

  const onChangeValue = (
    event: ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const value = event.target.value;
    const typeSet: {
      [key: string]: () => void;
    } = {
      writer: () => setWriter(value),
      title: () => setTitle(value),
      contents: () => setContents(value),
    };

    typeSet[type]();
  };

  const onClickRequest = async () => {
    try {
      // !성공했을때 실행하는 코드
      // !try문 안에서 에러가 발생하면 에러가 발생한 부분의 밑으로는 모두 무시하고
      // !catch문으로 바로 넘어감
      const result = await 나의함수({
        variables: {
          writer: writer,
          title: title,
          contents: contents,
        },
      });
      console.log(result);
      alert("게시물이 등록되었습니다.");
      router.push(
        `/section07/07-04-dynamic-routing-board-mutation-moved/${result.data.createBoard.number}`
      );
    } catch (error) {
      // !에러가 발생했을 때 실행되는 코드
      console.log(error);
      alert("게시물 등록에 실패했습니다.");
    } finally {
      // !실패하든 성공하든 실행되는 코드
    }
  };

  return (
    <div className="flex flex-col gap-4 w-80">
      작성자:{" "}
      <input
        className="border"
        type="text"
        onChange={(e) => onChangeValue(e, "writer")}
      />
      <br />
      제목:{" "}
      <input
        className="border"
        type="text"
        onChange={(e) => onChangeValue(e, "title")}
      />
      <br />
      내용:{" "}
      <input
        className="border"
        type="text"
        onChange={(e) => onChangeValue(e, "contents")}
      />
      <br />
      <button className="btn" onClick={onClickRequest}>
        GRAPHQL-API 요청하기
      </button>
    </div>
  );
}
