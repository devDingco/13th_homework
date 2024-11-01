"use client";

import { FetchBoardDocument } from "@/commons/graphql/graphql";
import { withAuth } from "@/commons/hocs/withAuth";
import BoardsWrite from "@/components/boards-write";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const BoardEditPage = () => {
  const params = useParams();

  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: params.boardId as string },
  });

  return <BoardsWrite isEdit={true} data={data} />;
};

export default withAuth(BoardEditPage);
