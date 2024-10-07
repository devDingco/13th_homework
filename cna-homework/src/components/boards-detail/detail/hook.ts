import { FetchBoardDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

export const useBoardDetail = () => {
  // graphql
  const params = useParams();
  const router = useRouter();
  const id = params.boardId;
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: String(id) },
  });
  console.log("data:", data);
  const createdDate = data?.fetchBoard?.createdAt.slice(0, 10);

  const onClickMoveEdit = () => {
    router.push(`/boards/${id}/edit`);
  };

  return {
    onClickMoveEdit,
    data,
    createdDate,
  };
};
