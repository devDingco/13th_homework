import styles from "./styles.module.css";

const BoardHeader = () => {
  return (
    <div className={styles.header_box}>
      <div>번호</div>
      <div>제목</div>
      <div>작성자</div>
      <div>날짜</div>
    </div>
  );
};

export default BoardHeader;
