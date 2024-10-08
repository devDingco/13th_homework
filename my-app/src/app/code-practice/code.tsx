"use client";
import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

const 나의그래프큐엘세팅 = gql`
  mutation creactBoard(
    $mywriter: String
    $mytitle: String
    $mycontents: String
  ) {
    # 타입적는 곳
    createBoard(writer: $mywriter, title: $mytitle, contents: $mycontents) {
      #전달할 변수 적는 곳
      _id
      number
      message
      __typename
    }
  }
`;

export default function CodePracticePage() {
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [나의함수] = useMutation(나의그래프큐엘세팅);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        //variables 이게 $역할을 함
        mywriter: "철수", // 그래프큐엘에서는 한글이 안되므로 영어로 만들어야한다
        mytitle: "반가워",
        mycontents: "잘부탁해",
      },
    });

    console.log(result);
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
    <div>
      작성자: <input onChange={onChangeWriter} type="text" />
      제목: <input onChange={onChangeTitle} type="text" />
      내용: <input onChange={onChangeContents} type="text" />
      <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button>
    </div>
  );
}
