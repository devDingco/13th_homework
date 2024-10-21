"use client";

import { useMutation, useQuery } from "@apollo/client";
import { MouseEvent } from "react";
import { DELETE_BOARD, FETCH_BOARDS } from "./queries";

const useBoardList = () => {
  const { data } = useQuery(FETCH_BOARDS);
  console.log(data);

  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      await deleteBoard({
        variables: {
          boardId: event.currentTarget.id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARDS,
            // variables: {
            //   page:
            // },
          },
        ],
      });
      alert("삭제가 성공적으로 수행됐습니다.");
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  return { onClickDelete };
};

export default useBoardList;
