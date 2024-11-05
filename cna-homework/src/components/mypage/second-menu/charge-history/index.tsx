import Box from "../../mypage-components/Box";
import ChargeList from "./charge-history-list";
import styles from "./styles.module.css";

export default function ChargeHistory() {
  return (
    <Box>
      <div className={styles.listName}>
        <div className={styles.date}>충전일</div>
        <div className={styles.id}>결제 ID</div>
        <div className={styles.price}>충전내역</div>
        <div className={styles.last}>거래 후 잔액</div>
      </div>
      <ChargeList />
    </Box>
  );
}
