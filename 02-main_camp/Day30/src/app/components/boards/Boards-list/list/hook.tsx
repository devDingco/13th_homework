import { FetchBoardsDocument } from "@/commons/gql/graphql";
import { useQuery } from "@apollo/client";

const useBoardsList = () => {
  const { data } = useQuery(FetchBoardsDocument);

  return { data };
};

export default useBoardsList;
