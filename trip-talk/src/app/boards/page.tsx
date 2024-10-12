'use client';

import React from 'react';
import Board from '../_component/boards/Board';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from '../_commons/graphql/graphql';
import BoardListBanner from '../_component/boards/BoardListBanner';
import { constants } from 'buffer';
import useModalStore from '../_store/useModalStore';

function BoardsList() {
  // ^state
  const { showModal } = useModalStore();

  // ?fetch
  const { data, loading, refetch } = useQuery(FetchBoardsDocument, {
    fetchPolicy: 'no-cache',
    variables: { page: 1 },
  });
  const [deleteBoard] = useMutation(DeleteBoardDocument);
  const router = useRouter();

  // *function
  const onClickDeleteBoard = async (
    id: string,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    showModal('CONFIRM', '삭제 모달', '정말로 해당 게시물을 삭제하시겠습니까?')
      .then((result: string | boolean) => {
        result &&
          deleteBoard({
            variables: { id },
          });
        refetch();
      })
      .catch(() => {
        console.log('삭제 취소');
      });
  };

  const onClickDetailBoard = (id: string) => {
    router.push(`/boards/${id}`);
  };

  return (
    <>
      <div className="w-screen">
        <BoardListBanner />
      </div>
      <div className="p-10">
        <div className="w-full h-full flex flex-col gap-y-3 max-w-[1280px] min-w-[680px] px-12 py-6 my-0 mx-auto rounded-2xl shadow-[0px_0px_20px_0px_#00000014]">
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
      </div>
    </>
  );
}
export default BoardsList;
