import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FetchBoardDocument } from "@/commons/gql/graphql";
export const useBoardsDetail = () => {
  const params = useParams();
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: String(params.boardId) },
  });

  const youtubeOpts = {
    width: "822",
    height: "464",
  };
  return {
    params,
    data,
    youtubeOpts,
  };
};
