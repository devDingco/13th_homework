import styles from './styles.module.css'

export default function SalesList() {
  return (
    <div className={styles.list}>
      <div className={styles.dateList}>2024.12.16</div>
      <div className={styles.nameList}>파르나스 호텔 제주</div>
      <div className={styles.historyList}>+1,000,000</div>
      <div className={styles.lastList}>1,222,222</div>
    </div>
  );
}
