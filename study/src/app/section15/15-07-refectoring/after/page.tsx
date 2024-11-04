"use client";
import { useMutation, gql } from "@apollo/client";
import { ChangeEvent, useState } from "react";

const 나의graphql쿼리 = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function GraphQlMutationPage() {
  const [나의함수] = useMutation(나의graphql쿼리);

  const [inputs, setInputs] = useState({ writer: "", title: "", contents: "" });

  const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id;
    const value = e.target.value;
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  console.log("inputs:", inputs);

  const onClickRequest = async () => {
    const result = await 나의함수({
      variables: { ...inputs },
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
          id="writer"
          onChange={(e) => onChangeInputs(e)}
        />
        <br />
        제목:{" "}
        <input
          className="border"
          type="text"
          id="title"
          onChange={(e) => onChangeInputs(e)}
        />
        <br />
        내용:{" "}
        <input
          className="border"
          type="text"
          id="contents"
          onChange={(e) => onChangeInputs(e)}
        />
        <br />
        <button className="btn" onClick={onClickRequest}>
          GRAPHQL-API 요청하기
        </button>
      </div>
    </>
  );
}
