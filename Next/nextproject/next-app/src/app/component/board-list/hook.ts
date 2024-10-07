import { useMutation, useQuery } from "@apollo/client";
import { FetchBoards, DeleteBoard } from "./queries";
import { useRouter } from "next/navigation";
export default function UseListWrite() {
  const { data } = useQuery(FetchBoards);
  console.log(data);

  const router = useRouter();

  const onMoveDeatilPage = (id) => {
    router.push(`/routes/boards/${id}`);
  };
  const [deleteBoard] = useMutation(DeleteBoard);

  const onClickDelete = (id) => {
    console.log(id);
    deleteBoard({
      variables: {
        boardId: id,
      },
      refetchQueries: [{ query: FetchBoards }],
    });
  };

  return {
    onMoveDeatilPage,
    onClickDelete,
    data,
  };
}
