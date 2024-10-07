import { useBoardsList } from "./hook";
import styles from "./styles.module.css";
import Image from "next/image";
import type { IEl } from "./types";

const BoardsList = () => {
  const { data, onClickMove, onClickDelete } = useBoardsList();
  return (
    <main className={styles.main}>
      <div className={styles.head}>
        <div className={`${styles.number} ${styles.head_text}`}>번호</div>
        <div className={`${styles.title} ${styles.head_text}`}>제목</div>
        <div className={`${styles.writer} ${styles.head_text}`}>작성자</div>
        <div className={`${styles.date} ${styles.head_text}`}>날짜</div>
      </div>
      <div className={styles.boards}>
        {data?.fetchBoards.map((el: IEl, index: number) => (
          <div
            className={styles.board_box}
            key={el._id}
            onClick={() => onClickMove(el._id)}
          >
            <div className={`${styles.number} ${styles.board_number}`}>
              {index + 1}
            </div>
            <div className={`${styles.title} ${styles.board_title}`}>
              {el.title}
            </div>
            <div className={`${styles.writer} ${styles.board_writer}`}>
              {el.writer}
            </div>
            <div className={`${styles.date} ${styles.board_date}`}>
              {el.createdAt.split("T")[0].replace(/-/g, ".")}
            </div>
            <Image
              id={el._id}
              onClick={onClickDelete}
              className={styles.deleteImg}
              src="/img/delete.svg"
              alt="deleteImg"
              width={24}
              height={24}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default BoardsList;
