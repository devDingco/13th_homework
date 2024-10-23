'use client';

import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
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
import { Input } from 'postcss';
import Search from 'antd/es/transfer/search';
import { SearchOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

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
            search?: InputMaybe<Scalars['String']['input']>;
          }>
        >
      | undefined,
  ) => Promise<ApolloQueryResult<FetchBoardsQuery>>;
}) {
  const [searchValue, setSearchValue] = useState('');
  const [deleteBoard] = useMutation(DeleteBoardDocument);
  const { showModal } = useModalStore();
  const router = useRouter();

  const onChangeSearchValue = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    refetch({ page: 1, search: e.target.value });
  }, 500);

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
      <div className="flex items-center gap-3 border-2 border-solid border-[darkGray] rounded-full overflow-hidden px-2 py-1 mb-4">
        <SearchOutlined className="text-xl text-[darkGray]" />
        <input
          type="text"
          className="h-10 w-full focus:outline-none"
          onChange={onChangeSearchValue}
        />
      </div>
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
              searchValue={searchValue}
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
