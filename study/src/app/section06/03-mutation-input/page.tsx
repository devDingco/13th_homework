"use client";
import { useMutation, gql } from "@apollo/client";
import { ChangeEvent, useState } from "react";

const 나의graphql쿼리 = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function GraphQlMutationPage() {
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
    // useMutation Hook을 이용해 graphql mutation을 요청하는 코드
    const result = await 나의함수({
      variables: {
        writer: writer,
        title: title,
        contents: contents,
      },
    });
    console.log(result);
  };

  return (
    <>
      <div>
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
        <button onClick={onClickRequest}>GRAPHQL-API 요청하기</button>
      </div>
    </>
  );
}
