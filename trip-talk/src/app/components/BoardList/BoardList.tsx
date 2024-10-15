import Image from "next/image";
import styles from "./styles.module.css";
import { IBoardList } from "../../../types/board.type";
import useBoardsList from "../../../commons/hooks/useBoardList";

export default function BoardList(props: IBoardList) {
  const { onClickBoard, onCLickDelete } = useBoardsList(props.id);

  return (
    <li className={styles.board_list} onClick={onClickBoard}>
      <span className={styles.board_number}>{props.number}</span>
      <span className={styles.board_title}>{props.title}</span>
      <span className={styles.board_writer}>{props.writer}</span>
      <span className={styles.board_createdAt}>
        {props.createdAt.slice(0, 10).replaceAll("-", ".")}
      </span>
      <button className={styles.deleteButton} onClick={onCLickDelete}>
        <Image src="/svgs/delete.svg" alt="delete" width={24} height={24} />
      </button>
    </li>
  );
}
