'use client';

import React from 'react';
import Board from './Board';
import { ApolloQueryResult, useMutation } from '@apollo/client';
import {
  DeleteBoardDocument,
  Exact,
  FetchBoardsQuery,
  InputMaybe,
  Scalars,
} from '@/app/_commons/graphql/graphql';
import useModalStore from '@/app/_store/useModalStore';
import { useRouter } from 'next/navigation';

export default function BoardsListComponent({
  data,
  page,
  refetch,
}: {
  data: any;
  page: number;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            page?: InputMaybe<Scalars['Int']['input']>;
          }>
        >
      | undefined,
  ) => Promise<ApolloQueryResult<FetchBoardsQuery>>;
}) {
  const [deleteBoard] = useMutation(DeleteBoardDocument);
  const { showModal } = useModalStore();
  const router = useRouter();

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
        refetch({
          page,
        });
      })
      .catch(() => {
        console.log('삭제 취소');
      });
  };

  const onClickDetailBoard = (id: string) => {
    router.push(`/boards/${id}`);
  };

  return (
    <div>
      <div className="w-full h-full flex flex-col gap-y-3 max-w-[1280px] min-w-[680px] px-12 py-6 my-0 mx-auto rounded-2xl shadow-[0px_0px_20px_0px_#00000014]">
        <Board />
        {data.fetchBoards.map((board: BoardType, index: number) => {
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
  );
}
