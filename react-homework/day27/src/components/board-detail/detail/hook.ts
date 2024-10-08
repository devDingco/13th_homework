import { FetchBoardDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export const useBoardsDetail = () => {
  const params = useParams();
  const boardId = Array.isArray(params.boardId)
    ? params.boardId[0]
    : params.boardId;
  // fetchBoard
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId },
  });
  return {
    params,
    data,
  };
};
