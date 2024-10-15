import { useMutation } from "@apollo/client";
import { DeleteBoardDocument, FetchBoardsDocument } from "../graphql/graphql";
import { useRouter } from "next/navigation";

export default function useBoardsList(id: string) {
  const router = useRouter();
  const [deleteBoard] = useMutation(DeleteBoardDocument);

  const onClickBoard = () => {
    router.push(`/boards/${id}`);
  };

  const onCLickDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    deleteBoard({
      variables: {
        id,
      },
      refetchQueries: [{ query: FetchBoardsDocument }],
    });
  };

  return {
    onClickBoard,
    onCLickDelete,
  };
}
