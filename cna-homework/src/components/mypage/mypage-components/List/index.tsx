import Image from 'next/image';
import styles from './styles.module.css'

const List = () => {
  return (
    <div>
      <div className={styles.list}>
        <div className={styles.num_list}>243</div>
        <div className={styles.name_list}>파르나스 호텔 제주</div>
        <div className={styles.price_list}>326,000원</div>
        <div className={styles.date_list}>2024.12.16</div>
        <div className={styles.deleteIcon}>
          <Image src="/images/delete-icon.png" alt="delete" width={15} height={16} />
        </div>
      </div>
    </div>
  );
}

export default List;