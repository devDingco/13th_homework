"use client";

import { gql, useMutation, useQuery } from "@apollo/client";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
    }
  }
`;

const UPDATE_BOARD = gql`
  mutation updateBoard {
    updateBoard(
      boardId: "671e27735413b3002914e0e4"
      password: "1234"
      updateBoardInput: { title: "zzz1234", contents: "zzz1234" }
    ) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARDS);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const onClickUpdate = () => {
    updateBoard();
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span>{el.title}</span>
          <span>{el.writer}</span>
        </div>
      ))}
      <button onClick={onClickUpdate}>수정</button>
    </div>
  );
}
