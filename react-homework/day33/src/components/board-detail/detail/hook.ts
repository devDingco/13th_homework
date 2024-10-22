import { FetchBoardDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export const useBoardsDetail = () => {
  console.log("디테일");
  const params = useParams();
  const boardId = params.boardId as string;

  // fetchBoard
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId },
  });
  console.log("[detail] data?.fetchBoard: ", data?.fetchBoard);

  return {
    params,
    data,
  };
};
