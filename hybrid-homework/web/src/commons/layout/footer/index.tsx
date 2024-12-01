import Image from "next/image";
import styles from "./styles.module.css";

export function Footer() {
  return (
    <>
      <div style={{ flex: 1 }}></div>
      <footer className={styles.footer}>
        <div className={styles.navigation}>
          <button className={styles.itemActive}>
            <Image
              className={styles.icon}
              src="/assets/location_active.svg"
              width={0}
              height={0}
              alt="item_loaction"
            />
            <p>플레이스</p>
          </button>

          <button className={styles.item}>
            <Image
              className={styles.icon}
              src="/assets/mypage.svg"
              width={0}
              height={0}
              alt="item_mypage"
            />
            <p>내 설정</p>
          </button>
        </div>
      </footer>
    </>
  );
}
