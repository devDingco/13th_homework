import styles from "./styles.module.css"

export default function BoardsHeader () {
  return (
    <>
      <div className={styles.boards_header}>
        <span className={styles.boards_header_number}>번호</span>
        <span className={styles.boards_header_title}>제목</span>
        <span className={styles.boards_header_writer}>작성자</span>
        <span className={styles.boards_header_createdAt}>날짜</span>
      </div>
    </>
  )
}