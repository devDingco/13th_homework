import styles from "./styles.module.css";

export default function BoardsPage() {
  return (
    <>
      <div className={styles.post_list}>
        <div className={styles.label_wrapper}>
          <div className={styles.idx}>번호</div>
          <div className={styles.title}>제목</div>
          <div className={styles.author}>작성자</div>
          <div className={styles.date}>날짜</div>
        </div>
        <BoardsParts />
        <BoardsParts />
        <BoardsParts />
        <BoardsParts />
        <BoardsParts />
        <BoardsParts />
        <BoardsParts />
        <BoardsParts />
        <BoardsParts />
        <BoardsParts />
      </div>
    </>
  );
}

function BoardsParts() {
  return (
    <>
      <div className={styles.post_wrapper}>
        <div className={styles.idx}>번호</div>
        <div className={styles.title}>제목</div>
        <div className={styles.author}>작성자</div>
        <div className={styles.date}>날짜</div>
      </div>
    </>
  );
}
