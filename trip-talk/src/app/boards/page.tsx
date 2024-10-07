'use client';

import React from 'react';
import Board from '../_component/boards/Board';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { FETCH_BOARDS } from '@/app/_api/board/query/getBoardData';
import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from '../_commons/graphql/graphql';

const DELETE_BOARD = gql`
  mutation deleteBoard($id: ID!) {
    deleteBoard(boardId: $id)
  }
`;

function BoardsList() {
  const { data, loading, refetch } = useQuery(FetchBoardsDocument, {
    fetchPolicy: 'no-cache',
    variables: { page: 1 },
  });

  const [deleteBoard] = useMutation(DeleteBoardDocument);
  const router = useRouter();

  const onClickDeleteBoard = async (
    id: string,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    deleteBoard({
      variables: { id },
    });
    refetch();
  };

  const onClickDetailBoard = (id: string) => {
    router.push(`/boards/${id}`);
  };
  console.log(data?.fetchBoards);
  return (
    <div className="w-full h-full flex flex-col gap-y-3 min-w-[680px] px-12 py-6 m-10 rounded-2xl shadow-[0px_0px_20px_0px_#00000014]">
      <Board />
      {loading
        ? '리스트 조회중...'
        : data?.fetchBoards.map((board: BoardType, index: number) => {
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
