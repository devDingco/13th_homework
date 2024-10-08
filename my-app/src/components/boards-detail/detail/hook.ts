import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FETCH_BOARD } from "./queries";

export const useBoardsDetail = () => {
  const params = useParams();
  console.log("Params:", params); // params.boardId가 있는지 확인
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      myid: params.boardId,
    },
  });
  console.log(data);

  return {
    params,
    data,
  };
};
