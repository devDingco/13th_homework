import { DeleteBoardDocument, FetchBoardsDocument } from "@/commons/graphql/graphql";
import { useMutation, useQuery } from "@apollo/client";

export default function useBoardList() {
  const { data } = useQuery(FetchBoardsDocument);

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

  return {
    onClickDelete,
    data,
  };
}
