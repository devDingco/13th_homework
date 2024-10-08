import { useMutation, useQuery } from "@apollo/client";
import { FetchBoards, DeleteBoard } from "./queries";
import { useRouter } from "next/navigation";

export default function UseListWrite() {
  const { data } = useQuery(FetchBoards);

  const router = useRouter();

  const onMoveDetailPage = (id) => {
    router.push(`/routes/boards/${id}`);
  };
  const [deleteBoard] = useMutation(DeleteBoard);

  const onClickDelete = (event, id) => {
    event.stopPropagation();
    console.log(id);
    deleteBoard({
      variables: {
        boardId: id,
      },
      refetchQueries: [{ query: FetchBoards }],
    });
  };

  return {
    onMoveDetailPage,
    onClickDelete,
    data,
  };
}
