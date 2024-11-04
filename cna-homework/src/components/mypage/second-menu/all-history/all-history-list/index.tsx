import styles from './styles.module.css'

export default function AllList() {
  return (
    <div className={styles.list}>
      <div className={styles.dateList}>2024.12.16</div>
      <div className={styles.contentList}>충전</div>
      <div className={styles.priceList}>+1,000,000</div>
      <div className={styles.lastList}>1,222,000</div>
    </div>
  );
}
