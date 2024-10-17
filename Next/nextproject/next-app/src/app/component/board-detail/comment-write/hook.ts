import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FETCH_COMMENTS } from "./queries";

export const UseCommentWrite = () => {
  const params = useParams();
  const { data } = useQuery(FETCH_COMMENTS, {
    variables: {
      boardId: params.boardId,
    },
  });
  console.log(data);

  return {
    data,
  };
};
