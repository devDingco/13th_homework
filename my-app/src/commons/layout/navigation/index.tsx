import { CaretDownOutlined } from "@ant-design/icons";
import Image from "next/image";
import styles from "./styles.module.css";

export default function LayoutNavigation() {
  return (
    <div className={styles.navigation}>
      <div className={styles.leftNavigation}>
        <Image src="/img/logo.svg" alt="logoImg" width={51.52} height={32} />
        <div className={styles.leftNavigation_menu_box}>
          <div className={styles.leftNavigation_menu}>트립토크</div>
          <div className={styles.leftNavigation_menu}>숙박권 구매</div>
          <div className={styles.leftNavigation_menu}>마이 페이지</div>
        </div>
      </div>
      <div className={styles.rightNavigation_menu}>
        <Image src="/img/profile.png" alt="profileImg" width={40} height={40} />
        <CaretDownOutlined />
      </div>
    </div>
  );
}
