import Image from "next/image";
import styles from "./styles.module.css"
import { DELETE_BOARD, FETCH_BOARDS } from "../../../commons/graphql/backend-api";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

interface IBoardList {
  id: string
  number: number
  writer: string
  title: string
  createdAt: string
}

export default function BoardList(props: IBoardList) {
  const {id, number, title, writer, createdAt} = props
  const router = useRouter();
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const opnClickBoard = () => {
    router.push(`/routes/boards/${id}`)
  }

  const onCLickDelete = (event: React.MouseEvent) => {
    event.stopPropagation()
    deleteBoard({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  return (
    <>
      <li className={styles.board_list} onClick={opnClickBoard}>
        <span className={styles.board_number}>{number}</span>
        <span className={styles.board_title}>{title}</span>
        <span className={styles.board_writer}>{writer}</span>
        <span className={styles.board_createdAt}>
          {createdAt.slice(0, 10).replaceAll("-", ".")}
        </span>
        <button className={styles.deleteButton} onClick={onCLickDelete}>
          <Image
            src="/svgs/delete.svg"
            alt="delete"
            width={24}
            height={24}
          />
        </button>
      </li>
    </>
  );
}
