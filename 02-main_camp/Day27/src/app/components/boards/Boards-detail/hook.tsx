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
    writer: data?.fetchBoard.writer,
    contents: data?.fetchBoard.contents,
  };

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
