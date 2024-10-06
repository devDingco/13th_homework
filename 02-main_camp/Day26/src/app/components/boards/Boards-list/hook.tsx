import { FetchBoardsDocument } from "@/commons/gql/graphql";
import { useQuery } from "@apollo/client";

const useBoardsList = () => {
  const { data } = useQuery(FetchBoardsDocument, {
    variables: {
      page: Number(1),
    },
  });

  return {
    data,
  };
};

export default useBoardsList;
