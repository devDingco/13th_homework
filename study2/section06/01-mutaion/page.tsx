"use client";
import { useMutation, gql } from "@apollo/client";

const 나의graphql쿼리 = gql`
  mutation {
    createBoard(
      writer: "mirajo"
      title: "제목입니다!~~"
      contents: "내용입니다!~!!!!!"
    ) {
      _id
      number
      message
    }
  }
`;

export default function GraphQlMutationPage() {
  const [나의함수] = useMutation(나의graphql쿼리);

  const onClickRequest = async () => {
    // useMutation Hook을 이용해 graphql mutation을 요청하는 코드
    const result = await 나의함수();
    console.log(result);
  };

  // return <button>graphql api 요청하기</button>;
  return <button onClick={onClickRequest}>graphql api 요청하기</button>;
}
