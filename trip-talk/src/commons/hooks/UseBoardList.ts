import { useMutation } from "@apollo/client";
import { DeleteBoardDocument, FetchBoardsDocument } from "../graphql/graphql";
import { useRouter } from "next/navigation";
import { IBoardList } from "../../types/board.type";

export default function UseBoardsList (props: IBoardList) {
  const { _id, number, title, writer, createdAt } = props;
  const router = useRouter();
  const [deleteBoard] = useMutation(DeleteBoardDocument);

  const onClickBoard = () => {
    router.push(`/boards/${_id}`);
  };

  const onCLickDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    deleteBoard({
      variables: {
        id: _id,
      },
      refetchQueries: [{ query: FetchBoardsDocument }],
    });
  };

  return {
    onClickBoard,
    onCLickDelete,
    number,
    title,
    writer,
    createdAt
  }
}