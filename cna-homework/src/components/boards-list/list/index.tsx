import styles from "./styles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useBoardList from "./hook";
import Pagination from "../pagination";

export default function BoardList() {
  const router = useRouter();
  const { onClickDelete, data, lastPage, refetch } = useBoardList();
  // console.log('list::',data);
  

  return (
    <div className={styles.allContainer}>
      <div className={styles.boardContainer}>
        <div className={styles.boardMenu}>
          <div className={styles.boardNum}>번호</div>
          <div className={styles.boardTitle}>제목</div>
          <div className={styles.boardWriter}>작성자</div>
          <div className={styles.boardDate}>날짜</div>
          <div className={styles.empty}></div>
        </div>
        <div className={styles.boardContents}>
          {data?.fetchBoards?.map((el, index) => (
            <div
              className={styles.boardContent}
              key={el._id}
              onClick={() => {
                router.push(`/boards/${el._id}`);
              }}
            >
              <div className={styles.contentNum}>{index + 1}</div>
              <div className={styles.contentTitle}>{el.title}</div>
              <div className={styles.contentWriter}>{el.writer}</div>
              <div className={styles.contentDate}>{el.createdAt.slice(0,10)}</div>
              <div className={styles.iconArea}>
                <Image
                  className={styles.deleteIcon}
                  src="/images/delete-icon.png"
                  alt="delete-icon"
                  width={0}
                  height={0}
                  id={el._id}
                  onClick={onClickDelete}
                />
              </div>
            </div>
          ))}
        </div>
        <Pagination lastPage={lastPage} refetch={refetch} />
      </div>
    </div>
  );
}
