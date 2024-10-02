'use client';

import React from 'react';
import Board from '../_component/boards/Board';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';

const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      _id
      title
      writer
      createdAt
    }
  }
`;
const DELETE_BOARD = gql`
  mutation ($id: ID!) {
    deleteBoard(boardId: $id)
  }
`;

function BoardsList() {
  const { data, loading } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const router = useRouter();

  const onClickDeleteBoard = (id: string, e: any) => {
    e.stopPropagation();

    deleteBoard({
      variables: { id },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  const onClickDetailBoard = (id: string) => {
    router.push(`/boards/${id}`);
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-3 min-w-[680px] px-12 py-6 m-10 rounded-2xl shadow-[0px_0px_20px_0px_#00000014]">
      <Board />
      {loading
        ? '리스트 조회중...'
        : data.fetchBoards.map((board: BoardType, index: number) => {
            const { _id, title, writer, createdAt } = board;
            return (
              <Board
                key={_id}
                number={++index}
                title={title}
                writer={writer}
                createdAt={createdAt}
                id={_id}
                onClickDelete={onClickDeleteBoard}
                onClickDetail={() => onClickDetailBoard(_id)}
              />
            );
          })}
    </div>
  );
}

export default BoardsList;
