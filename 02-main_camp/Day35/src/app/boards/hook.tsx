import { FetchBoardsDocument } from "@/commons/gql/graphql";
import { useQuery } from "@apollo/client";

export const useBoards = () => {
  const { data: boards, refetch } = useQuery(FetchBoardsDocument);

  return { boards, refetch };
};
