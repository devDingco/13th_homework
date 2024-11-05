import Box from "../../mypage-components/Box";
import AllList from "./all-history-list";
import styles from "./styles.module.css";

export default function AllHistory() {
  return (
    <Box>
      <div className={styles.listName}>
        <div className={styles.date}>날짜</div>
        <div className={styles.content}>내용</div>
        <div className={styles.price}>거래 및 충전 내역</div>
        <div className={styles.last}>잔액</div>
      </div>
      <AllList />
      <AllList />
      <AllList />
      <AllList />
    </Box>
  );
}
