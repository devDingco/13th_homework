import { DeleteBoardDocument, FetchBoardsDocument } from "@/commons/graphql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_BOARDS_COUNT } from "../pagination/queries";

export default function useBoardList() {
  const { data, refetch } = useQuery(FetchBoardsDocument);

  const [deleteBoard] = useMutation(DeleteBoardDocument);

  const onClickDelete = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    deleteBoard({
      variables: {
        boardId: event.currentTarget.id,
      },
      refetchQueries: [{ query: FetchBoardsDocument }],
    });
  };

  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);
  console.log("count:", dataBoardsCount);
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

  return {
    onClickDelete,
    data,
    refetch,
    lastPage,
    dataBoardsCount
  };
}
