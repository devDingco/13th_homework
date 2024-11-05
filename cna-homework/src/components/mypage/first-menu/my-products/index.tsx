import styles from "./style.module.css";
import Box from "../../mypage-components/Box";
import List from "../../mypage-components/List";

export default function MyProducts() {
  return (
    <Box>
      <div className={styles.listName}>
        <div className={styles.num}>번호</div>
        <div className={styles.name}>상품명</div>
        <div className={styles.price}>판매가격</div>
        <div className={styles.date}>날짜</div>
        <div className={styles.deleteIcon}></div>
      </div>

      <List />
      <List />
      <List />
      <List />
    </Box>
  );
}
