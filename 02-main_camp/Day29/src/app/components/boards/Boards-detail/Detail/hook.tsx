import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FetchBoardDocument } from "@/commons/gql/graphql";

const useBoardsDetail = () => {
  const router = useRouter();
  const params = useParams();

  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: params.boardId as string,
    },
  });

  const board = {
    title: data?.fetchBoard.title,
    writer: String(data?.fetchBoard.writer),
    contents: data?.fetchBoard.contents,
    address: data?.fetchBoard.boardAddress?.address,
    youtubeUrl: data?.fetchBoard.youtubeUrl,
  };

  // Youtube URL의 v= 짤라서 ID를 통해 비디오 보여주도록 구현 필요함.

  const onClickEdit = () => {
    router.push(`/boards/${params.boardId}/edit`);
  };

  const onClickShowBoards = () => {
    router.push("/boards");
  };

  return {
    board,
    onClickEdit,
    onClickShowBoards,
  };
};

export default useBoardsDetail;
