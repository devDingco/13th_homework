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
  console.log("data:", data?.fetchBoard.youtubeUrl);
  const createdDate = data?.fetchBoard?.createdAt.slice(0, 10);

  const onClickMoveEdit = () => {
    router.push(`/boards/${id}/edit`);
  };

   const youtubeId = data?.fetchBoard?.youtubeUrl && data?.fetchBoard?.youtubeUrl.split("=")[1];

  // tooltip

  return {
    onClickMoveEdit,
    data,
    createdDate,
    youtubeId
  };
};
