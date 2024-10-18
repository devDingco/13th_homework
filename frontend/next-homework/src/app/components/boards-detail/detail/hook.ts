"use client";

import { FetchBoardDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const useBoardsDetail = () => {
  const params = useParams();

  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: String(params.boardId),
    },
  });

  console.log(data?.fetchBoard);

  const address =
    "(" +
    data?.fetchBoard.boardAddress?.zipcode +
    ") " +
    data?.fetchBoard.boardAddress?.address;

  return { params, data, address };
};

export default useBoardsDetail;
