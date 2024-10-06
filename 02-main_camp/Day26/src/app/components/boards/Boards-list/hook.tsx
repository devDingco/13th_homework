import { useQuery } from "@apollo/client";
import { FETCH_BOARDS } from "../Boards-write/queries";

const useBoardsList = () => {
  const { data } = useQuery(FETCH_BOARDS);
  return {
    data,
  };
};

export default useBoardsList;
