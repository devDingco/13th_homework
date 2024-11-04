import Box from "../../mypage-components/Box";
import SalesList from "./sales-history-list";
import styles from "./styles.module.css";

export default function SalesHistory() {
  return (
    <Box>
      <div className={styles.listName}>
        <div className={styles.date}>거래일</div>
        <div className={styles.name}>상품명</div>
        <div className={styles.history}>거래내역</div>
        <div className={styles.price}>거래 후 잔액</div>
      </div>
      <SalesList />
    </Box>
  );
}
