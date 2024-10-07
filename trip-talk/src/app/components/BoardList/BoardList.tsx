import Image from "next/image";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { IBoardList } from "../../../types/board.type";
import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from "../../../commons/graphql/graphql";

export default function BoardList(props: IBoardList) {
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

  return (
    <>
      <li className={styles.board_list} onClick={onClickBoard}>
        <span className={styles.board_number}>{number}</span>
        <span className={styles.board_title}>{title}</span>
        <span className={styles.board_writer}>{writer}</span>
        <span className={styles.board_createdAt}>
          {createdAt.slice(0, 10).replaceAll("-", ".")}
        </span>
        <button className={styles.deleteButton} onClick={onCLickDelete}>
          <Image src="/svgs/delete.svg" alt="delete" width={24} height={24} />
        </button>
      </li>
    </>
  );
}
