import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FetchBoardDocument } from "@/commons/gql/graphql";
import useModalContainer from "@/app/components/commons/modal-container/hook";

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
