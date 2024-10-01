"use client";
import { useMutation, gql } from "@apollo/client";

const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function App() {
  const [myfct] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await myfct({
      variables: {
        writer: "기먼필",
        title: "놓아",
        contents: "놓아놓아놓아놓아!!!!!!",
      },
    });
    console.log(result);
  };

  return <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button>;
}
