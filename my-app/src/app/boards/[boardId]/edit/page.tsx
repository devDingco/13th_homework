"use client";

import { FetchBoardDocument } from "@/commons/gql/graphql";
import BoardsWrite from "@/components/boards-write";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const BoardsEditPage = () => {
  const params = useParams();
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: String(params.boardId) },
  });
  return <BoardsWrite isEdit={true} data={data} />;
};

export default BoardsEditPage;
