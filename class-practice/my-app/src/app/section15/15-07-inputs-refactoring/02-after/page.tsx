"use client";
import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

//명시되어있는 타입은 타입스크립트 타입이아니라 그래프큐엘에 명시되어있는 타입임
const 나의그래프큐엘셋팅 = gql`
  #   mutation createBoard06_04(
  #     $writer: String
  #     $title: String
  #     $content: String
  #   ) {
  #     createBoard(writer: $writer, title: $title, contents: $contents) {
  #       _id
  #       number
  #       message
  #     }
  #   }
`;

export default function GraphqlMuatationPage() {
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const [inputs, setInputs] = useState({
    writer: "",
    title: "",
    contents: "",
  });

  //중복되는 키가 있을때 덮어씌워지는 특성을 활용해서 코드 간소화하기
  //아이디를 불러와서 키값으로 준다
  const onChangeInputs = (event) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        ...inputs,
      },
    });
    console.log(result);
  };

  // 한줄일때는 리턴다음에오는 괄호 생략 가능
  return (
    <>
      작성자: <input id="writer" type="text" onChange={onChangeInputs} /> <br />
      제목: <input id="title" type="text" onChange={onChangeInputs} /> <br />
      내용: <input id="contents" type="text" onChange={onChangeInputs} /> <br />
      <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button>
    </>
  );
}
