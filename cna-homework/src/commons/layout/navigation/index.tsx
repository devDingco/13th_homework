import Image from "next/image";
import styles from "./styles.module.css";



export default function Navigation() {
  return (
    <>
      <div className={styles.navigation}>
        <div className={styles.navigationContent}>
          <div className={styles.leftMenu}>
            <div className={styles.logoArea}>
              <Image src="/images/logo.png" alt="logo" width={50} height={30} />
            </div>
            <div className={styles.menuArea}>
              <span>트립토크</span>
              <span>숙박권 구매</span>
              <span> 마이페이지</span>
            </div>
          </div>
          <div className={styles.rightMenu}>
            <div className={styles.profileArea}>
              <Image src="/images/profile.png" alt="profile" width={25} height={25} />
            </div>
            <Image src="/images/down-arrow.png" alt="arrow" width={7} height={4} />
          </div>
        </div>
      </div>
    </>
  );
}
