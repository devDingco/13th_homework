import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { DETAIL_FETCH_BOARD } from "@/components/board-detail/queries";

export const useBoardDetail = () => {
  const params = useParams();
  // 주소에서 값을 가져온 params.id는 문자이므로 Number로 변환해주고
  // FETCH_BOARD 쿼리에 넣어준다.
  const { data } = useQuery(DETAIL_FETCH_BOARD, {
    variables: { boardId: params.boardId },
  });
  // console.log(params.boardId, data?.fetchBoard);
  const detailData = data?.fetchBoard;

  return { detailData, params };
};
