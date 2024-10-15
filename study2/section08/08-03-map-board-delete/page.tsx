"use client";

import { useMutation, useQuery, gql } from "@apollo/client";
import { Fragment } from "react";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      createdAt
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

interface Board {
  _id: string;
  writer: string;
  title: string;
  createdAt: string;
}

export default function MapFruitsPage() {
  const result = useQuery<{ fetchBoards: Board[] }>(FETCH_BOARDS);
  // result 안에는 data, loading, error 등이 들어있다.
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = async (boardId: string) => {
    try {
      await deleteBoard({
        variables: { boardId },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Section 08: List and Keys</h1>
      <h2>Fruits</h2>
      <div className="flex gap-5 flex-col">
        {/*  idx의 경우 게시글을 삭제할 때 다음 게시글이 올라오면서 유지되므로 사실상 유일하지 않음 */}
        {/* 1. 특별한 이유가 없다면 Fragment로 감싼다. 대체 <></> */}
        {/* 2. key는 유일해야 한다. */}
        {/* 3. key값을 넣으려면  <Fragment key={el._id}></Fragment> 형태로 진행 */}
        <ul>
          {result.data?.fetchBoards.map((el: Board, idx: number) => (
            <li key={el._id} className="flex gap-4 items-center">
              <input type="checkbox" />
              {el.writer} - {el.title} - {el.createdAt}
              <button className="btn" onClick={() => onClickDelete(el._id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
      <br />

      <div>
        {result.data?.fetchBoards.map((el: Board, idx: number) => (
          <Fragment key={el._id}>
            <input type="checkbox" />
            <span>
              {el.writer} - {el.title} - {el.createdAt}
            </span>
            <button
              className="btn btn-primary w-52 inline-block"
              onClick={() => onClickDelete(el._id)}
            >
              삭제
            </button>
            <br />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
