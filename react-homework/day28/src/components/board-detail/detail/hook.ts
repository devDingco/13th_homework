import { FetchBoardDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export const useBoardsDetail = () => {
  const params = useParams();
  const boardId = params.boardId as string;
  // fetchBoard
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId },
  });
  return {
    params,
    data,
  };
};
