"use client";
import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";

//명시되어있는 타입은 타입스크립트 타입이아니라 그래프큐엘에 명시되어있는 타입임
// const 나의그래프큐엘셋팅 = gql`
//   #   mutation createBoard06_04(
//   #     $mywriter: String
//   #     $mytitle: String
//   #     $mycontent: String
//   #   ) {
//   #     createBoard(writer: $mywriter, title: $mytitle, contents: $mycontent) {
//   #       _id
//   #       number
//   #       message
//   #     }
//   #   }
// `;

export default function GraphqlMuatationPage() {
  // const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const { register, handleSubmit } = useForm();

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // const onChangeWiter = (event) => {
  //   setWriter(event.target.value);
  // };
  // const onChangeTitle = (event) => {
  //   setTitle(event.target.value);
  // };
  // const onChangeContent = (event) => {
  //   setContent(event.target.value);
  // };

  const onClickSubmit = async (data) => {
    console.log(data);
    // const result = await 나의함수({
    //   variables: {
    //     //variables가 변수앞에 $역활을 대신함
    //     mywriter: data.writer,
    //     mytitle: data.title,
    //     mycontent: data.content,
    //   },
    // });
    // console.log(result);
  };

  // 한줄일때는 리턴다음에오는 괄호 생략 가능
  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      작성자: <input type="text" {...register("writer")} /> <br />
      제목: <input type="text" {...register("title")} /> <br />
      내용: <input type="text" {...register("contents")} /> <br />
      주소: <input
        type="text"
        {...register("boardAddress.addressDetail")}
      />{" "}
      <br />
      <button type="submit">GRAPHQL-API 요청하기</button>
    </form>
  );
}

/*
<form>
  <button type="button"></button> // 내가 만든 onClick함수라던지 추가하고 싶을때
  <button type="reset"></button> // 폼 안에 있는 인풋들을 초기화 하고 싶을 떄
  <button type="submot"></button> // 폼 등록 / 수정 등 하고 싶을때 ----> 디폴트임
</form
*/
